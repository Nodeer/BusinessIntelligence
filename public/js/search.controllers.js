var searchControllers = angular.module('search.controllers', [
    'search.services'
]);

searchControllers.controller('SearchCtrl', ['$scope', 'TaskSearchFactory',
    function ($scope, TaskSearchFactory) {
        $scope.search = {
            criteria: '',
            tasks: []
        };

        $scope.search = function() {
            ///<summary>Submits user profile</summary>
            if ($scope.search.criteria.length >= 3) {

                TaskSearchFactory.query({
                    criteria: $scope.search.criteria
                }, function(tasks) {
                    $scope.search.tasks = tasks;
                });
            } else {
                $scope.search.tasks = [];
            }
        };
    }]);