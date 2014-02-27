var $db = require('./db');
var User = require('../models/user');
var $extend = require('node.extend');

exports.getUser = function (userId, gotFunc) {
    ///<summary>Gets user by identifier</summary>
    ///<param name="userId">User identifier</param>
    ///<param name="gotFunc">Got user callback</param>

    $db.procedure('dbo.usp_GetUser', [
    { 
        userId: userId,
        type: 'Int'
    }], function (recordset) {
        var user = exports.createUser(recordset[0]);
        gotFunc(user);
    });

    return this;
};

exports.findUserByUsernamePassword = function (username, password, foundFunc) {
    ///<summary>Finds user by username and password. Password must by hashed already.</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="password">Hashed password of a user</param>
    ///<param name="foundFunc">Found callback</param>

    $db.procedure('dbo.usp_FindUserByUsernamePassword', [
    { 
        username: username
    }, {
        password : password
    }], function (recordset) {
        var user = null;
        if (recordset[0]) {
            user = exports.createUser(recordset[0]);
        }

        foundFunc(user);
    });

    return this;
};

exports.findUserByUsername = function (username, foundFunc) {
    ///<summary>Finds user by username only</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="foundFunc">Found callback</param>

    $db.procedure('dbo.usp_FindUserByUsername', [
    {
        username: username
    }], function (recordset) {
        var user = null;
        if (recordset[0]) {
            user = new exports.createUser(recordset[0]);
        }

        foundFunc(user);
    });

    return this;
};

exports.insertUser = function (username, password, insertedFunc) {
    ///<summary>Inserts user</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="password">Hashed password of a user</param>
    ///<param name="insertedFunc">Inserted callback</param>

    $db.procedure('dbo.usp_InsertUser', [
    {
        username: username
    }, {
        password: password
    }], function (recordset) {
        var userId = recordset[0].UserId;
        exports.getUser(userId, insertedFunc);
    });

    return this;
};

exports.createUser = function(prototype) {
    ///<summary>Creates user from a prototype</summary>
    ///<param name="prototype">Prototype entity</param>
    ///<returns type="User"></returns>
    var user = new User();

    $extend(user, prototype);

    return user;
};