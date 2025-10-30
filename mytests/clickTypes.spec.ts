import { test, expect } from "@playwright/test";

test("Click Types test", async ({ page }) => {
  try {
    // Navigate to the buttons test page
    await page.goto("https://demoqa.com/buttons", {
      waitUntil: "domcontentloaded",
    });

    // --- SINGLE CLICK ---
    const singleClickBtn = page.getByRole("button", {
      name: "Click Me",
      exact: true,
    });
    await singleClickBtn.click();

    await expect(page.locator("#dynamicClickMessage")).toHaveText(
      "You have done a dynamic click"
    );
    console.log(" Single click successful");

    // --- DOUBLE CLICK ---
    const doubleClickBtn = page.getByRole("button", {
      name: "Double Click Me",
      exact: true,
    });
    await doubleClickBtn.dblclick();
    await expect(page.locator("#doubleClickMessage")).toHaveText(
      "You have done a double click"
    );
    console.log(" Double click successful");

    // --- RIGHT CLICK ---
    const rightClickBtn = page.getByRole("button", {
      name: "Right Click Me",
      exact: true,
    });
    await rightClickBtn.click({ button: "right" });
    await expect(page.locator("#rightClickMessage")).toHaveText(
      "You have done a right click"
    );
    console.log(" Right click successful");

    // --- SHIFT + CLICK ---
    await page.goto("https://demoqa.com/links");
    const homeLink = page.getByRole("link", { name: "Home", exact: true });
    await homeLink.click({ modifiers: ["Shift"] });
    console.log(" Shift + Click performed (opens new tab)");

    // --- MOUSE HOVER (on demo menu page) ---
    await page.goto("https://demoqa.com/menu");
    await page.addStyleTag({
      content: `
      iframe, #fixedban, .adsbygoogle { display: none !important; }
    `,
    });
    const mainItem2 = page.locator("text=Main Item 2");
    await mainItem2.hover();
    const subItem = page.locator("text=SUB SUB LIST »");
    await subItem.hover();
    console.log(" Hover over menu and submenu successful");

    // Verify menu interaction
    await expect(mainItem2).toBeVisible();

    await page.waitForTimeout(2000);
  } catch (error) {
    console.error("Error during test execution:", error);
    throw error;
  }
});
