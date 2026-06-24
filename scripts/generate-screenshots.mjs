import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'release-builds/screenshots';
mkdirSync(OUT, { recursive: true });

const EMAIL = 'playstore.review@nour-app.test';
const PASSWORD = 'NourReview2026!';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.setViewportSize({ width: 390, height: 844 });

async function shot(name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('captured', name);
}

await page.goto('http://localhost:5173/register');
await page.waitForSelector('input[type="text"]', { timeout: 15000 });

// Try registering the test account; if it already exists, fall back to login.
await page.fill('input[type="text"]', 'Test Reviewer');
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', PASSWORD);
await page.click('button[type="submit"]');

try {
  await page.waitForURL('**/', { timeout: 8000 });
} catch {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/', { timeout: 15000 });
}

await shot('01-accueil');

await page.goto('http://localhost:5173/mood');
await shot('02-humeur');

await page.goto('http://localhost:5173/journal');
await shot('03-journal');

await page.goto('http://localhost:5173/breathing');
await shot('04-souffle');

await page.goto('http://localhost:5173/content');
await shot('05-contenu');

await browser.close();
console.log('Done. Test account:', EMAIL, '/', PASSWORD);
