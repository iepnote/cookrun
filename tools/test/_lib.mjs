// tools/test/_lib.mjs — Playwright 공용 헬퍼
import { createRequire } from 'node:module';
const pw = createRequire(import.meta.url)('playwright');   // NODE_PATH=/opt/node-tools/node_modules
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const APP = 'file://' + path.join(ROOT, 'index.html');

export async function openApp(opts = {}) {
  const browser = await pw.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'assert') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.addInitScript(() => { window.speechSynthesis = { speak(){}, cancel(){}, getVoices(){ return []; } }; });
  await page.goto(APP); await page.waitForTimeout(300);
  if (opts.level) await page.evaluate(l => { localStorage.setItem('cookrun_profiles', JSON.stringify([{ id: 't1', name: '테스트', photo: null, level: l, stamps: {}, stars: 0 }])); localStorage.setItem('cookrun_cur', 't1'); }, opts.level);
  if (opts.level) { await page.reload(); await page.waitForTimeout(300); }
  const set = Object.assign({ order: false }, opts.set || {});
  await page.evaluate(s => Object.assign(window.__T.SET, s), set);
  return { browser, page, errors };
}
export const screen = page => page.evaluate(() => window.__T.screen());
export async function clickNext(page, n = 1) { for (let i = 0; i < n; i++) { await page.click('#nav-next'); await page.waitForTimeout(250); } }
export async function goDish(page, name) {            // 시작 → (주문 건너뜀) → 요리 고르기 → 레시피 확인 화면까지
  await page.click('#btn-start'); await page.waitForTimeout(200);
  if (await screen(page) === 's-order') { await page.click('#order-ok'); await page.waitForTimeout(200); }
  await page.locator('.dish', { hasText: name }).first().click(); await page.waitForTimeout(300);
}
export async function pickAll(page, names) {           // 장바구니에서 재료 이름대로 고르기
  for (const nm of names) { await page.locator('.pantry', { hasText: nm }).first().click(); await page.waitForTimeout(120); }
  await page.waitForTimeout(600);
}
async function box(page, sel) { const b = await page.locator(sel).first().boundingBox(); if (!b) throw new Error('no box ' + sel); return b; }
export async function rubLR(page, sel, times, amp = 70) {
  const b = await box(page, sel); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy); await page.mouse.down();
  for (let i = 0; i < times; i++) { await page.mouse.move(cx + (i % 2 ? amp : -amp), cy, { steps: 4 }); await page.waitForTimeout(20); }
  await page.mouse.up();
}
export async function circle(page, sel, turns, r = 80) {
  const b = await box(page, sel); const cx = b.x + b.width / 2, cy = b.y + b.height * 0.46;
  await page.mouse.move(cx + r, cy); await page.mouse.down();
  const steps = Math.round(24 * turns); for (let i = 1; i <= steps; i++) { const a = i / 24 * Math.PI * 2; await page.mouse.move(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  await page.mouse.up();
}
export async function dragTo(page, fromSel, toSel) {
  const a = await box(page, fromSel), b = await box(page, toSel);
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await page.mouse.down();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(300);
}
export async function swipeDown(page, sel, px = 160) {
  const b = await box(page, sel); const cx = b.x + b.width / 2, cy = b.y + b.height * 0.3;
  await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.move(cx, cy + px, { steps: 10 }); await page.mouse.up();
}
export async function flickUp(page, sel) {
  const b = await box(page, sel); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.move(cx, cy - 120, { steps: 3 }); await page.mouse.up(); await page.waitForTimeout(950);
}
export async function tap(page, sel, n = 1) {
  const b = await box(page, sel); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  for (let i = 0; i < n; i++) { await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(140); }
}
