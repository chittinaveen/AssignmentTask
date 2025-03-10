import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class ApplicationPage {
  private page: Page;
  private locators = {
    nextButton: '#next',
    uploadButton: '#upload-transcript',
    nameField: '#name',
    dobField: '#dob',
    activityFields: ['#activity1', '#activity2', '#activity3', '#activity4'],
    essaySelectors: {
      cars: '#essay-cars',
      animals: '#essay-animals',
      school: '#essay-school',
      other: '#essay-other'
    },
    essayBox: '#essay-box',
    submitButton: '#submit'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillPage1() {
    await this.page.fill(this.locators.nameField, process.env.USER_NAME || '');
    await this.page.fill(this.locators.dobField, process.env.USER_DOB || '');
    await this.page.click(this.locators.nextButton);
  }

  async fillPage2(activities: string[]) {
    for (let i = 0; i < this.locators.activityFields.length; i++) {
      await this.page.fill(this.locators.activityFields[i], activities[i]);
    }
    await this.page.click(this.locators.nextButton);
  }

  async uploadTranscript() {
    await this.page.setInputFiles(this.locators.uploadButton, 'uploads/MySchoolTranscript.pdf');
    await this.page.click(this.locators.nextButton);
  }

  async fillEssays() {
    await this.page.click(this.locators.essaySelectors.cars);
    await this.page.fill(this.locators.essayBox, 'I love cars...');
    await this.page.click(this.locators.submitButton);
  }
}
