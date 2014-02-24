exports.register = function (app, passport) {
    app.get('/', this.index);
};

exports.index = function (req, res) {
    res.render('home/index');
};