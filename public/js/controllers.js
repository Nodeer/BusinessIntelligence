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

        $scope.trimText = function(text, length) {
            text = text || '';
            if (text.length > length) {
                return sprintf('%s..', text.substring(0, length));
            }

            return text;
        };

        $scope.alphaOrder = function(collection, item) {
            return String.fromCharCode(65 + collection.indexOf(item));
        };
    }]);

controllers.controller('NavbarCtrl', ['$scope', '$window', 'Application', 'MetricsFactory',
    ///<summary>Navigation controller</summary>
    function ($scope, $window, Application, MetricsFactory) {
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

            var allTasks = {
                id: 'AllTasks',
                name: 'ALL TASKS',
                type: 'button',
                path: '/task/all'
            };

            $scope.navigation.groups.push(allTasks);

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

            if (user.id) {
                MetricsFactory.tasks.get({}, function(metrics) {
                    if (metrics.newly_added_tasks_count) {
                        allTasks.badge = {
                            text: metrics.newly_added_tasks_count
                        };
                    }
                });
            }

            $('li.dropdown').click(function() {
                $(this).removeClass('open');
            });
        });

        $scope.signin = function() {
            
        };

        $scope.signup = function() {
            
        };

        $scope.signout = function() {
        };

        $scope.isActive = function (viewLocation) {
            return $window.location.pathname.indexOf(viewLocation) > -1;
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