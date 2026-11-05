import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp } from './_lib.mjs';
test('heroCut 모서리가 투명하다', async () => {
  await withApp({}, async ({ page }) => {
  const alpha = await page.evaluate(() => new Promise(res => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); res(x.getImageData(0, 0, 1, 1).data[3]); }; im.src = window.__T.IMG.heroCut; }));
  assert.equal(alpha, 0); });
});
test('완성 제목이 잘리지 않는다', async () => {
  await withApp({}, async ({ page }) => {
  const ws = await page.evaluate(() => getComputedStyle(document.querySelector('#done-title')).whiteSpace);
  assert.notEqual(ws, 'nowrap'); });
});
