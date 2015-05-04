'use strict';

var rootUrl = "http://localhost:8080/dist";
var Chance = require('chance');
var chance = new Chance();

function login_as_trainer() {
    browser.get(rootUrl + '/');

    var loginInput = browser.driver.findElement(by.id('login'));
    loginInput.sendKeys('trainer@mail.com');

    var passwordInput = browser.driver.findElement(by.id('password'));
    passwordInput.sendKeys('kalle123');

    var form = browser.driver.findElement(by.css('form[ng-submit="login()"]'));
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



describe('Trainer authenticated part', function() {
    var page;

    beforeEach(function() {
        page = require('./3_trainer.po');
        login_as_trainer();
        browser.get(rootUrl + '/#/trainer');
    });

    afterEach(function() {
        logout();
    });

    it('is the trainer workspace', function() {
        expect(page.headingWorkspace.getText()).toBe('Trainer workspace');
    });

    it('should be able to edit his profile', function() {
        element(by.css('[ng-click="editProfile()"]')).click().then(function() {
            expect(page.modal.isPresent()).toBe(true);

            var firstname = element(by.css('[ng-model="user.account.firstname"]'));
            expect(firstname.getAttribute('value')).toBe('Fake trainer');

            var form = element(by.css('[ng-submit="updateInformations()"]'));

            form.submit().then(function() {
                expect(page.modal.isPresent()).toBe(false);
            });
        });
    });


    it('should not be able to join a scenarist url', function() {

        var scenaristUrls = [
            '/#/scenarist',
            '/#/scenarist/8002/customize',
            '/#/scenarist/8002/coscenarists',
            '/#/scenarist/8002/history'
        ];

        for (var i = scenaristUrls.length - 1; i >= 0; i--) {
            var url = scenaristUrls[i];

            browser.get(rootUrl + url);

            browser.driver.sleep(500);

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/trainer');
            expect(page.modal.isPresent()).toBe(false);
        }
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

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/trainer');
            expect(page.modal.isPresent()).toBe(false);

        }
    });

    // it('should be able to create, archive and delete a session', function() {
    //     // Register a new locator
    //     by.addLocator('cardsTitle', function(title, opt_parentElement, opt_rootSelector) {
    //         // This function will be serialized as a string and will execute in the
    //         // browser. The first argument is the text for the button. The second
    //         // argument is the parent element, if any.
    //         var using = opt_parentElement,
    //             cards = using.querySelectorAll('.card');

    //         // Return an array of cards with the text.
    //         return Array.prototype.filter.call(cards, function(card) {
    //             return card.querySelectorAll('.line.line--primary').textContent === title;
    //         });
    //     });

    //     var input = element(by.model('newSession.name'));
    //     var newSessionName = chance.string();

    //     input.sendKeys(newSessionName);

    //     // select an empty template
    //     element(by.css('#scenario-template option:nth-child(2)')).click();


    //     var form = element(by.css('form[ng-submit="addSession()"]'))

    //     form.submit().then(function) {
    //         browser.driver.sleep(500);
    //         browser.waitForAngular();


    //         var newGame = var joinedGame = element(by.cardsTitle(newSessionName));



    //     });

    // });

});