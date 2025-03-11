import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'on',
    baseURL: 'https://apply.mykaleidoscope.com',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
