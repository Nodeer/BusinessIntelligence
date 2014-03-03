var sprintf = require('sprintf').sprintf,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: 1, index: { unique: 1 } },
    password: { type: String, required: 1, index: 1, select: 0 },
    first_name: String,
    last_name: String,
    email: String,
    modified_date: Date
});

userSchema.pre('save', function (next) {
  this.modified_date = new Date();
  next();
});

userSchema.methods.getDisplayName = function () {
    ///<summary>Get display name</summary>

    if (this.first_name || this.last_name) {
        return sprintf('%s %s', this.first_name || '', this.last_name || '');
    }

    return sprintf('%s', this.username);
};

userSchema.methods.getIdentity = function() {
    ///<summary>Gets identity information</summary>

    return sprintf('%s\\%s %s', this.username, this.first_name || '', this.last_name || '');
};

module.exports = User = mongoose.model('User', userSchema);