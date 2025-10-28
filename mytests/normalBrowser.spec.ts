import { test, expect } from "@playwright/test";
import { chromium, firefox, webkit, type BrowserContext } from "playwright";

// Setting up multiple launchers
const launchers = { chromium, firefox, webkit } as const;

test("Normal Browser test", async ({ browserName }) => {
  // Select the appropriate launcher based on the browser name
    const launcher = launchers[browserName as keyof typeof launchers];
  if (!launcher) throw new Error(`Unsupported browser: ${browserName}`);

  // Saving session data in a directory
  const sessionDir = `./sessions/${browserName}`;
  let context: BrowserContext | null = null;

  try {
    
    // Launch a persistent context (non-incognito window)
    context = await launcher.launchPersistentContext(sessionDir, {
      headless: false,
    });

    const page = context.pages()[0] || (await context.newPage());
    const response = await page.goto("https://www.saucedemo.com", { waitUntil: "load" });

    await expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle('Swag Labs');

    // Print cookies to confirm persistence
    const cookies = await context.cookies();
    console.log(`[${browserName}] cookies:`, cookies.map(c => c.name).join(", ") || "none");

    await page.waitForTimeout(1500);
  } catch (error) {
    console.error(`[${browserName}] Test failed:`, error);
    throw error;
  } finally {
    if (context) await context.close();
  }
});
