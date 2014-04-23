var services = angular.module('services', ['ngResource']);

services.factory('UserFactory', ['$resource',
    function ($resource) {
        return $resource('/profile/user.json');
    }]);
