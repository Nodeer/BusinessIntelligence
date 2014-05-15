﻿var Condition = require('../models/condition'),
    ConditionRepository = require('../repository/condition'),
    Base = require('./base'),
    klass = require('klass'),
    extend = require('extend'),
    logger = require('../logger').getLogger('services/condition'),
    util = require('util'),
    Enumerable = require('linq');


var ConditionService = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
        findSettingNames: function(name, map, done) {
            ///<summary>Finds setting names</summary>
            ///<param name="name">Name of a setting</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new ConditionRepository(this.user).findSettingNames(name, function(err, names) {
              if (err) return done(err);

              return done(err, Enumerable.from(names).select(map).toArray());
          });
        },

        findSettingValues: function(value, map, done) {
            ///<summary>Finds setting values</summary>
            ///<param name="value">Value of a setting</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new ConditionRepository(this.user).findSettingValues(value, function(err, values) {
              if (err) return done(err);

              return done(err, Enumerable.from(values).select(map).toArray());
          });
        },

        findUiValues: function(value, map, done) {
            ///<summary>Finds ui values</summary>
            ///<param name="value">Value of a setting</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new ConditionRepository(this.user).findUiValues(value, function(err, values) {
              if (err) return done(err);

              return done(err, Enumerable.from(values).select(map).toArray());
          });
        },

        findApiValues: function(value, map, done) {
            ///<summary>Finds setting values</summary>
            ///<param name="value">Value of a setting</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new ConditionRepository(this.user).findApiValues(value, function(err, values) {
              if (err) return done(err);

              return done(err, Enumerable.from(values).select(map).toArray());
          });
        }
    });

module.exports = ConditionService;