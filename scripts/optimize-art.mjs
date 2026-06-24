import sharp from 'sharp';

// Portrait onboarding art is shown full-bleed on phone screens — 900px wide is plenty for retina.
const portraits = ['art-onboarding-cover.png', 'art-light-arch.png', 'art-writing-man.png', 'art-arch-frame.png'];

for (const f of portraits) {
  const path = 'public/' + f;
  const buf = await sharp(path).resize({ width: 900, withoutEnlargement: true }).png({ quality: 78, compressionLevel: 9 }).toBuffer();
  await sharp(buf).toFile(path);
  console.log(f, '->', (buf.length / 1024).toFixed(0) + 'KB');
}

// Logo wordmark: shown at ~160px wide in the UI — 480px wide covers retina with room to spare.
const logoBuf = await sharp('public/logo-nour.png').resize({ width: 480, withoutEnlargement: true }).png({ quality: 80, compressionLevel: 9 }).toBuffer();
await sharp(logoBuf).toFile('public/logo-nour.png');
console.log('logo-nour.png ->', (logoBuf.length / 1024).toFixed(0) + 'KB');
