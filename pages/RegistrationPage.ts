import { Page, expect, Locator } from '@playwright/test';

export class RegistrationPage {
    private page: Page;
    private locators: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            loginButton: page.locator(`//p[text()='Login']`),
            emailInput: page.locator(`//span[normalize-space(text())='Enter your email address below to sign into your existing Kaleidoscope account, or to create a new account.']/following::input`),
            nextButton: page.locator(`//span[normalize-space(text())='Next']`),
            firstNameInput: page.locator(`//label[normalize-space(text())='First Name']/input[@aria-label='First Name']`),
            lastNameInput: page.locator(`//label[normalize-space(text())='Last Name']/input[@aria-label='Last Name']`),
            countryDropdown: page.locator(`//div[@class='flag-dropdown ']`),
            indiaOption: page.locator(`//li[contains(.,'India+91')]`),
            phoneInput: page.locator(`//input[@type='tel']`),
            passwordInput: page.locator(`//label[normalize-space(text())='Create a Password']/input[@aria-label='Create a Password']`),
            ageConfirmationCheckbox: page.locator(`//input[@aria-label='I confirm that I am at least 13 years old']`),
            submitButton: page.locator(`//button[@aria-label='Submit']`)
        };
    }

    async register(firstName: string, lastName: string, phoneNumber: string, password: string) {
        await this.locators.loginButton.click();
        await this.locators.emailInput.click();
        await this.locators.emailInput.fill(`testuser${Date.now()}@example.com`);
        await this.locators.nextButton.click();
        await this.locators.firstNameInput.fill(firstName);
        await this.locators.lastNameInput.fill(lastName);
        await this.locators.countryDropdown.click();
        await this.locators.indiaOption.click();
        await this.locators.phoneInput.fill(phoneNumber);
        await this.locators.passwordInput.fill(password);
        await this.locators.ageConfirmationCheckbox.click();
        await this.locators.submitButton.click();
    }
}
