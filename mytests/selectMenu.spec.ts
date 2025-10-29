import { test, expect } from "@playwright/test";

test("Select menu interaction test", async ({ page }) => {
  try {
    await page.goto(
      "https://www.globalsqa.com/demo-site/select-dropdown-menu/"
    );

    const selectmenu =
      "#post-2646 > div.twelve.columns > div > div > div > p > select";

    // select by value of option
    await page.selectOption(selectmenu, { value: "ATA" });
    const obj1 = await page.$eval(selectmenu, (el) => el.value);
    console.log(`Selected by value: ${obj1}`);

    // select by label/ actual text of option
    await page.selectOption(selectmenu, { label: "Belize" });
    const obj2 = await page.$eval(selectmenu, (el) => el.value);
    console.log(`Selected by label: ${obj2}`);

    // select by index of option
    await page.selectOption(selectmenu, { index: 3 });
    const obj3 = await page.$eval(selectmenu, (el) => el.value);
    console.log(`Selected by index: ${obj3}`);

    // get all options
    const options = await page.$$(selectmenu + " > option");

    // retrieve and print all options
    for (const option of options) {
      const optionText = await option.textContent();
      console.log(optionText);
    }

    // select specific country ie. India
    for (const option of options) {
      const optionText = await option.textContent();
      if (optionText === "India") {
        await page.selectOption(selectmenu, { label: "India" });
        break;
      }
    }

    await page.waitForTimeout(5000);
  } catch (error) {
    console.error("Error during test execution:", error);
  }
});
