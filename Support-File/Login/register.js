// register.js

// Import fungsi yang diperlukan dari SDK Firebase
// Pastikan HTML Anda memuat SDK sebagai module atau Anda menggunakan bundler
// Untuk penggunaan langsung di browser dengan <script type="module">, path CDN ini biasanya bekerja.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; // Gunakan versi terbaru yang stabil
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// Jika Anda ingin menyimpan profil tambahan ke Firestore:
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your web app's Firebase configuration
// PASTIKAN INI ADALAH KONFIGURASI FIREBASE PROYEK ANDA YANG BENAR!
const firebaseConfig = {
  apiKey: "AIzaSyDrxaF4FPNlOLvjshhcXHNALD4nyNWQmQI", // GANTI JIKA INI HANYA CONTOH
  authDomain: "pimonjoki-440c9.firebaseapp.com",
  projectId: "pimonjoki-440c9",
  storageBucket: "pimonjoki-440c9.appspot.com", // Perbaiki jika ada typo (firebasestorage -> appspot) atau gunakan yang benar dari console
  messagingSenderId: "572593756351",
  appId: "1:572593756351:web:c74fa9b4f5f50960da4e0a",
  measurementId: "G-7FBBHTEVZH" // Opsional, untuk Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Dapatkan instance Auth
// const db = getFirestore(app); // Inisialisasi Firestore jika Anda akan menyimpan profil pengguna tambahan

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
            event.preventDefault();
            errorMessageDiv.textContent = ''; // Bersihkan pesan error sebelumnya

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value; // Tidak di-trim
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

            if (password.length < 6) { // Firebase defaultnya minimal 6 karakter
                errorMessageDiv.textContent = 'Password minimal harus 6 karakter.';
                return;
            }

            if (password !== confirmPassword) {
                errorMessageDiv.textContent = 'Password dan konfirmasi password tidak cocok.';
                return;
            }
            // --- Akhir Validasi Sisi Klien ---

            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Memproses...';
            submitButton.disabled = true;

            try {
                // Menggunakan fungsi Firebase Authentication untuk membuat pengguna baru
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // (Opsional) Update profil pengguna dengan username sebagai displayName
                // Ini akan menyimpan username ke objek pengguna Firebase Auth
                await updateProfile(user, {
                    displayName: username
                });
                
                console.log('Pengguna berhasil terdaftar:', user.uid, user.email, user.displayName);
                alert(`Registrasi berhasil untuk ${username} (${user.email})! Anda akan diarahkan ke halaman login.`);

                // (Opsional) Jika Anda ingin menyimpan data profil tambahan (selain displayName)
                // Anda bisa menyimpannya ke Firestore atau Realtime Database di sini,
                // menggunakan user.uid sebagai kunci dokumen/path.
                // Contoh dengan Firestore (pastikan sudah import getFirestore, doc, setDoc):
                /*
                try {
                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    username: username, // atau user.displayName
                    email: user.email,
                    createdAt: new Date().toISOString() // Simpan sebagai ISO string atau Firestore Timestamp
                    // tambahkan field lain yang diperlukan
                  });
                  console.log("Profil pengguna tambahan disimpan ke Firestore.");
                } catch (firestoreError) {
                  console.error("Gagal menyimpan profil tambahan ke Firestore:", firestoreError);
                  // Lanjutkan meskipun gagal simpan profil tambahan, karena user auth sudah dibuat
                }
                */

                window.location.href = 'login.html'; // Arahkan ke halaman login setelah sukses

            } catch (error) {
                // Tangani error dari Firebase Authentication
                console.error('Kesalahan registrasi Firebase:', error);
                if (error.code === 'auth/email-already-in-use') {
                    errorMessageDiv.textContent = 'Alamat email ini sudah terdaftar.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessageDiv.textContent = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessageDiv.textContent = 'Format email tidak valid.';
                } else {
                    // Pesan error umum dari Firebase bisa jadi terlalu teknis untuk pengguna
                    errorMessageDiv.textContent = 'Registrasi gagal. Silakan coba lagi atau hubungi dukungan.';
                    // errorMessageDiv.textContent = 'Registrasi gagal: ' + error.message; // Ini bisa menampilkan pesan error Firebase langsung
                }
            } finally {
                // Kembalikan tombol ke keadaan semula
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});