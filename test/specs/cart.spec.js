import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';
describe('Cart Page', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should keep the cart items after user logs out and logs in again', async () => {
    await productPage.addToCart('backpack');
    await productPage.openCart();
    expect(await productPage.getCartItemsCount()).toBe(1);
    await productPage.logout();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.openCart();
    expect(await productPage.getCartItemsCount()).toBe(1);
  });

  it('should successfully complete the checkout process with valid product and user info', async () => {
    await productPage.addToCart('bike light');
    await productPage.openCart();
    await productPage.checkout();
    await productPage.fillCheckoutForm('Ivan', 'Ivanenko', '12345');
    await productPage.continueCheckout();
    await productPage.finishCheckout();

    const completeHeader = await $('.complete-header');
    await completeHeader.waitForDisplayed();
    expect(await completeHeader.getText()).toContain('Thank you for your order!');

    await productPage.backHome();

    await expect(productPage.title).toBeDisplayed();
  });

  it('should handle checkout attempt without any products in the cart', async () => {
    await productPage.openCart();
    await productPage.checkout();
    await productPage.errorMessage.waitForDisplayed();
    expect(await productPage.isErrorVisible()).toBe(true);
  });
});
