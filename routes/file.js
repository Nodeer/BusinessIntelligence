var route = require('./route'),
    fs = require('fs');

exports.register = function (app) {
    ///<summary>Registeres routes</summary>
    ///<param name="app">Application</param>

    app.get('/image/:path', route.private(), exports.getImage);

    return this;
};

exports.getImage = function (req, res, next) {
    ///<summary>Default view</summary>
    return res.sendfile(req.params.path);
};
