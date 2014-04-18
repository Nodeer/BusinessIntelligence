var View = require('../views/view'),
    route = require('./route'),
    extend = require('extend');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/', route.public(), exports.index);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>

    var view = new View('home/index');
    return view.render(req, res);
};

