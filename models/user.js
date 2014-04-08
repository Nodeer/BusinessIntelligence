var sprintf = require('sprintf').sprintf,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: 1, index: { unique: 1 } },
    password: { type: String, required: 1, index: 1, select: 0 },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
    audit: {
        modified_date: { type: Date, default: Date.now },
        revision: { type: Number, default: 1 }
    }
});

userSchema.methods.getIdentity = function() {
    ///<summary>Gets identity information</summary>

    return sprintf('%s\\%s %s', this.username, this.first_name || '', this.last_name || '');
};

module.exports = User = mongoose.model('User', userSchema);