# KELIR SUNYI — Ketukan dari Kolong
Proyek Remotion + React + TypeScript: horor folklor Indonesia, teater bayangan digital, vertikal 1080 × 1920, 30 fps, **80 detik**, 22 shot, 8 segmen.
Karakter/rig, cahaya, latar, tekstur, shot, audio dan subtitle reusable. Komposisi: **KetukanDariKolong**.

## Mulai dari Android Chrome / GitHub Codespaces
1. Di HP buka halaman GitHub repository > tombol hijau **Code** > **Codespaces** > **Create codespace on main**. Jika editor terlalu sempit, Chrome menu ⋮ > **Situs desktop**, putar layar **landscape**.
2. Tunggu pembuatan devcontainer dan postCreateCommand. Ia menginstal Node 22, FFmpeg, library Chrome, menjalankan `npm ci` dan `npx remotion browser ensure`. Setup pertama memerlukan internet. Bila terminal berhenti, jalankan `npm run setup`.
3. Di terminal Codespaces ketik `npm run dev`. Studio dijalankan di **port 3000** tanpa membuka browser desktop.
4. Di VS Code buka tab **PORTS** > 3000 > **Open in Browser**. Port disetel **Private** (login GitHub), jangan ubah ke Public. Buka preview di tab Android terpisah.
5. Pilih komposisi **Kelir Sunyi / KetukanDariKolong**, scrub 0–80 detik. Editor JSON: `src/kelir/data/episode.json`; simpan (Ctrl+S atau menu save di HP), refresh Studio.
6. Jalankan pemeriksaan dan render lewat terminal (lihat di bawah). Di Explorer buka `out/`, klik kanan MP4 > **Download** untuk mengunduh ke HP.
7. Buka **Source Control**, stage perubahan, commit, lalu **Sync Changes**. Setelah selesai, lewat GitHub Codespaces pilih **Stop Codespace** agar tidak boros kuota penggunaan.

## Perintah
```bash
npm run setup           # ulangi aman; npm ci, browser, validasi dan teks
npm run dev             # Studio 3000 tanpa membuka browser desktop
npm run check           # validasi data, TypeScript, ekspor subtitle
npm run render:test     # 10 detik pertama, out/ketukan-test.mp4, 540x960, 30 fps
npm run render:draft    # 80 detik, out/ketukan-draft.mp4, 540x960
npm run render:final    # 80 detik, out/ketukan-final.mp4, 1080x1920, H264/yuv420p
npm run render:stills   # 11 frame representatif tiap segmen ke out/stills/
```
Semua render CPU memakai concurrency 1. Audio akan masuk ke MP4 bila tersedia. Tidak perlu API key. Jika butuh ubah concurrency, ganti `--concurrency=1` pada `package.json` (2 hanya jika memori memadai). `--scale=0.5` menurunkan output draft tanpa mengubah koordinat animasi.

## Sumber data dan pengeditan
Semua data ada di `src/kelir/data/episode.json`: `fps, width, height, seed, duration, characters, shots, subtitles, audio`. Shot berisi `id, start, duration, environment, camera (x/y/zoom/moveX/moveY/push), actors (characterId/x/y/scale/facing/action), light, shadow, effects, audio cues`.
**Jangan bikin jeda antarsyot**. Aksi tersedia: `idle, walk, sit, lie, turnHead, reach, point, recoil, warn, liftFeet, stand, walkToDoor, reachDoor, recoilDoor, rescue, protect, freeze, turnBack`. Lihat `src/kelir/rig.tsx`: tambahkan ke `actionIds` di `schema.ts`, `preset` di rig, dan validator pada `scripts/validate.mjs`; kemudian panggil dari JSON. Rig menggunakan grup SVG bertingkat untuk kepala, kedua lengan atas/bawah, tangan, kedua paha/betis/kaki dengan pivot sendi; tidak ada animasi CSS real-time. Karakter dan palet di `src/kelir/appearance.ts`.
Posisi aktor adalah titik kaki pada kanvas 1080x1920. Perubahan pose sinematik memerlukan koordinat antarshot konsisten. Perpindahan Nenek dari ranjang ke Rani dan gerak Rani ke pintu dikendalikan pada `src/kelir/shot.tsx`; sesuaikan timeline bila mengedit aksi plot ini.

## Narasi, audio, subtitle
**Status narasi: BELUM ADA.** Tanpa TTS berbayar, render tetap jalan dengan ambience hujan, nada tegang, ketukan dan derit lokal (`public/audio/*.wav`). Narasi asli perlu direkam sendiri.
Untuk menambahkan voice-over: simpan WAV/MP3 rekaman ke `public/audio/narasi.wav`, ubah JSON `audio.narration.src` menjadi `"audio/narasi.wav"`, atur `volume` dan `offset` detik. Sesuaikan `subtitles[].start/end` secara manual dengan audio memakai preview; proyek **tidak memiliki penyelarasan kata otomatis**. Subtitle bisa melintasi perubahan shot.
Jalankan `npm run check` untuk membuat `exports/narration.txt` dan `exports/subtitles.srt`. `audio.ambience/tension` mendukung volume, loop, fade in/out dan cue efek per shot. Ambience disetel rendah di bawah narasi.

## Troubleshooting
- Preview tidak muncul: pastikan `npm run dev` masih berjalan, tab **PORTS** berisi 3000, dan browser sudah login GitHub; bila port bentrok tutup proses lama.
- Browser Headless gagal: `npm run setup`, lalu **Codespaces: Rebuild Container** dari command palette. Pastikan jaringan dan distro container default.
- Render kekurangan RAM: pakai `npm run render:test` atau `render:draft`, concurrency 1, tutup tab lain; final memerlukan Codespace lebih besar.
- Audio/narasi belum ada: narasi `null` adalah normal. Jika nama file audio diubah, salin file ke `public/audio` sebelum render.
- Edit JSON rusak: `npm run check` mencetak ID shot dan penjelasan, jangan mulai render sampai lulus.
- Lockfile: GitHub Actions akan membuat dan berusaha commit `package-lock.json` saat push pertama. Jika belum muncul, `npm run setup` membuat lockfile dengan `npm install --package-lock-only`, lalu `npm ci`. **Commit lockfile** melalui Source Control. Semua `@remotion/*` dipatok ke versi identik 4.0.541.

## Peta kode
- `src/kelir/schema.ts` validasi JSON via Zod dan durationInFrames
- `src/kelir/rig.tsx` rig SVG, pose, gerak sendi, napas, berjalan
- `src/kelir/environment.tsx` rumah panggung, kamar, ranjang, lampu api
- `src/kelir/shot.tsx` kamera, parallax ringan, bayangan, butir, cutout
- `src/kelir/video.tsx` Sequencing, subtitle lintas shot, audio
- `scripts/validate.mjs` periksa timeline, durasi, scene ID dan aset
- `scripts/export-text.mjs` teks narasi/SRT; `scripts/stills.mjs` review frame

Template HelloWorld lama dipertahankan dalam folder Starter-Asli. Rendering diuji otomatis oleh workflow `.github/workflows/kelir-ci.yml` pada GitHub Actions; lihat laporan log dan artefak MP4 jika berjalan. Tidak ada jaminan render lokal sampai dependencies dan browser terpasang.
