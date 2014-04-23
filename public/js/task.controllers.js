var taskControllers = angular.module('task.controllers', [
    'task.services'
]);

managementControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

managementControllers.controller('NewTaskCtrl', ['$scope', 'TaskFactory', 'ConditionFactory', '$http',
    function ($scope, TaskFactory, ConditionFactory, $http) {
        $scope.task = {
            availability: 0,
            input: {
                conditions: [{}],
                addCondition: function(condition) {
                    var conditions = $scope.task.input.conditions;
                    if (conditions[conditions.length-1].id) {
                        $scope.task.input.conditions.push({});
                    }

                    if (condition.id > 0) {
                        ConditionFactory.get({
                            id: condition.id
                        }).success(function(persistedCondition) {
                            if (persistedCondition) {
                                condition.persisted = 1;
                                angular.extend(condition, {
                                    persisted: 1,
                                    ui: persistedCondition.ui,
                                    api: persistedCondition.api,
                                    dependencies: persistedCondition.dependencies
                                });
                            }
                        });
                    }
                }
            }
        };

        $scope.ui = {
            input: {
                condition: {
                    select : {
                        minimumInputLength: 3,
                        ajax: {
                            url: '/task/conditions.json',
                            data: function (term) {
                                return {
                                    term: term
                                };
                            },
                            results: function (data) {
                                return { results: data };
                            }
                        },
                        initSelection: function (element, callback) {
                        
                        }
                    }
                },
                ui: {
                    select : {
                        minimumInputLength: 3,
                        ajax: {
                            url: '/task/conditions.json',
                            data: function (term) {
                                return {
                                    term: term
                                };
                            },
                            results: function (data) {
                                return { results: data };
                            }
                        },
                        initSelection: function (element, callback) {
                        
                        }
                    }
                },
                api: {
                    select : {
                        minimumInputLength: 3,
                        ajax: {
                            url: '/task/conditions.json',
                            data: function (term) {
                                return {
                                    term: term
                                };
                            },
                            results: function (data) {
                                return { results: data };
                            }
                        },
                        initSelection: function (element, callback) {
                        
                        }
                    }
                },
                dependency: {
                    select : {
                        minimumInputLength: 3,
                        ajax: {
                            url: '/task/dependencies.json',
                            data: function (term) {
                                return {
                                    term: term
                                };
                            },
                            results: function (data) {
                                return { results: data };
                            }
                        },
                        initSelection: function (element, callback) {
                        
                        }
                    }
                }
            }
        };

        $scope.submit = function() {
            console.log('submit');
            TaskFactory.save($scope.task, function(task) {
                console.log('saved');
                console.log('task.id=' + (task.id || task._id));
            });
        };
    }]);
