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
    inputs: [{
        conditions: [ { type: Schema.Types.ObjectId, ref: 'Condition'} ]
    }],
    outputs: [{
        conditions: [ { type: Schema.Types.ObjectId, ref: 'Condition'} ]
    }],
    audit: {
        created_by: { type: Schema.Types.ObjectId, ref: 'User' },
        modified_by: { type: Schema.Types.ObjectId, ref: 'User' },
        modified_date: Date,
        revision: Number
    }
});

taskSnapshotSchema.statics.create = function(task) {
    ///<summary>Creates from Task</summary>

    return new TaskSnapshot({
        taskId: task.id,
        name: task.name,
        description: task.description,
        external_id: task.external_id,
        availability: task.availability,
        inputs: task.inputs,
        outputs: task.outputs,
        audit: task.audit
    });
};

module.exports = TaskSnapshot = mongoose.model('TaskSnapshot', taskSnapshotSchema);
