var User = require('../models/user'),
    UserSnapshot = require('../models/user.snapshot'),
    UserRepository = require('../repository/user'),
    UserSnapshotRepository = require('../repository/user.snapshot'),
    GroupRepository = require('../repository/group'),
    PermissionRepository = require('../repository/permission'),
    Base = require('./base'),
    klass = require('klass'),
    extend = require('extend'),
    logger = require('../logger').getLogger('services/user'),
    util = require('util');


var UserService = Base.extend(function () { })
    .methods({
        getById: function(id, done) {
            ///<summary>Gets user by identifier</summary>
            ///<param name="id">User identifier</param>
            ///<param name="done">Done callback</param>

          return new UserRepository().getById(id, function(err, user) {
              if (err) return done(err, null);

              return new GroupRepository().getByIds(user.groups, function(err, groups) {
                    if (err) return done (err, null);

                    var permissionIds = [];
                    
                    [].push.apply(permissionIds, user.permissions);

                    for (var group in groups) {
                        [].push.apply(permissionIds, groups[group].permissions);
                    }

                    return new PermissionRepository().getByIds(permissionIds, function(err, permissions) {
                        if (err) return done(err, null);

                        user.app = {
                            permissions: permissions
                        };

                        return done(err, user);
                    });
                });
            });
        },

        create: function(username, password, done) {
            ///<summary>Creates user</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done handler</param>

            var userRepository = new UserRepository();
            return userRepository.create(username, password, function(err, user) {
                if (err) return done(err, null);

                var groupRepository = new GroupRepository();
                return groupRepository.getByName('User', function(err, group) {
                    if (err) return done(err, null);

                    user.groups.push(group);

                    return userRepository.update(user, done);
                });
            });
        },

        save: function(user, userDto, done) {
            ///<summary>Updates user</summary>
            ///<param name="user">User to update</param>
            ///<param name="done">Done callback</param>

            var userService = this;
            return userService._mergeChanges(user, userDto, function(err, user) {
                if (err) return done(err, null);

                return userService._trackChanges(user, function(err, user) {
                    if (err) return done(err, null);

                    return new UserRepository().update(user, done);
                });
            });
        },

        findByUsernamePassword: function (username, password, done) {
            ///<summary>Finds user by username and password. Password must by hashed already.</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Hashed password of a user</param>
            ///<param name="done">Done callback</param>

            return new UserRepository().findByUsernamePassword(username, password, done);
        },

        requestAccess: function (user, access, done) {
            ///<summary>Checks if user has access</summary>

            for (var accessItem in access) {
                var accessTypes = [].concat(access[accessItem]);
                for (var accessType in accessTypes) {
                    var accessTypeKey = accessTypes[accessType];

                    var permissionKey = util.format('%s.%s', accessItem, accessTypeKey);

                    logger.info(util.format('"%s" requested a "%s" permission.', user.getIdentity(), permissionKey));

                    var permissionGranted = false;
                    for (var permission in user.app.permissions) {
                        if (user.app.permissions[permission].name === permissionKey) {
                            permissionGranted = true;
                        }
                    }

                    if (!permissionGranted) {
                        return done('Access is denied.');
                    }
                }
            }

            return done(null);
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

            return new UserService().getById(id, function (err, user) {
                return done(err, user);
            });
        },

        _mergeChanges: function(user, userDto, done) {
            ///<summary>Merge changes</summary>
            ///<param name="user">User to merge</param>
            ///<param name="userDto">User dto</param>
            ///<param name="done">Done callback</param>
            

            extend(user, {
                first_name: userDto.first_name,
                last_name: userDto.last_name,
                email: userDto.email,
            });

            return done(null, user);
        },

        _trackChanges: function(user, done) {
            ///<summary>Traces changes made for User</summary>
            var userSnapshot = UserSnapshot.create(user);
            
            return new UserSnapshotRepository().insert(userSnapshot, function(err) {
                if (err) return done(err, null);

                extend(user.audit, {
                    modified_date: new Date(),
                    revision: user.audit.revision + 1
                });

                return done(err, user);
            });
        }
    });

module.exports = UserService;