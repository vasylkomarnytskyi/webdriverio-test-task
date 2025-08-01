import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/products.page.js';
describe('Cart Page', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
  });

  it('should keep the cart items after user logs out and logs in again', async () => {
    await ProductPage.addToCartButton.click();
    await ProductPage.cartButton.click();
    await ProductPage.burgerMenu.click();
    await ProductPage.logoutButton.click();
    await LoginPage.login('standard_user', 'secret_sauce');
    await ProductPage.cartButton.click();
    await browser.pause(2000);
  });

  it('should successfully complete the checkout process with valid product and user info', async () => {
    await ProductPage.addToCartButton1.click();
    await ProductPage.cartButton.click();
    await ProductPage.checkoutButton.click();
    await ProductPage.fillCheckoutForm('Ivan', 'Ivanenko', '12345');
    await ProductPage.continueButton.click();
    await ProductPage.finishButton.click();
    await ProductPage.backHomeButton.click();
    await browser.pause(2000);
  });

  it('should handle checkout attempt without any products in the cart', async () => {
    await ProductPage.cartButton.click();
    await ProductPage.checkoutButton.click();
    await ProductPage.errorMessage.waitForDisplayed();
    await browser.pause(2000);
  });
});
