var Base = require('./base'),
    Condition = require('../models/condition');

var ConditionRepository = Base.extend(function () { })
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
        }
    });

module.exports = ConditionRepository;