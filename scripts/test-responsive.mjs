import puppeteer from 'puppeteer-core';

async function testViewport(width, height, filename) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto('http://localhost:3002/start-project', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.documentElement.classList.add('dark'));

  // Go to Step 7
  for (let i = 1; i <= 6; i++) {
    if (i === 3) {
      const city = await page.$('input[placeholder*="Contai"]');
      if (city) await city.type('Contai');
    }
    if (i === 6) {
      const name = await page.$('input[placeholder*="Saswata"]');
      if (name) await name.type('Saswata Dey');
      const phone = await page.$('input[placeholder*="73192"]');
      if (phone) await phone.type('+91 73192 80024');
      const email = await page.$('input[placeholder*="saswatadey700"]');
      if (email) await email.type('saswatadey700@gmail.com');
    }
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
      if (cont) cont.click();
    });
    await new Promise(r => setTimeout(r, 400));
  }

  await page.screenshot({ path: `C:\\Users\\saswa\\.gemini\\antigravity-ide\\brain\\a0607050-f7eb-4a9b-b559-0f38bfd0f49f\\${filename}` });
  console.log(`Saved ${filename}`);
  await browser.close();
}

async function run() {
  await testViewport(768, 1024, 'tablet_768_step7.png');
  await testViewport(1280, 800, 'desktop_1280_step7.png');
  console.log('All responsive tests done!');
}

run();
