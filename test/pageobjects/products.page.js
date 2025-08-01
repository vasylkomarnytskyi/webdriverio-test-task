class ProductsPage {
  get inputFirstName() {
    return $('#first-name');
  }

  get inputLastName() {
    return $('#last-name');
  }

  get inputZipCode() {
    return $('#postal-code');
  }

  async fillCheckoutForm(firstName, lastName, zipCode) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputZipCode.setValue(zipCode);
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

  get productNames() {
    return $$('.inventory_item_name');
  }

  get productPrices() {
    return $$('.inventory_item_price');
  }

  async selectSortOption(option) {
    return this.sortSelect.selectByVisibleText(option);
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
