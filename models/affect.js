var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var affectSchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task', index: 1 },
    description: { type: String, index: 1},
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Affect = mongoose.model('Affect', affectSchema);