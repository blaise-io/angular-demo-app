// 1: Configure our app:
bugtracker.config([

    // 2: Inject dependencies
    '$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

        // 3: Turn on HTML5 mode.
        // This will use <base>/<path> instead of <base>/#/<path>:
        $locationProvider.html5Mode(true);

        // 4: Create a route
        // When a user requests '/', it will load list.html inside our <ng-view>.
        $routeProvider.when('/', {
            templateUrl: '/views/list.html',
            controller: 'ListCtrl'
        });

        $routeProvider.when('/create', {
            templateUrl: '/views/create.html',
            controller: 'CreateCtrl'
        });

        $routeProvider.when('/update/:id', {
            templateUrl: '/views/update.html',
            controller: 'UpdateCtrl'
        });

        $routeProvider.otherwise({
            template: '404'
        });

    }

]);
