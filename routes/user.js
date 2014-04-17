var UserService = require('../services/user'),
    User = require('../models/user'),
    route = require('./route');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    app.post('/signin', route.public(), exports._authenticate(passport), exports.signin);
    app.post('/signup', route.public(), exports.signup);
    app.post('/signout', route.public(), exports.signout);

    app.get('/user/access.json', route.private(), exports.evaluateAccess);

    return this;
};

exports._authenticate = function(passport) {
    ///<summary>Authenticates user</summary>
    ///<param name="passport">Passport</param>
    
    return function (req, res, next) {
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
    };
};

exports.signin = function (req, res) {
    ///<summary>User sign in</summary>
    
    return res.redirect('/');
};

exports.signup = function (req, res) {
    ///<summary>User sign up</summary>

    var email = req.body.email,
        password = req.body.password;

    new UserService().create(email, password, function (err, user) {
        if (err) {
            req.flash('alert', {
                alert: {
                    danger: err.message || err
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


exports.evaluateAccess = function (req, res) {
    ///<summary>Evaluates access</summary>

    return new UserService().evaluateAccess(req.user, {
        manageUsers: {
            'management.user': ['read']
        }
    }, function(err, access) {
        if (err) {
            return res.status(500).end();
        }

        return res.json(access);
    });
};