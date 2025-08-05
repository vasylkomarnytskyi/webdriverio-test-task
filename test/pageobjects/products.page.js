class ProductsPage {
  get inputFirstName() {
    return $('#first-name');
  }
  get title() {
    return $('.title');
  }
  get inputLastName() {
    return $('#last-name');
  }

  get inputZipCode() {
    return $('#postal-code');
  }

  get continueButton() {
    return $('#continue');
  }

  get finishButton() {
    return $('#finish');
  }

  get backHomeButton() {
    return $('#back-to-products');
  }

  get linkedinButton() {
    return $('.social_linkedin');
  }

  get twitterButton() {
    return $('.social_twitter');
  }

  get facebookButton() {
    return $('.social_facebook');
  }

  get burgerMenu() {
    return $('#react-burger-menu-btn');
  }

  get logoutButton() {
    return $('#logout_sidebar_link');
  }

  get addToCartButton() {
    return $('#add-to-cart-sauce-labs-backpack');
  }

  get addToCartButton1() {
    return $('#add-to-cart-sauce-labs-bike-light');
  }

  get cartButton() {
    return $('.shopping_cart_link');
  }

  get checkoutButton() {
    return $('.checkout_button');
  }

  get sortSelect() {
    return $('.product_sort_container');
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  get cartItems() {
    return $$('.cart_item');
  }

  get productNames() {
    return $$('.inventory_item_name');
  }

  get productPrices() {
    return $$('.inventory_item_price');
  }

  async addToCart(product = 'backpack') {
    if (product === 'backpack') {
      await this.addToCartButton.click();
    } else if (product === 'bike light') {
      await this.addToCartButton1.click();
    }
  }

  async openCart() {
    await this.cartButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async clickAllSocialButtons() {
    await this.linkedinButton.click();
    await this.twitterButton.click();
    await this.facebookButton.click();
  }

  async fillCheckoutForm(firstName, lastName, zipCode) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputZipCode.setValue(zipCode);
  }

  async selectSortOption(option) {
    return this.sortSelect.selectByVisibleText(option);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutButton.waitForDisplayed();
    await this.logoutButton.click();
  }

  async getCartItemsCount() {
    return this.cartItems.length;
  }

  async isErrorVisible() {
    return this.errorMessage.isDisplayed();
  }

  async getProductNames() {
    const nameElements = await this.productNames;
    const names = [];

    for (const el of nameElements) {
      names.push(await el.getText());
    }

    return names;
  }

  async getProductPrices() {
    const prices = [];

    for (const el of await this.productPrices) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    return prices;
  }
}
export default new ProductsPage();
