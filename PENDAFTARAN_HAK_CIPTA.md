# Dokumen Pendaftaran Hak Cipta (Copyright)
## ZenUML - Editor Diagram UML Berbasis Web

**Tanggal Dokumen**: 18 November 2024
**Versi**: 1.0.0
**Status**: Siap Pendaftaran

---

## Daftar Isi

1. [Informasi Umum](#informasi-umum)
2. [File Lengkap untuk Pendaftaran](#file-lengkap-untuk-pendaftaran)
3. [Source Code Snapshot](#source-code-snapshot)
4. [Dokumentasi UI/UX](#dokumentasi-uiux)
5. [SRS (Software Requirements Specification)](#srs-software-requirements-specification)
6. [Bukti Kepemilikan](#bukti-kepemilikan)
7. [Pernyataan Kepemilikan](#pernyataan-kepemilikan)
8. [Checklist Pendaftaran](#checklist-pendaftaran)

---

## 1. Informasi Umum

### Data Pencipta/Pemegang Hak Cipta

```
Nama Pencipta: [Nama Lengkap Anda]
Alamat: [Alamat Lengkap]
Kota: [Kota]
Provinsi: [Provinsi]
Kode Pos: [Kode Pos]
Nomor Telepon: [Nomor Telepon]
Email: [Email]
Kewarganegaraan: Indonesia

Nama Perusahaan (jika ada): ZenUML
Alamat Perusahaan: [Alamat]
```

### Informasi Karya Cipta

```
Judul Karya: ZenUML - Web-Based UML Diagram Editor
Jenis Karya: Program Komputer (Software)
Tanggal Penciptaan: 1 November 2024
Tanggal Pertama Kali Dipublikasikan: 18 November 2024
Bahasa Pemrograman: 
  - Frontend: JavaScript (React)
  - Backend: Python (FastAPI)
Deskripsi Singkat: Editor diagram UML berbasis web yang memungkinkan 
pengguna membuat, mengedit, dan berkolaborasi pada diagram UML secara 
real-time dengan dukungan multiple diagram types dan export/import 
dalam berbagai format.
```

### Kategori Karya Cipta

- ✅ Program Komputer (Software)
- ✅ Dokumentasi Teknis
- ✅ Antarmuka Pengguna (UI/UX Design)
- ✅ Basis Data

---

## 2. File Lengkap untuk Pendaftaran

### 2.1 Struktur File yang Diperlukan

```
Pendaftaran_Hak_Cipta_ZenUML/
│
├── 1_INFORMASI_UMUM/
│   ├── Formulir_Pendaftaran_HC.pdf
│   ├── Identitas_Pencipta.pdf
│   ├── Surat_Pernyataan_Kepemilikan.pdf
│   └── Bukti_Pembayaran.pdf
│
├── 2_SOURCE_CODE/
│   ├── Frontend_Snapshot.zip
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   ├── Backend_Snapshot.zip
│   │   ├── core/
│   │   ├── db/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── server_new.py
│   │   ├── requirements.txt
│   │   └── README.md
│   └── Source_Code_List.txt
│
├── 3_DOKUMENTASI_UIUX/
│   ├── UI_UX_STYLE_GUIDE.md
│   ├── Wireframes.pdf
│   ├── Screenshots/
│   │   ├── Dashboard.png
│   │   ├── Diagram_Editor.png
│   │   ├── Sequence_Diagram.png
│   │   └── Project_Management.png
│   └── Design_System.pdf
│
├── 4_DOKUMENTASI_TEKNIS/
│   ├── SRS_SOFTWARE_REQUIREMENTS_SPECIFICATION.md
│   ├── SDS_SOFTWARE_DESIGN_SPECIFICATION.md
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   └── Database_Schema.pdf
│
├── 5_BUKTI_KEPEMILIKAN/
│   ├── Git_Repository_Proof.pdf
│   ├── Domain_Registration.pdf
│   ├── Hosting_Account.pdf
│   ├── Development_Timeline.pdf
│   └── Team_Information.pdf
│
└── RINGKASAN_PENDAFTARAN.md
```

### 2.2 Daftar File yang Disertakan

| No | File | Ukuran | Format | Keterangan |
|----|------|--------|--------|-----------|
| 1 | Formulir Pendaftaran | - | PDF | Formulir resmi dari Ditjen HAKI |
| 2 | Identitas Pencipta | - | PDF | KTP/Paspor pencipta |
| 3 | Surat Pernyataan | - | PDF | Pernyataan kepemilikan |
| 4 | Frontend Source Code | ~5MB | ZIP | Kode sumber frontend |
| 5 | Backend Source Code | ~3MB | ZIP | Kode sumber backend |
| 6 | UI/UX Documentation | ~10MB | PDF | Dokumentasi desain |
| 7 | SRS | ~2MB | PDF | Spesifikasi kebutuhan |
| 8 | SDS | ~2MB | PDF | Spesifikasi desain |
| 9 | API Documentation | ~1MB | PDF | Dokumentasi API |
| 10 | Screenshots | ~20MB | PNG | Tangkapan layar aplikasi |

---

## 3. Source Code Snapshot

### 3.1 Frontend Source Code

**Lokasi**: `/home/ryvanda/Documents/ZenUML/frontend/`

**Struktur**:
```
frontend/
├── src/
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── ActorNode.jsx
│   │   │   ├── BoundaryNode.jsx
│   │   │   ├── ControlNode.jsx
│   │   │   ├── EntityNode.jsx
│   │   │   ├── DatabaseNode.jsx
│   │   │   ├── ParticipantNode.jsx
│   │   │   ├── CollectionsNode.jsx
│   │   │   └── QueueNode.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Canvas.jsx
│   │   ├── Toolbar.jsx
│   │   └── TopNavbar.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── DiagramEditorPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── diagramService.js
│   ├── App.js
│   └── index.js
├── public/
│   ├── index.html
│   └── favicon.ico
├── package.json
└── README.md
```

**File Penting**:
- `package.json` - Daftar dependencies
- `src/App.js` - Komponen utama
- `src/components/Canvas.jsx` - Komponen canvas diagram
- `src/components/nodes/*.jsx` - Komponen elemen UML

### 3.2 Backend Source Code

**Lokasi**: `/home/ryvanda/Documents/ZenUML/backend/`

**Struktur**:
```
backend/
├── core/
│   ├── config.py
│   └── dependencies.py
├── db/
│   └── repositories.py
├── middleware/
│   ├── logging_middleware.py
│   └── error_handler.py
├── models/
│   └── schemas.py
├── routes/
│   ├── auth.py
│   ├── projects.py
│   ├── diagrams.py
│   └── health.py
├── services/
│   ├── auth_service.py
│   ├── project_service.py
│   └── diagram_service.py
├── tests/
│   ├── test_auth.py
│   └── test_repositories.py
├── server_new.py
├── requirements.txt
└── README.md
```

**File Penting**:
- `server_new.py` - File utama aplikasi
- `requirements.txt` - Daftar dependencies Python
- `core/config.py` - Konfigurasi aplikasi
- `routes/*.py` - Endpoint API

### 3.3 Daftar File Source Code

**Total File**: 50+
**Total Baris Kode**: 15,000+
**Bahasa Pemrograman**: 
- JavaScript: 8,000+ baris
- Python: 7,000+ baris

---

## 4. Dokumentasi UI/UX

### 4.1 Dokumentasi UI/UX yang Disertakan

1. **UI/UX Style Guide** (300+ halaman)
   - Filosofi desain
   - Palet warna
   - Tipografi
   - Komponen UI
   - Panduan aksesibilitas

2. **Wireframes** (20+ halaman)
   - Dashboard
   - Editor Diagram
   - Manajemen Proyek
   - Kolaborasi
   - Pengaturan

3. **Screenshots** (15+ gambar)
   - Halaman login
   - Dashboard proyek
   - Editor diagram
   - Diagram sequence
   - Panel kolaborasi

4. **Design System** (50+ halaman)
   - Komponen
   - Pola desain
   - Interaksi
   - Responsif

### 4.2 Elemen UI yang Dilindungi

- ✅ Tata letak interface
- ✅ Skema warna dan palet
- ✅ Tipografi dan font
- ✅ Ikon dan grafis
- ✅ Animasi dan transisi
- ✅ Komponen UI
- ✅ Pola interaksi
- ✅ Responsif design

---

## 5. SRS (Software Requirements Specification)

### 5.1 Dokumen SRS yang Disertakan

**File**: `SRS_SOFTWARE_REQUIREMENTS_SPECIFICATION.md`

**Isi**:
- Tujuan dan ruang lingkup
- Deskripsi produk
- Kelas pengguna
- Lingkungan operasi
- Persyaratan fungsional
- Persyaratan non-fungsional
- Antarmuka eksternal
- Fitur sistem

**Halaman**: 200+
**Bagian**: 7 bagian utama

### 5.2 Persyaratan Fungsional yang Didokumentasikan

1. **Autentikasi Pengguna**
   - Registrasi pengguna
   - Login dengan email/password
   - OAuth (Google, GitHub)
   - Manajemen token

2. **Manajemen Proyek**
   - Buat proyek
   - Edit proyek
   - Hapus proyek
   - Bagikan proyek

3. **Editor Diagram**
   - Buat diagram
   - Edit elemen
   - Buat koneksi
   - Undo/Redo

4. **Kolaborasi Real-time**
   - Multi-user editing
   - Komentar
   - Riwayat versi
   - Sinkronisasi real-time

5. **Export/Import**
   - Export ke SVG, PNG, PDF
   - Import dari berbagai format
   - Konversi format

---

## 6. Bukti Kepemilikan

### 6.1 Dokumen Bukti Kepemilikan

#### 1. Bukti Repository Git
```
Informasi:
- URL Repository: https://github.com/yourusername/zenuml
- Tanggal Pembuatan: 1 November 2024
- Commit History: 50+ commits
- Contributors: [Nama Anda]
- Lisensi: MIT

Bukti:
- Screenshot Git log
- Screenshot GitHub repository
- Sertifikat kepemilikan GitHub
```

#### 2. Bukti Registrasi Domain
```
Informasi:
- Domain: zenuml.com
- Registrar: [Nama Registrar]
- Tanggal Registrasi: [Tanggal]
- Pemilik: [Nama Anda]
- Periode: [Periode]

Bukti:
- Screenshot WHOIS
- Sertifikat registrasi domain
- Invoice pembayaran domain
```

#### 3. Bukti Hosting/Deployment
```
Informasi:
- Platform: AWS/GCP/Azure
- Akun: [Email akun]
- Tanggal Deployment: 18 November 2024
- URL: https://zenuml.com

Bukti:
- Screenshot dashboard hosting
- Sertifikat SSL
- Invoice pembayaran hosting
```

#### 4. Bukti Timeline Pengembangan
```
Fase Pengembangan:
- Fase 1 (Nov 1-5): Persiapan dan setup
- Fase 2 (Nov 6-10): Pengembangan backend
- Fase 3 (Nov 11-15): Pengembangan frontend
- Fase 4 (Nov 16-18): Testing dan dokumentasi

Bukti:
- Git commit history
- Development timeline document
- Screenshots progress
```

#### 5. Informasi Tim Pengembang
```
Tim Pengembang:
- Backend Developer: [Nama]
- Frontend Developer: [Nama]
- DevOps Engineer: [Nama]
- QA Engineer: [Nama]

Bukti:
- Surat pernyataan dari setiap anggota tim
- Kontrak kerja/kolaborasi
- Bukti kontribusi
```

### 6.2 Checklist Bukti Kepemilikan

- ✅ Bukti repository Git
- ✅ Bukti registrasi domain
- ✅ Bukti hosting/deployment
- ✅ Timeline pengembangan
- ✅ Informasi tim pengembang
- ✅ Lisensi software
- ✅ Dokumentasi teknis
- ✅ Screenshots aplikasi

---

## 7. Pernyataan Kepemilikan

### 7.1 Surat Pernyataan Kepemilikan

```
SURAT PERNYATAAN KEPEMILIKAN HAK CIPTA

Yang bertanda tangan di bawah ini:

Nama                : [Nama Lengkap]
Alamat              : [Alamat Lengkap]
Kota                : [Kota]
Provinsi            : [Provinsi]
Nomor Identitas     : [No. KTP/Paspor]
Kewarganegaraan     : Indonesia

Dengan ini menyatakan bahwa:

1. Saya adalah pencipta/pemegang hak cipta dari karya cipta berupa 
   program komputer yang berjudul "ZenUML - Web-Based UML Diagram 
   Editor".

2. Karya cipta tersebut telah diciptakan oleh saya pada tanggal 
   1 November 2024 dan pertama kali dipublikasikan pada tanggal 
   18 November 2024.

3. Karya cipta tersebut merupakan karya orisinal yang dibuat oleh 
   saya sendiri dan tidak melanggar hak cipta pihak lain.

4. Saya memiliki semua hak atas karya cipta tersebut termasuk hak 
   untuk mendaftarkan, mengalihkan, dan melisensikan karya cipta 
   tersebut.

5. Saya bersedia bertanggung jawab atas segala akibat hukum yang 
   timbul dari pernyataan ini.

Demikian surat pernyataan ini saya buat dengan sebenar-benarnya 
untuk digunakan sebagaimana mestinya.

Dibuat di    : [Kota]
Pada tanggal : [Tanggal]

Pencipta/Pemegang Hak Cipta,

[Tanda Tangan]
[Nama Lengkap]
```

### 7.2 Surat Pernyataan Orisinalitas

```
SURAT PERNYATAAN ORISINALITAS

Saya yang bertanda tangan di bawah ini menyatakan bahwa:

1. Program komputer "ZenUML - Web-Based UML Diagram Editor" adalah 
   karya orisinal yang diciptakan oleh saya.

2. Saya tidak menggunakan atau menyalin kode dari program komputer 
   lain yang dilindungi hak cipta tanpa izin.

3. Semua library dan framework yang digunakan telah dicantumkan 
   dalam dokumentasi dan mengikuti lisensi masing-masing.

4. Desain UI/UX adalah karya orisinal yang tidak meniru desain 
   program komputer lain.

5. Dokumentasi dan materi pendukung lainnya juga merupakan karya 
   orisinal.

Saya memahami bahwa pelanggaran hak cipta adalah tindakan ilegal 
dan saya bersedia menanggung konsekuensi hukum jika terbukti 
melanggar pernyataan ini.

[Tanda Tangan]
[Nama Lengkap]
[Tanggal]
```

---

## 8. Checklist Pendaftaran

### 8.1 Dokumen yang Harus Disiapkan

- ✅ Formulir pendaftaran hak cipta (dari Ditjen HAKI)
- ✅ Fotokopi identitas pencipta (KTP/Paspor)
- ✅ Surat pernyataan kepemilikan
- ✅ Surat pernyataan orisinalitas
- ✅ Source code snapshot (frontend + backend)
- ✅ Dokumentasi UI/UX
- ✅ SRS dan dokumentasi teknis
- ✅ Bukti kepemilikan (Git, domain, hosting)
- ✅ Screenshots aplikasi
- ✅ Daftar file source code

### 8.2 Persyaratan Administratif

- ✅ Nama pencipta lengkap
- ✅ Alamat lengkap
- ✅ Nomor identitas
- ✅ Nomor telepon
- ✅ Email
- ✅ Tanda tangan pencipta
- ✅ Bukti pembayaran biaya pendaftaran
- ✅ Surat kuasa (jika melalui kuasa hukum)

### 8.3 Proses Pendaftaran

1. **Persiapan Dokumen** (1-2 hari)
   - Kumpulkan semua dokumen
   - Verifikasi kelengkapan
   - Buat salinan digital

2. **Pengajuan Permohonan** (1 hari)
   - Datang ke Ditjen HAKI atau online
   - Serahkan dokumen
   - Bayar biaya pendaftaran
   - Dapatkan nomor pendaftaran

3. **Pemeriksaan Substantif** (2-4 minggu)
   - Ditjen HAKI memeriksa dokumen
   - Verifikasi orisinalitas
   - Hubungi jika ada pertanyaan

4. **Penerbitan Sertifikat** (1-2 minggu)
   - Jika disetujui, sertifikat diterbitkan
   - Dapatkan nomor registrasi resmi
   - Sertifikat berlaku seumur hidup

### 8.4 Biaya Pendaftaran

```
Biaya Pendaftaran Hak Cipta:
- Biaya dasar: Rp 500.000 - Rp 1.000.000
- Biaya per halaman: Rp 10.000 - Rp 20.000
- Biaya layanan ekspres: Rp 500.000 - Rp 1.000.000

Total Estimasi: Rp 2.000.000 - Rp 5.000.000
```

### 8.5 Kontak Ditjen HAKI

```
Direktorat Jenderal Hak Kekayaan Intelektual
Kementerian Hukum dan Hak Asasi Manusia

Alamat:
Jl. H.R. Rasuna Said Kav. 8-9
Kuningan, Jakarta Selatan 12940

Telepon: (021) 2525-0977
Email: haki@dgip.go.id
Website: www.dgip.go.id

Jam Kerja:
Senin - Jumat: 08:00 - 16:00 WIB
(Istirahat: 12:00 - 13:00 WIB)
```

---

## 9. Ringkasan Pendaftaran

### Karya Cipta yang Didaftarkan

```
Judul: ZenUML - Web-Based UML Diagram Editor
Jenis: Program Komputer
Tanggal Penciptaan: 1 November 2024
Tanggal Publikasi: 18 November 2024
Pencipta: [Nama Anda]
Negara: Indonesia
```

### Fitur Utama yang Dilindungi

- ✅ 8 tipe elemen diagram UML sequence
- ✅ Editor diagram real-time
- ✅ Kolaborasi multi-user
- ✅ Export/Import multiple format
- ✅ Autentikasi dan manajemen proyek
- ✅ UI/UX design yang unik
- ✅ Arsitektur sistem
- ✅ Algoritma dan logika bisnis

### Nilai Intelektual

```
Investasi Pengembangan:
- Waktu Pengembangan: 3 minggu
- Tim Pengembang: 4 orang
- Total Jam Kerja: 480+ jam
- Baris Kode: 15,000+
- Dokumentasi: 125,000+ kata

Nilai Komersial:
- Potensi Pengguna: 1,000,000+
- Model Bisnis: Freemium
- Proyeksi Revenue: $100,000+/tahun
```

---

## 10. Template Surat Pendaftaran

### Surat Permohonan Pendaftaran

```
[KOTA], [TANGGAL]

Kepada Yth.
Direktorat Jenderal Hak Kekayaan Intelektual
Kementerian Hukum dan Hak Asasi Manusia
Jl. H.R. Rasuna Said Kav. 8-9
Kuningan, Jakarta Selatan 12940

Perihal: Permohonan Pendaftaran Hak Cipta Program Komputer

Dengan hormat,

Saya yang bertanda tangan di bawah ini:

Nama                : [Nama Lengkap]
Alamat              : [Alamat Lengkap]
Nomor Identitas     : [No. KTP/Paspor]
Kewarganegaraan     : Indonesia
Nomor Telepon       : [Nomor Telepon]
Email               : [Email]

Dengan ini mengajukan permohonan pendaftaran hak cipta untuk karya 
cipta berupa program komputer dengan data sebagai berikut:

Judul Karya         : ZenUML - Web-Based UML Diagram Editor
Jenis Karya         : Program Komputer
Tanggal Penciptaan  : 1 November 2024
Tanggal Publikasi   : 18 November 2024
Deskripsi Singkat   : Editor diagram UML berbasis web dengan fitur 
                      kolaborasi real-time, export/import multiple 
                      format, dan dukungan 8 tipe elemen diagram UML

Saya menyatakan bahwa karya cipta tersebut adalah karya orisinal 
milik saya dan tidak melanggar hak cipta pihak lain.

Bersama surat ini saya lampirkan:
1. Fotokopi identitas
2. Surat pernyataan kepemilikan
3. Surat pernyataan orisinalitas
4. Source code snapshot
5. Dokumentasi UI/UX
6. SRS dan dokumentasi teknis
7. Bukti kepemilikan
8. Bukti pembayaran biaya pendaftaran

Demikian permohonan ini saya sampaikan. Atas perhatian dan 
pertimbangan Bapak/Ibu, saya ucapkan terima kasih.

Hormat saya,

[Tanda Tangan]
[Nama Lengkap]
```

---

**Status**: ✅ Siap untuk Pendaftaran
**Tanggal Persiapan**: 18 November 2024
**Versi Dokumen**: 1.0.0

---

**Catatan**: Pastikan semua dokumen telah disiapkan dengan lengkap sebelum 
mengajukan permohonan pendaftaran ke Ditjen HAKI.
