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
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' },
        revision: { type: Number, default: 1 }
    }
});

module.exports = Task = mongoose.model('Task', taskSchema);