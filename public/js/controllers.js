var controllers = angular.module('controllers', ['search.services']);

controllers.controller('TaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        $scope.tasks = TaskFactory.query();
    }]);

controllers.controller('ApplicationCtrl', ['$scope', 'Application',
    ///<summary>Main application controller</summary>
    function ($scope, Application) {
        Application.then(function(user) {
            $scope.user = user;

            $scope.$on('user.updated', function(event, user) {
                $scope.user = user;
            });
        });
    }]);

controllers.controller('NavbarCtrl', ['$scope', '$window', 'Application',
    ///<summary>Navigation controller</summary>
    function ($scope, $window, Application) {
        Application.then(function(user) {
            $scope.navigation = {
                groups: []
            };

            if (user.access.taskCreate) {
                $scope.navigation.groups.push({
                    id: 'NewTask',
                    name: 'NEW TASK',
                    type: 'button',
                    icon: 'glyphicon glyphicon-plus',
                    path: '/task/create'
                });
            }

            if (user.access.manageUsers) {
                $scope.navigation.groups.push({
                    name: 'MANAGEMENT',
                    icon: 'glyphicon glyphicon-cog',
                    type: 'dropdown',
                    path: '/management',
                    items: [{
                        name: 'USERS',
                        path: '/management/users',
                        icon: 'glyphicon glyphicon-user'
                    }]
                });
            }
        });

        $scope.signin = function() {
            
        };

        $scope.signup = function() {
            
        };

        $scope.signout = function() {
        };

        $scope.isActive = function (viewLocation) {
            return $window.location.pathname.contains(viewLocation);
        };
    }]);

controllers.controller('ProfileCtrl', ['$scope', 'ProfileFactory',
    ///<summary>User profile controller [Depends on ApplicationCtrl]</summary>
    function ($scope, ProfileFactory) {
        $scope.submit = function() {
            ///<summary>Submits user profile</summary>
            
            $scope.saving = 1;

            ProfileFactory.save($scope.user, function(user) {
                $scope.$emit('user.updated', user);

                $scope.saving = 0;
            });
        };
    }]);