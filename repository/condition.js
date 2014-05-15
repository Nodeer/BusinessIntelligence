var Base = require('./base'),
    Condition = require('../models/condition'),
    Enumerable = require('linq');

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
        },

        findSettingNames: function(name, done) {
            return Condition.distinct('setting.name', function(err, settingNames) {
                if (err) return done(err);

                return done(err, Enumerable.from(settingNames).where(function(settingName) {
                    return settingName.match(new RegExp(name, 'i'));
                }).toArray());
            });
        },

        findSettingValues: function(value, done) {
            return Condition.distinct('setting.value', function(err, settingValues) {
                if (err) return done(err);

                return done(err, Enumerable.from(settingValues).where(function(settingValue) {
                    return settingValue.match(new RegExp(value, 'i'));
                }).toArray());
            });
        },

        findUiValues: function(value, done) {
            return Condition.distinct('ui', function(err, uiValues) {
                if (err) return done(err);

                return done(err, Enumerable.from(uiValues).where(function(uiValue) {
                    return uiValue.match(new RegExp(value, 'i'));
                }).toArray());
            });
        },

        findApiValues: function(value, done) {
            return Condition.distinct('api', function(err, apiValues) {
                if (err) return done(err);

                return done(err, Enumerable.from(apiValues).where(function(apiValue) {
                    return apiValue.match(new RegExp(value, 'i'));
                }).toArray());
            });
        }
    });

module.exports = ConditionRepository;