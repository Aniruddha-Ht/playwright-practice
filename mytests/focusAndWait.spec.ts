import { test, expect, type Page, type Locator } from "@playwright/test";

test("focus and wait test", async ({ page }) => {
  try {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Focusing on name and filling it after wait
    const name = await page.getByRole("textbox", { name: "Enter Name" });
    await name.focus();
    await waitForFocus(page, name);
    await name.fill("John Doe");

    // Assertion to verify name.
    await expect(name).toHaveValue("John Doe");

    // Focus on accept all cookies button
    const cookies = await page.locator("#HTML5 > div.widget-content > button");
    await cookies.focus();
    await cookies.click();
  } catch (error) {
    console.error("Error occurred:" + error);
  }
});

// Custom function to wait for focus
async function waitForFocus(page: Page, locator: Locator): Promise<void> {
  const elementHandle = await locator.elementHandle();
  if (!elementHandle) throw new Error("Element not found");

  await page.waitForFunction(
    (el: any) => document.activeElement === el,
    elementHandle
  );
}
