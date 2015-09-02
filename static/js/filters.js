bugtracker.filter('totalStoryPoints', function() {

    return function(tasks) {
        var total = 0;
        angular.forEach(tasks, function(task) {
            if (!isNaN(task.storypoints)) {
                total += task.storypoints;
            }
        });
        return total;
    }

});


bugtracker.filter('taskSizeStyle', function() {

    return function(storypoints) {
        var fontSize = 1 + ((storypoints - 1) / 20);
        fontSize = Math.min(fontSize, 1.6);
        return {
            fontSize: fontSize.toFixed(2) + 'em'
        };
    }

});
