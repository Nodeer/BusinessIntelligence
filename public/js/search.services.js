var searchServices = angular.module('search.services', ['ngResource']);

searchServices.factory('TaskSearchFactory', ['$resource',
    function ($resource) {
        return $resource('/search/tasks.json/:criteria');
    }]);