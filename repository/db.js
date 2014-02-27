var sql = require('mssql');
var config = require('../config');

exports.procedure = function (name, params, successFunc, errorFunc) {
    ///<summary>Executes procedures</summary>
    ///<param name="name">Name of the procedure to execute</param>
    ///<param name="params">Parameters</param>
    ///<param name="successFunc">Executed callback</param>
    ///<param name="errorFunc">Error handler</param>

    if (config.db.log) {
        console.log('procedure=' + name);
    }

    var connection = new sql.Connection(config.db.config);

    connection.connect(function (err) {
        if (!err) {
            var request = new sql.Request(connection);
            for (var i = 0; i < params.length; i++) {
                var param = params[i];

                if (config.db.log) {
                    console.log(param);
                }

                for (paramName in param) {
                    request.input(paramName, sql[param.type], param[paramName]);
                    break;
                }
            }

            request.execute(name, function (err, recordset) {
                if (!err) {
                    if (config.db.log) {
                        console.dir(recordset);
                    }

                    successFunc(recordset[0], recordset);
                } else {
                    console.error(err);

                    errorFunc(err);
                }

                connection.close();
            });
        } else {
            console.error(err);

            errorFunc(err);
        }

        return this;
    });
};