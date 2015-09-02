import os

DB_DIR = os.environ.get('ANGULAR_DEMO_DB_FILES_DIR', './databases')


def get_db_path(token):
    return os.path.join(DB_DIR, '{}.db'.format(token))


def db_exists(token):
    return os.path.exists(get_db_path(token))


def get_all_persons(cursor):
    cursor.execute('SELECT * FROM person')
    return [restructure_person(cursor, row) for row in cursor]


def get_task(cursor, id):
    cursor.execute(
        """
        SELECT T.*, P.name AS 'assignee_name'
        FROM task AS T
        JOIN person AS P ON T.assignee_id=P.id
        WHERE T.id = ?
        """, [id])

    return restructure_task(cursor, cursor.fetchone())


def get_all_tasks(cursor):
    cursor.execute(
        """
          SELECT T.*, P.name AS 'assignee_name'
          FROM task AS T
          JOIN person AS P ON T.assignee_id=P.id
        """)
    return [restructure_task(cursor, row) for row in cursor]


def delete_task(cursor, id):
    cursor.execute('DELETE FROM task WHERE id = ?', [id])


def create_task(cursor, data):
    cursor.execute(
        """
          INSERT INTO task (title, description, assignee_id, storypoints)
          VALUES (?, ?, ?, ?)
        """,
        task_data_to_values(data)
    )
    return get_task(cursor, cursor.lastrowid)


def update_task(cursor, id, data):
    cursor.execute(
        """
          UPDATE task
          SET title=?, description=?, assignee_id=?, storypoints=?
          WHERE task.id = ?
        """,
        task_data_to_values(data) + [id]
    )
    return get_task(cursor, id)


def restructure_person(cursor, row):
    column_names = [d[0] for d in cursor.description]
    return dict(zip(column_names, row))


def restructure_task(cursor, row):
    column_names = [d[0] for d in cursor.description]
    row = dict(zip(column_names, row))
    row['assignee'] = {
        'id': row['assignee_id'],
        'name': row['assignee_name'],
    }
    del row['assignee_id']
    del row['assignee_name']
    return row


def task_data_to_values(data):
    return [
        data.get('title'),
        data.get('description'),
        data.get('assignee').get('id'),
        data.get('storypoints')
    ]
