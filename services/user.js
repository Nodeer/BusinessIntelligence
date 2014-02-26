var $userRepository = require('../repository/user');
var $hash = require('../services/hash');
var $settings = require('../settings');

exports.createUser = function (username, password, created, error) {
    $userRepository.findUserByUsername(username, function (persistedUser) {
        if (persistedUser) {
            return error();
        } else {
            return $userRepository.insertUser(username, $hash(password, $settings.hash.salt), created);
        }
    });
};

exports.findUser = function (username, password, done) {
    return $userRepository.findUserByUsernamePassword(username, password, done);
};

exports.authenticateUser = function (username, password, done) {
    return exports.findUser(username, $hash(password, $settings.hash.salt), function (user) {
        console.log('authenticateUser=' + user);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
};

exports.serializeUser = function (user, done) {
    console.log('serializeUser');
    console.log('user.UserId=' + user.UserId);
    return done(null, user.UserId);
};

exports.deserializeUser = function (id, done) {
    console.log('deserializeUser');
    console.log('id=' + id);
    $userRepository.getUser(id, function (user) {
        done(null, user);
    });
};