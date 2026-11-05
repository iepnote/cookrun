import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp } from './_lib.mjs';
test('프로필 추가·선택·도장', async () => {
  await withApp({}, async ({ page }) => {
    const r = await page.evaluate(() => { const P = window.__T.PROF; const p = P.add({ name: '하나', photo: null }); P.select(p.id);
      const a = P.addStamp('sandwich'), b = P.addStamp('sandwich'); return { name: P.cur().name, a, b, n: P.list().length }; });
    assert.equal(r.name, '하나'); assert.equal(r.a.first, true); assert.equal(r.b.first, false); assert.equal(r.b.count, 2);
    await page.reload(); await page.waitForTimeout(300);
    assert.equal(await page.locator('#chefs .chef', { hasText: '하나' }).count(), 1);
  });
});
