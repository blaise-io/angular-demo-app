bugtracker.factory('personResource', ['$resource', function($resource) {

    return $resource('/endpoints/persons.json');

}]);
