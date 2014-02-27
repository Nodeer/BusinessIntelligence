var $db = require('./db');
var User = require('../models/user');
var $extend = require('node.extend');

exports.getUser = function (userId, got) {
    $db.procedure('dbo.usp_GetUser', [
    { 
        userId: userId,
        type: 'Int'
    }], function (recordset) {
        var user = exports.createUser(recordset[0]);
        got(user);
    });
};

exports.findUserByUsernamePassword = function (username, password, done) {
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

        done(user);
    });
};

exports.findUserByUsername = function (username, done) {
    $db.procedure('dbo.usp_FindUserByUsername', [
    {
        username: username
    }], function (recordset) {
        var user = null;
        if (recordset[0]) {
            user = new exports.createUser(recordset[0]);
        }

        done(user);
    });
};

exports.insertUser = function (username, password, inserted) {
    $db.procedure('dbo.usp_InsertUser', [
    {
        username: username
    }, {
        password: password
    }], function (recordset) {
        var userId = recordset[0].UserId;
        exports.getUser(userId, inserted);
    });
};

exports.createUser = function(dataRow) {
    var user = new User();

    $extend(user, dataRow);

    return user;
};