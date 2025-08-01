import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/products.page.js';

describe.only('Product Sorting', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
  });

  it('should sort products correctly by all options', async () => {
    await ProductPage.selectSortOption('Price (low to high)');
    let prices = await ProductPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    await ProductPage.selectSortOption('Price (high to low)');
    prices = await ProductPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));

    await ProductPage.selectSortOption('Name (A to Z)');
    let names = await ProductPage.getProductNames();
    expect(names).toEqual([...names].sort());

    await ProductPage.selectSortOption('Name (Z to A)');
    names = await ProductPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
    await browser.pause(2000);
  });

  it('should add products to the cart', async () => {
    await ProductPage.linkedinButton.click();
    await ProductPage.twitterButton.click();
    await ProductPage.facebookButton.click();
    await browser.pause(2000);
  });
});
