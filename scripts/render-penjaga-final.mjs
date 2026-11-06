import {existsSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import './prepare-penjaga-final.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'node_modules/@remotion/cli/remotion-cli.js');
const browser = process.env.REMOTION_BROWSER_EXECUTABLE ?? ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'].find(existsSync);
const extra = browser ? [`--browser-executable=${browser}`] : [];
const output = process.env.PENJAGA_OUTPUT_DIR ?? path.join(root, 'out/penjaga-lilin-final');
mkdirSync(output, {recursive: true});
const run = args => {
  const p = spawnSync(process.execPath, [cli, ...args, ...extra], {cwd: root, stdio: 'inherit'});
  if (p.status !== 0) process.exit(p.status ?? 1);
};
if (process.argv.includes('--frames')) {
  for (const f of [37, 112, 187, 262, 286]) run(['still', 'src/penjaga-final-entry.tsx', 'PenjagaLilinFinal', path.join(output, `frame-${f}.png`), `--frame=${f}`]);
} else run(['render', 'src/penjaga-final-entry.tsx', 'PenjagaLilinFinal', path.join(output, 'PenjagaLilinFinal.mp4'), '--codec=h264', '--pixel-format=yuv420p', '--crf=16', '--concurrency=2']);
