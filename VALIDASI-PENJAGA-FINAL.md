# Validasi PenjagaLilinFinal

- `npm run lint`: **lulus**, ESLint + TypeScript tanpa error.
- `npm run build`: **lulus**, bundle Remotion berhasil.
- Remotion Studio `http://localhost:3000/PenjagaLilinFinal`: dimuat, preview canvas aktif, komposisi lama tetap terlihat.
- Frame PNG **37, 112, 187, 262, 286** berhasil dirender dan diperiksa. Framing diubah agar sanggul tetap terlihat; sambungan lengan dan intensitas selendang diperbaiki setelah pemeriksaan awal.
- Empat adegan tepat di frame **0–74, 75–149, 150–224, 225–299**.
- Judul dan subtitle dirender di dalam safe area. Subtitle akhir terbaca di atas latar gelap.
- MP4 H.264 berhasil: **1080×1920, 30/1 FPS, 300 frame, 10.000000 detik**, ukuran 15.765.149 byte.
- Ekspor unduhan Android: **H.264, yuv420p, faststart, 5.719.152 byte**, 1080×1920, 30 FPS, 300 frame, 10.000000 detik. Dikompresi dari master pada CRF 20; decoding seluruh file lulus.
- `ffmpeg -v error -i ... -f null -`: **lulus**, seluruh video didekode tanpa error.
- Frame dari MP4 diekstrak untuk memeriksa bahwa output encoder cocok dengan hasil still; frame 299 berakhir hitam sesuai desain.
- Integrasi diuji dua kali pada fixture dengan komposisi lama: komposisi lama dipertahankan, script `dev` lama tidak berubah, tidak ada registrasi ganda, dan kandidat audio asli ditemukan tanpa mengubah byte sumber.
- Sintaks shell pemasang: `bash -n install-penjaga-final.sh` **lulus**.

## Batasan yang belum terselesaikan

Audio asli dan source Penjaga Lilin 2.0–3.1 tidak tersedia di branch GitHub saat validasi. Karena itu, MP4 hasil sesi ini **tanpa audio**. Pengaitan satu berkas atmosfer otomatis sudah tersedia untuk folder Codespaces; pengaturan multitrack/trim/loop lama belum dapat diverifikasi.

Kualitas visual menggunakan aset ilustrasi raster buatan generator, dianimasikan sebagai lapisan 2D. Gerak kepala adalah artikulasi dan proyeksi perspektif dari ilustrasi profil, bukan redraw anatomis setiap frame.
