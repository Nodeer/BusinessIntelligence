var View = require('../views/view'),
    route = require('./route');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/', route.public(), exports.index);
    //app.get('/navigation.json', exports.getNavigation);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>
    
    var view = new View('home/index');
    return view.render(req, res);
};