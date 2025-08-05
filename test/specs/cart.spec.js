import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';
describe('Cart Page', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should keep the cart items after user logs out and logs in again', async () => {
    await productPage.addToCartButton.click();
    await productPage.cartButton.click();
    await productPage.burgerMenu.click();
    await productPage.logoutButton.click();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.cartButton.click();
    await browser.pause(2000);
  });

  it('should successfully complete the checkout process with valid product and user info', async () => {
    await productPage.addToCartButton1.click();
    await productPage.cartButton.click();
    await productPage.checkoutButton.click();
    await productPage.fillCheckoutForm('Ivan', 'Ivanenko', '12345');
    await productPage.continueButton.click();
    await productPage.finishButton.click();
    await productPage.backHomeButton.click();
    await browser.pause(2000);
  });

  it('should handle checkout attempt without any products in the cart', async () => {
    await productPage.cartButton.click();
    await productPage.checkoutButton.click();
    await productPage.errorMessage.waitForDisplayed();
    await browser.pause(2000);
  });
});
