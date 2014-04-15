var managementServices = angular.module('management.services', ['ngResource']);

managementServices.factory('UsersFactory', ['$resource',
    function ($resource) {
        return $resource('/management/users/users.json');
    }]);