var Base = require('./base'),
    Condition = require('../models/condition'),
    ConditionSnapshot = require('../models/condition.snapshot'),
    Enumerable = require('linq'),
    extend = require('extend');

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
            var user = this.user;
            return Condition.findById(conditionDto.id, function(err, condition) {
                condition = condition || new Condition({
                    _id: conditionDto.id
                });

                extend(condition, conditionDto, {
                    audit: {
                        modified_date: new Date(),
                        modified_by: user.getIdentity(),
                        revision: condition.audit.revision + 1
                    }
                });

                return condition.save(function (err) {
                    if (err) return done(err);

                    return ConditionSnapshot.create(condition).save(function(err) {
                        return done(err, condition);
                    });
                });
            });
        },

        findValues: function(name, value, done) {
            return Condition.distinct(name, function(err, values) {
                if (err) return done(err);

                return done(err, Enumerable.from(values).where(function(singleValue) {
                    return singleValue.match(new RegExp(value, 'i'));
                }).toArray());
            });
        }
    });

module.exports = ConditionRepository;