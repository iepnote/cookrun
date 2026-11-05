import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, tap } from './_lib.mjs';
test('핫도그 머스터드를 고르면 완성 그림이 노란 소스다', async () => {
  await withApp({}, async ({ page }) => {
    await goDish(page, '핫도그'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['소시지', '핫도그빵']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 8; i++) { await clickNext(page); if (await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label === '소스 고르기')) break; }
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), '소스 고르기');
    await page.click('.choice[data-id="mustard"]'); await page.waitForTimeout(3300);   // succeed()는 단계 최소 3초 뒤 진행
    assert.equal(await page.evaluate(() => window.__T.PICK.sauce), 'mustard');
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), '짜기');
    await tap(page, '#act', 4); await page.waitForTimeout(800);
    const done = await page.evaluate(() => window.__T.currentDish.done());
    assert.match(done, /#f2c230/);
  });
});
