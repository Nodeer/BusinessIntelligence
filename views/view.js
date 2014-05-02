var extend = require('extend');

var klass = require('klass');

module.exports = klass(function (viewPath) {
        this.viewPath = viewPath;
    })
    .methods({
        render: function (req, res, params) {
            ///<summary>Renders view</summary>
            ///<param name="params">Parameters</param>
            
            var extendedParams = extend({
                user: (req.user || { id: '' }).id,
            }, params || {}, req.flash('alert')[0] || {});

            res.render(this.viewPath, extendedParams);
        }
    });