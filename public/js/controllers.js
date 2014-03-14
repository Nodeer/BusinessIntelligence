'use strict';

var biControllers = angular.module('biControllers', []);

biControllers.controller('TaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        $scope.tasks = TaskFactory.query();
    }]);

biControllers.controller('ApplicationCtrl', ['$scope', 'UserFactory',
    ///<summary>Main application controller</summary>
    function ($scope, UserFactory) {
        $scope.user = UserFactory.get();

        $scope.getUserDisplayName = function() {
            ///<summary>Get display name</summary>
            if ($scope.user) {
                if ($scope.user.first_name || $scope.user.last_name) {
                    return ($scope.user.first_name || '') + ' ' + ($scope.user.last_name || '');
                }

                return $scope.user.username;
            }
            
            return '';
        };

        $scope.$on('user.updated', function(event, user) {
            $scope.user = user;
        });
    }]);

biControllers.controller('NavigationCtrl', ['$scope',
    ///<summary>Navigation bar controller [Depends on ApplicationCtrl]</summary>
    function ($scope) {
        $scope.navigationGroups = [
            {
                name: 'Traceability',
                items: [{
                    name: 'Impact',
                    path: '/',
                    icon: 'glyphicon glyphicon-sort-by-attributes',
                    description: 'Requirements traceability is concerned with documenting the life of a requirement and providing bi-directional traceability between various associated requirements.'
                }, {
                    name: 'Dependency',
                    path: '/',
                    icon: 'glyphicon glyphicon-sort-by-attributes-alt',
                    description: 'Traceability helps to identify the way a given requirement or process has been implemented in a system, enabling you to follow the path of dependencies from the initial request, through a modeled solution and up to the deployed physical system or process.'
                }]
            }
        ];
    }]);

biControllers.controller('ProfileCtrl', ['$scope',
    ///<summary>User profile controller [Depends on ApplicationCtrl]</summary>
    function ($scope) {
        $scope.submit = function() {
            ///<summary>Submits user profile</summary>
            
            $scope.user.$save(function(user) {
                $scope.$emit('user.updated', user);
            });
        };
    }]);