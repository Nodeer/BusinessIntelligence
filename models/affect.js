var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var affectSchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task', index: 1 },
    description: { type: String, index: 1},
    audit: {
        created_by: { type: Schema.Types.ObjectId, ref: 'User', index: 1 },
        modified_by: { type: Schema.Types.ObjectId, ref: 'User', index: 1 },
        modified_date: { type: Date, default: Date.now },
        revision: { type: Number, default: 1 }
    }
});

module.exports = Affect = mongoose.model('Affect', affectSchema);