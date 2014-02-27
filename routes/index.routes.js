var View = require('../views/view');

exports.register = function (app, passport) {
    app.get('/', this.index);
};

exports.index = function (req, res) {
    var view = new View(req, res, 'home/index');
    view.render();
};