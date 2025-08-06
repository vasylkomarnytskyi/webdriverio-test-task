import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';

describe.only('Product Sorting', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should sort products correctly by all options', async () => {
    const rawSortOptions = [
      ['Price (low to high)', 'getProductPrices', (a, b) => a - b],
      ['Price (high to low)', 'getProductPrices', (a, b) => b - a],
      ['Name (A to Z)', 'getProductNames', (a, b) => a.localeCompare(b)],
      ['Name (Z to A)', 'getProductNames', (a, b) => b.localeCompare(a)],
    ];

    const testSortOption = (label, getValues, comparator) => {
      it(`should sort products correctly by "${label}"`, async () => {
        await productPage.selectSortOption(label);
        const values = await getValues();
        const sorted = [...values].sort(comparator);
        expect(values).toEqual(sorted);
      });
    };

    rawSortOptions.forEach(([label, method, comparator]) => {
      const getValues = () => productPage[method]();
      testSortOption(label, getValues, comparator);
    });
  });

  it('should open social links in new tabs', async () => {
    const socialButtons = [
      { name: 'linkedin', urlPart: 'linkedin.com' },
      { name: 'twitter', urlPart: 'x.com' },
      { name: 'facebook', urlPart: 'facebook.com' },
    ];

    const originalWindow = await browser.getWindowHandle();

    for (const { name, urlPart } of socialButtons) {
      await productPage.clickSocialButton(name);

      const windows = await browser.getWindowHandles();
      const newWindow = windows.find((handle) => handle !== originalWindow);

      await browser.switchToWindow(newWindow);
      const url = await browser.getUrl();
      expect(url).toContain(urlPart);
      await browser.closeWindow();
      await browser.switchToWindow(originalWindow);
    }
  });
});
