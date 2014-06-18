var Base = require('./base'),
    Condition = require('../models/condition'),
    ConditionSnapshot = require('../models/condition.snapshot'),
    Enumerable = require('linq'),
    extend = require('extend'),
    obj = require('../modules/obj'),
    _ = require('lodash');

var ConditionRepository = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
        findByName: function(name, done) {
            ///<summary>Finds condition by name</summary>
            ///<param name="id">Condition partial name</param>
            ///<param name="done">Done callback</param>

            return Condition.find({
                name: new RegExp(name, 'i')
            }, done);
        },

        getById: function(id, done) {
            ///<summary>Gets condition by id</summary>
            ///<param name="id">collection of identifiers</param>
            ///<param name="done">Done callback</param>

            return Condition.findById(id, done);
        },

        getByIds: function(ids, done) {
            ///<summary>Gets conditions by ids</summary>
            ///<param name="ids">collection of identifiers</param>
            ///<param name="done">Done callback</param>

            return Condition.find({
                _id: {
                    $in: ids
                }
            }, done);
        },

        save: function(conditionDto, done) {
            var user = this.user,
                conditionRepository = this;
            return Condition.findById(conditionDto.id, function(err, condition) {
                condition = condition || new Condition({
                    _id: conditionDto.id,
                    audit: {
                        created_by: user.id
                    }
                });

                _.merge(condition, conditionDto, {
                    affects: Enumerable.from(conditionDto.affects).select(function(affect) {
                        return {
                            _id: affect.id,
                            task : affect.task.id,
                            description: affect.description
                        };
                    }).toArray(),
                    audit: {
                        modified_by: user.id,
                        modified_date: new Date(),
                        revision: condition.audit.revision + 1
                    }
                });

                return condition.save(function (err) {
                    if (err) return done(err);

                    return conditionRepository._createSnapshot(condition, function(err) {
                        return done(err, condition);
                    }); 
                });
            });
        },

        findValues: function(name, value, done) {
            return Condition.distinct(name, function(err, values) {
                if (err) return done(err);

                return done(err, Enumerable.from(values).where(function(singleValue) {
                    return singleValue && singleValue.match(new RegExp(value, 'i'));
                }).toArray());
            });
        },

        _createSnapshot: function(condition, done) {
            ///<summary>Creates snapshot</summary>
            
            return ConditionSnapshot.findOne({conditionId: condition.id}, {}, {
                sort: {
                    _id: -1
                }
            }, function(err, oldestConditionSnapshot) {
                if (err) return done(err);

                var newestConditionSnapshot = ConditionSnapshot.create(condition);

                if (!oldestConditionSnapshot || !obj.isEqual(oldestConditionSnapshot.toDto(), newestConditionSnapshot.toDto())) {
                    return newestConditionSnapshot.save(done);
                } else {
                    return done();
                }
            });
        }
    });

module.exports = ConditionRepository;