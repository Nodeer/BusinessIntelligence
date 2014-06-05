var logger = require('../logger').getLogger('routes/context'),
    View = require('../views/view');

exports.register = function (app, passport) {
    ///<summary>Registeres all application routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport instance</param>
    
    require('./index').register(app);
    require('./task').register(app);
    require('./user').register(app, passport);
    require('./profile').register(app);
    require('./management').register(app);
    require('./search').register(app);
    require('./metrics').register(app);

    // Handle 404
    app.use(function (req, res, next) {
        res.status(400);
        var view = new View('error/404');
        return view.render(req, res, next, {
            title: "404: File Not Found"
        });
    });

    // Handle 500
    app.use(function (error, req, res, next) {
        if (error) {
            logger.error(error);

            res.status(500);
            var view = new View('error/500');
            return view.render(req, res, next, {
                title: "500: Internal Server Error",
                error: error
            });
        } else {
            return next();
        }
    });

    return this;
};