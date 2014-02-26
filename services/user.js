var $userRepository = require('../repository/user');

exports.createUser = function (user, created, error) {
    $userRepository.findUserByUsername(user.Username, function (persistedUser) {
        if (persistedUser) {
            error({
                message: 'The user with same is already exists.'
            });
        } else {
            $userRepository.insertUser(user, created);
        }
    });
};

exports.findUser = function (username, password, done) {
    $userRepository.findUserByUsernamePassword(username, password, done);
};

exports.authenticateUser = function (username, password, done) {
    exports.findUser(username, password, function (user) {
        console.log('authenticateUser=' + user);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
};

exports.serializeUser = function (user, done) {
    console.log('serializeUser');
    console.log('user.UserId=' + user.UserId);
    done(null, user.UserId);
};

exports.deserializeUser = function (id, done) {
    console.log('deserializeUser');
    console.log('id=' + id);
    $userRepository.getUser(id, function (user) {
        done(null, user);
    });
};