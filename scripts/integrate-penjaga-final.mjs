import {existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync} from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const backup = path.join(root, 'work/penjaga-final-backups', new Date().toISOString().replaceAll(':','-'));
mkdirSync(backup, {recursive: true});
const rootFile = path.join(root, 'src/Root.tsx');
if (existsSync(rootFile)) {
  const old = readFileSync(rootFile, 'utf8');
  if (!old.includes('PenjagaFinalCompositions') && !old.includes('id="PenjagaLilinFinal"')) {
    if (old.includes('<>')) {
      copyFileSync(rootFile, path.join(backup, 'Root.tsx.backup'));
      const next = 'import {PenjagaFinalCompositions} from "./PenjagaLilinFinal/registration";\n' + old.replace('<>', '<>\n      <PenjagaFinalCompositions />');
      writeFileSync(rootFile, next);
      console.log('Komposisi final ditambahkan. Semua komposisi lama dipertahankan.');
    } else console.log('Root khusus dipertahankan. Gunakan npm run dev:final untuk entry final terpisah.');
  }
}
const pkgFile = path.join(root, 'package.json');
copyFileSync(pkgFile, path.join(backup, 'package.json'));
const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
pkg.scripts ??= {};
Object.assign(pkg.scripts, {
  'prepare:final': 'node scripts/prepare-penjaga-final.mjs',
  'dev:final': 'npm run prepare:final && remotion studio src/penjaga-final-entry.tsx --no-open',
  'render:final': 'node scripts/render-penjaga-final.mjs',
  'frames:final': 'node scripts/render-penjaga-final.mjs --frames',
});
writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n');
await import('./prepare-penjaga-final.mjs');
console.log(`Backup: ${path.relative(root, backup)}`);
