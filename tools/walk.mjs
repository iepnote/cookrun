// tools/walk.mjs — 모든 요리를 '다음'으로 순회, 단계마다 스크린샷. 사용: NODE_PATH=... node tools/walk.mjs [가|나|다]
import { openApp, goDish, clickNext, screen } from './test/_lib.mjs';
import fs from 'node:fs';
const level = process.argv[2] || null; const out = 'tools/shots/' + (level || 'default'); fs.mkdirSync(out, { recursive: true });
const { browser, page, errors } = await openApp(level ? { level } : {});
const names = await page.evaluate(() => window.__T.DISHES.filter(d => d.ready).map(d => d.nm));
for (const nm of names) {
  await page.click('#nav-home'); await page.waitForTimeout(150); await goDish(page, nm);
  await page.click('#intro-go'); await page.waitForTimeout(200);
  const free = await page.evaluate(() => !!window.__T.currentDish.freeChoice);
  if (free) { await page.locator('.pantry').nth(0).click(); await page.locator('.pantry').nth(1).click(); await page.waitForTimeout(200); await page.click('#cart-done'); }
  else { const need = await page.evaluate(() => window.__T.currentDish.need.map(k => window.__T.PANTRY[k].nm)); for (const n of need) { await page.locator('.pantry', { hasText: n }).first().click(); await page.waitForTimeout(100); } }
  await page.waitForTimeout(600); await page.click('#pop-cook'); await page.waitForTimeout(200);
  let i = 0; while (await screen(page) !== 's-done' && i < 25) { await page.screenshot({ path: `${out}/${nm}-${String(i).padStart(2, '0')}.png` }); await clickNext(page); i++; }
  await page.screenshot({ path: `${out}/${nm}-done.png` });
  console.log(nm, i, '단계');
}
console.log('errors:', errors); await browser.close(); process.exit(errors.length ? 1 : 0);
