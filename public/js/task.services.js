var taskServices = angular.module('task.services', ['ngResource']);

taskServices.factory('TaskFactory', ['$resource',
    function ($resource) {
        return $resource('/task/task.json/:id');
    }]);

taskServices.factory('PartnersFactory', ['$resource',
    function ($resource) {
        return $resource('/task/partners.json/:name');
    }]);

taskServices.factory('ConditionsFactory', ['$resource',
    function ($resource) {
        return $resource('/task/conditions.json/:name/:value');
    }]);

taskServices.factory('DependencyFactory', ['$resource',
    function ($resource) {
        return $resource('/task/dependency.json/:name/:id/:type');
    }]);