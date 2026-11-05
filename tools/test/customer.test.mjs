import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, screen, clickNext, dragTo, tap } from './_lib.mjs';
test('주문 화면이 뜨고 다른 요리는 거부된다', async () => {
  await withApp({ set: { order: true } }, async ({ page }) => {
    await page.click('#btn-start'); await page.waitForTimeout(200);
    assert.equal(await screen(page), 's-order');
    const ordered = await page.evaluate(() => window.__T.ORDER().dish.nm);
    await page.click('#order-ok'); await page.waitForTimeout(200);
    const other = await page.evaluate(n => window.__T.DISHES.find(d => d.ready && d.nm !== n).nm, ordered);
    await page.locator('.dish', { hasText: other }).first().click(); await page.waitForTimeout(200);
    assert.equal(await screen(page), 's-select');
    await page.locator('.dish', { hasText: ordered }).first().click(); await page.waitForTimeout(200);
    assert.equal(await screen(page), 's-intro');
  });
});
test('주기 단계: 접시를 손님에게 주고 세 번 먹인다', async () => {
  await withApp({}, async ({ page }) => {
    await page.click('#btn-start'); await page.waitForTimeout(200);
    await page.locator('.dish', { hasText: '주먹밥' }).first().click(); await page.click('#intro-go'); await page.waitForTimeout(200);
    await page.locator('.pantry', { hasText: '밥' }).first().click(); await page.waitForTimeout(600); await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 8; i++) { await clickNext(page); if (await page.evaluate(() => window.__T.screen() === 's-step' && window.__T.STEPS[window.__T.stepIdx].label === '주기')) break; }
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), '주기');
    await dragTo(page, '#giveplate', '#custspot'); await tap(page, '#givefood', 3); await page.waitForTimeout(500);
    assert.ok((await page.evaluate(() => window.__T.says())).some(s => /맛있어요/.test(s)), '맛있어요 음성');
  });
});
