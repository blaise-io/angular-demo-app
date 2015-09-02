# Introduction to Angular

This is an example app that demos how to do:

 - Modules and dependencies
 - Dependency injection
 - Routing
 - Templating
 - Controllers
 - Providers
 - Resources
 - Filters
 - Form validation

For a guide, visit https://docs.angularjs.org/guide.

For documentation, visit https://docs.angularjs.org.


## Running

 1. Create a virtual environment with Python 2.7
 2. Clone this repository in that virtual environment
 3. Create a new database: `python create_db.py`. This will create a 
   <uuid>.db file in the `databases` directory. Use this uuid in step 6.
 4. Install project requirements: `pip install -r requirements.txt`
 5. Start the server: `python server.py`
 6. Try out the server: `http://127.0.0.1:5000/<uuid>`

If you want to store the databases somewhere else, set the environment 
variable `ANGULAR_DEMO_DB_FILES_DIR`.


## Getting a new tester up and running

 1. Run `python create_db.py`
 2. Send `http://<public_host_name>/<uuid>` to the tester
 
You can have multiple databases in one environment, so that multiple testers can
each have their own database. The names of other tester’s databases should be 
considered a secret, as a tester could mess with another tester’s data.

If a database needs to be reset for some reason, you can overwrite the database 
with the default data from `create_db.sql` using `python create_db.py <uuid>`.
