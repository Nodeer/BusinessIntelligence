var $db = require('./db');
var User = require('../models/user');
var $extend = require('node.extend');

exports.getUser = function (userId, got) {
    $db.procedure('dbo.usp_GetUser', [
    {
        name: 'userId',
        type: 'Int',
        value: userId
    }], function (recordset) {
        var user = new User(recordset[0][0]);
        got(user);
    });
};

exports.findUserByUsernamePassword = function (username, password, done) {
    $db.procedure('dbo.usp_FindUserByUsernamePassword', [
    {
        name: 'username',
        value: username
    }, {
        name: 'password',
        value: password
    }], function (recordset) {
        var user = null;
        if (recordset[0][0]) {
            user = new User(recordset[0][0]);
        }

        done(user);
    });
};

exports.findUserByUsername = function (username, done) {
    console.log('findUserByUsername');
    console.log('username=' + username);
    $db.procedure('dbo.usp_FindUserByUsername', [
    {
        name: 'username',
        value: username
    }], function (recordset) {
        var user = null;
        if (recordset[0][0]) {
            user = new User(recordset[0][0]);
        }

        done(user);
    });
};

exports.insertUser = function (user, inserted) {
    console.log('insertUser');
    $db.procedure('dbo.usp_InsertUser', [
    {
        name: 'username',
        value: user.Username
    }, {
        name: 'password',
        value: user.Password
    }], function (recordset) {
        user.UserId = recordset[0][0].UserId;

        inserted(user);
    });
};