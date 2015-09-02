// Assign module to a global for convenience.
// Global variable name doesn't need to match.
var bugtracker = angular.module('bugtracker', [
    // Dependencies.
    'ngRoute',
    'ngMessages',
    'ngResource'
]);
