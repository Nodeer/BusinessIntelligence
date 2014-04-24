var View = require('../views/view'),
    logger = require('../logger').getLogger('routes/task'),
    route = require('./route'),
    extend = require('extend'),
    TaskService = require('../services/task'),
    Enumerable = require('linq'),
    uuid = require('node-uuid');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/task/new', route.private({ 'task': ['create'] }), exports.new);
    app.post('/task/task.json', route.private({ 'task': ['create'] }), exports.createTask);

    app.get('/task/conditions/:id.json', route.private({ 'task': ['read']}), exports.getConditionById);
    app.get('/task/conditions.json', route.private({ 'task': ['read']}), exports.getConditions);

    app.get('/task/partners.json', route.private({ 'task': ['read']}), exports.getPartners);

    app.get('/task/dependencies.json', route.private({ 'task': ['read']}), exports.getDependencies);

    return this;
};

exports.new = function (req, res) {
    ///<summary>New task view</summary>

    var view = new View('task/new');
    return view.render(req, res, {
        title: "Tasks | New"
    });
};

exports.createTask = function (req, res) {
    var task = req.body;

    return res.json(task);
};

exports.getConditionById = function (req, res) {
    ///<summary>Loads a condition by id</summary>

    return new TaskService().getConditionById(req.params.id, function(condition, tasks) {
        return {
                id: condition._id,
                text: condition.name,
                ui: condition.ui,
                api: condition.api,
                dependencies: Enumerable.from(tasks).select(function(task) {
                    return {
                        id: task._id,
                        text: task.name
                    };
                }).toArray()
            };
    }, function(err, condition) {
        if (err) {
            logger.error(err);

            return res.send(500);
        }

        return res.json(condition);
    });
};

exports.getConditions = function (req, res) {
    ///<summary>Loads list of conditions</summary>
    
    var params = req.query;

    return new TaskService().findConditionsByName(params.term, function(condition) {
        return {
                id: condition._id,
                text: condition.name
            };
    }, function(err, conditions) {
        if (err) {
            logger.error(err);

            return res.send(500);
        }

        conditions.push({
            id: uuid.v4(),
            text: params.term
        });

        return res.json(conditions);
    });
};

exports.getPartners = function (req, res) {
    ///<summary>Loads list of partners</summary>
    
    var params = req.query;

    var conditions = [];
    conditions.push({
            id: uuid.v4(),
            text: params.term
        });

    return res.json(conditions);
};

exports.getDependencies = function (req, res) {
    ///<summary>Loads list of dependencies</summary>
    
    var params = req.query;

    return new TaskService().findTasksByName(params.term, function(task) {
        return {
                id: task._id,
                text: task.name
            };
    }, function(err, tasks) {
        if (err) {
            logger.error(err);

            return res.send(500);
        }

        return res.json(tasks);
    });
};