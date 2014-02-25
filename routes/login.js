exports.register = function (app, passport) {

    var auth = require('../services/auth');

    app.post('/signin', passport.authenticate('local'), function (req, res) {
        console.log('user=' + req.user.id);
        res.redirect('/');
    });
};