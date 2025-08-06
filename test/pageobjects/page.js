export default class Page {
  /**
   * Opens the given path on the base URL
   * @param {string} path - The path to open
   */
  open(path = '') {
    return browser.url(`/${path}`);
  }
  /**
   * Waits for an element to be visible
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} [timeout=5000] - The maximum time to wait in milliseconds
   */

  async waitForVisible(element, timeout = 5000) {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Sets the value of an input element
   * @param {WebdriverIO.Element} element - The input element to set the value for
   * @param {string} value - The value to set
   **/

  async setValue(element, value) {
    await element.waitForDisplayed();
    await element.clearValue();
    await element.setValue(value);
  }
}
