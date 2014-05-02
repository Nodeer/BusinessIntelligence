var extend = require('extend'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSnapshotSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, required: 1, index: 1 }],
    email: String,
    groups: [{ type: Schema.Types.ObjectId }],
    permissions: [{ type: Schema.Types.ObjectId }],
    first_name: String,
    last_name: String,
    audit: {
        modified_date: { type: Date, index: 1 },
        revision: { type: Number, index: 1 }
    }
});

userSnapshotSchema.statics.create = function(user) {
    ///<summary>Creates from User</summary>
    ///<param name="user">User</param>
    
    return new UserSnapshot(extend({}, {
        userId: user.id,
        email: user.email,
        groups: user.groups,
        permissions: user.permissions,
        first_name: user.first_name,
        last_name: user.last_name,
        audit: user.audit
    }));
};

module.exports = UserSnapshot = mongoose.model('UserSnapshot', userSnapshotSchema);