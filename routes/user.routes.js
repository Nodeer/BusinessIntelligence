var User = require('../models/user');
var user_service = require('../services/user.service');

exports.register = function (app, passport) {

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
};

exports.signin = function (req, res) {
    res.redirect('/');
};

exports.signup = function (req, res) {;
    user_service.createUser(req.body.username, req.body.password, function (user) {
        req.logIn(user, function () {
            res.redirect('/');
        });
    }, function () {
        req.flash('alert', {
            alert: {
                danger: 'The user with same is already exists.'
            }
        });
        res.redirect('/');
    });
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};