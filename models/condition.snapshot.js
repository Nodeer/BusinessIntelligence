﻿var extend = require('extend'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
        input: String,
        output: String
    },
    api: {
        input: String,
        output: String
    },
    note: String,
    affects: [ { type: Schema.Types.ObjectId, ref: 'Affect', index: 1 } ],
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
        audit: condition.audit
    });
};

module.exports = ConditionSnapshot = mongoose.model('ConditionSnapshot', conditionSnapshotSchema);