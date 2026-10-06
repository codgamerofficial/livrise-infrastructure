import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImage = 'C:/Users/saswa/.gemini/antigravity-ide/brain/a0607050-f7eb-4a9b-b559-0f38bfd0f49f/.user_uploaded/media_1791303544331.jpg';
const brandDir = 'd:/Infrava/public/brand';
const publicDir = 'd:/Infrava/public';
const imagesDir = 'd:/Infrava/public/images';

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

async function run() {
  console.log('Generating LivRise official brand asset system from source image...');

  // 1. Full Master Logo Crop (Emblem + LivRise + INFRASTRUCTURE)
  // Coordinates: x: 160, y: 170, w: 720, h: 660. Centered with clean margins.
  const fullLogoBuffer = await sharp(sourceImage)
    .extract({ left: 140, top: 150, width: 760, height: 700 })
    .toBuffer();

  // Save livrise-logo-primary.png (high-res 760x700 PNG)
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'livrise-logo-primary.png'));
  console.log('Saved livrise-logo-primary.png');

  // Also WebP version
  await sharp(fullLogoBuffer)
    .webp({ quality: 95 })
    .toFile(path.join(brandDir, 'livrise-logo-primary.webp'));

  // Save livrise-logo-dark.png
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'livrise-logo-dark.png'));

  // Save to public/images/logo.png and logo-dark.png for compatibility
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(imagesDir, 'logo.png'));
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(imagesDir, 'logo-dark.png'));
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo.png'));

  // 2. Monogram Crop (The Architectural LR emblem only)
  // Coordinates: x: 310, y: 170, w: 430, h: 390
  // Pad into a perfect square with dark architectural slate background
  const monoCrop = await sharp(sourceImage)
    .extract({ left: 310, top: 170, width: 430, height: 390 })
    .toBuffer();

  // Create square 512x512 monogram with dark luxury obsidian background (#0B0B0D)
  const monogram512 = await sharp(monoCrop)
    .resize(430, 390, { fit: 'inside' })
    .extend({
      top: 61,
      bottom: 61,
      left: 41,
      right: 41,
      background: { r: 11, g: 11, b: 13, alpha: 1 } // Obsidian Black
    })
    .resize(512, 512)
    .png({ quality: 100 })
    .toBuffer();

  await sharp(monogram512).toFile(path.join(brandDir, 'livrise-monogram.png'));
  await sharp(monogram512).webp({ quality: 95 }).toFile(path.join(brandDir, 'livrise-monogram.webp'));
  console.log('Saved livrise-monogram.png');

  // 3. App Icon (512x512)
  await sharp(monogram512).toFile(path.join(brandDir, 'livrise-app-icon.png'));
  await sharp(monogram512).toFile(path.join(brandDir, 'livrise-pwa-icon.png'));

  // Android / PWA Icons in standard resolutions: 192x192, 512x512
  await sharp(monogram512).resize(192, 192).toFile(path.join(brandDir, 'livrise-pwa-192.png'));
  await sharp(monogram512).resize(512, 512).toFile(path.join(brandDir, 'livrise-pwa-512.png'));
  await sharp(monogram512).resize(192, 192).toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(monogram512).resize(512, 512).toFile(path.join(publicDir, 'icon-512.png'));

  // 4. Apple Touch Icon (180x180)
  await sharp(monogram512).resize(180, 180).toFile(path.join(brandDir, 'livrise-apple-touch-icon.png'));
  await sharp(monogram512).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 5. Favicon (48x48 and 32x32)
  await sharp(monogram512).resize(48, 48).toFile(path.join(brandDir, 'livrise-favicon.png'));
  await sharp(monogram512).resize(32, 32).toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(monogram512).resize(32, 32).toFile(path.join(publicDir, 'favicon.png'));

  // 6. Maskable Icon (with 15% safe area margin)
  await sharp(monoCrop)
    .resize(340, 310, { fit: 'inside' })
    .extend({
      top: 101,
      bottom: 101,
      left: 86,
      right: 86,
      background: { r: 11, g: 11, b: 13, alpha: 1 }
    })
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'livrise-maskable-icon.png'));

  // 7. Splash Screen Logo
  await sharp(fullLogoBuffer)
    .resize(600, null)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'livrise-splash-logo.png'));

  // 8. Light theme logo variant
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'livrise-logo-light.png'));
  await sharp(fullLogoBuffer)
    .png({ quality: 100 })
    .toFile(path.join(imagesDir, 'logo-light.png'));

  console.log('All brand assets successfully generated in /public/brand!');
}

run().catch(err => {
  console.error('Error generating brand assets:', err);
  process.exit(1);
});
