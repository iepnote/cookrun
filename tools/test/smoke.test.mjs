import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp, goDish, pickAll, clickNext, screen } from './_lib.mjs';
test('샌드위치 전 단계 순회, 콘솔 오류 없음', async () => {
  await withApp({}, async ({ page, errors }) => {
  await goDish(page, '샌드위치'); await page.click('#intro-go'); await page.waitForTimeout(200);
  await pickAll(page, ['식빵', '잼', '햄', '치즈', '상추']); await page.click('#pop-cook'); await page.waitForTimeout(200);
  assert.equal(await screen(page), 's-prep');
  for (let i = 0; i < 14 && await screen(page) !== 's-done'; i++) await clickNext(page);
  assert.equal(await screen(page), 's-done');
  assert.deepEqual(errors, []);
  });
});
