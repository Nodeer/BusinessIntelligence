var View = function (viewPath) {
    var self = this;
    self.viewPath = viewPath;

    return {
        render: function (req, res, params) {

            var extend = require('node.extend');

            res.render(self.viewPath, extend({
                user: req.user
            }, params));
        }
    };
};

module.exports = View;