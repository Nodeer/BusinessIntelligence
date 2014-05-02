var searchControllers = angular.module('search.controllers', [
    'search.services'
]);

searchControllers.controller('SearchCtrl', ['$scope', 'TaskSearchFactory', '$sce',
    function ($scope, TaskSearchFactory, $sce) {
        $scope.search = {
            criteria: '',
            tasks: []
        };

        $scope.highlight = function(text) {
            if (!$scope.search.criteria) {
                return $sce.trustAsHtml(text);
            }

            return $sce.trustAsHtml(text.replace(new RegExp($scope.search.criteria, 'gi'), '<span class="ui-match">$&</span>'));
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