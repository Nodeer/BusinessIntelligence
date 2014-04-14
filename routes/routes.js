var logger = require('../logger').getLogger();

module.exports = function (app, passport) {
    ///<summary>Registeres all application routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>
    
    require('./index.routes').register(app, passport);
    require('./task.routes').register(app, passport);
    require('./user.routes').register(app, passport);
    require('./profile.routes').register(app, passport);

    // Handle 404
    app.use(function (req, res) {
        res.status(400);
        res.render('error/404', {
            title: '404: File Not Found'
        });
    });

    // Handle 500
    app.use(function (error, req, res, next) {

        logger.error(error);

        res.status(500);
        res.render('error/500', {
            title: '500: Internal Server Error',
            error: error
        });
    });

    return this;
};