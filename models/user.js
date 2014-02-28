//var klass = require('klass');
//var sprintf = require('sprintf').sprintf;

//module.exports = klass(function () { })
//    .methods({
//          initialize: function () {
//              ///<summary>Initializes the instance</summary>

//              return this;
//          },
//          getDisplayName: function () {
//              ///<summary>Get display name</summary>

//              return sprintf('%s', this.Username);
//          },
//          getIdentity: function() {
//              ///<summary>Gets identity information</summary>
              
//              return sprintf('%s', this.Username);
//          }
//    });

var sprintf = require('sprintf').sprintf;
var mongoose = require('mongoose');
var config = require('../config');
var crypto = require("crypto-js");


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    modified_date: Date,
    modified_by: String
});

userSchema.index({
     username: 1,
     password: 1
});

userSchema.pre('save', function (next) {
  this.modified_date = new Date();
  next();
});

userSchema.methods.getDisplayName = function () {
    ///<summary>Get display name</summary>

    return sprintf('%s', this.username);
};

userSchema.methods.getIdentity = function() {
    ///<summary>Gets identity information</summary>

    return sprintf('%s', this.username);
};

userSchema.statics.create = function (username, password, done) {
    ///<summary>Creates user</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="password">Unhashed password of a user</param>
    ///<param name="done">Done handler</param>
    
    this.findOne({
        username: username
    }, function(err, user) {
        if (user) {
            return done('The user is already exists.', null);
        }

        user = new User({
            username: username,
            password: User._hashPassword(password)
        });

        return user.save(function (err) {
            return done(err, user);
        });
    });
};

userSchema.statics.get = function (id, done) {
    ///<summary>Gets user by identifier</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="done">Done callback</param>

  return this.findOne({
        _id: id
    }, function(err, user) {
        return done(err, user);
    });
};

userSchema.statics.findByUsernamePassword = function (username, password, done) {
    ///<summary>Finds user by username and password. Password must by hashed already.</summary>
    ///<param name="username">Name of a user</param>
    ///<param name="password">Hashed password of a user</param>
    ///<param name="done">Done callback</param>

    return this.findOne({
        username: username,
        password: User._hashPassword(password)
    }, function (err, user) {
        return done(err, user);
    });
};

userSchema.statics._hashPassword = function (text) {
    ///<summary>Computes hash</summary>

    return crypto.SHA256(text + config.hash.salt).toString(crypto.enc.Hex);
};

module.exports = User = mongoose.model('User', userSchema);