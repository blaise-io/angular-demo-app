#!/usr/bin/python
import os
import uuid
import sqlite3
import sys
from queries import get_db_path

my_uuid = None

if len(sys.argv) > 1:
    try:
        my_uuid = uuid.UUID(sys.argv[1], version=4)
    except ValueError:
        print("Please pass a valid uuid v4 as the first argument, ")
        print("or leave it empty to generate a new uuid.")
        exit(1)
else:
    my_uuid = uuid.uuid4()

db_path = get_db_path(my_uuid)
db_conn = sqlite3.connect(db_path)
with open('create_db.sql', 'r') as sql_file:
    try:
        db_conn.cursor().executescript(sql_file.read())
        db_conn.commit()
    except Exception as e:
        print("error with database: {}".format(e))
        exit(1)
    finally:
        db_conn.close()

print "Database successfully created at {}".format(os.path.abspath(db_path))
print "Token for tester: {}".format(my_uuid)

exit(0)
