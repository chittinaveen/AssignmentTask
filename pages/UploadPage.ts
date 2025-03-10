import { Page } from '@playwright/test';

export class UploadPage {
  private page: Page;
  private uploadButton = '#upload-transcript';
  private nextButton = '#next';

  constructor(page: Page) {
    this.page = page;
  }

  async uploadTranscript() {
    await this.page.setInputFiles(this.uploadButton, 'uploads/MySchoolTranscript.pdf');
    await this.page.click(this.nextButton);
  }
}
