'use strict';

var rootUrl = "http://localhost:8080/dist";


function login_as_player() {
    browser.get(rootUrl + '/');

    var loginInput = browser.driver.findElement(by.id('login'));
    loginInput.sendKeys('player@mail.com');

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

describe('Player authenticated part', function() {
    var page;

    beforeEach(function() {
        page = require('./2_player.po');

        login_as_player();
        browser.get(rootUrl + "/#");
    });

    afterEach(function() {
        logout();
    });

    // it('is the player workspace', function() {
    //     expect(page.headingWorkspace.getText()).toBe('Player workspace');
    // });

    // it('should contains no scenarios', function() {
    //     var contentWorkspace = element(by.css('.view--sessions-list p'));

    //     expect(contentWorkspace.getText()).toBe('No sessions');
    // });


    // it('should be able to join and leave a game with existing teams', function() {

    //     expect(page.modal.isPresent()).toBe(false);

    //     page.tokenInput.sendKeys("artos15-al");

    //     page.joinForm.submit().then(function() {
    //         expect(page.modal.isPresent()).toBe(true);


    //         var teams = element.all(by.css('a.button[ng-click="joinTeam(team.id)"]'));
    //         teams.count().then(function(nb) {
    //             expect(nb).toBeGreaterThan(0);
    //         });

    //         var firstTeam = element(by.css('.modal__content .card:first-child a[ng-click="joinTeam(team.id)"]'));

    //         firstTeam.click().then(function() {
    //             browser.waitForAngular();
    //             browser.driver.sleep(1500);
    //             expect(page.modal.isPresent()).toBe(false);


    //             // Leaving the game
    //             var gameTitle = element(by.css('.card .line--primary'));
    //             expect(gameTitle.getText()).toBe('Artos15');


    //             var leaveGame = element(by.css('a[confirmed-click="leave(session.id)"]'));

    //             leaveGame.click().then(function() {

    //                 var ptor = protractor.getInstance();
    //                 var alertDialog = ptor.switchTo().alert();

    //                 alertDialog.accept().then(function() {

    //                     var cards = element.all(by.css('.card'));
    //                     cards.count().then(function(numberOfCards) {
    //                         expect(numberOfCards).toBe(0);
    //                     });
    //                 });


    //             });
    //         });


    //     });
    // });


    // it('should be able to edit his profile', function() {
    //     element(by.css('[ng-click="editProfile()"]')).click().then(function() {
    //         expect(page.modal.isPresent()).toBe(true);

    //         var firstname = element(by.css('[ng-model="user.account.firstname"]'));
    //         expect(firstname.getAttribute('value')).toBe('Fake player');

    //         var form = element(by.css('[ng-submit="updateInformations()"]'));

    //         form.submit().then(function() {
    //             expect(page.modal.isPresent()).toBe(false);
    //         });
    //     });
    // });


    it('should not be able to join a trainer url', function() {

        var trainersUrl = [
            '/#/trainer',
            '/#/trainer/1018399/customize',
            '/#/trainer/1018399/users'
        ]

        for (var i = trainersUrl.length - 1; i >= 0; i--) {
            var url = trainersUrl[i];

            browser.get(rootUrl + url);

            browser.driver.sleep(500);

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/player');
            expect(page.modal.isPresent()).toBe(false);
        };
    });



    it('should not be able to join a scenarist url', function() {

        var sceanristUrl = [
            '/#/scenarist',
            '/#/scenarist/8002/customize',
            '/#/scenarist/8002/coscenarists',
            '/#/scenarist/8002/history'
        ]

        for (var i = sceanristUrl.length - 1; i >= 0; i--) {
            var url = sceanristUrl[i];

            browser.get(rootUrl + url);

            browser.driver.sleep(500);

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/player');
            expect(page.modal.isPresent()).toBe(false);
        };
    });

    it('should not be able to join an admin url', function() {

        var adminUrl = [
            '/#/admin',
            '/#/admin/users',
            '/#/admin/users/1',
            '/#/admin/groups',

        ]

        for (var i = adminUrl.length - 1; i >= 0; i--) {
            var url = adminUrl[i];

            browser.get(rootUrl + url);

            browser.driver.sleep(500);

            expect(browser.getCurrentUrl()).toBe(rootUrl + '/#/player');
            expect(page.modal.isPresent()).toBe(false);

        };
    });


});