var controllers = angular.module('controllers', ['search.services']);

controllers.controller('TaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        $scope.tasks = TaskFactory.query();
    }]);

controllers.controller('ApplicationCtrl', ['$scope', 'UserFactory',
    ///<summary>Main application controller</summary>
    function ($scope, UserFactory) {
        UserFactory.then(function(user) {
            $scope.user = user;
        });

        $scope.getUserDisplayName = function() {
            ///<summary>Get display name</summary>
            if ($scope.user) {
                if ($scope.user.first_name || $scope.user.last_name) {
                    return ($scope.user.first_name || '') + ' ' + ($scope.user.last_name || '');
                }

                return $scope.user.email;
            }
            
            return '';
        };

        $scope.$on('user.updated', function(event, user) {
            $scope.user = user;
        });
    }]);

controllers.controller('NavbarCtrl', ['$scope', '$window', 'UserFactory',
    ///<summary>Navigation controller</summary>
    function ($scope, $window, UserFactory) {

        $scope.navigation = {
            groups: []
        };

        UserFactory.then(function(user) {
            if (user.access.taskCreate) {
                $scope.navigation.groups.push({
                    name: 'New Task',
                    type: 'button',
                    icon: 'glyphicon glyphicon-plus',
                    path: '/task/create'
                });
            }

            if (user.access.manageUsers) {
                $scope.navigation.groups.push({
                    name: 'Management',
                    icon: 'glyphicon glyphicon-cog',
                    type: 'dropdown',
                    path: '/management',
                    items: [{
                        name: 'Users',
                        path: '/management/users',
                        icon: 'glyphicon glyphicon-user'
                    }]
                });
            }

            $scope.navigation.groups.push({
                name: 'About',
                type: 'button',
                icon: 'glyphicon glyphicon-question-sign',
                path: '/about'
            });
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