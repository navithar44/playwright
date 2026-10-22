import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pageObject/login';
import login_testdata from '../../testData/login_testdata.json';


test.describe('Recruitment API Tests', () => {
//beforeEach
test.beforeEach(async ({ page }) => {

 await page.goto('/');
const loginObj = new LoginPage(page);
    await loginObj.login(login_testdata.username, login_testdata.password);
    await page.waitForTimeout(2000);
    await expect(page.getByText('Dashboard').first()).toBeVisible();

})

test('List the Recruitment Candidates', async ({ page }) => {

  await test.step('List recruitment candidates via API', async () => {
    const api = page.context().request;
    const response = await api.get(
      '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
    );

  expect(response.status()).toBe(200);
  console.log('Status:', response.status());
  });
});

test('Add a Recruitment Candidate', async ({ page }) => {

  await test.step('Add a recruitment candidate via API', async () => {
    const api = page.context().request;
    const response = await api.post(
      '/web/index.php/api/v2/recruitment/candidates',
      {
        data: {
          firstName: 'Orange',
          middleName: 'hrm',
          lastName: 'test',
          email: 'abc@test.com',
          contactNumber: '9876543212',
        },
      }
    );

    expect(response.status()).toBe(200);
    console.log('Add candidate status:', response.status());
  }); 
});

test('UI-Verify the added candidate is listed in the recruitment candidates list', async ({ page }) => {
    await page.getByText('Recruitment').click();

  await test.step('Verify candidate is visible in the UI list', async () => {
    await expect(page.getByText('Orange hrm test').first()).toBeVisible();
  });
});

test('API-Verify the added candidate is listed in the recruitment candidates list', async ({ page }) => {
  
  await test.step('Fetch recruitment candidates via API and verify candidate exists', async () => {
    const response = await page.context().request.get(
      '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
    );

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const candidates = Array.isArray(responseBody?.data) ? responseBody.data : [];
    const candidateExists = candidates.some((candidate: any) =>
      candidate.firstName === 'Orange' &&
      candidate.middleName === 'hrm' &&
      candidate.lastName === 'test'
    );

    expect(candidateExists).toBeTruthy();
  });
});

test('update the Recruitment candidate firstname and email address', async ({ page }) => {
  await test.step('Create candidate and update first name and email via API', async () => {
    const api = page.context().request;
    const createResponse = await api.post(
      '/web/index.php/api/v2/recruitment/candidates',
      {
        data: {
          firstName: 'Orange',
          middleName: 'hrm',
          lastName: 'test',
          email: 'temp@test.com',
          contactNumber: '9876543212',
        },
      }
    );

    expect(createResponse.status()).toBe(200);
    const createdCandidate = await createResponse.json();
    const candidateId = createdCandidate?.data?.id ?? createdCandidate?.id;
    expect(candidateId).toBeTruthy();

    const response = await api.put(
      `/web/index.php/api/v2/recruitment/candidates/${candidateId}`,
      {
        data: {
          firstName: 'Originaltest',
          middleName: 'hrm',
          lastName: 'test',
          email: 'abc@text.com',
          contactNumber: '9876543212',
        },
      }
    );

    expect(response.status()).toBe(200);
    const updatedCandidate = await response.json();
    const updatedFirstName = updatedCandidate?.data?.firstName ?? updatedCandidate?.firstName;
    const updatedEmail = updatedCandidate?.data?.email ?? updatedCandidate?.email;

    expect(updatedFirstName).toBe('Originaltest');
    expect(updatedEmail).toBe('abc@text.com');
  });
});

test('delete the Recruitment candidate by id', async ({ page }) => {
  await test.step('Create candidate and delete it via API', async () => {
    const api = page.context().request;
    const createResponse = await api.post(
      '/web/index.php/api/v2/recruitment/candidates',
      {
        data: {
          firstName: 'Delete',
          middleName: 'hrm',
          lastName: 'test',
          email: 'delete@test.com',
          contactNumber: '9876543212',
        },
      }
    );

    expect(createResponse.status()).toBe(200);
    const createdCandidate = await createResponse.json();
    const candidateId = createdCandidate?.data?.id ?? createdCandidate?.id;
    expect(candidateId).toBeTruthy();

    const deleteResponse = await api.delete(
      '/web/index.php/api/v2/recruitment/candidates',
      {
        data: {
          ids: [candidateId],
        },
      }
    );

    expect(deleteResponse.status()).toBe(200);
    const deletedCandidate = await deleteResponse.json();
    expect(deletedCandidate?.data).toEqual([String(candidateId)]);
  });
});
})

test.describe('Login Tests with Hooks', () => {
  
})


