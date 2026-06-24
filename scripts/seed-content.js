import { readFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { DUAS, ADHKAR, REFLECTIONS, RABBANA, NAWAWI, ANNUAIRE, JAWAMI } from '../src/data/content.js';

const serviceAccount = JSON.parse(readFileSync(new URL('../noor-27215-firebase-adminsdk-fbsvc-89468db037.json', import.meta.url)));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function seedCollection(collectionName, items) {
  const batch = db.batch();
  for (const item of items) {
    batch.set(db.collection(collectionName).doc(item.id), item);
  }
  await batch.commit();
  console.log(`${collectionName}: ${items.length} documents`);
}

await seedCollection('content_duas', DUAS);
await seedCollection('content_adhkar', ADHKAR);
await seedCollection('content_reflections', REFLECTIONS);
await seedCollection('content_rabbana', RABBANA);
await seedCollection('content_nawawi', NAWAWI);
await seedCollection('content_annuaire', ANNUAIRE);
await seedCollection('content_jawami', JAWAMI);

console.log('Seed terminé.');
