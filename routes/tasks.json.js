exports.tasks = function (req, res) {
    var db = require('../public/js/db');
    db.procedure('usp_GetTasks', [], function (recordset) {
            res.json(recordset[0]);
        });
};

exports.task = function (req, res) {
    var taskId = req.params.taskId;
};