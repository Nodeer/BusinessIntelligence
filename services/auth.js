var $User = require('../models/user');

exports.authenticate = function (req, res, next) {
    var user = new $User();

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.authenticateUser = function (username, password, done) {
    return done(null, {
        id: 1
    });
};

exports.serializeUser = function (user, done) {
    done(null, user.id);
};

exports.deserializeUser = function (id, done) {
    done(null, {
        id: 1
    });
};
