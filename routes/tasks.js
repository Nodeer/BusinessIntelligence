exports.register = function (app, passport) {

    var auth = require('../services/auth');

    app.get('/tasks.json', auth.authenticate, this.tasksJson);
    app.get('/tasks/:taskId.json', auth.authenticate, this.tasksJson);
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