var taskControllers = angular.module('task.controllers', [
    'task.services',
    'models'
]);

taskControllers.controller('TaskCtrl', ['$scope', 'TasksFactory', 'DependencyFactory',
    function ($scope, TasksFactory, DependencyFactory, TaskSearchFactory) {
        $scope.getProducerTasks = function(condition) {
            if (!condition.producerTasks) {
                condition.producerTasks = [];
                if (condition.id) {
                    return DependencyFactory.query({
                        name: 'condition',
                        id: condition.id,
                        type: 'producerTasks'
                    }).$promise.then(function(tasks) {
                        condition.producerTasks = tasks;
                        condition.producerTasksLoaded = true;
                    });
                }
            }

            return condition.producerTasks;
        };

        $scope.getConsumerTasks = function(condition) {
            if (!condition.consumerTasks) {
                condition.consumerTasks = [];
                if (condition.id) {
                    return DependencyFactory.query({
                        name: 'condition',
                        id: condition.id,
                        type: 'consumerTasks'
                    }).$promise.then(function(tasks) {
                        condition.consumerTasks = tasks;
                        condition.consumerTasksLoaded = true;
                    });
                }
            }

            return condition.consumerTasks;
        };

        $scope.tasks = [];
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
                        copy: function(input) {
                            var copy = {
                                conditions: $.extend([], input.conditions)
                            };

                            return $scope.task.inputs.push(copy);
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

                                var conditions = $scope._getTaskConditions($scope.task);

                                condition = conditions.firstOrDefault(function(cond) {
                                    return cond.id === condition.id;
                                }) || condition;

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
                        copy: function(output) {
                            var copy = {
                                conditions: $.extend([], output.conditions)
                            };

                            return $scope.task.outputs.push(copy);
                        },
                        remove: function(output) {
                            var index = $scope.task.outputs.indexOf(output);
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

                                var conditions = $scope._getTaskConditions($scope.task);

                                condition = conditions.firstOrDefault(function(cond) {
                                    return cond.id === condition.id;
                                }) || condition;

                                return output.conditions.push(condition);
                            }

                            return $scope.task.$output.createUpdateCondition(output, condition);
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
                                var resultCondition = ConditionBuilder.build(resultCondition);
                                $.extend(true, condition, resultCondition);
                                condition.affects = $.extend(true, [], resultCondition.affects);
                            } else {
                                resultCondition.id = ObjectId();

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

                            var taskConditions = [];
                            $scope._iterateTaskConditions($scope.task, function(condition) {
                                taskConditions.push(condition);
                            });

                            var persistedConditions = Enumerable.from(conditions).select(function(condition) {
                                return ConditionBuilder.build(condition);
                            });

                            conditions = Enumerable.from(taskConditions).union(persistedConditions).distinct(function(condition) {
                                return condition.id;
                            }).where(function(condition) {
                                return condition.name.toLowerCase().indexOf(criteria.toLowerCase()) > -1;
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

                    var conditions = $scope._getTaskConditions($scope.task);

                    Enumerable.from($scope.task.inputs).forEach(function(input) {
                        input.conditions = conditions.intersect(input.conditions, function(condition) {
                            return condition.id;
                        }).toArray();
                    });

                    Enumerable.from($scope.task.outputs).forEach(function(output) {
                        output.conditions = conditions.intersect(output.conditions, function(condition) {
                            return condition.id;
                        }).toArray();
                    });
                });
            } else {
                $scope.task.$input.add();
                $scope.task.$output.add();
            }
        };

        $scope._iterateConditions = function(iConditionableCollection, iterator) {
            Enumerable.from(iConditionableCollection).forEach(function(iConditionable) {
                Enumerable.from(iConditionable.conditions).forEach(function(condition) {
                    iterator(condition);
                });
            });
        };

        $scope._iterateTaskConditions = function(task, iterator) {
            $scope._iterateConditions(task.inputs, iterator);
            $scope._iterateConditions(task.outputs, iterator);
        };

        $scope._getTaskConditions = function(task) {
            var conditions = [];

            $scope._iterateTaskConditions($scope.task, function(condition) {
                conditions.push(condition);
            });

            return Enumerable.from(conditions).distinct(function(condition) {
                return condition.id;
            });
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

        $scope.validate = function() {
            var task = $.extend({
                name: '',
                description: '',
                external_id: ''
            }, $scope.task);

            var valid = task.name.length &&
                task.description.length &&
                task.external_id.length;

            valid = valid && Enumerable.from(task.inputs).where(function(input) {
                return input.conditions.length;
            }).any();

            valid = valid && Enumerable.from(task.outputs).where(function(output) {
                return output.conditions.length;
            }).any();

            return valid;
        };

        $scope.submit = function() {
            $scope.saving = 1;
            TaskFactory.save($scope.task, function(task) {
                $scope.saving = 0;

                $window.location.href = sprintf('/task/view/%s', task.id);
            });
        };
    }]);

taskControllers.controller('ViewTaskCtrl', ['$scope', 'TaskFactory', '$modal',
    function ($scope, TaskFactory, $modal) {
        
        $scope.init = function(id) {
            return TaskFactory.get({
                id: id
            }, function(task) {
                $scope.task = task;
            });
        };

        $scope.viewCondition = function(condition, mode) {
            $modal.open({
                templateUrl: '/task/condition/view',
                controller: 'ViewConditionCtrl',
                resolve: {
                    condition: function() {
                        return condition;
                    },
                    mode: function() {
                        return mode;
                    }
                }
            });
        };
    }]);

taskControllers.controller('ViewConditionCtrl', ['$scope', '$modalInstance', 'condition', 'mode',
    function ($scope, $modalInstance, condition, mode) {

        $scope.condition = condition;

        $scope.mode = mode;

        $scope.close = function() {
            return $modalInstance.dismiss();
        };
    }]);

taskControllers.controller('CreateUpdateConditionCtrl', ['$scope', 'ConditionsFactory', '$modalInstance', 'condition', 'mode', 'TaskSearchFactory',
    function($scope, ConditionsFactory, $modalInstance, condition, mode, TaskSearchFactory) {
        $scope.condition = $.extend(true, {
            condition_type: "Setting",
            setting: {
                name: '',
                level: 'Administrator',
                value: ''
            },
            description: '',
            ui: {
                input: [],
                output: []
            },
            api: {
                input: [],
                output: []
            },
            affects: [],
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

        $scope.ui = {
            values: {
                select : function(name) {
                    return {
                        minimumInputLength: 3,
                        multiple: true,
                        query: function(query) {
                            return ConditionsFactory
                            .query({
                                name: name,
                                value: query.term
                            }, function(values) {
                                var results = Enumerable.from(values).union([
                                {
                                    value: query.term
                                }]).distinct(function(settingValue) {
                                    return settingValue.value;
                                }).select(function(settingValue) {
                                        return {
                                            id: settingValue.value,
                                            text: settingValue.value
                                        };
                                    }).toArray();
                                return query.callback({ results: results });
                            });
                        },
                        simple_tags: true
                    };
                }
            }
        };

        $scope.searchTasks = function(criteria) {
            if (criteria.length >= 3) {
                return TaskSearchFactory.query({
                    criteria: criteria
                }).$promise.then(function(tasks) {
                    return tasks;
                });
            }

            return [];
        };

        $scope.pushAffect = function(task) {
            $scope.condition.searchAffectTask = '';

            $scope.condition.affects.push({
                task: task
            });
        };

        $scope.removeAffect = function(affect) {
            var index = $scope.condition.affects.indexOf(affect);
            return $scope.condition.affects.splice(index, 1);
        };

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
