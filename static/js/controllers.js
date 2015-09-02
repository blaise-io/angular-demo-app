bugtracker.controller('OverviewCtrl', [

    // $scope is an object that holds a default set of variables and functions.
    // You add your own variables and functions to it inside controllers.
    // It also holds its parent element controller's variables and functions.
    '$scope', 'taskFactory',
    function($scope, taskFactory) {

        // Append the tasks to the scope once they're fetched
        taskFactory.tasksPromise.then(function(tasks) {
            $scope.tasks = tasks;
        });

        // Handle network/server/parsing errors
        taskFactory.tasksPromise.catch(function() {
            window.alert('Fetching tasks failed');
        });

        // Append a function to the scope which can be used in the template
        $scope.confirmDelete = function(task) {
            if (confirm('Do you really want to get rid of "' + task.title + '"?')) {
                taskFactory.deleteTask(task);
            }
        };

    }
]);


bugtracker.controller('CreateCtrl', [
    '$scope', '$location', 'taskFactory', 'personResource',
    function($scope, $location, taskFactory, personResource) {

        // Populate the model.
        $scope.task = new taskFactory.Task({
            storypoints: 0
        });

        // Populate the persons. Omitted: Resource error handling.
        $scope.persons = personResource.query();

        // Add the save function to the scope so that it can be called
        // in the template.
        $scope.saveTaskForm = function() {
            taskFactory.saveTask($scope.task);
            $location.path('/');
        }

    }
]);


bugtracker.controller('UpdateCtrl', [
    '$scope', '$location', '$routeParams', 'taskFactory', 'personResource',
    function($scope, $location, $routeParams, taskFactory, personResource) {

        // Get a promise for fetching a task
        var taskPromise = taskFactory.getTask($routeParams.id);

        // Handle wHen the promise is resolved
        taskPromise.then(function(task) {
            // Create a working copy. We don't want to update the original task
            // until the form is submitted.
            $scope.task = angular.copy(task);
        });

        // OH NO OH SHIT OH FWORD
        taskPromise.catch(function() {
            window.alert('Fetching tasks failed');
            $location.path('/');
        });

        // Populate the persons. Omitted: Resource error handling.
        $scope.persons = personResource.query();

        // Add the save function to the scope so that it can be called
        // in the template.
        $scope.saveTaskForm = function() {
            taskFactory.saveTask($scope.task);
            $location.path('/');
        }

    }
]);
