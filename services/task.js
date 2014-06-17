var Task = require('../models/task'),
    Condition = require('../models/condition'),
    ConditionRepository = require('../repository/condition'),
    UserRepository = require( '../repository/user' );
    TaskRepository = require('../repository/task'),
    Base = require('./base'),
    klass = require('klass'),
    extend = require('extend'),
    logger = require('../logger').getLogger('services/task'),
    util = require('util'),
async = require( 'async' ),
    Enumerable = require('linq');


var TaskService = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
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
            ///<param name="name">Name of a task</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

          return new TaskRepository(this.user).findByName(name, function(err, tasks) {
              if (err) return done(err);

              return done(err, Enumerable.from(tasks).select(map).toArray());
          });
        },

        saveTask: function(taskDto, done) {
            ///<summary>Saves task</summary>
            ///<param name="taskDtor">Task DTO</param>
            ///<param name="done">Done callback</param>
            
            return new TaskRepository(this.user).save(taskDto, function(err, user) {
                if (err) return done(err);

                return done(err, user.toDto());
            });
        },

        findPartnersByName: function(name, map, done) {
            ///<summary>Finds partners by name</summary>
            ///<param name="name">Name of a partner</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

            return new TaskRepository(this.user).findPartnersByName(name, function(err, partners) {
              if (err) return done(err);

              return done(err, Enumerable.from(partners).select(map).toArray());
          });
        },

        getTaskById: function(id, done) {
            ///<summary>Gets task by id</summary>
            ///<param name="id">Task identifier</param>
            ///<param name="done">Done callback</param>
            
            return new TaskRepository(this.user).getById(id, done);
        },

        searchTasks: function(criteria, map, done) {
            ///<summary>Searches tasks</summary>
            ///<param name="criteria">Criteria</param>
            ///<param name="map">Map function</param>
            ///<param name="done">Done callback</param>

          return new TaskRepository(this.user).search(criteria, function(err, tasks) {
              if (err) return done(err);

              return done(err, Enumerable.from(tasks).select(map).toArray());
          });
        },

        findTasks: function (taskCriteria, map, done) {
            return new TaskRepository(this.user).findAllTasks(taskCriteria, function (err, tasks) {
                if (err) return done(err);

                var userRepository = new UserRepository();
                return async.map(tasks, function (task, callback) {
                    return userRepository.getById(task.audit.created_by, function (error, user) {
                        if (error) return callback(error);
                         
                        var owner = (user != null) ? util.format('%s/%s %s', user.email, user.first_name, user.last_name) : "System";
                            
                        return callback(error, {
                            task: task,
                            params: {
                                owner : owner,
                                created_date : task.audit.created_date 
                            }
                        });
                    });

                }, function (error, results) {
                        return done(error, Enumerable.from(results).select(function(result) {
                            return map(result.task, result.params);
                        }).toArray());
                   });
            });
        },

        findProducerTasksByCondition: function(conditionId, map, done) {
            ///<summary>Finds tasks which produce the condition</summary>

            return new TaskRepository(this.user).findProducerTasksByCondition(conditionId, function(err, tasks) {
                  if (err) return done(err);

                  return done(err, Enumerable.from(tasks).distinct(function(task) {
                      return task.id;
                  }).orderBy(function(task) {
                      return task.name;
                  }).select(map).toArray());
              });
        },

        findConsumerTasksByCondition: function(conditionId, map, done) {
            ///<summary>Finds tasks which consume the condition</summary>

            return new TaskRepository(this.user).findConsumerTasksByCondition(conditionId, function(err, tasks) {
                  if (err) return done(err);

                  return done(err, Enumerable.from(tasks).distinct(function(task) {
                      return task.id;
                  }).orderBy(function(task) {
                      return task.name;
                  }).select(map).toArray());
              });
        },

        calculateMetrics: function(done) {
            ///<summary>Calculates metrics</summary>
            
            var user = this.user;
            return new TaskRepository(user).findTasksCreatedAfter(user.metrics.previous_login_date, function(err, tasks) {
                if (err) return done(err);
                
                return done(err, {
                    newly_added_tasks_count: tasks.length
                });
            });
        }
    });

module.exports = TaskService;