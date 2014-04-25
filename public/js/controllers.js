var controllers = angular.module('controllers', []);

controllers.controller('TaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        $scope.tasks = TaskFactory.query();
    }]);

controllers.controller('ApplicationCtrl', ['$scope', '$http', 'UserFactory',
    ///<summary>Main application controller</summary>
    function ($scope, $http, UserFactory) {
        $scope.user = UserFactory.get();

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

controllers.controller('NavbarCtrl', ['$scope', '$http',
    ///<summary>Navigation controller</summary>
    function ($scope, $http) {
        $scope.navigation = {
            groups: [
                {
                    name: 'NEW TASK',
                    type: 'button',
                    icon: 'glyphicon glyphicon-plus',
                    path: '/task/new'
                }
            ],
            activeGroupName: sessionStorage.activeGroupName
        };

        $http.get('/user/access.json').success(function(access) {
            if (access.manageUsers.granted) {
                $scope.navigation.groups.push({
                    name: 'Management',
                    icon: 'glyphicon glyphicon-cog',
                    type: 'dropdown',
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
            sessionStorage.activeGroupName = '';
        };

        $scope.setNavigation = function(groupName) {
            sessionStorage.activeGroupName = groupName;
        };
    }]);

controllers.controller('ProfileCtrl', ['$scope',
    ///<summary>User profile controller [Depends on ApplicationCtrl]</summary>
    function ($scope) {
        $scope.submit = function() {
            ///<summary>Submits user profile</summary>
            
            $scope.working = 1;

            $scope.user.$save(function(user) {
                $scope.$emit('user.updated', user);

                $scope.working = 0;
            });
        };
    }]);