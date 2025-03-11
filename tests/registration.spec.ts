import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import * as dotenv from 'dotenv';

dotenv.config();
const STRONG_PASSWORD = 'm1K@82d97y';

test('User should be able to register', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await page.goto(`${process.env.BASE_URL}${process.env.REGISTRATION_URL}`);
  await registrationPage.register('Test', 'User', '9876543211',STRONG_PASSWORD);
});
