var taskControllers = angular.module('task.controllers', [
    'task.services'
]);

taskControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

taskControllers.controller('CreateUpdateTaskCtrl', ['$scope', 'TaskFactory', 'ConditionFactory', 'PartnersFactory', '$window', '$modal',
    function ($scope, TaskFactory, ConditionFactory, PartnersFactory, $window, $modal) {
        $scope.init = function(id) {
            $scope.task = {
                    availability: {
                        availability_type: 0,
                        partners: []
                    },
                    input: {
                        conditions: [],
                        addCondition: function() {
                            var modalInstance = $modal.open({
                                templateUrl: '/task/input/create',
                                controller: 'CreateUpdateInputConditionCtrl',
                                resolve: {
                                    condition: function () {
                                        return {};
                                    }
                                }
                            });

                            modalInstance.result.then(function (selectedItem) {
                                alert(selectedItem);
                            });
                        },
                    },
                    output: {
                        conditions: [],
                        addCondition: function() {
                            alert('output');
                        },
                    },
                    addCondition: function(condition, conditions) {
                        if (conditions[conditions.length-1].id) {
                            conditions.push({});
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
                };

            if (id) {
                TaskFactory.get({
                    id: id
                }, function(task) {
                    angular.extend($scope.task, task);
                });
            }
        };

        $scope.ui = {
            availability: {
                partners: {
                    select : {
                        minimumInputLength: 3,
                        multiple: true,
                        query: function(query) {
                            return PartnersFactory.query({
                                    name: query.term
                            }, function(partners) {
                                return query.callback({ results: partners });
                            });
                        },
                        simple_tags: true
                    }
                }
            },
            input_output: {
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
                }
            },
            input: {
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
            $scope.saving = 1;
            TaskFactory.save($scope.task, function(task) {
                $scope.saving = 0;

                $window.location.href = sprintf('/task/view/%s', task.id);
            });
        };
    }]);

taskControllers.controller('ViewTaskCtrl', ['$scope', 'TaskFactory', 'ConditionFactory', 'PartnersFactory', '$location',
    function ($scope, TaskFactory, ConditionFactory, PartnersFactory, $location) {
        
        $scope.init = function(id) {
            return TaskFactory.get({
                id: id
            }, function(task) {
                $scope.task = task;
            });
        };
    }]);

taskControllers.controller('CreateUpdateInputConditionCtrl', ['$scope', 'SettingNamesFactory', '$modalInstance', 'condition',
    function($scope, SettingNamesFactory, $modalInstance, condition) {

        $scope.condition = angular.extend({
            type: "Setting",
            setting: {
                value: '',
                getSettingNames: function(value) {
                    return SettingNamesFactory
                        .query({
                            name: value
                        }).$promise.then(function(settingNames) {
                            return Enumerable.from(settingNames).select(function(settingName) {
                                return settingName.name;
                            }).toArray();
                        });
                }
            }
        }, condition);

        $scope.condition.validate = function() {
            return $scope.condition.ui || $scope.condition.api;
        };

        $scope.submit = function () {
            $modalInstance.close('closed');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);
