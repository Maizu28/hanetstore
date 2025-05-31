// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const errorMessageDiv = document.getElementById('loginErrorMessage');

    // Cek apakah ada username yang tersimpan jika "Ingat Saya" sebelumnya dicentang
    const rememberedUser = localStorage.getItem('rememberedPimonjokiUser');
    if (rememberedUser && usernameInput) {
        usernameInput.value = rememberedUser;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Mencegah form submit default (reload halaman)
            errorMessageDiv.textContent = ''; // Bersihkan pesan error sebelumnya

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim(); // Dalam aplikasi nyata, password tidak boleh dikirim seperti ini tanpa HTTPS
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

            // Validasi dasar di sisi klien
            if (username === '' || password === '') {
                errorMessageDiv.textContent = 'Email/Username dan password tidak boleh kosong.';
                return;
            }

            // Tampilkan loading atau nonaktifkan tombol login
            const loginButton = loginForm.querySelector('.login-submit-btn');
            const originalButtonText = loginButton.textContent;
            loginButton.textContent = 'Memproses...';
            loginButton.disabled = true;

            try {
                // GANTI URL INI DENGAN ENDPOINT LOGIN BACKEND ANDA YANG SEBENARNYA
                const LOGIN_API_URL = '/api/login'; // Placeholder!

                // Simulasi pengiriman data ke backend
                // Di aplikasi nyata, Anda akan menggunakan fetch() ke backend Anda:
                /*
                const response = await fetch(LOGIN_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Accept': 'application/json' // Opsional
                    },
                    body: JSON.stringify({ username, password, rememberMe }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Login berhasil
                    alert(data.message || 'Login berhasil!'); 
                    
                    if (rememberMe) {
                        localStorage.setItem('rememberedPimonjokiUser', username);
                        // Di backend, Anda akan mengatur session atau token
                        // Contoh: localStorage.setItem('authToken', data.token);
                    } else {
                        localStorage.removeItem('rememberedPimonjokiUser');
                    }
                    
                    // Arahkan ke halaman dashboard atau halaman utama setelah login
                    // window.location.href = data.redirectUrl || 'dashboard.html'; 
                    window.location.href = 'https://maizu28.github.io/pimonjokiid/Support%20File/PimonJoki.html'; // Ganti dengan halaman tujuan
                } else {
                    // Login gagal
                    errorMessageDiv.textContent = data.message || 'Login gagal. Periksa username dan password Anda.';
                }
                */

                // --- MULAI BLOK SIMULASI (HAPUS ATAU GANTI DENGAN FETCH SEBENARNYA) ---
                console.log("Mengirim data login (simulasi):", { username, password, rememberMe });
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay jaringan

                if (username === "user@pimonjoki.id" && password === "password123") {
                    alert('Login berhasil! (Simulasi)');
                    if (rememberMe) {
                        localStorage.setItem('rememberedPimonjokiUser', username);
                    } else {
                        localStorage.removeItem('rememberedPimonjokiUser');
                    }
                    // Ganti URL ini dengan halaman tujuan setelah login berhasil
                    window.location.href = 'https://maizu28.github.io/pimonjokiid/Support%20File/PimonJoki.html'; 
                } else {
                    errorMessageDiv.textContent = 'Username atau password salah. (Simulasi)';
                }
                // --- AKHIR BLOK SIMULASI ---

            } catch (error) {
                console.error('Kesalahan saat login:', error);
                errorMessageDiv.textContent = 'Terjadi kesalahan. Silakan coba lagi nanti.';
            } finally {
                // Kembalikan tombol login ke state semula
                loginButton.textContent = originalButtonText;
                loginButton.disabled = false;
            }
        });
    }
});