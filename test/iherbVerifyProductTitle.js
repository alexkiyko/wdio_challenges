import { expect } from 'chai';

describe('', function () {

  before('open page', function () {
    // browser.maximizeWindow();
    browser.url('https://www.iherb.com/');
    // browser.pause(1000);
  });

  it('should search for product', function () {
    $('//input[@id="txtSearch"]').click();
    $('//input[@id="txtSearch"]').setValue('msm glucosamine');
    $('//button[@id="searchBtn"]').click();
    browser.pause(1000);
    console.log($('//h1[@class="sub-header-title search"]').getText());
    expect($('//h1[@class="sub-header-title search"]').getText()).equals('Search Results for "msm glucosamine"')
  });


  it('should get product name', function () {
    let actualProductName = $('(//div[@class="product ga-product"])[1]//div[@class="product-title"]').getText();
    console.log(actualProductName);

    const products = $$('(//div[@class="product ga-product"])');
    // const product = $('(//div[@class="product ga-product"])');
    for (let i = 1; i <= products.length - 20; i++) {
      let productName = $(`(${'(//div[@class="product ga-product"])'})[${i}]//div[@class="product-title"]`).getText();
      $(`(${'(//div[@class="product ga-product"])'})[${i}]`).scrollIntoView();
      $(`(${'(//div[@class="product ga-product"])'})[${i}]`).click({ button: "left", x: 60 });
      browser.pause(1000 );
      console.log($('(//h1[@id="name"])[2]').getText());
      browser.back();
      browser.pause(500);
    }

    // $('(//div[@class="product ga-product"])[1]').click({ button: "left", x: 30, y: 30 });
    // browser.pause(3000);
    // let expected = $('(//h1[@id="name"])[2]').getText();
    // expect(actualProductName).equals(expected);

  });



});
