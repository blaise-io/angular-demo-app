#!/usr/bin/env python2.7
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import ThreadingMixIn

"""
Run using `python server.py [port]`.
Serves files from using this directory as a base.
Serves index.html when a file is not found.
"""


class MyHandler(SimpleHTTPRequestHandler):

    def send_error(self, code, message=None):
        # Serve index.html if static files does not exist:
        if code == 404:
            with open('index.html', 'r') as index_file:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html')
                self.send_header('Connection', 'close')
                self.end_headers()
                self.wfile.write(index_file.read())
        else:
            SimpleHTTPRequestHandler.send_error(self, code, message)

class MultiThreadedHTTPServer(ThreadingMixIn, BaseHTTPServer.HTTPServer):
    pass

print('Starting server at 127.0.0.1:8000, use <Ctrl-C> to stop')
MultiThreadedHTTPServer(('', 8000), MyHandler).serve_forever()
