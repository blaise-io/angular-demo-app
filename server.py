#!/usr/bin/env python2.7
from functools import wraps
import json
from flask import Flask, render_template, request, Response
import sys
import sqlite3
import logging
import queries
from werkzeug.routing import BaseConverter

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)


class RegexConverter(BaseConverter):
    """
    Regexp URL segment parser for Flask.
    From http://stackoverflow.com/a/5872904/451480
    """

    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app.url_map.converters['regex'] = RegexConverter


def wrap_sqlite(f):
    """
    Decorator for Flask views that eases a few things:
    - Checks Authorization header
    - Inserts SQLite cursor
    - Commits and closes SQLite after the functions has run
    """

    @wraps(f)
    def new_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if queries.db_exists(token):
            db_conn = sqlite3.connect(queries.get_db_path(token))
            kwargs['cursor'] = db_conn.cursor()
            result = f(*args, **kwargs)
            db_conn.commit()
            db_conn.close()
            return result
        return JsonResponse({'error': 'Invalid token'}, status=403)

    return new_function


class JsonResponse(Response):
    """
    Convert response to json and set mimetype.
    """
    default_mimetype = 'application/json'

    def __init__(self, response=None, *args, **kwargs):
        response = json.dumps(response, sort_keys=True, indent=2)
        super(JsonResponse, self).__init__(response, *args, **kwargs)


@app.route('/')
def missing_token():
    """ Missing token in URL """
    return render_template('missing_token.html', request=request), 500


@app.route('/<regex("[\w\-]{36}"):token>')
@app.route('/<regex("[\w\-]{36}"):token>/')
@app.route('/<regex("[\w\-]{36}"):token>/<path:path>')
def index(token, path=None):
    """ Serve index.html to all URLs starting with token. """
    if queries.db_exists(token):
        return render_template('index.html', token=token)
    return render_template('invalid_token.html', token=token), 403


@app.route('/api/persons', methods=['GET'], defaults={'cursor': None})
@wrap_sqlite
def query_persons(cursor):
    rows = queries.get_all_persons(cursor)
    return JsonResponse(rows)


@app.route('/api/tasks', methods=['GET'], defaults={'cursor': None})
@wrap_sqlite
def query_tasks(cursor):
    rows = queries.get_all_tasks(cursor)
    return JsonResponse(rows)


@app.route('/api/tasks', methods=['POST'], defaults={'cursor': None})
@wrap_sqlite
def create_task(cursor):
    row = queries.create_task(cursor, json.loads(request.data))
    return JsonResponse(row)


@app.route('/api/tasks/<id>', methods=['POST'], defaults={'cursor': None})
@wrap_sqlite
def update_task(cursor, id):
    row = queries.update_task(cursor, id, json.loads(request.data))
    return JsonResponse(row)


@app.route('/api/tasks/<id>', methods=['DELETE'], defaults={'cursor': None})
@wrap_sqlite
def delete_task(cursor, id):
    queries.delete_task(cursor, id)
    return JsonResponse({'OK': True})


if __name__ == "__main__":
    app.run()
