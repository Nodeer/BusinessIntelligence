var log4js = require('log4js');

exports.configure = function(app) {
    ///<summary>Configure logger</summary>
    ///<param name="app">Application</param>

    log4js.configure({
     appenders: [
       { type: 'console' },
       { type: 'file', filename: './logs/log.txt', maxLogSize: 1024 * 1024, backups: 100 }
      ],
     replaceConsole: true
    });

    app.configure(function() {
      app.use(log4js.connectLogger(exports.getLogger(), { level: 'DEBUG' }));
    });

    return this;
};

exports.getLogger = function(name) {
    ///<summary>Gets logger</summary>
    
    var logger = log4js.getLogger(name);
    logger.setLevel('DEBUG');

    return logger;
}