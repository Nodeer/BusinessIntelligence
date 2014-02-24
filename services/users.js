exports.authenticate = function (username, password, done) {
    console.log('authenticate');

    var User = require('../app/models/user');
    return done(null, new User());
};

exports.serializeUser = function (user, done) {
    console.log('serializeUser');

    done(null, user.id);
};

exports.deserializeUser = function (id, done) {
    console.log('deserializeUser');

    var User = require('../app/models/user');

    done(null, new User());
};