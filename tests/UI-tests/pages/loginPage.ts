import { Locator, Page, expect } from '@playwright/test';
import { failureLoginCredentials, successLoginCredentials } from '../testData/loginDetails.ts';

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly login: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator(`#user-name`);
    this.password = page.locator(`#password`).or(page.getByPlaceholder('Password', { exact: true }));
    this.login = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator(`//*[contains(@class,'error-message')]`);
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async loginSuccess() {
    await this.userName.fill(successLoginCredentials.username);
    await this.password.fill(successLoginCredentials.password);
    await this.login.click();
  }

  async LoginFail() {
    await this.userName.fill(failureLoginCredentials.username);
    await this.password.fill(failureLoginCredentials.password);
    await this.login.click();
  }

  async verifyErrorMessageForFailureLogin() {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifyLoginPageisDisplayed() {
    await expect(this.userName).toBeVisible();
  }
}