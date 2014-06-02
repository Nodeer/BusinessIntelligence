var taskControllers = angular.module('task.controllers', [
    'task.services',
    'models'
]);

taskControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

taskControllers.controller('CreateUpdateTaskCtrl', ['$scope', 'TaskFactory', 'ConditionsFactory', 'PartnersFactory', 'ConditionBuilder', 'DependencyFactory', '$window', '$modal',
    function ($scope, TaskFactory, ConditionsFactory, PartnersFactory, ConditionBuilder, DependencyFactory, $window, $modal) {
        $scope.init = function(id) {
            $scope.task = {
                    availability: {
                        availability_type: 0,
                        partners: []
                    },
                    inputs: [],
                    $input: {
                        add: function() {
                            return $scope.task.inputs.push({
                                conditions: []
                            });
                        },
                        remove: function(input) {
                            var index = $scope.task.inputs.indexOf(input);
                            return $scope.task.inputs.splice(index, 1);
                        },
                        createUpdateCondition: function(input, condition) {
                            return $scope.task.createUpdateCondition(input, condition, {
                                    input: 1
                                });
                        },
                        pushCondition: function(input, condition) {
                            input.findConditionCriteria = '';

                            if (condition.id) {
                                return input.conditions.push(condition);
                            }

                            return $scope.task.$input.createUpdateCondition(input, condition);
                        },
                    },
                    outputs: [],
                    $output: {
                        add: function() {
                            return $scope.task.outputs.push({
                                conditions: []
                            });
                        },
                        remove: function(input) {
                            var index = $scope.task.outputs.indexOf(input);
                            return $scope.task.outputs.splice(index, 1);
                        },
                        createUpdateCondition: function(output, condition) {
                            return $scope.task.createUpdateCondition(output, condition, {
                                    output: 1
                                });
                        },
                        pushCondition: function(output, condition) {
                            output.findConditionCriteria = '';

                            if (condition.id) {
                                return output.conditions.push(condition);
                            }

                            return $scope.task.$output.createUpdateCondition(output, condition);
                        }
                    },
                    $condition: {
                        getGeneratedByTasks: function(condition) {
                            if (!condition.generatedByTasks) {
                                condition.generatedByTasks = [];
                                if (condition.id) {
                                    return DependencyFactory.query({
                                        name: 'condition',
                                        id: condition.id,
                                        type: 'generatedByTasks'
                                    }).$promise.then(function(tasks) {
                                        condition.generatedByTasks = tasks;
                                    });
                                }
                            }

                            return condition.generatedByTasks;
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
                            if (condition.id) {
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
                            conditions = Enumerable.from(conditions).select(function(condition) {
                                return ConditionBuilder.build(condition);
                            }).toArray();
                            conditions.push({
                                name: sprintf('Create new Condition "%s"', criteria),
                                preferred_name: criteria
                            });
                            return conditions;
                        });
                    }
                };

            if (id) {
                TaskFactory.get({
                    id: id
                }, function(task) {
                   $.extend(true, $scope.task, task);
                });
            } else {
                $scope.task.$input.add();
                $scope.task.$output.add();
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

        $scope.viewTask = function(task) {
            var modalInstance = $modal.open({
                templateUrl: sprintf('/task/view/%s/popup', task.id),
                controller: 'ViewTaskPopupCtrl',
                size: 'lg',
                resolve: function() {}
            });

            modalInstance.result.then(function (resultCondition) {
            });
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

taskControllers.controller('ViewTaskPopupCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

        $scope.close = function () {
            return $modalInstance.dismiss();
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
        }, {
            setting: {
                name: condition.preferred_name
            },
            description: condition.preferred_name
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
