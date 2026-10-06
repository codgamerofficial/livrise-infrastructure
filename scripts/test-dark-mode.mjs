import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:3002/start-project', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.documentElement.classList.add('dark'));

  // Step 1 -> 6
  for (let i = 1; i <= 6; i++) {
    if (i === 3) {
      const cityInput = await page.$('input[placeholder*="Contai"]');
      if (cityInput) await cityInput.type('Contai, West Bengal');
    }
    if (i === 6) {
      const nameInput = await page.$('input[placeholder*="Saswata"]');
      if (nameInput) await nameInput.type('Saswata Dey');
      const phoneInput = await page.$('input[placeholder*="73192"]');
      if (phoneInput) await phoneInput.type('+91 73192 80024');
      const emailInput = await page.$('input[placeholder*="saswatadey700"]');
      if (emailInput) await emailInput.type('saswatadey700@gmail.com');
    }
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
      if (cont) cont.click();
    });
    await new Promise(r => setTimeout(r, 600));
  }

  await page.screenshot({ path: 'C:\\Users\\saswa\\.gemini\\antigravity-ide\\brain\\a0607050-f7eb-4a9b-b559-0f38bfd0f49f\\mobile_step7_dark_mode.png' });
  console.log('Saved dark mode screenshot');
  await browser.close();
}

run();
