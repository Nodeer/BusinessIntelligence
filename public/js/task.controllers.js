var taskControllers = angular.module('task.controllers', [
    'task.services',
    'models'
]);

taskControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

taskControllers.controller('CreateUpdateTaskCtrl', ['$scope', 'TaskFactory', 'ConditionFactory', 'PartnersFactory', 'ConditionBuilder', '$window', '$modal',
    function ($scope, TaskFactory, ConditionFactory, PartnersFactory, ConditionBuilder, $window, $modal) {
        $scope.init = function(id) {
            $scope.task = {
                    availability: {
                        availability_type: 0,
                        partners: []
                    },
                    input: {
                        conditions: [],
                        createUpdateCondition: function(condition) {
                            var modalInstance = $modal.open({
                                templateUrl: '/task/condition/create/update',
                                controller: 'CreateUpdateInputConditionCtrl',
                                resolve: {
                                    condition: function () {
                                        return $.extend(true, {}, condition || {});
                                    }
                                }
                            });

                            modalInstance.result.then(function (resultCondition) {
                                if (condition) {
                                    $.extend(true, condition, resultCondition);
                                } else {
                                    var conditionModel = ConditionBuilder.build(resultCondition);
                                    $scope.task.input.conditions.push(conditionModel);
                                }
                            });
                        }
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
                                    $.extend(true, condition, {
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
                   $.extend(true, $scope.task, task);
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

taskControllers.controller('ViewTaskCtrl', ['$scope', 'TaskFactory',
    function ($scope, TaskFactory) {
        
        $scope.init = function(id) {
            return TaskFactory.get({
                id: id
            }, function(task) {
                $scope.task = task;
            });
        };
    }]);

taskControllers.controller('CreateUpdateInputConditionCtrl', ['$scope', 'ConditionsFactory', '$modalInstance', 'condition',
    function($scope, ConditionsFactory, $modalInstance, condition) {

        $scope.condition = $.extend(true, {
            condition_type: "Setting",
            setting: {
                name: '',
                level: 'Administrator',
                value: ''
            },
            description: '',
            ui: '',
            api: '',
            getValues: function(name, value, done) {
                return ConditionsFactory
                    .query({
                        name: name,
                        value: value
                    }).$promise.then(function(values) {
                        return Enumerable.from(values).select(function(settingValue) {
                            return settingValue.value;
                        }).toArray();
                    });
            },
        }, condition);

        $scope.condition.validate = function() {
            var condition = $scope.condition;

            var valid = condition.ui.length || condition.api.length;

            switch(condition.condition_type) {
            case "Setting":
                valid = valid && condition.setting.name.length &&
                    condition.setting.level.length &&
                    condition.setting.value.length;
                break;
            default:
                valid = valid && condition.description.length;
                break;
            }
            return valid;
        };

        $scope.submit = function () {
            $modalInstance.close($scope.condition);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);
