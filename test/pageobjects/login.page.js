import Page from './page.js';

class LoginPage extends Page {
  get usernameInput() {
    return $('[placeholder="Username"]');
  }
  get passwordInput() {
    return $('[placeholder="Password"]');
  }
  get loginButton() {
    return $('.submit-button');
  }
  get errorMessage() {
    return $('[data-test="error"]');
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
