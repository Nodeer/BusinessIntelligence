var View = require('../views/view');

exports.register = function (app, passport) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>
    ///<param name="passport">Passport</param>

    app.get('/', this.index);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>
    
    var view = new View('home/index');
    return view.render(req, res);
};