var biServices = angular.module('biServices', ['ngResource']);

biServices.factory('TaskFactory', ['$resource',
    function ($resource) {
        return $resource('tasks/:taskId.json', {}, {
            query: { method: 'GET', params: { taskId: '' }, isArray: true }
        });
    }]);

biServices.factory('UserFactory', ['$resource',
    function ($resource) {
        return $resource('/profile/user.json');
    }]);