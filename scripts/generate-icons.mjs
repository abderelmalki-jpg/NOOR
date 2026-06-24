import sharp from 'sharp';

const SRC = 'design-assets/icon-crescent-arch.png';

const targets = [
  { out: 'public/pwa-192x192.png', size: 192 },
  { out: 'public/pwa-512x512.png', size: 512 },
  { out: 'public/apple-touch-icon.png', size: 180 },
  { out: 'public/favicon-32x32.png', size: 32 },
  { out: 'public/favicon-16x16.png', size: 16 }
];

for (const t of targets) {
  await sharp(SRC).resize(t.size, t.size).png().toFile(t.out);
  console.log('wrote', t.out);
}

// favicon.ico (32x32 PNG renamed; browsers accept PNG-as-ico content for modern targets,
// but for a real multi-res .ico we just reuse the 32x32 raster)
await sharp(SRC).resize(32, 32).png().toFile('public/favicon.png');
console.log('done');
