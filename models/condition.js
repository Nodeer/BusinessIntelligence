var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conditionSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    ui: Boolean,
    api: Boolean,
    dependencies: [ { type: Schema.Types.ObjectId, ref: 'Task', index: 1 }],
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Condition = mongoose.model('Condition', conditionSchema);