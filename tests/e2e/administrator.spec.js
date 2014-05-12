var application = require('./application'),
    app = new application.Application(),
    user = new application.User(app),
    ptor = protractor.getInstance();

describe('an Administrator', function() {
    it('should see able to sign in with valid email / password', function() {
        browser.get('/');

        user.signinAsAdmin();

        expect(app.navigation.profile.signin.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signout.isPresent()).toBeTruthy();
    });

    it('able to search', function() {
        expect(app.home.search.self.isPresent()).toBeTruthy();
    });

    it('can see management section', function() {
        expect(app.navigation.menu.management.self.isPresent()).toBeTruthy();
    });

    it('management section has users link', function() {
        app.navigation.menu.management.self.click();

        expect(app.navigation.menu.management.users.isPresent()).toBeTruthy();

        app.navigation.menu.management.self.click();
    });

    it('should be able to sign out after sign in', function() {
        user.signout().then(function() {
            expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
            expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        });
    });
});

