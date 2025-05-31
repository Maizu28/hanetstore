document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('regUsername');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const errorMessageDiv = document.getElementById('registrationErrorMessage');
    const submitButton = registrationForm.querySelector('.register-submit-btn');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Mencegah form submit default
            errorMessageDiv.textContent = ''; // Bersihkan pesan error sebelumnya

            // Ambil nilai dari form
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value; // Password tidak di-trim untuk mempertahankan spasi jika disengaja (meski biasanya tidak)
            const confirmPassword = confirmPasswordInput.value;

            // --- Validasi Sisi Klien ---
            if (!username || !email || !password || !confirmPassword) {
                errorMessageDiv.textContent = 'Semua field wajib diisi.';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                errorMessageDiv.textContent = 'Format email tidak valid.';
                return;
            }

            if (password.length < 8) {
                errorMessageDiv.textContent = 'Password minimal harus 8 karakter.';
                return;
            }

            if (password !== confirmPassword) {
                errorMessageDiv.textContent = 'Password dan konfirmasi password tidak cocok.';
                return;
            }
            // --- Akhir Validasi Sisi Klien ---

            // Ubah tampilan tombol untuk menandakan proses
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Memproses...';
            submitButton.disabled = true;

            try {
                // GANTI URL INI DENGAN ENDPOINT REGISTRASI BACKEND ANDA YANG SEBENARNYA
                const REGISTER_API_URL = '/api/register'; // Placeholder!

                // Di aplikasi nyata, Anda akan mengirim data ini ke backend Anda
                // untuk diproses (validasi server, hashing password, simpan ke database)
                /*
                const response = await fetch(REGISTER_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }), // Kirim password ke backend untuk di-hash
                });

                const data = await response.json(); // Harapkan respons JSON dari backend

                if (response.ok && data.success) { // Asumsi backend mengirim { success: true/false, message: "..." }
                    alert(data.message || 'Registrasi berhasil! Anda akan diarahkan ke halaman login.');
                    window.location.href = 'login.html'; // Arahkan ke halaman login
                } else {
                    errorMessageDiv.textContent = data.message || 'Registrasi gagal. Silakan coba lagi.';
                }
                */

                // --- MULAI BLOK SIMULASI (HAPUS ATAU GANTI DENGAN FETCH SEBENARNYA) ---
                console.log("Mengirim data registrasi (simulasi):", { username, email, password });
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi delay jaringan

                // Contoh simulasi respons dari server
                if (username === "tes" || email === "tes@example.com") { // Simulasi username/email sudah ada
                    errorMessageDiv.textContent = 'Username atau Email sudah terdaftar. (Simulasi)';
                } else {
                    alert('Registrasi berhasil! Anda akan diarahkan ke halaman login. (Simulasi)');
                    // Simulasikan penyimpanan data atau tindakan lain jika perlu untuk demo
                    // localStorage.setItem('registeredUser', JSON.stringify({ username, email }));
                    window.location.href = 'login.html'; // Arahkan ke halaman login
                }
                // --- AKHIR BLOK SIMULASI ---

            } catch (error) {
                console.error('Kesalahan saat registrasi:', error);
                errorMessageDiv.textContent = 'Terjadi kesalahan saat mencoba registrasi. Periksa koneksi Anda dan coba lagi nanti.';
            } finally {
                // Kembalikan tombol ke keadaan semula
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// register.js (menggunakan Firebase SDK v9+ modular)

// Import fungsi yang diperlukan dari SDK Firebase
// Pastikan HTML Anda memuat SDK sebagai module atau Anda menggunakan bundler
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; // Gunakan versi terbaru dari CDN jika perlu
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// KONFIGURASI FIREBASE ANDA (dapatkan dari Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX", // GANTI DENGAN API KEY ANDA
  authDomain: "nama-proyek-anda.firebaseapp.com", // GANTI
  projectId: "nama-proyek-anda", // GANTI
  storageBucket: "nama-proyek-anda.appspot.com", // GANTI
  messagingSenderId: "xxxxxxxxxxxx", // GANTI
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxx" // GANTI
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Dapatkan instance Auth

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('regUsername'); // Anda mungkin ingin menyimpan username di database terpisah (Firestore)
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const errorMessageDiv = document.getElementById('registrationErrorMessage');
    const submitButton = registrationForm.querySelector('.register-submit-btn');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            errorMessageDiv.textContent = '';
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Memproses...';

            const username = usernameInput.value.trim(); // Firebase Auth menggunakan email sebagai identifier utama
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (!username || !email || !password || !confirmPassword) {
                errorMessageDiv.textContent = 'Semua field wajib diisi.';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }
            if (password !== confirmPassword) {
                errorMessageDiv.textContent = 'Password dan konfirmasi password tidak cocok.';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }
            if (password.length < 8) { // Firebase memiliki aturan default (biasanya min 6)
                errorMessageDiv.textContent = 'Password minimal harus 8 karakter.';
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }
            
            try {
                // Menggunakan fungsi Firebase Authentication untuk membuat pengguna baru
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // Pengguna berhasil dibuat dan otomatis login
                const user = userCredential.user;
                console.log('Pengguna berhasil terdaftar:', user);
                alert(`Registrasi berhasil untuk ${user.email}! Anda akan diarahkan ke halaman login.`);

                // Di sini Anda bisa menyimpan informasi tambahan pengguna (seperti username)
                // ke database lain seperti Firestore atau Realtime Database jika diperlukan,
                // karena Firebase Authentication secara default hanya menyimpan email, uid, dll.
                // Contoh: await saveUserProfile(user.uid, username, email);

                window.location.href = 'login.html'; // Arahkan ke halaman login

            } catch (error) {
                // Tangani error dari Firebase
                console.error('Kesalahan registrasi Firebase:', error);
                if (error.code === 'auth/email-already-in-use') {
                    errorMessageDiv.textContent = 'Alamat email ini sudah terdaftar.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessageDiv.textContent = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessageDiv.textContent = 'Format email tidak valid.';
                }
                else {
                    errorMessageDiv.textContent = 'Registrasi gagal: ' + error.message;
                }
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});