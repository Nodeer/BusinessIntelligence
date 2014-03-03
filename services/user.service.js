var User = require('../models/user'),
    UserRepository = require('../repository/user.repository'),
    Service = require('./service');


var UserService = Service.extend(function () { })
    .methods({
        getById: function(id, done) {
            ///<summary>Gets user by identifier</summary>
            ///<param name="id">User identifier</param>
            ///<param name="done">Done callback</param>

          return new UserRepository().getById(id, done);
        },

        create: function(username, password, done) {
            ///<summary>Creates user</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done handler</param>

            return new UserRepository().create(username, password, done);
        },

        findByUsernamePassword: function (username, password, done) {
            ///<summary>Finds user by username and password. Password must by hashed already.</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Hashed password of a user</param>
            ///<param name="done">Done callback</param>

            return new UserRepository().findByUsernamePassword(username, password, done);
        },

        authenticateUser: function (username, password, done) {
            ///<summary>Authenticate user by username and password</summary>
            ///<param name="username">Username of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done callback</param>
            
            return new UserService().findByUsernamePassword(username, password, function (err, user) {
                if (user) {
                    return done(err, user);
                }

                return done(null, false);
            });
        },

        serializeUser: function (user, done) {
            ///<summary>Serializes an user model</summary>
            ///<param name="user">User model</param>
            ///<param name="done">Serialized callback</param>

            return done(null, user._id);
        },

        deserializeUser: function (id, done) {
            ///<summary>Deserializes an user model by identifier</summary>
            ///<param name="id">User identifier</param>
            ///<param name="done">Serialized callback</param>

            return new UserRepository().getById(id, function (err, user) {
                return done(err, user);
            });
        }
    });

module.exports = UserService;