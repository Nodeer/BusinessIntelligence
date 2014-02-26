var User = require('../models/user');
var $user = require('../services/user');
var $hash = require('../services/hash');
var $settings = require('../settings');

exports.register = function (app, passport) {

    var auth = require('../services/auth');

    app.post('/signin', passport.authenticate('local'), exports.signin);

    app.post('/signup', exports.signup);
};

exports.signin = function (req, res) {
    res.redirect('/');
};

exports.signup = function (req, res) {;
    $user.createUser(new User({
        Username: req.body.username,
        Password: $hash(req.body.password, $settings.hash.salt)
    }), function (user) {
        req.logIn(user, function () {
            res.redirect('/');
        });
    }, function (err) {
        req.flash('alert', {
            alert: {
                danger: err.message
            }
        });
        res.redirect('/');
    });
};

exports.signout = function (req, res) {

};