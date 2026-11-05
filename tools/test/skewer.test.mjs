import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, clickNext, dragTo, screen } from './_lib.mjs';
test('과일 꼬치: 패턴대로 꽂으면 성공', async () => {
  await withApp({ level: '나' }, async ({ page }) => {
    await goDish(page, '과일 꼬치'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await page.locator('.pantry', { hasText: '딸기' }).click(); await page.waitForTimeout(200); await page.locator('#cart-done').click(); await page.waitForTimeout(300);
    assert.equal(await screen(page), 's-cart');   // 한 종류는 거부
    await page.locator('.pantry', { hasText: '바나나' }).click(); await page.waitForTimeout(200); await page.locator('#cart-done').click(); await page.waitForTimeout(300);
    await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 6; i++) { await clickNext(page); if (await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label === '꽂기')) break; }
    assert.equal(await page.evaluate(() => window.__T.STEPS[window.__T.stepIdx].label), '꽂기');
    const pattern = await page.$$eval('#model .mf', els => els.map(e => e.dataset.k));
    assert.equal(pattern.length, 4);
    for (let i = 0; i < pattern.length; i++) await dragTo(page, `#tray [data-k="${pattern[i]}"]`, `#slot${i}`);
    await page.waitForTimeout(900);
    assert.ok((await page.evaluate(() => window.__T.says())).some(s => s === '잘했어요'), '칭찬 음성');
  });
});
