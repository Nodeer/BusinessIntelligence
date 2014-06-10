var View = require('../views/view'),
    logger = require('../logger').getLogger('routes/task'),
    route = require('./route'),
    extend = require('extend'),
    TaskService = require('../services/task'),
    ConditionService = require('../services/condition'),
    Enumerable = require('linq'),
    uuid = require('node-uuid');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/task/create', route.private({ 'task': ['create'] }), exports.create);
    app.get('/task/update/:id', route.private({ 'task': ['update'] }), exports.update);
    app.get('/task/view/:id', route.private({ 'task': ['read'] }), exports.view);

    app.get('/task/condition/create/update', route.private({ 'task': ['create'] }), exports.createUpdateCondition);
    app.get('/task/condition/view', route.private({ 'task': ['read'] }), exports.viewCondition);

    app.get('/task/task.json/:id', route.private({ 'task': ['read'] }), exports.getTask);
    app.post('/task/task.json', route.private({ 'task': ['create'] }), exports.saveTask);

    app.get('/task/condition.json/:id', route.private({ 'task': ['read']}), exports.getConditionById);

    app.get('/task/partners.json/:name', route.private({ 'task': ['read']}), exports.getPartners);

    app.get('/task/conditions.json/:name', route.private({ 'task': ['read']}), exports.getConditionsByName);
    app.get('/task/conditions.json/:name/:value', route.private({ 'task': ['read']}), exports.getConditionValues);

    app.get('/task/dependency.json/condition/:id/producerTasks', route.private({ 'task': ['read']}), exports.getProducerTasksByCondition);
    app.get('/task/dependency.json/condition/:id/consumerTasks', route.private({ 'task': ['read']}), exports.getConsumerTasksByCondition);

    app.get('/task/all', route.private({ 'task': ['read']}), exports.viewTasks);
    app.get('/task/getTasks.json', route.private({ 'task': ['read']}), exports.getTasks);

    return this;
};

exports.create = function (req, res, next) {
    ///<summary>New task view</summary>

    var view = new View('task/create_update');
    return view.render(req, res, next, {
        title: "Task | New",
        id: ''
    });
};

exports.update = function (req, res, next) {
    ///<summary>New task view</summary>

    var view = new View('task/create_update');
    return view.render(req, res, next, {
        title: "Task | Update",
        id: req.params.id
    });
};

exports.view = function (req, res, next) {
    ///<summary>View task</summary>

    var view = new View('task/view');
    return view.render(req, res, next, {
        title: "Task | View",
        id: req.params.id
    });
};

exports.viewTasks = function (req, res, next) {
    ///<summary>View all tasks</summary>
    
    var view = new View('task/all');
    return view.render(req, res, next, {
        title: "Task | All"
    });
};

exports.createUpdateCondition = function (req, res, next) {
    var view = new View('task/condition/create_update');
    return view.render(req, res, next, {
        title: "Task | Add Condition",
    });
};

exports.viewCondition = function(req, res, next) {
    var view = new View('task/condition/view');
    return view.render(req, res, next, {
        title: "Task | View Condition"
    });
};

exports.getTask = function (req, res, next) {
    ///<summary>Gets task by id</summary>
    
    var id = req.params.id;

    return new TaskService(req.user).getTaskById(id, function(err, task) {
        if (err) return next(err);

        return res.json(task);
    });
};

exports.getTasks = function (req, res, next) {

    var taskCriteria = {};

    return new TaskService(req.user).findTasks(taskCriteria, function(task) {
        var taskDto = task.toDto();
        taskDto.audit = task.audit;
        return taskDto;
    }, function(err, tasks) {
        if (err) return next(err);

        return res.json(tasks);
    });
};

exports.saveTask = function (req, res, next) {
    var taskDto = req.body;

    return new TaskService(req.user).saveTask(taskDto, function(err, task) {
        if (err) return next(err);

        return res.json(task);
    });
};

exports.getConditionById = function (req, res, next) {
    ///<summary>Loads a condition by id</summary>

    return new ConditionService(req.user).getById(req.params.id, function(condition) {
        return condition.toDto();
    }, function(err, condition) {
        if (err) return next(err);

        return res.json(condition);
    });
};

exports.getPartners = function (req, res, next) {
    ///<summary>Loads list of partners</summary>

    return new TaskService(req.user).findPartnersByName(req.params.name, function(partner) {
        return {
                id: partner,
                text: partner
            };
    }, function(err, partners) {
        if (err) return next(err);

        partners.splice(0, 0, {
            id: req.params.name,
            text: req.params.name
        });

        return res.json(Enumerable.from(partners).distinct(function(partner) {
            return partner.id;
        }).toArray());
    });
};

exports.getConditionsByName = function (req, res, next) {

    return new ConditionService(req.user).findConditionsByName(req.params.name, function(condition) {
        return condition.toDto();
    }, function(err, conditions) {
        if (err) return next(err);

        return res.json(conditions);
    });
};

exports.getConditionValues = function (req, res, next) {

    return new ConditionService(req.user).findValues(req.params.name, req.params.value, function(value) {
        return {
            value: value
        };
    }, function(err, values) {
        if (err) return next(err);

        return res.json(values);
    });
};

exports.getProducerTasksByCondition = function (req, res, next) {

    return new TaskService(req.user).findProducerTasksByCondition(req.params.id, function(task) {
        return task.toDto();
    }, function(err, tasks) {
        if (err) return next(err);

        return res.json(tasks);
    });
};

exports.getConsumerTasksByCondition = function (req, res, next) {

    return new TaskService(req.user).findConsumerTasksByCondition(req.params.id, function(task) {
        return task.toDto();
    }, function(err, tasks) {
        if (err) return next(err);

        return res.json(tasks);
    });
};