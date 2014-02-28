var user_repository = require('../repository/user.repository');
var User = require('../models/user');

exports.authenticateUser = function (username, password, done) {
    ///<summary>Authenticate user by username and password</summary>
    ///<param name="username">Username of a user</param>
    ///<param name="password">Unhashed password of a user</param>
    ///<param name="done">Done callback</param>
    
    return User.findByUsernamePassword(username, password, function (err, user) {
        if (user) {
            return done(err, user);
        }

        return done(null, false);
    });
};

exports.serializeUser = function (user, done) {
    ///<summary>Serializes an user model</summary>
    ///<param name="user">User model</param>
    ///<param name="done">Serialized callback</param>

    return done(null, user._id);
};

exports.deserializeUser = function (id, done) {
    ///<summary>Deserializes an user model by identifier</summary>
    ///<param name="id">User identifier</param>
    ///<param name="done">Serialized callback</param>

    return User.get(id, function (err, user) {
        return done(err, user);
    });
};
