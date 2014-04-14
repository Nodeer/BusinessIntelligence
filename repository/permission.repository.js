var Repository = require('./repository'),
        Permission = require('../models/permission');

var PermissionRepository = Repository.extend(function () { })
    .methods({
        getByName: function(name, done) {
            ///<summary>Gets permission by name</summary>
            ///<param name="id">Permission name</param>
            ///<param name="done">Done callback</param>

            return Permission.findOne({
                name: name
            }, done);
        },

        getByIds: function(ids, done) {
            ///<summary>Gets permissions by ids</summary>
            ///<param name="ids">collection of identifiers</param>
            ///<param name="done">Done callback</param>

            return Permission.find({
                _id: {
                    $in: ids
                }
            }, done);
        },

        create: function(name, done) {
            ///<summary>Creates user</summary>
            ///<param name="username">Name of a user</param>
            ///<param name="password">Unhashed password of a user</param>
            ///<param name="done">Done handler</param>

            this.getByName(name, function(err, permission) {
                if (err) return done(err, null);

                if (permission) {
                    return done('The permission is already exists.', null);
                }

                permission = new Permission({
                    name: name
                });

                return permission.save(function (err) {
                    return done(err, permission);
                });
            });
        }
    });

module.exports = PermissionRepository;