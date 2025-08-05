import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';

describe.only('Product Sorting', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should sort products correctly by all options', async () => {
    await productPage.selectSortOption('Price (low to high)');
    let prices = await productPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    await productPage.selectSortOption('Price (high to low)');
    prices = await productPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));

    await productPage.selectSortOption('Name (A to Z)');
    let names = await productPage.getProductNames();
    expect(names).toEqual([...names].sort());

    await productPage.selectSortOption('Name (Z to A)');
    names = await productPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
    await browser.pause(2000);
  });

  it('should add products to the cart', async () => {
    await productPage.clickAllSocialButtons();
    await browser.pause(2000);
  });
});
