var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conditionSchema = new Schema({
    condition_type: { type: String, required: 1 },
    setting: {
        name: { type: String, index: 1 },
        level: String,
        value: { type: String, index: 1 }
    },
    description: { type: String, index: 1},
    ui: { type: String, index: 1 },
    api: { type: String, index: 1 },
    affects: [ { type: Schema.Types.ObjectId, ref: 'Affect', index: 1 } ],
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Condition = mongoose.model('Condition', conditionSchema);