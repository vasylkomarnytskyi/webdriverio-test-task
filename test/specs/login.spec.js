import LoginPage from '../pageobjects/login.page.js';
import ProductPage from '../pageobjects/products.page.js';

describe('Login Page', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  describe('Valid login', () => {
    it('should login with standard user', async () => {
      await LoginPage.login('standard_user', 'secret_sauce');
    });
  });

  describe('Invalid login', () => {
    it('should not login with wrong password', async () => {
      await LoginPage.login('standard_user', 'random_value');
    });
    it('should login with valid credentials', async () => {
      await LoginPage.login('standarD_user', 'secret_sauce');
    });
  });

  describe('Logout', () => {
    it('should logout successfully', async () => {
      await LoginPage.login('standard_user', 'secret_sauce');
      await ProductPage.burgerMenu.click();
      await ProductPage.logoutButton.click();
      await browser.pause(2000);
    });
  });
});
