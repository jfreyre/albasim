'use strict';

var rootUrl = "http://localhost:8080/dist";


function login_as_trainer() {
    browser.get(rootUrl + '/');

    var loginInput = browser.driver.findElement(by.id('login'));
    loginInput.sendKeys('trainer@mail.com');

    var passwordInput = browser.driver.findElement(by.id('password'));
    passwordInput.sendKeys('kalle123');

    var form = browser.driver.findElement(by.css("form"))
    var submitBtn = form.findElement(by.css('input[type=submit]'))
    submitBtn.click();

    browser.driver.sleep(500);
    browser.waitForAngular();
}

function logout() {

    browser.get(rootUrl + '/');

    element(by.css('a.button--sign-out[ng-click="logout()"]')).click();

    browser.driver.sleep(500);
    browser.waitForAngular();
}



describe('Trainer authenticated part', function() {
    var page;

    beforeEach(function() {
        page = require('./3_trainer.po');
        login_as_trainer();
        browser.get(rootUrl + '/#');
    });

    afterEach(function() {
        logout();
    });

    it('is the player workspace', function() {
        expect(page.headingWorkspace.getText()).toBe('Trainer workspace');
    });

});