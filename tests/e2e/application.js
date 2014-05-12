exports.Application = function() {
    this.navigation = {
        profile: {
            email: element(by.name('email')),
            password: element(by.name('password')),
            signin: element(by.id('btn-signin')),
            signout: element(by.id('btn-signout'))
        },
        menu: {
            newTask: {
                self: element(by.css('#navigation-bar #NewTask'))
            },
            management: {
                self: element(by.css('#navigation-bar #Management')),
                users : element(by.css('#navigation-bar #Users'))
            }
        }
    };

    this.alerts = {
        danger: $('div .alert.alert-danger').$('p')
    };

    this.home = {
        search: {
            self: element(by.model('search.criteria'))
        }
    };
};

exports.User = function(app) {
    this.app = app;

    this.signin = function(email, password) {
        ///<summary>Sign in</summary>
        ///<param name="email">Email</param>
        ///<param name="password">Password</param>
        
        this.app.navigation.profile.email.sendKeys(email);
        this.app.navigation.profile.password.sendKeys(password);
        this.app.navigation.profile.signin.click();
    };

    this.signinAsAdmin = function() {
        return this.signin("admin@host.com", "a");
    };

    this.signinAsBusinessAnalyst = function() {
        return this.signin("businessanalyst@host.com", "a");
    };

    this.signout = function() {
        ///<summary>Sign out</summary>
        
        return this.app.navigation.profile.signout.click();
    };
};