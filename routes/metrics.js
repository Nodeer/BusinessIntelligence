var logger = require('../logger').getLogger('routes/metrics'),
    route = require('./route'),
    extend = require('extend'),
    TaskService = require('../services/task'),
    Enumerable = require('linq');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/metrics/tasks.json', route.private({ 'task': ['read'] }), exports.tasks);

    return this;
};

exports.tasks = function (req, res, next) {
    return new TaskService(req.user).calculateMetrics(function(err, metrics) {
        if (err) return next(err);

        return res.json(metrics);
    });
};