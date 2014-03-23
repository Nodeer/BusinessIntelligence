var Repository = require('./repository'),
    Group = require('../models/group');

var GroupRepository = Repository.extend(function () { })
    .methods({
        getByName: function(name, done) {
            ///<summary>Gets group by name</summary>
            ///<param name="id">Group name</param>
            ///<param name="done">Done callback</param>

          return Group.findOne({
              name: name
          }, done);
        }
    });

module.exports = GroupRepository;