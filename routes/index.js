var View = require('../views/view'),
    route = require('./route'),
    extend = require('extend');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/', route.public(), exports.index);
    app.get('/about', route.public(), exports.about);

    return this;
};

exports.index = function (req, res) {
    ///<summary>Default view</summary>

    var view = new View('home/index');
    return view.render(req, res, {
        title: "Home"
    });
};

exports.about = function (req, res) {
    ///<summary>About view</summary>

    var view = new View('home/about');
    return view.render(req, res, {
        title: "About"
    });
};

