var logger = require('../logger').getLogger('routes/search'),
    route = require('./route'),
    extend = require('extend'),
    TaskService = require('../services/task'),
    Enumerable = require('linq');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/search/tasks.json/:criteria', route.private({ 'task': ['read'] }), exports.tasks);

    return this;
};

exports.tasks = function (req, res, next) {
    ///<summary>Search tasks</summary>

    var criteria = req.params.criteria;

    return new TaskService(req.user).searchTasks(criteria, function(task) {
        return task.toDto();
    }, function(err, tasks) {
        if (err) return next(err);

        return res.json(tasks);
    });
};