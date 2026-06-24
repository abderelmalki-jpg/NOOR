import { randomBytes } from 'crypto';
import { execFileSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';

const KEYSTORE_PATH = 'android/app/nour-release.keystore';
const PROPS_PATH = 'android/keystore.properties';
const ALIAS = 'nour';

if (existsSync(KEYSTORE_PATH)) {
  console.error('Keystore already exists at ' + KEYSTORE_PATH + ' — refusing to overwrite. Delete it manually first if you really want a new one.');
  process.exit(1);
}

// Default keystore format (PKCS12) doesn't support a key password distinct from the store password —
// keytool silently ignores -keypass in that case, so we use one password for both.
const storePass = randomBytes(24).toString('base64').replace(/[+/=]/g, '');

execFileSync('keytool', [
  '-genkeypair',
  '-v',
  '-keystore', KEYSTORE_PATH,
  '-alias', ALIAS,
  '-keyalg', 'RSA',
  '-keysize', '2048',
  '-validity', '10000',
  '-storepass', storePass,
  '-keypass', storePass,
  '-dname', 'CN=Nour, OU=Nour, O=Nour, L=, ST=, C=FR'
], { stdio: ['ignore', 'ignore', 'inherit'] });

writeFileSync(PROPS_PATH, [
  'storeFile=app/nour-release.keystore',
  'storePassword=' + storePass,
  'keyAlias=' + ALIAS,
  'keyPassword=' + storePass,
  ''
].join('\n'), 'utf8');

console.log('Keystore created at ' + KEYSTORE_PATH);
console.log('Credentials written to ' + PROPS_PATH + ' (not printed here — open the file directly to view/back them up).');
