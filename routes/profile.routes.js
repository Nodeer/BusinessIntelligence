var AuthService = require('../services/auth.service'),
    UserService = require('../services/user.service'),
    View = require('../views/view'),
    User = require('../models/user'),
    logger = require('../logger').getLogger();

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    var authService = new AuthService();

    app.get('/profile/index', authService.authenticate, authService.authorizate, exports.index);

    app.get('/profile/user.json', authService.authenticate, authService.authorizate, exports.getUser);

    app.post('/profile/user.json', authService.authenticate, authService.authorizate, exports.saveUser);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>
    
    var view = new View('profile/index');
    return view.render(req, res);
};

exports.getUser = function(req, res) {
    return res.json(req.user);
};

exports.saveUser = function(req, res) {
    var userDto = req.body,
        userService = new UserService();

    userService.save(req.user, userDto, function(err, user) {
        if (err) {
            logger.error(err);

            return res.send(500);
        }

        return res.json(user);
    });
};
