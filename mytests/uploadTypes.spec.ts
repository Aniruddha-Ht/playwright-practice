import { test, expect } from "@playwright/test";
import path from "path";

test('Different File Uploads', async ({ page }) => {
  try {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const file1 = path.resolve("upload-files/file-1.txt");
    const file2 = path.resolve("upload-files/file-2.png");
    const file3 = path.resolve("upload-files/file-3.svg");

    const fileInput = page.locator("#singleFileInput");

    // Uploading single file
    await fileInput.setInputFiles(file1);

    // Asserting single file upload
    const singleFile = await fileInput.evaluate((el) => Array.from(el.files || []).map((f) => (f as any).name));
    expect(singleFile).toContain("file-1.txt");

    await page.reload();

    const fileInput2 = page.locator('#multipleFilesInput');

    // Uploading multiple files
    await fileInput2.setInputFiles([file1, file2, file3]);

    // Asserting multiple file upload
    const multipleFile = await fileInput2.evaluate((el) => Array.from(el.files || []).map((f) => (f as any).name));
    expect(multipleFile).toEqual(["file-1.txt","file-2.png","file-3.svg"]);

    // Setting multiple file field as empty
    await fileInput2.setInputFiles([]);
    
    // Asserting empty file input
    const emptyCount = await fileInput2.evaluate(el => (el as any).files?.length || 0);
    expect(emptyCount).toBe(0);

    //Upload file with buffer content
    await fileInput.setInputFiles({
    name: 'buffered-file.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('This is a buffer file content')
    });    

    // Asserting buffer upload
    const bufferValue = await fileInput.evaluate((el) => Array.from(el.files || []).map((f) => (f as any).name));
    expect(bufferValue).toContain('buffered-file.txt');

  } catch (err) {
    console.error("Error occurred:" + err);
  }
});
