'use strict';

var rootUrl = "http://localhost:8080/dist";


function login_as_scenarist() {
    browser.get(rootUrl + '/');

    var loginInput = element(by.id('login'));
    loginInput.sendKeys('scenarist@mail.com');

    var passwordInput = element(by.id('password'));
    passwordInput.sendKeys('kalle123');

    var form = element(by.css('form[ng-submit="login()"]'));
    form.submit().then(function() {
        browser.driver.sleep(500);
        browser.waitForAngular();
    });
}

function logout() {

    browser.get(rootUrl + '/');

    element(by.css('a.button--sign-out[ng-click="logout()"]')).click();

    browser.driver.sleep(500);
    browser.waitForAngular();
}


describe('Scenarist Authenticated part', function() {
    var page;

    beforeEach(function() {
        page = require('./4_scenarist.po');
        login_as_scenarist();
        browser.get(rootUrl + '/#');
    });

    afterEach(function() {
        logout();
    });


    it('is the scenarist workspace', function() {
        expect(page.headingWorkspace.getText()).toBe('Trainer workspace');
    });

    it('should be able to edit his profile', function() {
        element(by.css('[ng-click="editProfile()"]')).click().then(function() {
            expect(page.modal.isPresent()).toBe(true);

            var firstname = element(by.css('[ng-model="user.account.firstname"]'));
            expect(firstname.getAttribute('value')).toBe('Fake scenarist');

            var form = element(by.css('[ng-submit="updateInformations()"]'));

            form.submit().then(function() {
                expect(page.modal.isPresent()).toBe(false);
            });
        });
    });


    it('should not be able to join an admin url', function() {

        var adminUrl = [
            '/#/admin',
            '/#/admin/users',
            '/#/admin/users/1',
            '/#/admin/groups',
        ];

        for (var i = adminUrl.length - 1; i >= 0; i--) {
            var url = adminUrl[i];

            browser.get(rootUrl + url);

            browser.driver.sleep(500);

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/scenarist');
            expect(page.modal.isPresent()).toBe(false);

        }
    });


});