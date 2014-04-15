var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    permissions: [ { type: Schema.Types.ObjectId, ref: 'Permission' } ],
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Group = mongoose.model('Group', groupSchema);