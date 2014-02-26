var sql = require('mssql');
var settings = require('../settings');

exports.procedure = function (name, params, onSuccess, onError) {
    if (settings.db.log) {
        console.log('procedure=' + name);
    }

    var connection = new sql.Connection(settings.db.config);

    connection.connect(function (err) {
        if (!err) {
            var request = new sql.Request(connection);
            for (var i = 0; i < params.length; i++) {
                var param = params[i];

                if (settings.db.log) {
                    console.log(param);
                }

                request.input(param.name, sql[param.type], param.value);
            }
            request.execute(name, function (err, recordset) {
                if (!err) {
                    if (settings.db.log) {
                        console.dir(recordset);
                    }

                    onSuccess(recordset);
                } else {
                    console.error(err);

                    onError(err);
                }

                connection.close();
            });
        } else {
            console.error(err);

            onError(err);
        }
    });
};