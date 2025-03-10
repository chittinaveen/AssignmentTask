import { Page } from '@playwright/test';

export class EssayPage {
  private page: Page;
  private locators: { [key: string]: string };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      essaySelectors: {
        cars: '#essay-cars',
        animals: '#essay-animals',
        school: '#essay-school',
        other: '#essay-other'
      },
      essayBox: '#essay-box',
      submitButton: '#submit'
    };
  }

  async fillEssay(topic: 'cars' | 'animals' | 'school' | 'other', text: string) {
    await this.page.click(this.locators.essaySelectors[topic]);
    await this.page.fill(this.locators.essayBox, text);
    await this.page.click(this.locators.submitButton);
  }
}
