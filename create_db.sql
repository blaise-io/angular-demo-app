DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS task;

CREATE TABLE person (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE task (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT,
  description TEXT,
  assignee_id INTEGER,
  storypoints INTEGER,
  FOREIGN KEY (assignee_id) REFERENCES person (id)
);

INSERT INTO person (name) VALUES ('Ben Dalby');
INSERT INTO person (name) VALUES ('Blaise Kal');
INSERT INTO person (name) VALUES ('Bogdana Vereha');
INSERT INTO person (name) VALUES ('Juan Martin Moschino');
INSERT INTO person (name) VALUES ('Leonardo Santagada');
INSERT INTO person (name) VALUES ('Nikola Rankovic');
INSERT INTO person (name) VALUES ('Rodrigo Pimentel');
INSERT INTO person (name) VALUES ('Ruslan Lutsenko');

INSERT INTO task (title, description, assignee_id, storypoints) VALUES ('Feed the fish', 'They really like plankton and vegetables.', 1, 1);
INSERT INTO task (title, description, assignee_id, storypoints) VALUES ('Pet the penguins', 'Except penguin Georgie, he does not like that.', 2, 1);
INSERT INTO task (title, description, assignee_id, storypoints) VALUES ('Elevate the elephants', 'You can use a crane.', 2, 1);
INSERT INTO task (title, description, assignee_id, storypoints) VALUES ('Rhyme with the rhinos', 'Hey rhino, you look like a dino, where’s the bug? like I know…', 2, 1);
