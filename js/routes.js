bugtracker.config([

    '$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: '/views/overview.html',
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
