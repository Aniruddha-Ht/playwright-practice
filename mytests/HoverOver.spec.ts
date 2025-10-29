import { test, expect } from "@playwright/test";

test("Hover over test", async ({ page }) => {
  try {
    await page.goto("https://www.automationpractice.pl");

    // Hover over the “Women” category in the top menu
    const womenMenu = page.locator('a[title="Women"]');
    await womenMenu.hover();

    // Hover over the “Tops” submenu
    const topsSubmenu = page.locator('a[title="Tops"]');
    await topsSubmenu.hover();

    // Click on “T-shirts”
    const tShirtsLink = page.locator(
      "#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(1) > a"
    );
    await tShirtsLink.click();

    // Verify that the correct page loaded
    await expect(page).toHaveURL(/controller=category/);
    await expect(page.locator("h1")).toContainText("T-shirts");

    console.log("Test completed successfully.");
  } catch (error) {
    console.error("Error during test execution:", error);
    throw error; // Rethrow to mark the test as failed
  } finally {
    // Pause briefly for observation
    await page.waitForTimeout(2000);
  }
});
