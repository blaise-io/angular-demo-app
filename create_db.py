#!/usr/bin/python
import os
import uuid
import sqlite3
import sys
from queries import get_db_path

uuid_str = None

if len(sys.argv) > 1:
    try:
        uuid_str = uuid.UUID(sys.argv[1], version=4)
    except ValueError:
        print("Please pass a valid uuid v4 as the first argument, ")
        print("or leave it empty to generate a new uuid.")
        exit(1)
else:
    uuid_str = uuid.uuid4()

db_path = get_db_path(uuid_str)
db_conn = sqlite3.connect(db_path)
with open('create_db.sql', 'r') as sql_file:
    try:
        db_conn.cursor().executescript(sql_file.read())
        db_conn.commit()
    except Exception as e:
        print("Error executing SQL: {}".format(e))
        exit(1)
    finally:
        db_conn.close()

print "Database successfully created at {}".format(os.path.abspath(db_path))
print "Token for tester: {}".format(uuid_str)

exit(0)
