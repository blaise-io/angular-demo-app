#!/usr/bin/env python2.7
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

"""
Run using `python server.py [port]`.
Serves files from using this directory as a base.
Serves index.html when a file is not found.
"""


class MyHandler(SimpleHTTPRequestHandler):

    def send_error(self, code, message=None):
        print code
        if code == 404:
            with open('index.html', 'r') as index_file:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html')
                self.send_header('Connection', 'close')
                self.end_headers()
                self.wfile.write(index_file.read())
        else:
            SimpleHTTPRequestHandler.send_error(self, code, message)

BaseHTTPServer.test(MyHandler, BaseHTTPServer.HTTPServer)
