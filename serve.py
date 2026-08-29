"""Static file server for site/.

Serves on $PORT when the environment sets one (the Claude Code preview
launcher assigns a free port that way), otherwise on 5173.
"""
import functools
import http.server
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
PORT = int(os.environ.get("PORT") or 5173)

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
print(f"serving {ROOT} on http://127.0.0.1:{PORT}", flush=True)
server.serve_forever()
