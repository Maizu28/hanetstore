// login.js

// GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA YANG SUDAH DI-DEPLOY UNTUK VERIFIKASI TOKEN
const VERIFY_TOKEN_APPS_SCRIPT_URL = "URL_APPS_SCRIPT_ANDA_UNTUK_VERIFIKASI_TOKEN"; 
// Contoh: https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxx/exec

// Fungsi ini akan dipanggil oleh Google setelah pengguna berhasil login
// Responsnya berisi credential (JWT ID Token)
async function handleCredentialResponse(response) {
    const statusMessageDiv = document.getElementById('loginStatusMessage');
    statusMessageDiv.textContent = 'Memproses login...';
    statusMessageDiv.style.color = 'blue';

    console.log("ID Token diterima dari Google: " + response.credential);

    try {
        // Kirim ID Token ke backend Anda (Google Apps Script) untuk verifikasi
        const backendResponse = await fetch(VERIFY_TOKEN_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Apps Script lebih mudah menangani ini untuk parameter sederhana
            },
            // Mengirim token sebagai parameter POST
            body: new URLSearchParams({
                'idToken': response.credential 
            })
        });

        const data = await backendResponse.json();

        if (backendResponse.ok && data.success) {
            statusMessageDiv.textContent = data.message || 'Login berhasil! Mengarahkan...';
            statusMessageDiv.style.color = 'green';

            // Simpan info pengguna atau token sesi jika backend mengembalikannya
            if (data.user) {
                localStorage.setItem('pimonjokiUser', JSON.stringify(data.user));
            }
            if (data.sessionToken) { // Jika backend Anda membuat token sesi kustom
                localStorage.setItem('pimonjokiSessionToken', data.sessionToken);
            }
            
            // Arahkan ke halaman yang diinginkan setelah login berhasil
            // Ganti dengan halaman tujuan Anda
            setTimeout(() => {
                window.location.href = 'https://maizu28.github.io/pimonjokiid/Support%20File/PimonJoki.html'; 
            }, 1000);

        } else {
            statusMessageDiv.textContent = data.message || 'Verifikasi login gagal. Silakan coba lagi.';
            statusMessageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Kesalahan saat mengirim token ke backend:', error);
        statusMessageDiv.textContent = 'Terjadi kesalahan koneksi. Silakan coba lagi nanti.';
        statusMessageDiv.style.color = 'red';
    }
}

// Untuk Opsi 2: Tombol Kustom (jika digunakan)
// document.addEventListener('DOMContentLoaded', () => {
//     const customButton = document.getElementById('customGoogleLoginButton');
//     if (customButton) {
//         // Inisialisasi Google Sign-In client (jika menggunakan tombol kustom, inisialisasi mungkin diperlukan di sini)
//         // google.accounts.id.initialize({
//         //   client_id: "CLIENT_ID_ANDA_DISINI.apps.googleusercontent.com",
//         //   callback: handleCredentialResponse
//         // });
//         // google.accounts.id.prompt(); // Menampilkan One Tap prompt atau
//         // Untuk tombol render:
//         // google.accounts.id.renderButton(
//         //   document.getElementById("customGoogleLoginButton"), // Target elemen tombol kustom Anda
//         //   { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" } // Opsi tombol
//         // );

//         // ATAU jika Anda ingin memicu popup login saat tombol kustom diklik (lebih kompleks)
//         customButton.onclick = () => {
//             // Logika untuk memicu Google Sign-In popup
//             // Ini mungkin memerlukan google.accounts.id.prompt() atau alur yang sedikit berbeda
//             // Untuk kesederhanaan, penggunaan tombol render bawaan Google lebih mudah.
//             alert("Tombol kustom diklik - implementasi popup login Google diperlukan di sini.");
//         };
//     }
// });