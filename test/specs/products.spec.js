import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';

describe.only('Product Sorting', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should sort products correctly by all options', async () => {
    const sortOptions = [
      {
        label: 'Price (low to high)',
        getValues: () => productPage.getProductPrices(),
        comparator: (a, b) => a - b,
      },
      {
        label: 'Price (high to low)',
        getValues: () => productPage.getProductPrices(),
        comparator: (a, b) => b - a,
      },
      {
        label: 'Name (A to Z)',
        getValues: () => productPage.getProductNames(),
        comparator: (a, b) => a.localeCompare(b),
      },
      {
        label: 'Name (Z to A)',
        getValues: () => productPage.getProductNames(),
        comparator: (a, b) => b.localeCompare(a),
      },
    ];

    sortOptions.forEach(({ label, getValues, comparator }) => {
      it(`should sort products correctly by "${label}"`, async () => {
        await productPage.selectSortOption(label);
        const values = await getValues();
        const sorted = [...values].sort(comparator);

        expect(values).toEqual(sorted);
      });
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
