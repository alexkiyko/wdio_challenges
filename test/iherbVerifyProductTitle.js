/*
go to https://www.iherb.com
search for any product
from the result list take first 10 products on the page
open the product and verify product has correct title
 */

import { expect } from 'chai';

const sel = {
  searchInput: '//input[@id="txtSearch"]',
  searchButton: '//button[@id="searchBtn"]',
  productsDisplay: '//div[@class="panel"]',
  searchResultText: '//h1[@class="sub-header-title search"]',
  productsOnSale: '//div[@id="carousel-trending"]',
};

function searchForProduct(product) {
  $(sel.searchInput).setValue(product);
  $(sel.searchButton).click();
  waitForLoading($(sel.productsDisplay));
}

function waitForLoading(selector) {
  browser.waitUntil( () => selector.isDisplayed(),
    { timeout: 5000 });
}



describe('iherb.com', function () {

  before('open home page', function () {
    browser.maximizeWindow();
    browser.url('https://www.iherb.com/');
    waitForLoading($(sel.productsOnSale));
  });

  it('search for product', function () {
    searchForProduct('msm glucosamine');
    // console.log($(sel.searchResultText).getText());
    expect($(sel.searchResultText).getText()).equals('Search Results for "msm glucosamine"')
  });

  it('should verify product title', function () {
    const products = $$('(//div[@class="product ga-product"])');
    for (let i = 1; i <= products.length - 14; i++) {
      let actualProductName = browser.$(`(${'(//div[@class="product ga-product"])'})[${i}]//div[@class="product-title"]`).getText();
      let expectedProductName = browser.$('(//h1[@id="name"])[2]');
      // console.log(actualProductName);
      let product = $(`(${'(//div[@class="product ga-product"])'})[${i}]`);
      product.scrollIntoView();
      product.click({ button: "left", x: 60 });
      waitForLoading(expectedProductName);
      // console.log(expectedProductName.getText());
      expect(actualProductName).equals(expectedProductName.getText());
      browser.back();
      waitForLoading($(sel.productsDisplay));
    }
  });
});
