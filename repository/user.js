var config = require('../config'),
    crypto = require("crypto-js"),
    extend = require('extend'),
    User = require('../models/user'),
    Base = require('./base');

var UserRepository = Base.extend(function () { })
    .methods({
        getById: function(id, done) {
            ///<summary>Gets user by identifier</summary>
            ///<param name="id">User identifier</param>
            ///<param name="done">Done callback</param>

            return User.findById(id, done);
        },

        create: function(email, password, done) {
            ///<summary>Creates user</summary>
            ///<param name="email">Email</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done handler</param>

            User.findOne({
                email: email
            }, function(err, user) {
                if (user) {
                    return done('The user is already exists.', null);
                }

                user = new User({
                    email: email,
                    password: _hashPassword(password),
                    avatar: 'uploads/unknown_user.png'
                });

                return user.save(function (err) {
                    return done(err, extend(user, {
                        password: ''
                    }));
                });
            });
        },

        update: function(user, done) {
            ///<summary>Updates user</summary>
            ///<param name="user">User to update</param>
            ///<param name="done">Done callback</param>

            var set = {
                groups: user.groups,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
                email: user.email,
                audit: {
                    modified_date: user.audit.modified_date,
                    revision: user.audit.revision
                }
            };

            if (user.password) {
                extend(set, {
                    password: _hashPassword(user.password)
                });
            }

            User.findByIdAndUpdate(user.id, {
                $set: set
            }, done);
        },

        updateMetrics: function(user, done) {
            ///<summary>Updates metrics</summary>

            return User.findByIdAndUpdate(user.id, {
                $set: {
                    metrics: {
                        previous_login_date: user.metrics.previous_login_date,
                        current_login_date: user.metrics.current_login_date
                    }
                }
            }, done);
        },

        findByEmailPassword: function (email, password, done) {
            ///<summary>Finds user by email and password. Password must by hashed already.</summary>
            ///<param name="email">Email of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done callback</param>

            return User.findOne({
                email: email,
                password: _hashPassword(password)
            }, done);
        },

        getAll: function(done) {
            ///<summary>Gets all users.</summary> 

            return User.find({})
                .populate('groups')
                .sort({email: 1})
                .exec(done);
        }
    });

function _hashPassword(text) {
    ///<summary>Computes hash</summary>

    return crypto.SHA256(text + config.hash.salt).toString(crypto.enc.Hex);
}

module.exports = UserRepository;