var extend = require('node.extend');

var View = function (req, res, viewPath) {
    return {
        render: function (params) {

            var extendedParams = extend({
                user: req.user
            }, params || {}, req.flash('alert')[0] || {});

            res.render(viewPath, extendedParams);
        }
    };
};

module.exports = View;