var services = angular.module('services', ['ngResource']);

services.factory('TaskFactory', ['$resource',
    function ($resource) {
        return $resource('tasks/:taskId.json', {}, {
            query: { method: 'GET', params: { taskId: '' }, isArray: true }
        });
    }]);

services.factory('UserFactory', ['$resource',
    function ($resource) {
        return $resource('/profile/user.json');
    }]);
