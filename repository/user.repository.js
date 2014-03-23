var config = require('../config'),
    crypto = require("crypto-js"),
    User = require('../models/user'),
    Repository = require('./repository');

var UserRepository = Repository.extend(function () { })
    .methods({
        getById: function(id, done) {
            ///<summary>Gets user by identifier</summary>
            ///<param name="id">User identifier</param>
            ///<param name="done">Done callback</param>

          return User.findById(id, done);
        },

        create: function(username, password, done) {
            ///<summary>Creates user</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done handler</param>

            User.findOne({
                username: username
            }, function(err, user) {
                if (user) {
                    return done('The user is already exists.', null);
                }

                user = new User({
                    username: username,
                    password: _hashPassword(password)
                });

                return user.save(function (err) {
                    return done(err, user);
                });
            });
        },

        update: function(user, done) {
            ///<summary>Updates user</summary>
            ///<param name="user">User to update</param>
            ///<param name="done">Done callback</param>
            
            User.findByIdAndUpdate(user._id, {
                $set: {
                    groups: user.groups,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    audit: {
                        modified_date: new Date()
                    }
                }
            }, {}, done);
        },

        findByUsernamePassword: function (username, password, done) {
            ///<summary>Finds user by username and password. Password must by hashed already.</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done callback</param>

            return User.findOne({
                username: username,
                password: _hashPassword(password)
            }, done);
        },
    });

function _hashPassword(text) {
    ///<summary>Computes hash</summary>

    return crypto.SHA256(text + config.hash.salt).toString(crypto.enc.Hex);
}

module.exports = UserRepository;