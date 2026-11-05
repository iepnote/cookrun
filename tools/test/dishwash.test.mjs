import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, circle, rubLR, screen } from './_lib.mjs';
test('요리 뒤 설거지로 끝난다', async () => {
  await withApp({ level: '가' }, async ({ page }) => {
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밥']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 8; i++) { await clickNext(page); if (await page.locator('#dishwash').count()) break; }
    assert.equal(await page.locator('#dishwash').count(), 1);
    await circle(page, '#knob', 1.3, 30); await rubLR(page, '#dishwash', 10); await page.waitForTimeout(1500);
    assert.equal(await screen(page), 's-done');
  });
});
