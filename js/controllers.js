bugtracker.controller('ListCtrl', [
    '$scope', 'tasks',
    function($scope, tasks) {
        $scope.tasks = tasks;
    }
]);



bugtracker.controller('CreateCtrl', [
    '$scope', '$location', 'tasks', 'personResource',
    function($scope, $location, tasks, personResource) {

        $scope.task = {
            id: new Date().getTime()
        };

        $scope.persons = personResource.query();

        $scope.save = function(taskForm) {
            if (taskForm.$invalid) {
                alert('The form is not valid!');
            } else {
                window.alert('Created!');
                tasks.push($scope.task);
                $location.path('/');
            }
        }
    }
]);



bugtracker.controller('UpdateCtrl', [
    '$scope', '$location', '$routeParams', 'tasks', 'personResource',
    function($scope, $location, $routeParams, tasks, personResource) {

        var originalTask;

        angular.forEach(tasks, function(task) {
            if (task.id === Number($routeParams.id)) {
                originalTask = task;
                $scope.task = angular.copy(task);
            }
        });

        if (!$scope.task) {
            window.alert('Not found!');
            $location.path('/');
        }

        $scope.persons = personResource.query();

        $scope.save = function(taskForm) {
            if (taskForm.$invalid) {
                alert('The form is not valid!');
            } else {
                angular.extend(originalTask, $scope.task);
                window.alert('Saved!');
                $location.path('/');
            }
        }
    }
]);
