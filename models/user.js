var sprintf = require('sprintf').sprintf;
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique:true } },
    password: { type: String, required: true, index: true },
    modified_date: Date
});

userSchema.pre('save', function (next) {
  this.modified_date = new Date();
  next();
});

userSchema.methods.getDisplayName = function () {
    ///<summary>Get display name</summary>

    return sprintf('%s', this.username);
};

userSchema.methods.getIdentity = function() {
    ///<summary>Gets identity information</summary>

    return sprintf('%s', this.username);
};

module.exports = User = mongoose.model('User', userSchema);