// forgot-password.js

// Import fungsi yang diperlukan dari SDK Firebase
// Sesuaikan path ke firebase-init.js jika berbeda
import { auth } from './firebase-init.js'; // Mengimpor instance auth dari file inisialisasi Anda
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"; // Sesuaikan versi jika perlu

document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('resetEmail');
    const messageDiv = document.getElementById('resetMessage'); // Elemen untuk menampilkan pesan
    const submitButton = forgotPasswordForm.querySelector('.submit-btn');

    if (!auth) {
        console.error("Firebase Auth tidak terinisialisasi! Fitur lupa password tidak akan berfungsi.");
        if (messageDiv) {
            messageDiv.textContent = "Layanan tidak tersedia saat ini. Coba lagi nanti.";
            messageDiv.style.color = "red";
        }
        if (submitButton) submitButton.disabled = true;
        return;
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Mencegah form submit default
            
            // Kosongkan pesan sebelumnya dan reset warna
            if (messageDiv) {
                messageDiv.textContent = '';
                messageDiv.style.color = 'initial'; // Kembali ke warna default (atau tidak diset)
            }

            const email = emailInput.value.trim();

            // Validasi dasar di sisi klien
            if (email === '') {
                if (messageDiv) {
                    messageDiv.textContent = 'Alamat email tidak boleh kosong.';
                    messageDiv.style.color = 'red';
                }
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                if (messageDiv) {
                    messageDiv.textContent = 'Format email tidak valid.';
                    messageDiv.style.color = 'red';
                }
                return;
            }

            // Ubah tampilan tombol untuk menandakan proses
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Mengirim...';
            submitButton.disabled = true;

            try {
                // Menggunakan fungsi Firebase Authentication untuk mengirim email reset password
                await sendPasswordResetEmail(auth, email);
                
                if (messageDiv) {
                    messageDiv.textContent = 'Link reset password telah dikirim ke ' + email + '. Silakan periksa inbox (dan folder spam) Anda.';
                    messageDiv.style.color = 'green'; // Warna hijau untuk pesan sukses
                }
                emailInput.value = ''; // Kosongkan field email setelah berhasil

            } catch (error) {
                console.error('Error mengirim email reset password:', error);
                if (messageDiv) {
                    if (error.code === 'auth/user-not-found') {
                        messageDiv.textContent = 'Tidak ada akun yang terdaftar dengan alamat email ini.';
                    } else if (error.code === 'auth/invalid-email') {
                        messageDiv.textContent = 'Format email tidak valid.';
                    } else {
                        messageDiv.textContent = 'Gagal mengirim email reset password. Silakan coba lagi nanti.';
                    }
                    messageDiv.style.color = 'red'; // Warna merah untuk pesan error
                }
            } finally {
                // Kembalikan tombol ke keadaan semula
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});