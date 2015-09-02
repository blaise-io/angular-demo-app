bugtracker.run(['$http', 'TOKEN', function($http, TOKEN) {
    $http.defaults.headers.common.Authorization = TOKEN;
}]);
