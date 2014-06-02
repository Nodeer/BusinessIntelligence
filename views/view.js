var extend = require('extend'),
    UserService = require('../services/user');

var klass = require('klass');

module.exports = klass(function (viewPath) {
        this.viewPath = viewPath;
    })
    .methods({
        render: function (req, res, next, params) {
            ///<summary>Renders view</summary>
            ///<param name="params">Parameters</param>
            
            var extendedParams = extend({
            }, params || {}, req.flash('alert')[0] || {}, {
                id: (params || {}).id || ''
            });

            if (req.user) {
                extend(extendedParams, {
                    user: JSON.stringify(req.user.toDto())
                });
            }

            res.render(this.viewPath, extendedParams);
        }
    });
