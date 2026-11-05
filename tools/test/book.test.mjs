import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, screen } from './_lib.mjs';
test('완성하면 도장이 찍히고 도감에 보인다', async () => {
  await withApp({}, async ({ page }) => {
    await goDish(page, '주먹밥'); await page.click('#intro-go'); await page.waitForTimeout(200);
    await pickAll(page, ['밥']); await page.click('#pop-cook'); await page.waitForTimeout(200);
    for (let i = 0; i < 12 && await screen(page) !== 's-done'; i++) await clickNext(page);
    assert.equal(await screen(page), 's-done'); await page.waitForTimeout(1200);
    assert.equal(await page.locator('#stamp.first').count(), 1);
    await page.click('#nav-home'); await page.click('#btn-book'); await page.waitForTimeout(200);
    assert.equal(await screen(page), 's-book');
    assert.equal(await page.locator('#bookgrid .bk.got', { hasText: '주먹밥' }).count(), 1);
  });
});
