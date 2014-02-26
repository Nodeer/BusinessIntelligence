var $extend = require('node.extend');

var User = function (prototype) {
    var self = $extend({
        getDisplayName: function () {
            return self.Username;
        }
    }, prototype || {});

    return self;
};

module.exports = User;