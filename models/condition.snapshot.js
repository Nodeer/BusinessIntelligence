var extend = require('extend'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Affect = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task', index: 1 },
    description: String
});

var conditionSnapshotSchema = new Schema({
    conditionId: { type: Schema.Types.ObjectId, required: 1, index: 1 },
    name: String,
    condition_type: String,
    setting: {
        name: String,
        level: String,
        value: String
    },
    description: String,
    ui: {
        input: [String],
        output: [String]
    },
    api: {
        input: [String],
        output: [String]
    },
    note: String,
    affects: [Affect],
    audit: {
        created_by: { type: Schema.Types.ObjectId, ref: 'User' },
        modified_by: { type: Schema.Types.ObjectId, ref: 'User' },
        modified_date: Date,
        revision: Number
    }
});

conditionSnapshotSchema.statics.create = function(condition) {
    return new ConditionSnapshot({
        conditionId: condition.id,
        name: condition.name,
        condition_type: condition.condition_type,
        setting: condition.setting,
        description: condition.description,
        ui: condition.ui,
        api: condition.api,
        note: condition.note,
        affects: condition.affects,
        audit: condition.audit
    });
};

conditionSnapshotSchema.methods.toDto = function() {
    ///<summary>Converts to DTO</summary>
    
    return {
        conditionId: this.conditionId,
        name: this.name,
        condition_type: this.condition_type,
        setting: this.setting,
        description: this.description,
        ui: this.ui,
        api: this.api,
        note: this.note,
        affects: this.affects
    };
};

module.exports = ConditionSnapshot = mongoose.model('ConditionSnapshot', conditionSnapshotSchema);