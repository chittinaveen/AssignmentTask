import { Page, expect } from '@playwright/test';

export class ApplicationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async startApplication() {
        await this.page.click('text=Start Application');
    }

    async fillPersonalDetails(name: string, dob: string, address: string) {
        await this.page.fill('input[name="fullName"]', name);
        await this.page.fill('input[name="dob"]', dob);
        await this.page.fill('input[name="address"]', address);
        await this.page.click('text=Next');
    }

    async validateExtracurricularError() {
        await this.page.click('text=Next');
        await expect(this.page.locator('text=At least 2 extracurricular activities are required')).toBeVisible();
    }

    async fillExtracurricularActivities(activities: string[]) {
        for (let i = 0; i < activities.length; i++) {
            await this.page.fill(`input[name="activity${i + 1}"]`, activities[i]);
        }
        await this.page.click('text=Next');
    }

    async uploadTranscript(filePath: string) {
        await this.page.setInputFiles('input[type="file"]', filePath);
        await this.page.click('text=Next');
    }

    async selectEssays(essayTypes: string[]) {
        for (const essay of essayTypes) {
            await this.page.check(`input[value="${essay}"]`);
        }
    }

    async fillEssays(essays : { [key: string]: string }) {
        for (const [type, text] of Object.entries(essays)) {
            await this.page.fill(`textarea[name="essay${type}"]`, text);
        }
        await this.page.click('text=Next');
    }

    async validateReviewPage(name: string, essayContents: string[]) {
        await expect(this.page.locator(`text=${name}`)).toBeVisible();
        for (const essay of essayContents) {
            await expect(this.page.locator(`text=${essay}`)).toBeVisible();
        }
    }

    async submitApplication() {
        await this.page.click('text=Submit Application');
        await this.page.waitForNavigation();
        return this.page.url();
    }

    async validateNoEditsAllowed(url: string) {
        await this.page.goto(url);
        await expect(this.page.locator('text=Editing is not allowed')).toBeVisible();
    }
}
