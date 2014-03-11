describe('an user', function() {
    browser.get('/');

    it('should see error message if he used an incorrect login', function() {
        element(by.name('username')).sendKeys('incorrectLogin');
        element(by.name('password')).sendKeys('incorrectPassword');
        element(by.id('btn-signin')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signout')).isPresent()).toBeFalsy();
        expect(element(by.css('div .alert.alert-danger > p')).getText()).toBe('Login failed.');
    });

    it('should see an error message if login is already used during signup', function() {
        element(by.name('username')).sendKeys('asd');
        element(by.name('password')).sendKeys('doesnotmatter');
        element(by.id('btn-signup')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signout')).isPresent()).toBeFalsy();
        expect(element(by.css('div .alert.alert-danger > p')).getText()).toBe('The user is already exists.');
    });

    it('should see able to sign in with valid username / password', function() {
        element(by.name('username')).sendKeys('asd');
        element(by.name('password')).sendKeys('asd');
        element(by.id('btn-signin')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeFalsy();
        expect(element(by.id('btn-signup')).isPresent()).toBeFalsy();
        expect(element(by.id('btn-signout')).isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign in', function() {
        element(by.id('btn-signout')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signup')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signout')).isPresent()).toBeFalsy();
    });

    it('should see able to sign up', function() {
        element(by.name('username')).sendKeys('testusername' + (new Date().getTime() / 1000));
        element(by.name('password')).sendKeys('testpassword');

        element(by.id('btn-signup')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeFalsy();
        expect(element(by.id('btn-signup')).isPresent()).toBeFalsy();
        expect(element(by.id('btn-signout')).isPresent()).toBeTruthy();
    });

    it('should be able to sign out after sign up', function() {
        element(by.id('btn-signout')).sendKeys(protractor.Key.ENTER);

        expect(element(by.id('btn-signin')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signup')).isPresent()).toBeTruthy();
        expect(element(by.id('btn-signout')).isPresent()).toBeFalsy();
    });
});