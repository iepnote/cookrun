import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext } from './_lib.mjs';
test('토큰이 정의되고 손 크기가 같다', async () => {
  await withApp({}, async ({ page }) => {
    const v = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--sz-hand').trim());
    assert.equal(v, '10vmin');
    await goDish(page, '샌드위치'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['식빵', '잼', '햄', '치즈', '상추']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 10; i++) { await clickNext(page); if (await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label === '자르기')) break; }   // 자르기 단계
    const widths = await page.$$eval('#work [data-hand] img', els => els.map(e => Math.round(e.offsetWidth)));
    assert.ok(widths.length >= 2 && new Set(widths).size === 1, '손 폭 ' + widths);
  });
});
