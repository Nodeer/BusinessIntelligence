var Base = require('./base'),
    Group = require('../models/group'),
    Permission = require('../models/permission');

var GroupRepository = Base.extend(function () { })
    .methods({
        getByName: function(name, done) {
            ///<summary>Gets group by name</summary>
            ///<param name="id">Group name</param>
            ///<param name="done">Done callback</param>

            return new GroupRepository().getByNames([name], done);
        },

        getByNames: function(names, done) {
            ///<summary>Gets groups by names</summary>
            ///<param name="id">Group names</param>
            ///<param name="done">Done callback</param>

            return Group.findOne({
                name: {
                    $in: names
                }
            }, done);
        },

        getByIds: function(ids, done) {
            ///<summary>Gets groups by ids</summary>
            ///<param name="ids">collection of identifiers</param>
            ///<param name="done">Done callback</param>

            return Group.find({
                _id: {
                    $in: ids
                }
            }, done);
        }
    });

module.exports = GroupRepository;