var View = require('../views/view'),
    logger = require('../logger'),
    route = require('./route'),
    extend = require('extend');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/task/new', route.private({ 'task': ['create'] }), exports.new);
    app.get('/task/condition.json', route.private({ 'task': ['read']}), exports.getCondition);
    app.get('/task/dependency.json', route.private({ 'task': ['read']}), exports.getDependency);

    return this;
};

exports.new = function (req, res) {
    ///<summary>New task view</summary>

    var view = new View('task/new');
    return view.render(req, res, {
        title: "Tasks | New"
    });
};

exports.getDependency = function (req, res) {
    ///<summary>Loads list of dependencies</summary>
    
    var params = req.query;
    return res.json([{
        id: 0,
        text: params.term
    }, {
        id: 1,
        text: 'blablabla'
    }]);
};

exports.getCondition = function (req, res) {
    ///<summary>Loads list of dependencies</summary>
    
    var params = req.query;
    return res.json([{
        id: 0,
        text: params.term
    }, {
        id: 1,
        text: 'blablabla'
    }]);
};