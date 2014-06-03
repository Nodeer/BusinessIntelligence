var Base = require('./base'),
    Task = require('../models/task'),
    TaskSnapshot = require('../models/task.snapshot'),
    ConditionRepository = require('./condition'),
    Enumerable = require('linq'),
    async = require('async'),
    extend = require('extend');

var TaskRepository = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
        findByName: function(name, done) {
            ///<summary>Finds tasks by name</summary>
            ///<param name="name">Task partial name</param>
            ///<param name="done">Done callback</param>

            return Task.find({
                name: new RegExp(name, 'i')
            }, done);
        },

        getById: function(id, done) {
            ///<summary>Gets task by id</summary>
            ///<param name="id">Task identifier</param>
            ///<param name="done">Done callback</param>

            var user = this.user;
            return Task.findById(id, function(err, task) {
                if (err) return done(err);

                var taskDto = task.toDto();
                return async.parallel([
                    function(callback) {
                        return async.map(task.inputs, function(input, inputCallback) {
                            return new ConditionRepository(user).getByIds(input.conditions, function(err, conditions) {
                                if (err) return inputCallback(err);

                                return inputCallback(err, {
                                    conditions: Enumerable.from(conditions).orderBy(function(condition) {
                                        return condition.id;
                                    }).select(function(condition) {
                                        return condition.toDto();
                                    }).toArray()
                                });
                            });
                        }, function(err, inputs) {
                            if (err) return callback(err);

                            taskDto.inputs = inputs;

                            return callback(err);
                        });
                    },
                    function(callback) {
                        return async.map(task.outputs, function(output, outputCallback) {
                            return new ConditionRepository(user).getByIds(output.conditions, function(err, conditions) {
                                if (err) return outputCallback(err);

                                return outputCallback(err, {
                                    conditions: Enumerable.from(conditions).orderBy(function(condition) {
                                        return condition.id;
                                    }).select(function(condition) {
                                        return condition.toDto();
                                    }).toArray()
                                });
                            });
                        }, function(err, outputs) {
                            if (err) return callback(err);

                            taskDto.outputs = outputs;

                            return callback(err);
                        });
                    }
                ], function(err) {
                    if (err) return done(err);
                    
                    return done(err, taskDto);
                });
            });
        },

        getByIds: function(ids, done) {
            ///<summary>Gets tasks by ids</summary>
            ///<param name="ids">collection of identifiers</param>
            ///<param name="done">Done callback</param>

            return Task.find({
                _id: {
                    $in: ids
                }
            }, done);
        },

        save: function(taskDto, done) {
            ///<summary>Saves task</summary>
            ///<param name="taskDto">Task DTO</param>
            ///<param name="done">Done callback</param>
            
            var user = this.user;
            
            return Task.findById(taskDto.id, function(err, task) {
                task = task || new Task();

                extend(task, {
                    id: taskDto.id,
                    name: taskDto.name,
                    description: taskDto.description,
                    external_id: taskDto.external_id,
                    availability: {
                        availability_type: taskDto.availability.availability_type,
                        partners: taskDto.availability.partners
                    },
                    audit: {
                        modified_date: new Date(),
                        modified_by: user.getIdentity(),
                        revision: task.audit.revision + 1
                    }
                });

                return async.series([
                    function(callback) {
                        return async.mapSeries(Enumerable.from(taskDto.inputs).where(function(input) {
                            return input.conditions.length;
                        }).toArray(), function(input, inputCallback) {
                            return async.mapSeries(input.conditions, function(condition, conditionCallback) {
                                return new ConditionRepository(user).save(condition, conditionCallback);
                            }, function(err, conditions) {
                                if (err) return inputCallback(err);

                                return inputCallback(err, {
                                    conditions: Enumerable.from(conditions).select(function(condition) {
                                        return condition.id;
                                    }).toArray()
                                });
                            });
                        }, function(err, inputs) {
                            if (err) return callback(err);

                            task.inputs = inputs;

                            return callback(err);
                        });
                    },
                    function(callback) {
                        return async.mapSeries(Enumerable.from(taskDto.outputs).where(function(output) {
                            return output.conditions.length;
                        }).toArray(), function(output, outputCallback) {
                            return async.mapSeries(output.conditions, function(condition, conditionCallback) {
                                return new ConditionRepository(user).save(condition, conditionCallback);
                            }, function(err, conditions) {
                                if (err) return outputCallback(err);

                                return outputCallback(err, {
                                    conditions: Enumerable.from(conditions).select(function(condition) {
                                        return condition.id;
                                    }).toArray()
                                });
                            });
                        }, function(err, outputs) {
                            if (err) return callback(err);

                            task.outputs = outputs;

                            return callback(err);
                        });
                    }
                ], function(err) {
                    if (err) return done(err);

                    return task.save(function (err) {
                        if (err) return done(err);

                        return TaskSnapshot.create(task).save(function(err) {
                            return done(err, task);
                        });
                    });
                });
            });
        },

        findPartnersByName: function(name, done) {
            ///<summary>Finds partners by name</summary>
            ///<param name="id">Task partial name</param>
            ///<param name="done">Done callback</param>

            return Task.distinct('availability.partners', function(err, partners) {
                if (err) return done(err);

                return done(err, Enumerable.from(partners).where(function(partner) {
                    return partner.match(new RegExp(name, 'i'));
                }).toArray());
            });
        },

        search: function(criteria, done) {
            ///<summary>Finds tasks by term</summary>
            ///<param name="criteria">Criteria</param>
            ///<param name="done">Done callback</param>

            return async.parallel({
                byName: function(callback){
                    Task.find({
                        name: new RegExp(criteria, 'i')
                    }, callback);
                },
                byDescription: function(callback){
                    Task.find({
                        description: new RegExp(criteria, 'i')
                    }, callback);
                }
            }, function(err, results) {
                if (err) return done(err);

                var tasks = Enumerable.from(results.byName).union(results.byDescription).distinct(function(task) {
                    return task.id;
                }).toArray();
                return done(err, tasks);
            });
        },

        findProducerTasksByCondition: function(conditionId, done) {
            ///<summary>Finds tasks which produce the condition</summary>
            
            return Task.find({ 'outputs.conditions' : conditionId }, done);
        },

        findConsumerTasksByCondition: function(conditionId, done) {
            ///<summary>Finds tasks which consume the condition</summary>
            
            return Task.find({ 'inputs.conditions' : conditionId }, done);
        }
    });

module.exports = TaskRepository;