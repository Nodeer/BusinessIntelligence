var extend = require('node.extend');

var View = function (viewPath) {
    var self = this;
    self.viewPath = viewPath;

    return {
        render: function (req, res, params) {
            console.log('viewparams');
            var extendedParams = extend({
                user: req.user
            }, params, req.flash('alert')[0] || {});
            console.dir(params);
            console.dir(extendedParams);
            res.render(self.viewPath, extendedParams);
        }
    };
};

module.exports = View;