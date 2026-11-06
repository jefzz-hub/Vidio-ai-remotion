#!/usr/bin/env bash
set -euo pipefail
# Add only this new composition. Never reset Git, replace Root, or remove legacy files.
test -f package.json && test -d src || { echo 'Jalankan dari folder proyek Remotion.'; exit 1; }
PENJAGA_BASE="https://raw.githubusercontent.com/jefzz-hub/Vidio-ai-remotion/codex/penjaga-lilin-final"
PENJAGA_STAGE="$(mktemp -d "${TMPDIR:-/tmp}/penjaga-final.XXXXXX")"
trap 'rm -rf "$PENJAGA_STAGE"' EXIT
curl -fsSL "$PENJAGA_BASE/penjaga-final-files.txt" -o "$PENJAGA_STAGE/manifest"
while IFS= read -r PENJAGA_FILE; do
  case "$PENJAGA_FILE" in
    src/PenjagaLilinFinal/*|src/penjaga-final-entry.tsx|public/penjaga-lilin-final/*|scripts/*penjaga-final.mjs|PENJAGA-LILIN-FINAL.md|VALIDASI-PENJAGA-FINAL.md) ;;
    *) echo "Path tidak valid: $PENJAGA_FILE"; exit 1 ;;
  esac
  mkdir -p "$PENJAGA_STAGE/$(dirname "$PENJAGA_FILE")"
  curl -fsSL "$PENJAGA_BASE/$PENJAGA_FILE" -o "$PENJAGA_STAGE/$PENJAGA_FILE"
done < "$PENJAGA_STAGE/manifest"
PENJAGA_BACKUP="work/penjaga-final-install-$(date +%Y%m%d-%H%M%S)"
while IFS= read -r PENJAGA_FILE; do
  if test -f "$PENJAGA_FILE"; then
    mkdir -p "$PENJAGA_BACKUP/$(dirname "$PENJAGA_FILE")"
    cp "$PENJAGA_FILE" "$PENJAGA_BACKUP/$PENJAGA_FILE.backup"
  fi
  mkdir -p "$(dirname "$PENJAGA_FILE")"
  cp "$PENJAGA_STAGE/$PENJAGA_FILE" "$PENJAGA_FILE"
done < "$PENJAGA_STAGE/manifest"
node scripts/integrate-penjaga-final.mjs
echo 'Selesai. Pilih PenjagaLilinFinal di Studio, atau jalankan: npm run render:final'
