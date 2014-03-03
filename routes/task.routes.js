var auth_service = require('../services/auth.service');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

   // app.get('/tasks.json', auth_service.authenticate, this.tasksJson);
   // app.get('/tasks/:taskId.json', auth_service.authenticate, this.tasksJson);

    return this;
};

exports.tasksJson = function (req, res, next) {
    if (req.params.taskId) {
    } else {
        res.json({});
    }
};