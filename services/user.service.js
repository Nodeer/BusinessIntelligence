var user_repository = require('../repository/user.repository');
var config = require('../config');
var crypto = require("crypto-js");

exports.createUser = function (username, password, createdFunc, errorFunc) {
    ///<summary>Creates user</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="password">Unhashed password of a user</param>
    ///<param name="createdFund">User created callback</param>
    ///<param name="errorFunc">Error handler</param>
    
    user_repository.findUserByUsername(username, function (persistedUser) {
        if (persistedUser) {
            return errorFunc();
        } else {
            return user_repository.insertUser(username, exports._hash(password), createdFunc);
        }
    });
};

exports.findUser = function (username, password, foundFunc) {
    ///<summary>Finds user by username and password</summary>
    ///<param name="username">Username of a user</param>
    ///<param name="password">Unhashed password of a user</param>
    ///<param name="foundFunc">Found callback</param>
    
    return user_repository.findUserByUsernamePassword(username, password, foundFunc);
};

exports.authenticateUser = function (username, password, done) {
    ///<summary>Authenticate user by username and password</summary>
    ///<param name="username">Username of a user</param>
    ///<param name="password">Unhashed password of a user</param>
    ///<param name="done">Done callback</param>
    
    return exports.findUser(username, exports._hash(password), function (user) {
        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
};

exports.serializeUser = function (user, serializedFunc) {
    ///<summary>Serializes an user model</summary>
    ///<param name="user">User model</param>
    ///<param name="serializedFunc">Serialized callback</param>

    return serializedFunc(null, user.UserId);
};

exports.deserializeUser = function (id, deserializedFunc) {
    ///<summary>Deserializes an user model by identifier</summary>
    ///<param name="id">User identifier</param>
    ///<param name="deserializedFunc">Serialized callback</param>

    user_repository.getUser(id, function (user) {
        return deserializedFunc(null, user);
    });
};

exports._hash = function (text) {
    ///<summary>Computes hash</summary>
    ///<param name="text">Source text</param>
    
    return crypto.SHA256(text + config.hash.salt).toString(crypto.enc.Hex);
};