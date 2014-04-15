var logger = require('../logger').getLogger('routes/context');

exports.register = function (app, passport) {
    ///<summary>Registeres all application routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport instance</param>
    
    require('./index').register(app);
    require('./task').register(app);
    require('./user').register(app, passport);
    require('./profile').register(app);
    require('./management').register(app);

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