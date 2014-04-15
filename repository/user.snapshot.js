var Base = require('./base');

var UserSnapshotRepository = Base.extend(function () { })
    .methods({
        insert: function(userSnapshot, done) {
            ///<summary>Updates user</summary>
            ///<param name="userSnapshot">User snapshot to insert</param>
            ///<param name="done">Done callback</param>
            
            return userSnapshot.save(done);
        }
    });

module.exports = UserSnapshotRepository;