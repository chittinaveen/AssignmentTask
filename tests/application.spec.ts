import { test, expect } from '@playwright/test';
import { ApplicationPage } from '../pages/ApplicationPage';
import * as dotenv from 'dotenv';

dotenv.config();

test('User should complete the application', async ({ page }) => {
  const applicationPage = new ApplicationPage(page);
  await page.goto(`${process.env.BASE_URL}${process.env.REGISTRATION_URL}`);

  await applicationPage.fillPage1();
  await applicationPage.fillPage2(['Football', 'Music', 'Coding', 'Painting']);
  await applicationPage.uploadTranscript();
  await applicationPage.fillEssays();

  expect(await page.isVisible('#confirmation')).toBeTruthy();
});
