import { expect, test} from '@playwright/test';
import { LoginPage } from '../../pageObject/login';
import login_testdata from '../../testData/login_testdata.json'

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  // await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // await page.getByRole('button', { name: 'Login' }).click()
  
const loginObj=new LoginPage(page);

await loginObj.login(login_testdata.username,login_testdata.password);

});

test('verify  Dashboard flow', async ({ page }) => {
  // steps here for dashboard
  await page.getByRole('heading', { name: 'Dashboard' }).waitFor;
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText("Dashboard");

  await page.waitForTimeout(2000);
});

test('verify Employee flow', async ({ page }) => {
  await page.goto('/');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  // await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // await page.getByRole('button', { name: 'Login' }).click()
  
const loginObj=new LoginPage(page);

await loginObj.login(login_testdata.username,login_testdata.password);


  await page.waitForTimeout(2000);
});

test('verify Customer flow', async ({ page }) => {
  await page.goto('/');
  // await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  // await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  // await page.getByRole('button', { name: 'Login' }).click()
  
const loginObj=new LoginPage(page);

await loginObj.login(login_testdata.username,login_testdata.password);


  await page.waitForTimeout(2000);
});