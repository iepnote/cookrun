import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp } from './_lib.mjs';
test('설정 기본값과 저장', async () => {
  await withApp({}, async ({ page }) => {
    const s = await page.evaluate(() => window.__T.SET);
    assert.equal(s.sfx, true); assert.equal(s.tts, true); assert.equal(s.vib, true);
    await page.click('#nav-set'); await page.click('#set-tts [data-v="0"]'); await page.click('#set-close');
    await page.reload(); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__T.SET.tts), false);
  });
});
