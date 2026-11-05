import { test } from 'node:test'; import assert from 'node:assert/strict';
import { withApp } from './_lib.mjs';
test('SND 확장 함수가 있고 루프가 안전하다', async () => {
  await withApp({}, async ({ page, errors }) => {
    const ok = await page.evaluate(() => { const S = window.__T.SND; ['chop','knock','crack','nom','stamp','twinkle'].forEach(k => S[k]());
      S.start('sizzle'); S.start('sizzle'); S.stop('sizzle'); S.stop('water'); S.start('blender'); S.start('water'); S.stopAll(); return typeof S.start === 'function'; });
    assert.ok(ok); assert.deepEqual(errors, []);
  });
});
