var extend = require('extend'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSnapshotSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, required: 1, index: 1 },
    name: String,
    description: String,
    external_id: String,
    availability: {
        availability_type: Number,
        partners: [ { type: String } ]
    },
    audit: {
        modified_date: { type: Date, default: Date.now },
        modified_by: { type: String, default: '' },
        revision: Number
    }
});

taskSnapshotSchema.statics.create = function(task) {
    ///<summary>Creates from Task</summary>
    ///<param name="task">Task</param>
    
    return new TaskSnapshot(extend({}, {
        taskId: task.id,
        name: task.name,
        description: task.description,
        external_id: task.external_id,
        availability: {
            availability_type: task.availability.availability_type,
            partners: task.availability.partners
        },
        audit: {
            modified_date: task.audit.modified_date,
            modified_by: task.audit.modified_by,
            revision: task.audit.revision
        }
    }));
};

module.exports = TaskSnapshot = mongoose.model('TaskSnapshot', taskSnapshotSchema);
