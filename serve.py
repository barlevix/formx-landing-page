import http.server, functools, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
http.server.ThreadingHTTPServer(("127.0.0.1", 5173), H).serve_forever()
