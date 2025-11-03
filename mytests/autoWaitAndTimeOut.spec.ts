import { test, expect, type Locator, type Page } from "@playwright/test";

test.use({ actionTimeout: 5000 }); // global action timeout config

test("Playwright Automatic Waiting and Timeout Handling", async ({ page }) => {
  try {
    page.setDefaultTimeout(4000); // Setting default timeout

    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameField = page.getByRole("textbox", { name: "Enter Name" });
    console.log("Waiting for the Name field...");
    await nameField.fill("John Doe");
    await expect(nameField).toHaveValue("John Doe");

    // Auto-wait + per-action timeout
    const dayCheckbox = page.getByLabel("Monday");
    console.log("Checking Monday checkbox...");
    await dayCheckbox.check({ timeout: 3000 });
    await expect(dayCheckbox).toBeChecked();

    // Deliberate delay before clicking
    const button = page.locator('#HTML5 > div.widget-content > button');
    console.log("Waiting for button to be ready before clicking...");
    await waitForElementReady(page, button);
    await button.click();
    console.log("Clicked on button successfully!");

    // timeout error
    console.log("Intentionally triggering timeout for a missing element...");
    const fakeButton = page.locator("#fakeButton");
    await fakeButton.click({ timeout: 2000 });
  } catch (error) {
    console.error("Test failed or timed out:", error);
  }
});

// Custom function to Check if an element is ready for interaction
async function waitForElementReady(
  page: Page,
  locator: Locator,
  timeout = 5000
): Promise<void> {
  const elementHandle = await locator.elementHandle();
  if (!elementHandle) throw new Error("Element not found");

  await page.waitForFunction(
    (el) => {
      if (!el) return false;

      const isVisible =
        el instanceof HTMLElement
          ? el.offsetParent !== null
          : el.getBoundingClientRect().width > 0 &&
            el.getBoundingClientRect().height > 0;

      const isEnabled = !(el as HTMLInputElement).disabled;
      const rect = el.getBoundingClientRect();

      return isVisible && isEnabled && rect.width > 0 && rect.height > 0;
    },
    elementHandle,
    { timeout }
  );
}
