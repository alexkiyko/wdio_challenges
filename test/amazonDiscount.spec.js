const { expect } = require('chai');

const el = {
  searchBar: '//input[@id="twotabsearchtextbox"]',
  searchButton: '//input[@type="submit"]',
  dropdownFilter: '//select[@id="searchDropdownBox"]',
  primeCheckbox: '//div[@id="primeRefinements"]//i[contains(@class,"a-icon-checkbox")]',
  nextButton: '//ul[@class="a-pagination"]//a[text() = "Next"]',
  addToCartButton: '//input[@id="add-to-cart-button"]',
  cart: '//a[@id="nav-cart"]',
};

function searchForProduct(product, filter, prime) {
  $(el.searchBar).setValue(product);
  $(el.dropdownFilter).selectByVisibleText(filter);
  $(el.searchButton).click();
  if(prime) {
    $(el.primeCheckbox).click();
  }
}



describe('TEST AMAZON PAGE', () => {
  before(() => {
    browser.maximizeWindow();
    browser.url('https://www.amazon.com/');
  });

  it('should ', function () {
    searchForProduct('google nest hello', 'Electronics', 'prime');
  });

  let maxDiscountPercent = 0;
  let maxDiscountProductLink;
  let productInListTitle;

  it('should find the product with the maximum discount %', () => {

    /**
      the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
      it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
      the product with the highest discount percentage on a page
     */

    while ( true ) {
      browser.pause(1000);
      const products = $$('//div[@data-index]');

      for (let i = 1; i <= products.length; i++) {
        if ($(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).isExisting()) {
          const originalPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
          console.log('original price', originalPrice);
          const discountPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
          console.log('discount price', discountPrice);
          const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
          if (+discountPercent > maxDiscountPercent) {
            maxDiscountPercent = +discountPercent;
            console.log(maxDiscountPercent);
            maxDiscountProductLink = $(`(${'//div[@data-index]'})[${i}]//a`).getAttribute('href');
          }
        }
      }

      if ($(el.nextButton).isClickable()) {
        $(el.nextButton).click();
      } else {
        break;
      }
    }
  });

  it('should open the product with maximum discount and add it to bag', () =>{
    browser.pause(5000);
    browser.url(maxDiscountProductLink);
    browser.pause(5000);
    $(el.addToCartButton).click();
  });

  it('should check that the correct item has been added to the cart', () =>{
    $(el.cart).click();
    // browser.refresh();
    browser.pause(1000);
    const productInCartTitle = browser.$('//div[@data-name="Active Items"]//div[@data-asin]').getAttribute('data-asin');
    expect((productInCartTitle).includes(productInListTitle)).true;
  });

});
