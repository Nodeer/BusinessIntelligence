var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    logger = require('../logger').getLogger('user');

var userSchema = new Schema({
    email: { type: String, required: 1, index: { unique: 1 } },
    password: { type: String, required: 1, index: 1, select: 0 },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group', index: 1 }],
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission', index: 1 }],
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    audit: {
        modified_date: { type: Date, default: Date.now },
        revision: { type: Number, default: 1 }
    }
});

userSchema.methods.getIdentity = function() {
    ///<summary>Gets identity information</summary>

    return util.format('%s\\%s %s', this.email, this.first_name || '', this.last_name || '');
};

module.exports = User = mongoose.model('User', userSchema);