bugtracker.controller('ListCtrl', [
    '$scope', 'tasksProvider',
    function($scope, tasksProvider) {

        tasksProvider.tasks.$promise.then(function(tasks) {
            $scope.tasks = tasks;
        });

        $scope.confirmDelete = function(task) {
            if (confirm('Are you sure you want to delete "' + task.title + '"?')) {
                tasksProvider.deleteTask(task);
            }
        };

    }
]);


bugtracker.controller('CreateCtrl', [
    '$scope', '$location', 'tasksProvider', 'personResource',
    function($scope, $location, tasksProvider, personResource) {

        $scope.task = new tasksProvider.Task();

        $scope.persons = personResource.query();

        $scope.save = function() {
            tasksProvider.saveTask($scope.task);
            $location.path('/');
        }

    }
]);


bugtracker.controller('UpdateCtrl', [
    '$scope', '$location', '$routeParams', 'tasksProvider', 'personResource',
    function($scope, $location, $routeParams, tasksProvider, personResource) {

        tasksProvider.tasks.$promise.then(function() {

            $scope.task = angular.copy(
                tasksProvider.getTask($routeParams.id)
            );

        });

        $scope.persons = personResource.query();

        $scope.save = function() {
            tasksProvider.saveTask($scope.task);
            $location.path('/');
        }

    }
]);
