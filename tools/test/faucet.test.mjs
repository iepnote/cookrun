import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, circle, rubLR, screen } from './_lib.mjs';
test('손 씻기: 손잡이를 돌려야 문지르기가 된다', async () => {
  await withApp({}, async ({ page }) => {
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밥']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    assert.equal(await page.locator('#knob').count(), 1);
    await rubLR(page, '#washimg', 12); await page.waitForTimeout(300);
    const need = await page.evaluate(() => window.__T.N(10));
    assert.equal(await page.evaluate(() => document.getElementById('washcount').textContent.trim()), '0 / ' + need);
    await circle(page, '#knob', 1.3, 30); await page.waitForTimeout(200);
    assert.equal(await page.locator('#knob.on').count(), 1);
    await rubLR(page, '#washimg', 14); await page.waitForTimeout(1200);
    assert.equal(await screen(page), 's-step');
  });
});
