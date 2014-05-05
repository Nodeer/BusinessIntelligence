var UserService = require('../services/user'),
    View = require('../views/view'),
    User = require('../models/user'),
    logger = require('../logger').getLogger('routes/profile'),
    route = require('./route'),
    extend = require('extend');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    app.get('/profile/index', route.private(), exports.index);
    app.post('/profile/user.json', route.private(), exports.saveUser);

    return this;
};

exports.index = function (req, res, next) {
    ///<summary>Default view</summary>
    
    var view = new View('profile/index');
    return view.render(req, res, next, {
        title: "Profile"
    });
};

exports.saveUser = function(req, res) {
    var userDto = req.body;

    return new UserService().save(req.user, userDto, function(err, user) {
        if (err) {
            logger.error(err);

            return res.send(500);
        }

        return res.json(user);
    });
};
