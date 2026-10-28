import { expect, test} from '@playwright/test';
import { LoginPage } from '../../pageObject/login';
import login_testdata from '../../testData/login_testdata.json'

test('verify Employee flow', async ({ page }) => {
  await page.goto('/');
const loginObj=new LoginPage(page);
await loginObj.login(login_testdata.username,login_testdata.password);
await page.waitForTimeout(2000);
await expect(
        page.getByText('Dashboard').first()
    ).toBeVisible();
    const api = page.context().request;
    // API request
    const response = await api.post(
        '/web/index.php/api/v2/leave/leave-requests',
        {
            data: {
                leaveTypeId: 3,
                fromDate: '2026-10-08',
                toDate: '2026-10-08',

                duration: {
                    type: 'full_day'
                },

                comment: 'Playwright API Testing'
            }
        }
    );

    expect(response.status()).toBe(200)


    console.log(
        'Status:',
        response.status()
    );

    console.log(
        'Response:',
        await response.text()
    );

});

