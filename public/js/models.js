angular.module('models', []).

factory('ConditionBuilder', [
    function () {
        return {
            build: function(condition) {
                return angular.extend({}, condition, {
                    getDisplayName: function() {
                        switch(this.condition_type) {
                        case "Setting":
                            return sprintf('%s = %s', this.setting.name, this.setting.value);
                        default:
                            return sprintf('%s', this.description);
                        }
                    }
                });
            }
        };
    }]);

