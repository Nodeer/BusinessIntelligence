var application = require('./application'),
    app = new application.Application(),
    user = new application.User(app),
    ptor = protractor.getInstance();

describe('an User', function() {
    it('should see error message if he used an incorrect login', function() {
        browser.get('/');

        user.signin('badlogin@host.com', 'badpassword');

        expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
        expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        expect(app.alerts.danger.getText()).toBe('Login failed.');
    });

    it('should see able to sign in with valid email / password', function() {
        user.signinAsAdmin();

        expect(app.navigation.profile.signin.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signout.isPresent()).toBeTruthy();
    });

    it('able to search', function() {
        expect(app.home.search.self.isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign in', function() {
        user.signout().then(function() {
            expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
            expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        });
    });
});