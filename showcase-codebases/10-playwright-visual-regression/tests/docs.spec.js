const { test, expect } = require('@playwright/test');

test('Documentation Homepage Visual Check', async ({ page }) => {
  await page.goto('http://localhost:3000/docs/intro');
  // Wait for network requests and hydration to finish
  await page.waitForLoadState('networkidle');
  
  // Assert visual comparison
  await expect(page).toHaveScreenshot('docs-intro.png', {
    fullPage: true,
    maxDiffPixels: 100
  });
});
