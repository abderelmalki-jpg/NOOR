import sharp from 'sharp';

const W = 1024, H = 500;

const bg = await sharp('public/art-arch-frame.png')
  .resize(W, H, { fit: 'cover', position: 'center' })
  .toBuffer();

// Soft brand-green wash so the logo reads clearly over the photo
const overlay = await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 45, g: 80, b: 22, alpha: 0.35 } }
}).png().toBuffer();

const logo = await sharp('public/logo-nour.png').resize({ width: 460 }).toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(bg)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: Math.round((W - logoMeta.width) / 2), top: Math.round((H - logoMeta.height) / 2) }
  ])
  .png()
  .toFile('release-builds/play-feature-graphic-1024x500.png');

console.log('feature graphic generated');
