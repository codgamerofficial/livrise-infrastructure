import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\saswa\\.gemini\\antigravity-ide\\brain\\a0607050-f7eb-4a9b-b559-0f38bfd0f49f';

async function run() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=390,844']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  console.log('Navigating to http://localhost:3002/start-project...');
  await page.goto('http://localhost:3002/start-project', { waitUntil: 'networkidle2' });

  // Screenshot Step 1
  await page.screenshot({ path: path.join(artifactDir, 'mobile_step1_390.png') });
  console.log('Saved Step 1 screenshot');

  // Step 1: Click Continue
  console.log('Clicking Continue (Step 1 -> 2)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 2: Click Continue
  console.log('Clicking Continue (Step 2 -> 3)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 3: Fill City 'Contai, West Bengal'
  console.log('Filling City in Step 3...');
  const cityInput = await page.$('input[placeholder*="Contai"]');
  if (cityInput) {
    await cityInput.type('Contai, West Bengal');
  }
  await page.screenshot({ path: path.join(artifactDir, 'mobile_step3_location.png') });

  // Step 3: Click Continue
  console.log('Clicking Continue (Step 3 -> 4)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 4: Click Continue
  console.log('Clicking Continue (Step 4 -> 5)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 5: Click Continue
  console.log('Clicking Continue (Step 5 -> 6)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Step 6: Fill Contact Information
  console.log('Filling Step 6 contact details...');
  const nameInput = await page.$('input[placeholder*="Saswata"]');
  if (nameInput) await nameInput.type('Saswata Dey');

  const phoneInput = await page.$('input[placeholder*="73192"]');
  if (phoneInput) await phoneInput.type('+91 73192 80024');

  const emailInput = await page.$('input[placeholder*="saswatadey700"]');
  if (emailInput) await emailInput.type('saswatadey700@gmail.com');

  const descTextarea = await page.$('textarea');
  if (descTextarea) await descTextarea.type('Residential 3-storey bungalow in Contai with modern elevation.');

  await page.screenshot({ path: path.join(artifactDir, 'mobile_step6_contact.png') });

  // Step 6: Click Continue
  console.log('Clicking Continue (Step 6 -> 7)...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cont = btns.find(b => b.textContent && b.textContent.includes('Continue'));
    if (cont) cont.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Step 7: Inspect and Screenshot
  console.log('Arrived at Step 7! Inspecting Review Card...');
  const step7Text = await page.evaluate(() => document.body.innerText);
  console.log('Step 7 Page content has "Review Your Project":', step7Text.includes('Review Your Project'));
  console.log('Step 7 Page content has "Contai, West Bengal":', step7Text.includes('Contai, West Bengal'));
  console.log('Has duplicate "Contai, West Bengal, West Bengal":', step7Text.includes('Contai, West Bengal, West Bengal'));

  await page.screenshot({ path: path.join(artifactDir, 'mobile_step7_review_card.png'), fullPage: false });
  console.log('Saved Step 7 screenshot: mobile_step7_review_card.png');

  // Step 7: Click 'Confirm & Submit'
  console.log('Clicking Confirm & Submit...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find(b => b.textContent && b.textContent.includes('Confirm & Submit'));
    if (submitBtn) submitBtn.click();
  });

  // Wait for submission response
  console.log('Waiting for success screen...');
  await page.waitForFunction(() => {
    return document.body.innerText.includes('PROJECT ENQUIRY SUBMITTED') ||
           document.body.innerText.includes('Couldn\'t submit');
  }, { timeout: 15000 });

  const finalContent = await page.evaluate(() => document.body.innerText);
  const isSuccess = finalContent.includes('PROJECT ENQUIRY SUBMITTED');
  console.log('Submission Success status:', isSuccess);

  const refMatch = finalContent.match(/LIV-2026-\d+/);
  console.log('Captured Reference ID:', refMatch ? refMatch[0] : 'None');

  await page.screenshot({ path: path.join(artifactDir, 'mobile_success_screen.png'), fullPage: false });
  console.log('Saved Success screenshot: mobile_success_screen.png');

  await browser.close();
  console.log('Test completed successfully!');
}

run().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
