var Base = require('./base'),
    Task = require('../models/task'),
    TaskSnapshot = require('../models/task.snapshot');

var TaskRepository = Base.extend(function (user) {
        this.user = user;
    })
    .methods({
        findByName: function(name, done) {
            ///<summary>Finds tasks by name</summary>
            ///<param name="id">Task partial name</param>
            ///<param name="done">Done callback</param>

            return Task.find({
                name: new RegExp(name, 'i')
            }, done);
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

        create: function(taskDto, done) {
            ///<summary>Creates task</summary>
            ///<param name="taskDto">Task DTO</param>
            ///<param name="done">Done callback</param>
            
            var user = this.user;
            var task = new Task({
                name: taskDto.name,
                description: taskDto.description,
                external_id: taskDto.external_id,
                availability: {
                    type: taskDto.availability.type,
                    partners: taskDto.availability.partners
                },
                audit: {
                    modified_date: new Date(),
                    modified_by: user.getIdentity()
                }
            });

            return task.save(function (err) {
                return done(err, task);
            });

        }
    });

module.exports = TaskRepository;