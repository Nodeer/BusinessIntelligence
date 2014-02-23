exports.list = function (req, res) {
    var db = require('../public/js/db');
    db.procedure('usp_SelectTasks', [
        {
            name: 'name',
            type: 'VarChar',
            value: 'Renewal Processor'
        }], function (recordset) {
            res.json(recordset);
        });
};