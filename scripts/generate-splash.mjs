import sharp from 'sharp';

const SIZE = 2732;
const BEIGE = { r: 245, g: 240, b: 232, alpha: 1 }; // #F5F0E8

const logo = await sharp('public/logo-nour.png').resize({ width: 900 }).toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: BEIGE } })
  .composite([{ input: logo, left: Math.round((SIZE - logoMeta.width) / 2), top: Math.round((SIZE - logoMeta.height) / 2) }])
  .png()
  .toFile('assets/splash.png');

console.log('splash.png generated');
