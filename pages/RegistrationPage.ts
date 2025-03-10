import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class RegistrationPage {
  private page: Page;
  private locators = {
    emailInput: '#email',
    passwordInput: '#password',
    registerButton: '#register'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async registerUser() {
    await this.page.fill(this.locators.emailInput, process.env.USER_EMAIL || '');
    await this.page.fill(this.locators.passwordInput, process.env.USER_PASSWORD || '');
    await this.page.click(this.locators.registerButton);
  }
}
