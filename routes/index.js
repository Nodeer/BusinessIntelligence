var $View = require('../services/view');

exports.register = function (app, passport) {
    app.get('/', this.index);
};

exports.index = function (req, res) {
    var view = new $View('home/index');
    view.render(req, res, {});
};