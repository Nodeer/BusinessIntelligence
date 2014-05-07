var application = require('./application'),
    app = new application.Application(),
    user = new application.User(app),
    ptor = protractor.getInstance();

describe('a Business Analyst', function() {
    it('can see new task link', function() {
        browser.get('/');

        user.signinAsBusinessAnalyst();

        expect(app.navigation.profile.signin.isPresent()).toBeFalsy();
        expect(app.navigation.profile.signout.isPresent()).toBeTruthy();

        expect(app.navigation.menu.newTask.self.isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign in', function() {
        user.signout().then(function() {
            expect(app.navigation.profile.signin.isPresent()).toBeTruthy();
            expect(app.navigation.profile.signout.isPresent()).toBeFalsy();
        });
    });
});
