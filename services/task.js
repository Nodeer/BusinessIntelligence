var Task = require('../models/task'),
    Condition = require('../models/condition'),
    ConditionRepository = require('../repository/condition'),
    TaskRepository = require('../repository/task'),
    Base = require('./base'),
    klass = require('klass'),
    extend = require('extend'),
    logger = require('../logger').getLogger('services/task'),
    util = require('util'),
    Enumerable = require('linq');


var TaskService = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
        findConditionsByName: function(name, map, done) {
            ///<summary>Finds conditions by name</summary>
            ///<param name="name">Name of a conditions</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

          return new ConditionRepository().findByName(name, function(err, conditions) {
              if (err) return done(err);

              return done(err, Enumerable.from(conditions).select(map).toArray());
          });
        },

        getConditionById: function(id, map, done) {
            ///<summary>Gets condition by id</summary>
            ///<param name="name">Condition identifier</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

          return new ConditionRepository().getById(id, function(err, condition) {
              if (err) return done(err);

              return new TaskRepository(this.user).getByIds(condition.dependencies, function(err, tasks) {
                  if (err) return done(err);
                  
                  return done(err, map(condition, tasks));
              });
          });
        },

        findTasksByName: function(name, map, done) {
            ///<summary>Finds tasks by name</summary>
            ///<param name="name">Name of a dependency</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

          return new TaskRepository(this.user).findByName(name, function(err, tasks) {
              if (err) return done(err);

              return done(err, Enumerable.from(tasks).select(map).toArray());
          });
        },

        createTask: function(taskDto, done) {
            ///<summary>Creates task</summary>
            ///<param name="taskDtor">Task DTO</param>
            ///<param name="done">Done callback</param>
            
            return new TaskRepository(this.user).create(taskDto, done);
        }
    });

module.exports = TaskService;