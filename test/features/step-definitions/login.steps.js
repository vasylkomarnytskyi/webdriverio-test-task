import { Given, When, Then } from '@cucumber/cucumber';
import loginPage from '../../pageobjects/login.page';

Given('User is on the saucedemo main page', async () => {
  await loginPage.open();
});

When('User clicks the "Login" button', async () => {
  await loginPage.loginButton.click();
});

Then('User should see "Epic sadface: Username is required" error message', async () => {
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});
