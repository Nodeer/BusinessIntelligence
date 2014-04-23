var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    description: { type: String, default: '' },
    external_id: { type: String, index: 1},
    availability: {
        type: Number,
        partners: [ { type: String } ]
    },
    input: {
        conditions: [ { type: Schema.Types.ObjectId, ref: 'Condition', index: 1 } ]
    },
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' }
    }
});

module.exports = Task = mongoose.model('Task', taskSchema);