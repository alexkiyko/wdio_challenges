import { expect } from 'chai';

const URL = 'https://www.trademe.co.nz/';
const NAV_BAR = '//div[@id="SiteNavigation"]';
const SEARCH_INPUT = '//input[@id="searchString"]';
const SEARCH_BTN = '//button[@type="submit" and @value="Search"]';
const SEARCH_RESULT = '//div[@id="FiltersContainer"]/h1';


const SEARCH_FOR = (item) => {
  $(SEARCH_INPUT).setValue(item);
  $(SEARCH_BTN).click();
  $(SEARCH_RESULT).waitForDisplayed({ timeout:5000 });
};

describe('', function () {

  it('should ', function () {
    browser.url(URL);
    browser.waitUntil(
      () => $(NAV_BAR).isDisplayed() === true,
      {
        timeout: 5000,
        timeoutMsg: 'Fail to load page:'
      }
    )
  });

  it('should ', function () {
    SEARCH_FOR('milk jug');
    expect($(SEARCH_RESULT).getText()).equals(`Search results for 'milk jug'`)
  });

});
