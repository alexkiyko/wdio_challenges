const {expect} = require('chai');

/**
  Go to https://www.webstaurantstore.com/
  Search for ‘stainless work table’.
  Check the search result ensuring every product item has the word ‘Table’ its title.
  Add the last of found items to Cart.
  Empty Cart.
 */

const selectors = {
  header: '//div[@class="global-banner container"]',
  searchButton: '//button[@class="btn btn-info banner-search-btn"]',
  searchInputField: '//input[@id="searchval"]',
  productsList: '//div[@id="product_listing"]',
  pages: '//div[contains(@class,"pagination")]/ul/li',
  products: '//div[@id="product_listing"]//div[@class="details"]',
  nextButton: '//div[@id="paging"]//ul/li[last()]',
  lastProduct: '//div[@id="productBox60"]',
  addToCartButton: '//div[@id="productBox60"]//input[@name="addToCartButton"]',
  shoppingCartButton: '//a[contains(text(),"View Cart")]',
  itemsInCart: '//input[contains(@class,"quantityInput")]',
  emptyCartButton: '//a[contains(@class,"emptyCartButton")]',
  modalWindowEmptyCartButton: '//div[@class="modal-dialog"]//button[contains(text(),"Empty Cart")]',
  emptyCartMessage: '//div[@class="empty-cart__text"]//p[@class="header-1"]',
};

function click(button) {
  button.waitForDisplayed({ timeout: undefined });
  button.click();
}

function loadPage(url) {
  browser.maximizeWindow();
  browser.url(url);
  $(selectors.header).waitForDisplayed({ timeout: undefined });
}

function searchForProduct(product) {
  $(selectors.searchInputField).setValue(product);
  click($(selectors.searchButton));
  $(selectors.productsList).waitForDisplayed({ timeout: undefined });
}

function addProductToCart(product) {
  product.waitForDisplayed({ timeout: undefined });
  click($(selectors.addToCartButton));
}

function getItemsInCart() {
  $(selectors.itemsInCart).waitForDisplayed({ timeout: undefined });
  return $(selectors.itemsInCart).getValue();
}

function getElementText(element) {
  element.waitForDisplayed({ timeout: undefined });
  return element.getText();
}


describe('Add product to shopping cart', () => {
  it('load page and search for product', function () {
    loadPage('https://www.webstaurantstore.com/');
    searchForProduct('stainless work table');
    expect($(selectors.productsList).isDisplayed()).to.be.true;
  });

  it('should loop through pages and check every product has "Table" in the title', () => {
    let countPages = 0;
    for (let i = 0; i < $$(selectors.pages).length; i++){
      countPages++;
      $$(selectors.products).forEach(product => {
        if (!product.getText().includes('Table')) {
          console.error('Product:' + product.getText(), 'PAGE:' + countPages);
        }
      });
      click($(selectors.nextButton));
    }
  });

  it('should add last product to the cart and verify its in there', function () {
    addProductToCart($(selectors.lastProduct));
    click($(selectors.shoppingCartButton));
    expect(getItemsInCart()).to.equal('1');
  });

  it('should empty the cart', function () {
    click($(selectors.emptyCartButton));
    click($(selectors.modalWindowEmptyCartButton));
    expect(getElementText($(selectors.emptyCartMessage))).to.contains('Your cart is empty.');
  });
});
