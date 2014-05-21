var Condition = require('../models/condition'),
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
        findValues: function(name, value, map, done) {
            ///<summary>Finds setting values</summary>
            ///<param name="value">Value of a setting</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new ConditionRepository(this.user).findValues(name, value, function(err, values) {
              if (err) return done(err);

              return done(err, Enumerable.from(values).select(map).toArray());
          });
        }
    });

module.exports = ConditionService;