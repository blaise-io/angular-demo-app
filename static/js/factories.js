bugtracker.factory('personResource', ['$resource', function($resource) {
    return $resource('/api/persons');
}]);


bugtracker.factory('taskFactory', [
    '$filter', '$resource', '$q',
    function($filter, $resource, $q) {

        // Define a resource with a url, parameter defaults and actions.
        // Actions can be called on the Task object.
        // actions can also be called on a task instance using the '$' prefix.
        var Task = $resource('/api/tasks/:id', {id: '@id'});

        // Fetch tasks when a taskFactory is initialized.
        var tasks = Task.query();


        // --------------------
        // Helper methods below
        // --------------------


        // Get a task by ID from a list of tasks.
        function getTaskSync(id) {
            // https://docs.angularjs.org/api/ng/filter/filter
            var filtered = $filter('filter')(tasks, {id: id});
            return filtered.length ? filtered[0] : null;
        }

        // Get a task from tasks.
        // Tasks may not be rrsolved yet, so we need to make sure that tasks
        // are resolved before we find the task with our ID.
        function getTask(id) {
            // Create a deferred object that will resolve later
            var deferred = $q.defer();
            // Add a handler to the task promise
            tasks.$promise.then(function() {
                // Find the task in the list of tasks
                var task = getTaskSync(id);
                if (task) {
                    // Task exists: resolve as promised
                    deferred.resolve(task);
                } else {
                    // Task does not exist!
                    // Reject the deferred object with a reason
                    deferred.reject('Task does not exist');
                }
            });
            // Fetching the list of tasks failed
            tasks.$promise.catch = function() {
                deferred.reject('Fetching tasks failed');
            };
            // Return the promise for a deferred object
            return deferred.promise;
        }

        function saveTask(task) {

            // Task has an ID, so assume we're updating an existing task.
            if (task.id) {
                // Overwrite existing task with working copy,
                // while maintaining references.
                task.$save().then(function(task) {
                    angular.extend(getTaskSync(task.id), task);
                })
            }

            // Task does not have an ID, so this will create a new task.
            else {
                task.$save().then(function(task) {
                    tasks.push(task);
                });
            }
        }

        function deleteTask(task) {
            var index = tasks.indexOf(task);
            tasks.splice(index, 1);
            task.$delete();
        }

        return {
            Task: Task,
            tasksPromise: tasks.$promise,
            getTask: getTask,
            deleteTask: deleteTask,
            saveTask: saveTask
        };

    }
]);
