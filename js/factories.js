bugtracker.factory('tasksProvider', ['$filter', '$resource', function($filter, $resource) {

    var methods, Task, tasks;


    methods = {
        query: {
            url: '/endpoints/tasks.json',
            isArray: true
        },
        create: {
            method: 'PUT'
        }
    };

    Task = $resource('/backend/not/functional/tasks/:id', {id: '@id'}, methods);

    tasks = Task.query();


    function getTask(id) {
        var filtered = $filter('filter')(tasks, {id: id});
        return filtered.length ? filtered[0] : null;
    }

    function saveTask(task) {
        if (task.id) {
            // Overwrite original with working copy.
            var originalTask = getTask(task.id);
            angular.extend(originalTask, task);
            task.$save(); // Not working because no DB.
        } else {
            // Create a new task.
            task.$create(); // Not working because no DB.
            task.id = getAutoIncrement(); // Normally the server would do this.
            tasks.push(task);
        }
    }

    function deleteTask(task) {
        var index = tasks.indexOf(task);
        tasks.splice(index, 1);
        task.$delete(); // Not working because no DB.
    }

    function getAutoIncrement() {
        var id = 0;
        angular.forEach(tasks, function(task) {
            if (task.id >= id) {
                id = task.id + 1;
            }
        });
        return id;
    }

    return {
        Task: Task,
        tasks: tasks,
        getTask: getTask,
        deleteTask: deleteTask,
        saveTask: saveTask
    };
}]);
