import { test, expect } from '@playwright/test';

test('Login Successful', async ({ page, browserName }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
  await page.screenshot({ path: `screenshots/${browserName}-login.png` });
});