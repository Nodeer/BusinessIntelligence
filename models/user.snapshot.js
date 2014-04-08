var extend = require('extend'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSnapshotSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User', required: 1, index: 1 }],
    username: String,
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    first_name: String,
    last_name: String,
    email: String,
    audit: {
        modified_date: { type: Date, index: 1 },
        revision: { type: Number, index: 1 }
    }
});

userSnapshotSchema.statics.create = function(user) {
    ///<summary>Creates from User</summary>
    ///<param name="user">User</param>
    
    return new UserSnapshot(extend({}, {
        userId: user._id,
        username: user.username,
        groups: user.groups,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        audit: user.audit
    }));
};

module.exports = UserSnapshot = mongoose.model('UserSnapshot', userSnapshotSchema);