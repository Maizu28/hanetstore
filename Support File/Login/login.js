// login.js

// Import fungsi yang diperlukan dari SDK Firebase
// Pastikan HTML Anda memuat SDK sebagai module atau Anda menggunakan bundler
// Untuk penggunaan langsung di browser dengan <script type="module">, path CDN ini biasanya bekerja.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; // Sesuaikan versi jika perlu
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// KONFIGURASI FIREBASE ANDA (dapatkan dari Firebase Console)
// Pastikan ini sama dengan yang Anda gunakan di register.js atau file inisialisasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDrxaF4FPNlOLvjshhcXHNALD4nyNWQmQI", // GANTI JIKA INI HANYA CONTOH
  authDomain: "pimonjoki-440c9.firebaseapp.com",
  projectId: "pimonjoki-440c9",
  storageBucket: "pimonjoki-440c9.appspot.com", // Perbaiki jika ada typo (firebasestorage -> appspot) atau gunakan yang benar dari console
  messagingSenderId: "572593756351",
  appId: "1:572593756351:web:c74fa9b4f5f50960da4e0a",
  measurementId: "G-7FBBHTEVZH" // Opsional, untuk Google Analytics
};

// Inisialisasi Firebase (jika belum diinisialisasi secara global)
// Jika Anda sudah menginisialisasi 'app' di HTML atau file init terpisah, Anda bisa import 'app' tersebut.
// Untuk contoh ini, kita inisialisasi di sini.
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    console.error("Firebase initialization error:", e);
    // Mungkin tampilkan pesan error ke pengguna bahwa layanan tidak tersedia
}

const auth = getAuth(app); // Dapatkan instance Auth

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('username'); // Di login.html, ID-nya adalah 'username' untuk input email/username
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe'); // Pastikan ID ini ada di login.html
    const errorMessageDiv = document.getElementById('loginErrorMessage'); // Pastikan ID ini ada di login.html
    const submitButton = loginForm.querySelector('.login-submit-btn');

    // Cek apakah ada username yang tersimpan jika "Ingat Saya" sebelumnya dicentang (untuk pre-fill email)
    const rememberedUserEmail = localStorage.getItem('rememberedPimonjokiUserEmail');
    if (rememberedUserEmail && emailInput) {
        emailInput.value = rememberedUserEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            if(errorMessageDiv) errorMessageDiv.textContent = '';
            
            const email = emailInput.value.trim();
            const password = passwordInput.value; // Password tidak di-trim
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

            if (!email || !password) {
                if(errorMessageDiv) errorMessageDiv.textContent = 'Email dan password tidak boleh kosong.';
                return;
            }

            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Memproses...';
            submitButton.disabled = true;

            try {
                // Atur persistensi sesi berdasarkan checkbox "Ingat Saya"
                const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
                await setPersistence(auth, persistence);

                // Login dengan Firebase Authentication
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                console.log('Pengguna berhasil login:', user.uid, user.email);
                alert(`Login berhasil! Selamat datang kembali, ${user.displayName || user.email}.`);

                if (rememberMe) {
                    localStorage.setItem('rememberedPimonjokiUserEmail', email);
                } else {
                    localStorage.removeItem('rememberedPimonjokiUserEmail');
                }
                
                // Arahkan ke halaman utama atau dashboard setelah login
                window.location.href = 'https://maizu28.github.io/pimonjokiid/Support%20File/PimonJoki.html'; // GANTI dengan halaman tujuan Anda

            } catch (error) {
                console.error('Kesalahan login Firebase:', error);
                if(errorMessageDiv) {
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                        errorMessageDiv.textContent = 'Email atau password salah.';
                    } else if (error.code === 'auth/invalid-email') {
                        errorMessageDiv.textContent = 'Format email tidak valid.';
                    } else if (error.code === 'auth/too-many-requests') {
                        errorMessageDiv.textContent = 'Terlalu banyak percobaan login. Coba lagi nanti.';
                    }
                    else {
                        errorMessageDiv.textContent = 'Login gagal. Terjadi kesalahan.';
                    }
                }
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});