var UserService = require('../services/user.service'),
    User = require('../models/user');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    app.post('/signin', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            
            if (user) {
                return req.logIn(user, function () {
                    return res.redirect('/');
                });
            }

            req.flash('alert', {
                alert: {
                    danger: 'Login failed.'
                }
            });

            return res.redirect('/');
        })(req, res, next);
    }, exports.signin);

    app.post('/signup', exports.signup);
    app.post('/signout', exports.signout);

    return this;
};

exports.signin = function (req, res) {
    ///<summary>User sign in</summary>
    
    return res.redirect('/');
};

exports.signup = function (req, res) {;
    ///<summary>User sign up</summary>

    new UserService().create(req.body.username, req.body.password, function (err, user) {
        if (err) {
            req.flash('alert', {
                alert: {
                    danger: err
                }
            });

            return res.redirect('/');
        }

        return req.logIn(user, function () {
            return res.redirect('/');
        });
    });
};

exports.signout = function (req, res) {
    req.logout();

    return res.redirect('/');
};