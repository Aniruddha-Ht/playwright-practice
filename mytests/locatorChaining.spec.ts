import { test, expect } from "@playwright/test";

test("locator chaining test", async ({ page }) => {
  try {
    const response = await page.goto(
      "https://www.lambdatest.com/selenium-playground/input-form-demo"
    );
    await expect(response!.status()).toBe(200);

    await expect(page.locator('h2.text-gray-900.text-size-24.font-medium')).toBeVisible();
    const form = page.locator("#seleniumform");
    await form.locator('input[name="name"]').fill("John Doe");
    await form.locator('input[name="email"]').fill("test123@email.com");
    await form.locator('input[name="password"]').fill("Password123");

    await form.getByRole("button", { name: "Submit" }).click();

    console.log("Locator chaining and getByRole test completed successfully.");
  } catch (error) {
    console.error("An error occurred during the locator chaining test:", error);
    throw error;
  }
});
