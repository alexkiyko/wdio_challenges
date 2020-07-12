const { expect } = require('chai');

const el = {
  searchBar: '//input[@id="twotabsearchtextbox"]',
  searchButton: '//input[@type="submit"]',
  primeCheckbox: '//div[@id="primeRefinements"]//i[contains(@class,"a-icon-checkbox")]',
  nextButton: '//ul[@class="a-pagination"]//a[text() = "Next"]',
  addToCartButton: '//input[@id="add-to-cart-button"]',
  cart: '//a[@id="nav-cart"]',
  cartItemsCount: '//span[@id="nav-cart-count"]',
  productName: '//span[contains(@class, "sc-product-title")]',
  products: '//div[@data-index]',
  origPrice: '//span[@class = "a-price a-text-price"]',
};



describe('Amazon -> search for product with maximum discount price', () => {
  before(() => {
    browser.maximizeWindow();
    browser.url('https://www.amazon.com/');
  });

  it('should search for product', () => {
    $(el.searchBar).waitForDisplayed({ timeout: 5000 });
    $(el.searchBar).setValue('padlock');
    $(el.searchButton).click();
    $(el.primeCheckbox).click();
  });

  let maxDiscountPercent = 0;
  let maxDiscountProductLink;
  let maxDiscountProductName = '';

  // it('should find the product with the maximum discount %', () => {
  //
  //   /**
  //     the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
  //     it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
  //     the product with the highest discount percentage on a page
  //    */
  //
  //   while ( true ) {
  //     $(el.products).waitForDisplayed({ timeout: 5000 });
  //     for (let i = 1; i <= $$(el.products).length; i++) {
  //       if ($(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).isExisting()) {
  //         const originalPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
  //         const discountPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
  //         const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
  //         if (+discountPercent > maxDiscountPercent) {
  //           maxDiscountPercent = +discountPercent;
  //           maxDiscountProductLink = $(`(${'//div[@data-index]'})[${i}]//h2/a`).getAttribute('href');
  //           maxDiscountProductName = $(`(${'//div[@data-index]'})[${i}]//h2`).getText();
  //         }
  //       }
  //     }
  //     if ($(el.nextButton).isClickable()) {
  //       $(el.nextButton).click();
  //     } else {
  //       break;
  //     }
  //   }
  // });

  it('should find the product with the maximum discount %', () => {

    /**
      the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
      it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
      the product with the highest discount percentage on a page
     */

    while ( true ) {
      $(el.products).waitForDisplayed({ timeout: 5000 });

      // for (let i = 0; i < $$(el.origPrice).length; i++) {
      //   // if ($(el.origPrice).isExisting()) {
      //     console.log($(el.origPrice)[i].getText());
      //     // const originalPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price a-text-price"]`).getText().slice(1);
      //     // const discountPrice = $(`(${'//div[@data-index]'})[${i}]//span[@class = "a-price"]`).getText().replace(/\s/g, '.').slice(1);
      //     // const discountPercent = (+originalPrice / +discountPrice).toFixed(2);
      //     // if (+discountPercent > maxDiscountPercent) {
      //     //   maxDiscountPercent = +discountPercent;
      //     //   maxDiscountProductLink = $(`(${'//div[@data-index]'})[${i}]//h2/a`).getAttribute('href');
      //     //   maxDiscountProductName = $(`(${'//div[@data-index]'})[${i}]//h2`).getText();
      //     // }
      //   // }
      // }
      let count = 0;

      $$(el.origPrice).forEach($(el.origPrice) => {
        if($(p))
        count++;
        console.log($(p));
      });
      console.log(count);


      if ($(el.nextButton).isClickable()) {
        $(el.nextButton).click();
      } else {
        break;
      }
    }
  });

  // it('should open the product with maximum discount and add to cart', () => {
  //   browser.url(maxDiscountProductLink);
  //   $(el.addToCartButton).waitForDisplayed({ timeout: 5000 });
  //   $(el.addToCartButton).click();
  //   expect($(el.cartItemsCount).getText()).equals('1');
  // });
  //
  // it('should verify correct product added to cart', () => {
  //   $(el.cart).click();
  //   expect(maxDiscountProductName).equals($(el.productName).getText());
  // });
});
