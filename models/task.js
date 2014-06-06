var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: String, required: 1, index: 1 },
    description: { type: String, index: 1, default: '' },
    external_id: { type: String, index: 1},
    availability: {
        availability_type: Number,
        partners: [ { type: String, index: 1 } ]
    },
    inputs: [{
        conditions: [ { type: Schema.Types.ObjectId, ref: 'Condition', index: 1 } ]
    }],
    outputs: [{
        conditions: [ { type: Schema.Types.ObjectId, ref: 'Condition', index: 1 } ]
    }],
    audit: {
        created_by: { type: Schema.Types.ObjectId, ref: 'User', index: 1 },
        created_date: { type: Date, default: Date.now },
        modified_by: { type: Schema.Types.ObjectId, ref: 'User', index: 1 },
        modified_date: { type: Date, default: Date.now },
        revision: { type: Number, default: 1 }
    }
});

taskSchema.methods.toDto = function() {
    ///<summary>Converts to DTO</summary>
    return {
        id: this.id,
        name: this.name,
        description: this.description,
        external_id: this.external_id,
        availability: {
            availability_type: this.availability.availability_type,
            partners: this.availability.partners,
        }
    };
};

module.exports = Task = mongoose.model('Task', taskSchema);