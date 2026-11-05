import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext } from './_lib.mjs';
test('컵케이크 토핑 단계에 이모지가 없다', async () => {
  await withApp({}, async ({ page }) => {
    await goDish(page, '컵케이크'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밀가루', '달걀', '우유']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    const target = '뿌리기';
    for (let i = 0; i < 12; i++) { await clickNext(page); if (await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label) === target) break; }
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), target);
    const emo = await page.$$eval('#work .cardemoji', els => els.length);
    assert.equal(emo, 0);
  });
});
