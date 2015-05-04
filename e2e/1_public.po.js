/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.h1El = element(by.css('h1'));
    this.h2El = element(by.css('h2'));

    this.signupForm = element(by.css('form[ng-submit="publicSignupCtrl.signup()"]'));
    this.signupBtn = element(by.css('[ui-sref="wegas.public.signup"]'));


    this.remindForm = element(by.css('form[ng-submit="publicPasswordCtrl.remindPassword()"]'));
    this.remindBtn = element(by.css('[ui-sref="wegas.public.password"]'));
};

module.exports = new MainPage();