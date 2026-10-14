# 📚 SITTA UT — Sistem Informasi Tiras dan Transaksi Bahan Ajar

Aplikasi web statis untuk memantau stok bahan ajar dan melacak pengiriman paket di lingkungan Universitas Terbuka. Dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework dan tanpa backend) sebagai Tugas Praktik mata kuliah **Pemrograman Berbasis Web**.

> ⚠️ Seluruh data (pengguna, bahan ajar, dan pengiriman) adalah **data contoh** yang tersimpan di `data.js`. Proyek ini untuk pembelajaran dan tidak memakai autentikasi server yang sebenarnya.

## ✨ Fitur

### 🔐 Login dan Akun
- Login dengan email dan password, lengkap dengan validasi kolom kosong dan pesan jika email atau password salah.
- **Lupa password**: memvalidasi format email dan memeriksa apakah email terdaftar.
- **Daftar akun**: validasi semua kolom wajib, format email, password minimal 6 karakter, dan email tidak boleh ganda. Akun baru disimpan di `localStorage`.
- Sesi disimpan di `sessionStorage`. Halaman selain login diproteksi dan akan dialihkan ke halaman login jika belum masuk.
- Tombol **Keluar** dengan konfirmasi.

### 🏠 Dashboard
- Sapaan sesuai waktu (pagi, siang, sore, malam) serta peran dan lokasi pengguna.
- Jam dan tanggal yang diperbarui setiap detik.
- Ringkasan: total judul, total stok, dan jumlah bahan ajar dengan stok menipis (di bawah 200).

### 📦 Informasi Bahan Ajar
- Daftar bahan ajar dalam bentuk kartu lengkap dengan sampul, kode lokasi, kode barang, nama, jenis, edisi, dan stok.
- **Pencarian** langsung berdasarkan nama atau kode barang.
- Stok di bawah 200 diberi label **(menipis)**.
- **Tambah stok baru** dengan validasi: semua kolom wajib, edisi minimal 1, stok 0 atau lebih, dan kode barang tidak boleh ganda. Sampul bersifat opsional.
- Jika gambar sampul gagal dimuat, ditampilkan teks pengganti.

### 🚚 Tracking Pengiriman
- Pencarian berdasarkan **Nomor Delivery Order (DO)**.
- Menampilkan nama penerima, status, ekspedisi, tanggal kirim, jenis paket, dan total pembayaran.
- Bilah kemajuan dan tahapan status: *Diproses → Dikirim → Dalam Perjalanan → Diterima*.
- Riwayat perjalanan paket diurutkan dari yang terbaru.

### 🧭 Navbar
- Menu Dashboard, Informasi Bahan Ajar, Tracking Pengiriman, menu dropdown Laporan, dan Histori Transaksi.
- Menu Laporan dan Histori Transaksi masih berupa placeholder dan menampilkan pesan bahwa halaman belum tersedia pada Tugas Praktik 1.

## 🧪 Akun dan Data Contoh

| Email | Password | Peran |
|---|---|---|
| `rina@ut.ac.id` | `rina123` | UPBJJ-UT (Jakarta) |
| `agus@ut.ac.id` | `agus123` | UPBJJ-UT (Makassar) |
| `siti@ut.ac.id` | `siti123` | Puslaba |
| `doni@ut.ac.id` | `doni123` | Fakultas |
| `admin@ut.ac.id` | `admin123` | Administrator |

**Nomor DO untuk uji tracking:** `2023001234` (Dalam Perjalanan, JNE) dan `2023005678` (Dikirim, Pos Indonesia).

## 📁 Struktur Proyek

```
.
├── src/
│   ├── index.html        # Halaman login
│   ├── dashboard.html    # Dashboard
│   ├── stok.html         # Informasi bahan ajar
│   ├── tracking.html     # Tracking pengiriman
│   ├── css/style.css     # Gaya tampilan
│   ├── js/
│   │   ├── data.js       # Data contoh (pengguna, bahan ajar, tracking)
│   │   └── script.js     # Logika semua halaman
│   └── img/              # Sampul bahan ajar
├── bin/                  # Salinan css dan js
└── README.md
```

`script.js` dipakai bersama oleh semua halaman. Halaman dikenali lewat atribut `data-page` pada tag `<body>`, lalu fungsi inisialisasi yang sesuai dijalankan.

## 🚀 Cara Menjalankan

Tidak perlu instalasi atau proses build.

```bash
# 1. Clone repositori
git clone https://github.com/<username>/<nama-repositori>.git
cd <nama-repositori>/src

# 2. Buka index.html di browser,
#    atau gunakan ekstensi Live Server di VS Code
```

Logo pada halaman login bersifat opsional. Letakkan berkas `src/assets/logo-ut.png` jika ingin menampilkannya. Jika berkas tidak ada, logo otomatis disembunyikan.

## 🛠️ Teknologi

| Teknologi | Penggunaan |
|---|---|
| HTML5 | Struktur halaman semantik (`header`, `nav`, `main`, `section`, `article`) |
| CSS3 | Tata letak responsif, kartu, modal, bilah kemajuan, dan timeline |
| JavaScript (ES6) | Manipulasi DOM, validasi form, pencarian, dan routing sederhana |
| Web Storage | `sessionStorage` untuk sesi, `localStorage` untuk akun baru |

## ⚠️ Catatan dan Keterbatasan

- Password disimpan sebagai teks biasa di sisi klien. Ini hanya untuk keperluan belajar dan **tidak boleh dipakai di aplikasi sungguhan**.
- Stok baru yang ditambahkan hanya tersimpan di memori, jadi hilang saat halaman dimuat ulang.
- Sampul yang diunggah hanya berlaku selama halaman terbuka.

## 👤 Penulis

**Lioniel Salomon Siregar** — Sistem Informasi, Universitas Terbuka

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran. Silakan gunakan dan kembangkan sesuai kebutuhan.
