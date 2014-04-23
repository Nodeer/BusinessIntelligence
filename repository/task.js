var Base = require('./base'),
    Task = require('../models/task');

var TaskRepository = Base.extend(function () { })
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
        }
    });

module.exports = TaskRepository;