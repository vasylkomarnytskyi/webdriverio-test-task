class LoginPage {
  get inputLogin() {
    return $('[placeholder="Username"]');
  }

  get inputPassword() {
    return $('[placeholder="Password"]');
  }

  get buttonSubmit() {
    return $('.submit-button');
  }

  async login(login, password) {
    await this.inputLogin.setValue(login);
    await this.inputPassword.setValue(password);
    await this.buttonSubmit.click();
  }

  async open() {
    await browser.url('https://www.saucedemo.com/');
  }
}

export default new LoginPage();
