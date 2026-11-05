import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, rubLR, screen } from './_lib.mjs';
test('가 수준은 손 씻기 4회로 끝난다', async () => {
  await withApp({ level: '가' }, async ({ page }) => {
    assert.equal(await page.evaluate(() => window.__T.N(10)), 4);
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밥']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    await page.evaluate(() => window.__T.skipKnob && window.__T.skipKnob());   // 수도꼭지(Task 15) 있으면 건너뜀
    await rubLR(page, '#sink', 5); await page.waitForTimeout(1200);
    assert.equal(await screen(page), 's-step');
  });
});
test('다 수준은 2단계 앞에 고르기 화면이 뜬다', async () => {
  await withApp({ level: '다' }, async ({ page }) => {
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밥']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    await clickNext(page, 2);
    assert.equal(await page.locator('#choose').count(), 1);
    await page.click('#choose .ccard[data-ok="1"]'); await page.waitForTimeout(700);
    assert.equal(await page.locator('#choose').count(), 0);
  });
});
