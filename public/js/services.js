var services = angular.module('services', ['ngResource'])
    .value('user', window.user);

services.factory('ProfileFactory', ['$resource',
    function ($resource) {
        return $resource('/profile/user.json');
    }]);

services.factory('UserFactory', ['$q', 'user', 
    function($q, user) {
        var deferred = $q.defer();

        deferred.resolve(angular.extend({}, user));
                
        return deferred.promise;
    }]);