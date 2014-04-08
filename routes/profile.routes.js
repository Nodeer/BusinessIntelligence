var AuthService = require('../services/auth.service'),
    UserService = require('../services/user.service'),
    View = require('../views/view'),
    User = require('../models/user');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    var auth_service = new AuthService();

    app.get('/profile/index', auth_service.authenticate, auth_service.authorizate, exports.index);

    app.get('/profile/user.json', auth_service.authenticate, auth_service.authorizate, exports.getUser);

    app.post('/profile/user.json', auth_service.authenticate, auth_service.authorizate, exports.saveUser);

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
    var user = new User(req.body),
        userService = new UserService();
    userService.save(user, function(err, user) {
        if (err) {
            return res.send(500);
        }

        return res.json(user);
    });
};
