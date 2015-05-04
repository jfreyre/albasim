/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.headingWorkspace = element(by.css('h2.view__headding-workspace'));
    this.modal = element(by.css('.modal'));
};

module.exports = new MainPage();