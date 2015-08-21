bugtracker.config([

    // (Modules) Dependency injection
    '$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

        // (Routing) Use <base>/url instead of <base>#/url
        $locationProvider.html5Mode(true);

        // (Routing) Define the template and controller for a specific URL
        $routeProvider.when('/', {
            templateUrl: '/views/overview.html',
            controller: 'OverviewCtrl'
        });

        $routeProvider.when('/create', {
            templateUrl: '/views/create.html',
            controller: 'CreateCtrl'
        });

        $routeProvider.when('/update/:id', {
            templateUrl: '/views/update.html',
            controller: 'UpdateCtrl'
        });

        // (Routing) Define a template in case there's no routing
        // rule for the URL
        $routeProvider.otherwise({
            template: '<a href="/">Back to overview</a><div class="spinning">404</div>'
        });

    }

]);
