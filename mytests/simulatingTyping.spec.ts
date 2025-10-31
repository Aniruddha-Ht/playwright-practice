import { test, expect } from "@playwright/test";

test("Simulating Typing", async ({ page }) => {
  try {

    // Typing into search bar with no delay
    await page.goto('https://testautomationpractice.blogspot.com/');
    const searchBar = page.locator('#Wikipedia1_wikipedia-search-input');
    await searchBar.pressSequentially('Playwright');

    await expect (searchBar).toHaveValue('Playwright'); // assertion of value

    await page.reload();

    // Typing into search bar with a delay of 500 ms
    await searchBar.pressSequentially('Playwright', { delay:500 });

    await expect (searchBar).toHaveValue('Playwright'); // assertion of value

    await page.reload();

    // Typing into name and email fields with deifferent delays
    const name = page.getByRole('textbox', {name: 'Enter Name'});
    const email = page.getByRole('textbox', {name: 'Enter EMail'});

    await name.pressSequentially('John Doe', {delay: 300});
    await email.pressSequentially('johndoe@email.com', {delay: 100});

    await expect (name).toHaveValue('John Doe'); // assertion of value
    await expect (email).toHaveValue('johndoe@email.com'); // assertion of value

    // Entering phone with dynamic delay based on input length
    const phone = await page.getByRole('textbox', {name: 'Enter Phone'});
    const inputValue = '0000000000';

    const dynamicDelay : number = inputValue.length < 10 ? 80 : 200;

    await phone.pressSequentially(inputValue, { delay : dynamicDelay });
    

  } catch (err) {
    console.log("Error: ", err);
  }
});
