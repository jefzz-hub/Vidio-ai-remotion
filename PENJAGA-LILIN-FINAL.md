# Penjaga Lilin — Final

Komposisi baru `PenjagaLilinFinal`: 1080 × 1920, 30 FPS, 300 frame / 10 detik.
Komposisi lama tidak dihapus. Semua ilustrasi disertakan lokal; render tidak mengambil gambar dari internet.

## Android / Codespaces

Di terminal Codespaces, dari folder proyek:

```bash
curl -fsSL https://raw.githubusercontent.com/jefzz-hub/Vidio-ai-remotion/codex/penjaga-lilin-final/install-penjaga-final.sh -o /tmp/install-penjaga-final.sh && bash /tmp/install-penjaga-final.sh
```

Installer mengunduh hanya komposisi final dan asetnya, mencadangkan file yang berubah ke `work/`, serta menambahkan registrasi ke Root tanpa mengganti komposisi lama. Tidak perlu menempel kode TSX, checkout, stash, atau reset Git. Dependensi menggunakan Remotion yang sudah terpasang.

- Preview terpisah: `npm run dev:final`, buka port yang ditampilkan, pilih **PenjagaLilinFinal**.
- Render MP4: `npm run render:final` → `out/penjaga-lilin-final/PenjagaLilinFinal.mp4`.
- Lima frame uji: `npm run frames:final`.
- Pemeriksaan: `npm run lint` dan `npm run build`.

## Audio asli

Saat pengerjaan, branch GitHub hanya berisi template; audio dan versi 2.0–3.1 masih lokal di Codespaces. Render yang disertakan **tanpa audio**, bukan pengganti atmosfer asli.

Skrip prepare memeriksa `public`, `assets`, `files` dan referensi audio di source lama. Jika hanya ada satu kandidat atmosfer yang jelas, rekaman asli dipakai tanpa modifikasi gain atau loop. File di luar public disalin ke folder aset final; file sumber tidak berubah. Tidak ada musik/efek pengganti yang dibuat.

Jika ada banyak kandidat, pemilihan tidak ditebak. Pilih satu kali:

```bash
PENJAGA_AUDIO=public/audio/nama-file-asli.mp3 npm run render:final
```

Jika atmosfer lama dirakit dari beberapa trek, pengaturan trim/volume/loop sebelumnya perlu diambil dari kode lama setelah tersedia; deteksi otomatis hanya menangani satu berkas atmosfer.

## Adegan dan ilustrasi

| Waktu | Kamera dan aksi |
|---|---|
| 0–2,5 dtk | Wide shot, push-in pelan, judul fade |
| 2,5–5 dtk | Medium shot, drift, kepala/tangan bergerak, flicker meningkat |
| 5–7,5 dtk | Push-in, bayangan perlahan terbentuk, mata mulai bercahaya |
| 7,5–10 dtk | Tension zoom, tangan terangkat, api padam, subtitle klimaks, fade hitam |

Aset room/woman/table/chair/shadow dibuat dengan generator ilustrasi khusus berdasarkan storyboard pengguna. Ini animasi boneka ilustrasi 2D: lapisan raster, artikulasi kepala/lengan/selendang, parallax, bukan animasi karakter frame-by-frame. Tidak menggunakan karakter geometris sederhana. Api dan efek cahaya/dust/grain dibuat prosedural dan deterministik mengikuti frame.

Judul berjarak minimal 90 px dari sisi dan 164 px dari atas; subtitle berjarak 110 px dari sisi dan 215 px dari bawah. Font serif lokal DejaVu disertakan dengan lisensinya. Tidak ada permintaan font jaringan.

## Validasi

Lihat `VALIDASI-PENJAGA-FINAL.md` untuk hasil build, lint, pemeriksaan frame, dan metadata MP4. Asset sumber dan komposisi disertakan agar hasil bisa dirender ulang di Codespaces.
