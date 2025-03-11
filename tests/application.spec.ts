import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ApplicationPage } from '../pages/ApplicationPage';

const BASE_URL = 'https://apply.mykaleidoscope.com/program/sdet-test-scholarship';
const STRONG_PASSWORD = 'm1K@82d97y';

test.describe('Kaleidoscope Applicant Application Process', () => {
    test('Complete Application Flow', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        const applicationPage = new ApplicationPage(page);

        // Step 1: Register a new user
        await page.goto(BASE_URL);
        await registrationPage.register('Test', 'User', '9545678234', STRONG_PASSWORD);

        // Step 2: Begin new Application
        await applicationPage.startApplication();

        // Step 3: Fill Page 1
        await applicationPage.fillPersonalDetails('Test User', '1998-08-25', '123 Test Street, Test City, TC');

        // Step 4: Fill Page 2 (Extracurricular Activities)
        await applicationPage.validateExtracurricularError();
        await applicationPage.fillExtracurricularActivities(['Football', 'Basketball', 'Music', 'Debate Club']);

        // Step 5: Fill Page 3 (Upload Transcript)
        await applicationPage.uploadTranscript('../uploads/My School Transcript.pdf');

        // Step 6: Fill Page 4 (Essay Selection)
        await applicationPage.selectEssays(['Animals', 'School']);
        await applicationPage.fillEssays({
            'Animals': 'Essay about Animals',
            'School': 'Essay about School'
        });

        // Step 7: Review Page Validation
        await applicationPage.validateReviewPage('Test User', ['Essay about Animals', 'Essay about School']);

        // Step 8: Submit Application & Validate No Edits Allowed
        const submittedURL = await applicationPage.submitApplication();
        await applicationPage.validateNoEditsAllowed(submittedURL);
    });
});
