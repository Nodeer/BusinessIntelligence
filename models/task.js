var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: String, required: 1, index: { unique: 1 } },
    description: { type: String, default: '' },
    external_id: { type: String, index: 1},
    availability: {
        availability_type: Number,
        partners: [ { type: String, index: 1 } ]
    },
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' },
        revision: { type: Number, default: 1 }
    }
});

taskSchema.methods.toDto = function() {
    ///<summary>Converts to DTO</summary>
    
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        external_id: this.external_id,
        availability: {
            availability_type: this.availability.availability_type,
            partners: this.availability.partners
        }
    };
};

module.exports = Task = mongoose.model('Task', taskSchema);