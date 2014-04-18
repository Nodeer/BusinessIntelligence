var View = require('../views/view'),
    logger = require('../logger'),
    route = require('./route'),
    extend = require('extend');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/task/new', route.private({ 'task': ['create'] }), exports.new);

    return this;
};

exports.new = function (req, res) {
    ///<summary>New task view</summary>

    var view = new View('task/new');
    return view.render(req, res, {
        title: "Tasks | New"
    });
};