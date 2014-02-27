var auth_service = require('../services/auth.service');

exports.register = function (app, passport) {
    app.get('/tasks.json', auth_service.authenticate, this.tasksJson);
    app.get('/tasks/:taskId.json', auth_service.authenticate, this.tasksJson);
};

exports.tasksJson = function (req, res, next) {
    if (req.params.taskId) {
    } else {
        var db = require('../repository/db');
        db.procedure('usp_GetTasks', [], function (recordset) {
            res.json(recordset[0]);
        });
    }
};