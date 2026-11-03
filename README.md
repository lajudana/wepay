# LajuDana CRM (powered by SoBot) — Vue 3 + Vite + Tailwind CSS

Sistem **CRM Loan Management** gaya Salesforce Lightning yang dibina menggunakan **Vue 3** dan **Tailwind CSS**, lengkap dengan aliran kerja GitHub Actions untuk di-host terus di **GitHub Pages**.

## Ciri-Ciri Utama
1. **Top Navigator Bar**:
   - Logo **LajuDana powered by SoBot**
   - Butang **Hamburger Menu** (buka/tutup panel navigasi sisi)
   - Butang **Navigator Dashboard**
   - Ikon **Setting (⚙️)** untuk mengurus pilihan dropdown sistem
   - Butang **Log Out** lengkap dengan skrin pengesahan & log masuk pentadbir
2. **Bahagian Database Pelanggan (Customer & Loan Record)**:
   - **Avatar**: Muat naik gambar muka pelanggan (`<input type="file" accept="image/*">`)
   - **Nama Penuh**, **No. K/P**, **Phone**, **Alamat**, **E-mel**, **Jantina**
   - **Bangsa (Dropdown Boleh Edit)**: Tambah atau ubah suai senarai bangsa pada bila-bila masa
   - **Application ID**, **Amount (RM)**, **Apply Date**, **End Date**, **Timesheet Date & Time**
3. **Customer Bank Details (Bank & E-Wallet Lokal Malaysia Sahaja)**:
   - **Full Name**, **Account No.**, dan **Bank Dropdown** (`CIMB BANK BERHAD`, `TOUCH&GO`, `BOOST APP MALAYSIA`, `RHB BERHAD`, `HONG LEONG BERHAD`, `MAYBANK BERHAD`, `PUBLIC BANK BERHAD`, `BANK ISLAM`, dll.)
4. **Reference Section (Rujukan Pelanggan)**:
   - **Hubungan (Dropdown Boleh Edit)**, **FullName**, **Phone**, **Jantina (Dropdown)**
5. **Popup Penuh Maklumat Pelanggan & Edit Manual**:
   - Klik pada mana-mana nama pelanggan untuk membuka popup penuh yang memaparkan Avatar, Maklumat Peribadi & Pinjaman, Bank Details, serta Reference Section.
   - Boleh terus klik **Edit Manual Maklumat** di dalam popup dan tekan **Tutup (Close)** apabila selesai.

## Cara Host di GitHub Pages
1. Muat naik semua fail di dalam folder ini ke repositori GitHub baharu anda.
2. Pergi ke tab **Settings -> Pages** di repositori GitHub anda.
3. Di bawah bahagian **Build and deployment > Source**, pilih **GitHub Actions**.
4. Setiap kali anda push ke branch `main`, fail `.github/workflows/deploy.yml` akan membina aplikasi Vue 3 secara automatik dan menerbitkannya ke URL GitHub Pages anda.
