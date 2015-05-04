'use strict';

var rootUrl = "http://localhost:8080/dist";


describe('Unauthenticated Part', function () {
  var page;


  beforeEach(function () {
    page = require('./1_public.po');

    browser.get(rootUrl + '/');

    // Should we logout before doing public asserts ?
    element.all(by.css('a.button--sign-out')).count().then(function(count) {

      if (count > 0) {
        element(by.css('a.button--sign-out')).click();
      }
      browser.driver.sleep(500);
      browser.waitForAngular();

    });
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Wegas');
    expect(page.h2El.getText()).toBe('The "learning by doing" solution from ALBASIM');

    expect(browser.getTitle()).toEqual('Wegas - Web game authoring system');
  });

  it('should contain a signup form', function () {
    page.signupBtn.click();

    expect(page.signupForm.isPresent()).toBe(true);
  });

  it('should contain a remember password form', function () {
    page.remindBtn.click();

    expect(page.remindForm.isPresent()).toBe(true);
  });

});


