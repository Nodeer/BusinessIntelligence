var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    permissions: [ { type: Schema.Types.ObjectId, ref: 'Permission', index: 1 } ],
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' },
        revision: Number,
    }
});

module.exports = Group = mongoose.model('Group', groupSchema);