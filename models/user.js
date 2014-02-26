var $extend = require('node.extend');

var User = function (prototype) {
    return $extend({
    }, prototype || {});
};

module.exports = User;