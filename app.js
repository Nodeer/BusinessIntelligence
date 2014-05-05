
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') == 'development') {
    
} else {
    app.enable('view cache');
}

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_KEY || 'dsaklkdl;sak90ui4op3jkl30io9p43l;kasd'));
app.use(express.session());

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/bower_components'));

app.use('/logs', express.static(__dirname + '/logs'));
app.use('/logs', express.directory(__dirname + '/logs'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);

var logger = require('./logger');
logger.configure(app);

process.on('uncaughtException', function(err) {
    // handle the error safely
    logger.getLogger().error(err);
});

require('./routes/context').register(app, passport);

var UserService = require('./services/user');
var user_service = new UserService();

passport.use(new PassportLocalStrategy({
     usernameField: 'email'
}, user_service.authenticateUser));
passport.serializeUser(user_service.serializeUser);
passport.deserializeUser(user_service.deserializeUser);

var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.mongodb.connectionString);

console.log(mongoose.connection.host);
console.log(mongoose.connection.port);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
