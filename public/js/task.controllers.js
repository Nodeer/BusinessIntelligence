var taskControllers = angular.module('task.controllers', [
    'task.services'
]);

managementControllers.controller('TaskCtrl', ['$scope',
    function ($scope) {
    }]);

managementControllers.controller('NewTaskCtrl', ['$scope',
    function ($scope) {
        $scope.task = {
            availability: 0,
            input: {
                conditions: [{}],
                addCondition: function() {
                    var conditions = $scope.task.input.conditions;
                    if (conditions[conditions.length-1].condition) {
                        $scope.task.input.conditions.push({});
                    }
                }
            }
        };

        $scope.ui = {
            condition: {
                select : {
                    minimumInputLength: 3,
                    ajax: {
                        url: '/task/condition.json',
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
                        url: '/task/dependency.json',
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
        };
    }]);
