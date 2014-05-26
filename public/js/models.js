angular.module('models', []).

factory('ConditionBuilder', [
    function () {
        return {
            build: function(condition) {
                var name;
                switch(condition.condition_type) {
                case "Setting":
                    name = sprintf('%s = %s', condition.setting.name, condition.setting.value);
                    break;
                default:
                    name = sprintf('%s', condition.description);
                    break;
                }

                return angular.extend({}, condition, {
                    name: name
                });
            }
        };
    }]);

