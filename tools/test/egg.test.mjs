import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, tap, swipeDown } from './_lib.mjs';
test('달걀 깨기: 톡톡 3번 후 내려 끌면 성공', async () => {
  await withApp({ level: '나' }, async ({ page }) => {
    await goDish(page, '컵케이크'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밀가루', '달걀', '우유']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    await clickNext(page, 1);
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), '달걀 깨기');
    await tap(page, '#egg', 3); await page.waitForTimeout(200); await swipeDown(page, '#egg', 120); await page.waitForTimeout(800);
    assert.equal(await page.locator('#yolk').count(), 1);
  });
});
