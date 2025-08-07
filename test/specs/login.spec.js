import loginPage from '../pageobjects/login.page.js';
import productPage from '../pageobjects/products.page.js';

describe('Login Page', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it('should login with standard user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(productPage.title).toBeDisplayed();
  });

  it('should not login with wrong password', async () => {
    await loginPage.login('standard_user', 'random_value');
    await expect(loginPage.errorMessage).toBeDisplayed();
  });

  it('should not login with invalid username', async () => {
    await loginPage.login('standarD_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeDisplayed();
  });

  it('should logout successfully', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.logout();
    await expect(loginPage.usernameInput).toBeDisplayed();
  });
});
