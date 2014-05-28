var taskControllers = angular.module('task.controllers', [
    'task.services',
    'models'
]);

taskControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

taskControllers.controller('CreateUpdateTaskCtrl', ['$scope', 'TaskFactory', 'ConditionsFactory', 'PartnersFactory', 'ConditionBuilder', '$window', '$modal',
    function ($scope, TaskFactory, ConditionsFactory, PartnersFactory, ConditionBuilder, $window, $modal) {
        $scope.init = function(id) {
            $scope.task = {
                    availability: {
                        availability_type: 0,
                        partners: []
                    },
                    input: {
                        conditions: [],
                        createUpdateCondition: function(condition) {
                            return $scope.task.createUpdateCondition($scope.task.input, condition, {
                                    input: 1
                                });
                        },
                        pushCondition: function(condition) {
                            $scope.task.input.findConditionCriteria = '';

                            if (condition.id) {
                                return $scope.task.input.conditions.push(ConditionBuilder.build(condition));
                            }

                            return $scope.task.input.createUpdateCondition();
                        },
                    },
                    output: {
                        conditions: [],
                        createUpdateCondition: function(condition) {
                            return $scope.task.createUpdateCondition($scope.task.output, condition, {
                                    output: 1
                                });
                        },
                        pushCondition: function(condition) {
                            $scope.task.output.findConditionCriteria = '';

                            if (condition.id) {
                                return $scope.task.output.conditions.push(ConditionBuilder.build(condition));
                            }

                            return $scope.task.output.createUpdateCondition();
                        }
                    },
                    createUpdateCondition: function(scope, condition, mode) {
                        var modalInstance = $modal.open({
                            templateUrl: '/task/condition/create/update',
                            controller: 'CreateUpdateConditionCtrl',
                            resolve: {
                                condition: function () {
                                    return $.extend(true, {}, condition || {});
                                },
                                mode: function() {
                                    return mode;
                                }
                            }
                        });

                        modalInstance.result.then(function (resultCondition) {
                            if (condition) {
                                return $.extend(true, condition, ConditionBuilder.build(resultCondition));
                            } else {
                                return scope.conditions.push(ConditionBuilder.build(resultCondition));
                            }
                        });
                    },
                    removeCondition: function(collection, condition) {
                        var index = collection.indexOf(condition);
                        collection.splice(index, 1);
                    },
                    findCondition: function(criteria) {
                        return ConditionsFactory
                        .query({
                            name: criteria
                        }).$promise.then(function(conditions) {
                            var conditions = Enumerable.from(conditions).select(function(condition) {
                                return ConditionBuilder.build(condition);
                            }).toArray();
                            conditions.push({
                                name: '* Create a new one'
                            });
                            return conditions;
                        });
                    }
                };

            if (id) {
                TaskFactory.get({
                    id: id
                }, function(task) {
                   $.extend(true, $scope.task, task, {
                       input: {
                           conditions: Enumerable.from(task.input.conditions).select(function(condition) {
                               return ConditionBuilder.build(condition);
                           }).toArray()
                       },
                       output: {
                           conditions: Enumerable.from(task.output.conditions).select(function(condition) {
                               return ConditionBuilder.build(condition);
                           }).toArray()
                       }
                   });
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

taskControllers.controller('CreateUpdateConditionCtrl', ['$scope', 'ConditionsFactory', '$modalInstance', 'condition', 'mode',
    function($scope, ConditionsFactory, $modalInstance, condition, mode) {

        $scope.condition = $.extend(true, {
            condition_type: "Setting",
            setting: {
                name: '',
                level: 'Administrator',
                value: ''
            },
            description: '',
            ui: {
                input: '',
                output: ''
            },
            api: {
                input: '',
                output: ''
            },
            getValues: function(name, value) {
                if (value) {
                    return ConditionsFactory
                        .query({
                            name: name,
                            value: value
                        }).$promise.then(function(values) {
                            return Enumerable.from(values).select(function(settingValue) {
                                return settingValue.value;
                            }).toArray();
                        });
                } else {
                    return [];
                }
            },
        }, condition);

        $scope.mode = mode;

        $scope.condition.validate = function() {
            var condition = $scope.condition;

            var valid = false;

            if ($scope.mode.input) {
                valid = condition.ui.input.length || condition.api.input.length;
            } else if ($scope.mode.output) {
                valid = condition.ui.output.length || condition.api.output.length;
            }

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
