var AuthService = require('../services/auth.service'),
    View = require('../views/view');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    var auth_service = new AuthService();

    app.get('/profile/index', auth_service.authenticate, auth_service.authorizate, exports.index);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>
    
    var view = new View('profile/index');
    return view.render(req, res);
};
