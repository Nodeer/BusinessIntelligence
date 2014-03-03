'use strict';

var biControllers = angular.module('biControllers', []);

biControllers.controller('TaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        $scope.tasks = TaskFactory.query();
    }]);

biControllers.controller('ProfileCtrl', ['$scope', 'UserFactory',
    function ($scope, UserFactory) {
        $scope.user = UserFactory.get();

        $scope.submit = function() {
            UserFactory.save({
                user: $scope.user
            });
        };
    }]);