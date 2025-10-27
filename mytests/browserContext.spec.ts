import { test, expect } from "@playwright/test";
import type { Browser, Page, Locator, BrowserContext } from "playwright";
import { chromium, firefox, webkit } from "playwright";

test("Browser Context Isolation", async () => {
  const browser: Browser = await chromium.launch({headless: false});
  // Created two separate browser contexts
  const context1: BrowserContext = await browser.newContext();
  const context2: BrowserContext = await browser.newContext();

  const page1: Page = await context1.newPage();
  const page2: Page = await context2.newPage();

  // Login with first browser context
  await page1.goto("https://www.saucedemo.com");
  await page1.fill("#user-name", "problem_user");
  await page1.fill("#password", "secret_sauce");
  await page1.click("#login-button");

  // Login with second browser context
  await page2.goto("https://www.saucedemo.com");
  await page2.fill("#user-name", "error_user");
  await page2.fill("#password", "secret_sauce");
  await page2.click("#login-button");

  const cookies1 = await context1.cookies();
  const cookies2 = await context2.cookies();

  console.log("Context1 cookies:", cookies1);
  console.log("Context2 cookies:", cookies2);

  // Ensure sessions are not shared
  expect(cookies1).not.toEqual(cookies2);

  //Closing contexts
  await context1.close();
  await context2.close();
  await browser.close();
});
