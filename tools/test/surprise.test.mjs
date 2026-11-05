import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish } from './_lib.mjs';
test('황금 재료를 고르면 별이 늘어난다', async () => {
  await withApp({}, async ({ page }) => {
    await page.evaluate(() => { window.__T.forceGold = true; });
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    assert.equal(await page.locator('.pantry.gold').count(), 1);
    const before = await page.evaluate(() => window.__T.PROF.ensure().stars);
    await page.locator('.pantry.gold').click(); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__T.PROF.cur().stars), before + 1);
  });
});
