#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "[Kelir Sunyi] Node $(node --version) / npm $(npm --version)"
if [[ -f package-lock.json ]]; then
  echo "[Kelir Sunyi] Memasang dari lockfile (npm ci)"
  npm ci --no-audit --no-fund
else
  echo "[Kelir Sunyi] Lockfile belum ada; membuat package-lock.json sekali."
  npm install --package-lock-only --ignore-scripts --no-audit --no-fund
  npm ci --no-audit --no-fund
fi
command -v ffprobe >/dev/null || { echo "ffprobe belum ada: rebuild Codespace dari devcontainer."; exit 1; }
echo "[Kelir Sunyi] Menyiapkan Chrome Headless Shell."
npx remotion browser ensure || { echo "Gagal memasang browser; cek akses internet dan library Linux."; exit 1; }
node scripts/validate.mjs
node scripts/export-text.mjs
echo "[Kelir Sunyi] Siap: npm run dev -> port 3000 (private)"
