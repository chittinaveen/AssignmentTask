import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import * as dotenv from 'dotenv';

dotenv.config();

test('User should be able to register', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await page.goto(`${process.env.BASE_URL}${process.env.REGISTRATION_URL}`);
  await registrationPage.registerUser();
  expect(await page.isVisible('#dashboard')).toBeTruthy();
});
