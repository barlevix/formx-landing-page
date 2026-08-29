"""FormX CMS — the editing server.

Serves the site at /, the editor at /admin/, and two small endpoints the editor
uses to save changes:

    PUT  /api/content   body = the whole content.json document
    POST /api/upload    body = raw file bytes, filename in the X-Filename header

Run it while you are editing:

    python3 cms.py

It binds to 127.0.0.1 only and has no login, so it is meant for editing on your
own machine. Do not expose it to the internet — anything that can reach it can
overwrite the site's content and write files into assets/uploads. To publish,
deploy the contents of docs/ as static files; the published site only ever reads
content.json, so none of these endpoints ship with it.
"""

import http.server
import json
import os
import re
import shutil
import unicodedata
import urllib.parse
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, "docs")
ADMIN = os.path.join(HERE, "admin")
CONTENT = os.path.join(SITE, "content.json")
UPLOADS = os.path.join(SITE, "assets", "uploads")

PORT = int(os.environ.get("PORT") or 5173)
MAX_UPLOAD = 300 * 1024 * 1024          # 300 MB, comfortably above a 4K clip
MAX_CONTENT = 4 * 1024 * 1024

ALLOWED = {
    ".jpg": "image", ".jpeg": "image", ".png": "image",
    ".webp": "image", ".gif": "image", ".avif": "image",
    ".mp4": "video", ".webm": "video", ".mov": "video",
}


def safe_name(raw):
    """Reduce a browser-supplied filename to something safe to write."""
    raw = urllib.parse.unquote(raw or "")
    raw = os.path.basename(raw).strip()
    raw = unicodedata.normalize("NFKD", raw).encode("ascii", "ignore").decode()
    stem, ext = os.path.splitext(raw)
    ext = ext.lower()
    if ext not in ALLOWED:
        return None, None
    stem = re.sub(r"[^A-Za-z0-9._-]+", "-", stem).strip("-.") or "file"
    return stem[:60], ext


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=SITE, **kw)

    # /admin/... is served from the admin folder, everything else from site/
    def translate_path(self, path):
        clean = path.split("?", 1)[0].split("#", 1)[0]
        if clean == "/admin":
            return os.path.join(ADMIN, "index.html")
        if clean.startswith("/admin/"):
            rel = clean[len("/admin/"):] or "index.html"
            full = os.path.normpath(os.path.join(ADMIN, rel))
            if not full.startswith(ADMIN):        # refuse ../ escapes
                return ADMIN
            return os.path.join(full, "index.html") if os.path.isdir(full) else full
        return super().translate_path(path)

    def do_GET(self):
        # /admin without the slash would resolve admin.css against the root
        if self.path.split("?")[0] == "/admin":
            self.send_response(301)
            self.send_header("Location", "/admin/")
            self.end_headers()
            return
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _body(self, limit):
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0:
            return None, "empty request body"
        if length > limit:
            return None, f"too large ({length / 1e6:.0f} MB, limit {limit / 1e6:.0f} MB)"
        return self.rfile.read(length), None

    def do_PUT(self):
        if self.path.split("?")[0] != "/api/content":
            return self.send_error(404)

        raw, err = self._body(MAX_CONTENT)
        if err:
            return self._json(413 if "large" in err else 400, {"error": err})
        try:
            data = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as e:
            return self._json(400, {"error": f"not valid JSON: {e}"})
        if not isinstance(data, dict):
            return self._json(400, {"error": "expected a JSON object"})

        # keep one rolling backup so a bad save is always recoverable
        if os.path.exists(CONTENT):
            shutil.copy2(CONTENT, CONTENT + ".bak")

        tmp = CONTENT + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        os.replace(tmp, CONTENT)                  # atomic; never a half-written file

        print(f"  saved content.json  ({datetime.now():%H:%M:%S})", flush=True)
        return self._json(200, {"ok": True})

    def do_POST(self):
        if self.path.split("?")[0] != "/api/upload":
            return self.send_error(404)

        stem, ext = safe_name(self.headers.get("X-Filename", ""))
        if not stem:
            return self._json(400, {
                "error": "unsupported file type — use " +
                         ", ".join(sorted(ALLOWED)).replace(".", "")
            })

        raw, err = self._body(MAX_UPLOAD)
        if err:
            return self._json(413 if "large" in err else 400, {"error": err})

        os.makedirs(UPLOADS, exist_ok=True)
        name = f"{stem}{ext}"
        n = 2
        while os.path.exists(os.path.join(UPLOADS, name)):
            name = f"{stem}-{n}{ext}"
            n += 1
        with open(os.path.join(UPLOADS, name), "wb") as f:
            f.write(raw)

        url = f"assets/uploads/{name}"
        print(f"  uploaded {url}  ({len(raw) / 1e6:.1f} MB)", flush=True)
        return self._json(200, {"path": url, "kind": ALLOWED[ext]})

    def log_message(self, fmt, *args):
        pass                                       # the prints above are enough


if __name__ == "__main__":
    os.makedirs(UPLOADS, exist_ok=True)
    print(f"  site   http://127.0.0.1:{PORT}/")
    print(f"  editor http://127.0.0.1:{PORT}/admin/")
    print("  local editing server — no login, do not expose to the internet\n", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
