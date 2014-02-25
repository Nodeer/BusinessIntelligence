module.exports = function (app, passport) {
    require('./index').register(app, passport);

    require('./tasks').register(app, passport);
    require('./login').register(app, passport);
};