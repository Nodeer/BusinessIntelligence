var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conditionSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    input_ui: { type: String, index: 1 },
    input_api: { type: String, index: 1 },
    output_ui: { type: String, index: 1 },
    output_api: { type: String, index: 1 },
    affects: [ { type: Schema.Types.ObjectId, ref: 'Affect', index: 1 } ],
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Condition = mongoose.model('Condition', conditionSchema);