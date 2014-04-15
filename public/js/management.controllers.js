var managementControllers = angular.module('management.controllers', [
    'management.services'
]);

managementControllers.controller('ManagementCtrl', ['$scope',
    function ($scope) {
    }]);

managementControllers.controller('UsersCtrl', ['$scope', 'UsersFactory',
    function ($scope, UsersFactory) {
        $scope.users = UsersFactory.query();
    }]);
