import { test, expect } from "@playwright/test";

test("getByRole test", async ({ page }) => {
  try {
    const response = await page.goto("https://demo.playwright.dev/todomvc/");

    // getByRole: heading
    const heading = page.getByRole("heading", { name: "todos" });
    await expect(heading).toBeVisible();

    // getByRole: textbox
    const inputBox = page.getByRole("textbox", {
      name: "What needs to be done?",
    });
    await inputBox.fill("Daily Task");
    await inputBox.press("Enter");

    // getByRole: checkbox
    const todoItem = page.locator("li", { hasText: "Daily Task" });
    const todoCheckbox = todoItem.getByRole("checkbox");
    await todoCheckbox.check();

    // getByRole: link
    const completedLink = page.getByRole("link", { name: "Completed" });
    await completedLink.click();
    await expect(page).toHaveURL(/#\/completed/);

    // getByRole: button
    const clearButton = page.getByRole("button", { name: "Clear completed" });
    await clearButton.click();

    await expect(page.getByText("Daily Task")).toHaveCount(0);

    console.log("getByRole demonstration completed successfully.");
  } catch (error) {
    console.error("getByRole demonstration failed:", error);
    throw error;
  }
});
