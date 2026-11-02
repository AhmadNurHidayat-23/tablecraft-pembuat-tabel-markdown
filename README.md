# TableCraft — Pembuat Tabel Markdown

TableCraft membantu Anda menyusun tabel secara visual dan menghasilkan kode Markdown secara otomatis. Aplikasi ini memudahkan penulisan dokumentasi tanpa mengetik pemisah tabel secara manual. Seluruh antarmuka menggunakan bahasa Indonesia dengan tampilan cream, coral, biru, dan mint responsif.

## Fitur utama

- Edit judul dan isi tabel langsung pada sel.
- Tentukan ukuran melalui input jumlah baris dan kolom.
- Tambahkan atau hapus baris serta kolom terakhir melalui tombol.
- Atur perataan setiap kolom ke kiri, tengah, atau kanan.
- Lihat kode Markdown yang diperbarui setiap kali isi berubah.
- Salin hasil ke papan klip dan reset tabel ke contoh awal.
- Tangani karakter pipe, backslash, penanda Markdown, dan HTML sebagai teks.

Ukuran dibatasi hingga 20 baris, termasuk judul, dan 10 kolom. Setiap sel menampung maksimal 500 karakter. Isi diproses di browser tanpa database, login, atau penyimpanan permanen. Memuat ulang halaman akan mengembalikan contoh awal. Pengurangan ukuran membuang sel di bagian akhir tabel.

## Teknologi

Laravel 13 menangani halaman utama melalui Blade. Antarmuka memakai HTML5, CSS3, Vanilla JavaScript, dan Vite, tanpa React, Vue, maupun Livewire. Font Inter disajikan secara lokal sehingga tampilan tidak bergantung pada layanan font eksternal.

## Menjalankan secara lokal

Siapkan PHP 8.3 atau lebih baru, Composer, serta Node.js 22.12+ atau versi LTS yang kompatibel dengan Vite 8.

```sh
composer install
cp .env.example .env
php artisan key:generate
npm ci
npm run build
php artisan serve
```

Buka alamat yang ditampilkan Artisan. Untuk pengembangan aset, jalankan `npm run dev` pada terminal kedua. Pada MAMP, pilih PHP yang sesuai dan arahkan document root khusus aplikasi ke folder `public`; jangan arahkan ke root project. Konfigurasi bawaan memakai session file, cache file, dan antrean sinkron sehingga tidak memerlukan migrasi database.

## Cara menggunakan

Mulai dari contoh, ubah ukuran, lalu klik sel untuk mengganti isinya. Pilih perataan di atas setiap kolom. Tekan **Salin Markdown** untuk README atau dokumentasi yang mendukung tabel GitHub Flavored Markdown. Tombol **Reset Tabel** meminta konfirmasi sebelum mengganti perubahan. Jika browser membatasi clipboard, salin kode yang sudah dipilih secara manual.

Jalankan `php artisan test`, `npm test`, dan `npm run build` untuk memeriksa aplikasi.
