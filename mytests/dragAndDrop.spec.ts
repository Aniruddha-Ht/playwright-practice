import { test, expect } from "@playwright/test";
import { freemem } from "os";

test("Drag and Drop Test", async ({ page }) => {
  try {
    // Using a dragTo() method to perform drag and drop action
    await page.goto("https://jqueryui.com/droppable/");
    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#draggable").dragTo(frame.locator("#droppable"));
    await expect(frame.locator("#droppable")).toHaveText("Dropped!");
    console.log("dragTo() method successful.");

    // Reloading the page to reset the state
    await page.reload();

    // Using mouse events to perform drag drop action
    const frame2 = page.frameLocator(".demo-frame");
    const draggable2 = frame2.locator("#draggable");
    const droppable2 = frame2.locator("#droppable");

    const dragBox = await draggable2.boundingBox();
    const dropBox = await droppable2.boundingBox();
    if (dragBox && dropBox) {
      await page.mouse.move(
        dragBox.x + dragBox.width / 2,
        dragBox.y + dragBox.height / 2
      );
      await page.mouse.down();
      await page.mouse.move(
        dropBox.x + dropBox.width / 2,
        dropBox.y + dropBox.height / 2,
        { steps: 15 }
      );
      await page.mouse.up();
    }

    await expect(droppable2).toHaveText("Dropped!");
    console.log("Manual mouse drag successful");

    // Perform drag-and-drop on multiple elements within same page
    // Use a real multiple draggable example
    await page.goto("https://jqueryui.com/sortable/");
    const frame3 = page.frameLocator(".demo-frame");
    const items = frame3.locator("#sortable li");
    const item1 = items.nth(0);
    const item4 = items.nth(3);
    await item1.dragTo(item4);
    console.log("Multiple drag-drop successful");

    // Drag an element to an invalid drop zone and observe behavior
    await page.goto("https://jqueryui.com/droppable/");
    const invalidFrame = page.frameLocator(".demo-frame");
    const draggableInvalid = invalidFrame.locator("#draggable");
    await page.mouse.move(100, 100); // outside the drop area
    await draggableInvalid.dragTo(page.locator("body")); // invalid zone
    console.log("Dragged to invalid zone — no 'Dropped!' text expected.");

    // Drag element back to original position (manual reset test)
    await page.reload();
    const frame5 = page.frameLocator(".demo-frame");
    const dragAgain = frame5.locator("#draggable");
    const dropAgain = frame5.locator("#droppable");
    const dragBoxBack = await dragAgain.boundingBox();
    const dropBoxBack = await dropAgain.boundingBox();
    if (dragBoxBack && dropBoxBack) {
      await page.mouse.move(
        dragBoxBack.x + dragBoxBack.width / 2,
        dragBoxBack.y + dragBoxBack.height / 2
      );
      await page.mouse.down();
      await page.mouse.move(dragBoxBack.x, dragBoxBack.y - 100, { steps: 10 });
      await page.mouse.up();
      console.log("Element dragged back near original position.");
    }

    // Handle dynamically loaded drag elements
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
    const boxA = page.locator("#column-a");
    const boxB = page.locator("#column-b");
    await expect(boxA).toBeVisible({ timeout: 5000 });
    await boxA.dragTo(boxB);
    console.log("Dynamic drag-and-drop handled successfully.");

  } catch (error) {
    console.error("Error occured:" + error);
  }
});
