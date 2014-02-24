
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').__express);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('dsaklkdl;sak90ui4op3jkl30io9p43l;kasd'));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/js', express.static(path.join(__dirname, 'public/js')));
app.use('/public/js/angular', express.static(path.join(__dirname, 'public/js/angular')));
app.use('/public/css', express.static(path.join(__dirname, 'public/css')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var users = require('./services/users');
passport.use(new PassportLocalStrategy(users.authenticate));
passport.serializeUser(users.serializeUser);
passport.deserializeUser(users.deserializeUser);

require('./routes/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
