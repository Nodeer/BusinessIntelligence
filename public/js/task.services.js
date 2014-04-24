var taskServices = angular.module('task.services', ['ngResource']);

taskServices.factory('TaskFactory', ['$resource',
    function ($resource) {
        return $resource('/task/task.json');
    }]);

taskServices.factory('ConditionFactory', ['$resource',
    function ($resource) {
        return $resource('/task/conditions/:id.json');
    }]);
