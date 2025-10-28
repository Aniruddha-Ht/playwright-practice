import { test, expect } from '@playwright/test';

test('Locator types test', async ({ page }) => {
  try {
   
    const response = await page.goto('https://www.saucedemo.com/');
    await expect(response!.status()).toBe(200);
    await expect(page).toHaveTitle('Swag Labs');

    await page.fill('#user-name', 'standard_user');

    await page.fill('input[id="password"]', 'secret_sauce');

    await page.getByText('Login').click();

    await expect(page.locator('.inventory_list')).toBeVisible();

    const firstAddToCartButton = page.locator('//button[contains(text(),"Add to cart")]').first();
    await firstAddToCartButton.click();

    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).toHaveText('1');

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByText('Logout').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();

    console.log(' Locator test completed successfully.');
  } catch (error) {
    console.error(' Locator test failed:', error);
    throw error;
  }
});
