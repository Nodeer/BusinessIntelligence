var Application = function() {
    this.navigation = {
        profile: {
            email: element(by.name('email')),
            password: element(by.name('password')),
            signin: element(by.id('btn-signin')),
            signup: element(by.id('btn-signup')),
            signout: element(by.id('btn-signout'))
        },
        menu: {
            management: {
                self: element(by.css('#navigation-bar #Management')),
                users : element(by.css('#navigation-bar #Users'))
            }
        }
    };

    this.alerts = {
        danger: $('div .alert.alert-danger').$('p')
    };
};

var User = function(app) {
    this.app = app;

    this.signin = function(email, password) {
        ///<summary>Sign in</summary>
        ///<param name="email">Email</param>
        ///<param name="password">Password</param>
        
        this.app.navigation.profile.email.sendKeys(email);
        this.app.navigation.profile.password.sendKeys(password);
        this.app.navigation.profile.signin.sendKeys(protractor.Key.ENTER);
    };

    this.signinAsAdmin = function() {
        return this.signin("admin@host.com", "a");
    };

    this.signup = function(email, password) {
        ///<summary>Sign up</summary>
        ///<param name="email">Email</param>
        ///<param name="password">Password</param>

        this.app.navigation.profile.email.sendKeys(email);
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
        user.signin('badlogin@host.com', 'badpassword');

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        expect(app.alerts.danger.getText()).toBe('Login failed.');
    });

    it('should see an error message if login is already used during signup', function() {
        user.signup('used@host.com', 'doesnotmatter');

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        expect(app.alerts.danger.getText()).toBe('The user is already exists.');
    });

    it('should see able to sign in with valid email / password', function() {
        user.signin('used@host.com', 'password');

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
        user.signup('testemail' + (new Date().getTime()) + '@host.com', 'testpassword');

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

    it('from Administrator group can see management section', function() {
        user.signinAsAdmin();

        expect(app.navigation.menu.management.self.isPresent()).toBeTruthy();

        describe('management section is correct', function() {
            it('and users link is presented', function() {
                expect(app.navigation.menu.management.users.isPresent()).toBeTruthy();
            });
        });
    });

    it('with Administrator group can access manage users page', function() {
        // TODO
    });

    it('with Administrator group can access manage users page and reload it multiple times', function() {
        // TODO
    });
});