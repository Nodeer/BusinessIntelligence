var services = angular.module('services', ['ngResource'])
    .value('user', window.user);

services.factory('ProfileFactory', ['$resource',
    function ($resource) {
        return $resource('/profile/user.json');
    }]);

services.factory('MetricsFactory', ['$resource',
    function ($resource) {
        return {
            tasks: $resource('/metrics/tasks.json')
        };
    }]);

services.factory('Application', ['$q', 'user', 
    function($q, user) {
        var deferred = $q.defer();

        deferred.resolve(angular.extend({}, user));

        return deferred.promise;
    }]);