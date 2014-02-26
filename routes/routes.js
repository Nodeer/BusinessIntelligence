module.exports = function (app, passport) {
    require('./index').register(app, passport);

    require('./tasks').register(app, passport);
    require('./user').register(app, passport);

    // Handle 404
    app.use(function (req, res) {
        res.status(400);
        res.render('error/404', {
            title: '404: File Not Found'
        });
    });

    // Handle 500
    app.use(function (error, req, res, next) {
        res.status(500);
        res.render('error/500', {
            title: '500: Internal Server Error',
            error: error
        });
    });
};