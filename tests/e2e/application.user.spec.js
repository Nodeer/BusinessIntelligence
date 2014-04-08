﻿var Application = function() {
    this.navigation = {
        profile: {
            username: element(by.name('username')),
            password: element(by.name('password')),
            signin: element(by.id('btn-signin')),
            signup: element(by.id('btn-signup')),
            signout: element(by.id('btn-signout'))
        }
    };

    this.alerts = {
        danger: $('div .alert.alert-danger').$('p')
    };
};

var User = function(app) {
    this.app = app;

    this.signin = function(username, password) {
        ///<summary>Sign in</summary>
        ///<param name="username">Username</param>
        ///<param name="password">Password</param>
        
        this.app.navigation.profile.username.sendKeys(username);
        this.app.navigation.profile.password.sendKeys(password);
        this.app.navigation.profile.signin.sendKeys(protractor.Key.ENTER);
    };

    this.signup = function(username, password) {
        ///<summary>Sign up</summary>
        ///<param name="username">Username</param>
        ///<param name="password">Password</param>

        this.app.navigation.profile.username.sendKeys(username);
        this.app.navigation.profile.password.sendKeys(password);
        this.app.navigation.profile.signup.sendKeys(protractor.Key.ENTER);
    };

    this.signout = function() {
        ///<summary>Sign out</summary>
        
        this.app.navigation.profile.signout.sendKeys(protractor.Key.ENTER);
    };
};

describe('an user', function() {
    browser.get('/');

    var app = new Application();
    var user = new User(app);

    it('should see error message if he used an incorrect login', function() {
        user.signin('badlogin', 'badpassword');

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        expect(app.alerts.danger.getText()).toBe('Login failed.');
    });

    it('should see an error message if login is already used during signup', function() {
        user.signup('asd', 'doesnotmatter');

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        expect(app.alerts.danger.getText()).toBe('The user is already exists.');
    });

    it('should see able to sign in with valid username / password', function() {
        user.signin('asd', 'asd');

        expect(app.navigation.profile.signin.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signup.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signout.isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign in', function() {
        user.signout();

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signup.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
    });

    it('should see able to sign up', function() {
        user.signup('testusername' + (new Date().getTime()), 'testpassword');

        expect(app.navigation.profile.signin.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signup.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signout.isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign up', function() {
        user.signout();

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signup.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
    });
});