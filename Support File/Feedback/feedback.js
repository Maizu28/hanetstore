// feedback.js (Timestamp WIB & Validasi)

// Definisikan warna bintang sebagai konstanta JavaScript
const FEEDBACK_STAR_SELECTED_COLOR = '#ffc107'; // Warna kuning/oranye untuk bintang terpilih
const FEEDBACK_STAR_DEFAULT_COLOR = '#e0e0e0';  // Warna abu-abu untuk bintang tidak terpilih

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = document.getElementById('submitButton');
    const ratingStarsContainer = document.querySelector('.rating-stars');
    const ratingInput = document.getElementById('rating');

    // Pengecekan elemen DOM penting
    if (!feedbackForm || !statusMessage || !submitButton || !ratingStarsContainer || !ratingInput) {
        console.error("Satu atau lebih elemen DOM penting untuk formulir feedback tidak ditemukan! Fungsi feedback mungkin tidak berjalan dengan benar.");
        if (submitButton) {
            submitButton.textContent = "Error Konfigurasi Form";
            submitButton.disabled = true;
        }
        return; // Hentikan eksekusi jika elemen krusial tidak ada
    }

    const stars = ratingStarsContainer.querySelectorAll('.star');
    if (stars.length === 0 && ratingStarsContainer) {
        console.warn("Elemen bintang rating (.star) tidak ditemukan di dalam .rating-stars.");
    }

    // === URL Konfigurasi ===
    const DISCORD_WEBHOOK_URL = "MASUKAN_URL_WEBHOOK_DISCORD";
    const APPS_SCRIPT_FEEDBACK_URL = "https://script.google.com/macros/s/AKfycbzG5V-88uMIvveOT39f171bV9V_5xXWZKx7w7dOHfEhPxKo9qshDvJdVXM5zFYJpQ7iNg/exec";

    function updateStarVisuals(currentRatingValue) {
        stars.forEach(s => {
            const starValue = parseInt(s.dataset.value);
            if (starValue <= currentRatingValue) {
                s.classList.add('selected');
                s.style.color = FEEDBACK_STAR_SELECTED_COLOR;
            } else {
                s.classList.remove('selected');
                s.style.color = FEEDBACK_STAR_DEFAULT_COLOR;
            }
        });
    }

    if (stars.length > 0) { // Hanya tambahkan event listener jika bintang ada
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = parseInt(star.dataset.value);
                ratingInput.value = value;
                updateStarVisuals(value);
            });

            star.addEventListener('mouseover', () => {
                const hoverValue = parseInt(star.dataset.value);
                stars.forEach(s => { // Sorot bintang hingga yang di-hover
                    s.style.color = parseInt(s.dataset.value) <= hoverValue ? FEEDBACK_STAR_SELECTED_COLOR : FEEDBACK_STAR_DEFAULT_COLOR;
                });
            });

            star.addEventListener('mouseout', () => {
                // Kembalikan warna bintang berdasarkan nilai rating yang sebenarnya (dari input)
                updateStarVisuals(parseInt(ratingInput.value));
            });
        });
        // Inisialisasi visual bintang saat halaman dimuat
        updateStarVisuals(parseInt(ratingInput.value));
    }

    // Fungsi untuk validasi format email dasar
    function isValidEmail(email) {
        // Regex sederhana untuk validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        statusMessage.textContent = '';
        statusMessage.className = '';

        // Pengecekan apakah URL kosong
        if (APPS_SCRIPT_FEEDBACK_URL.trim() === "") {
            showStatus("Error Konfigurasi: URL Google Apps Script belum diatur (kosong).", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            return;
        }
        const discordUrlIsSet = DISCORD_WEBHOOK_URL.trim() !== "";
        if (!discordUrlIsSet) {
            console.warn("Peringatan Konfigurasi: URL Webhook Discord kosong. Pengiriman ke Discord akan dilewati.");
        }

        const formData = new FormData(feedbackForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const feedbackType = formData.get('feedbackType');
        const rating = parseInt(ratingInput.value) || 0;
        const message = formData.get('message').trim();

        // Validasi Nama
        if (!name) {
            showStatus("Nama tidak boleh kosong.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            document.getElementById('name').focus();
            return;
        }

        // Validasi Email
        if (!email) {
            showStatus("Email tidak boleh kosong.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            document.getElementById('email').focus();
            return;
        }
        if (!isValidEmail(email)) {
            showStatus("Format email tidak valid. Harap masukkan email yang benar.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            document.getElementById('email').focus();
            return;
        }

        // Validasi Pesan
        if (!message) {
            showStatus("Pesan feedback tidak boleh kosong.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            document.getElementById('message').focus();
            return;
        }

        // Membuat timestamp WIB untuk Google Sheets
        const now = new Date();
        const optionsWIB = {
            timeZone: 'Asia/Jakarta', // Zona waktu WIB
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false // Format 24 jam
        };
        const wibTimestamp = now.toLocaleString('id-ID', optionsWIB); // Format untuk Indonesia

        const dataForAppsScript = {
            timestamp: wibTimestamp, // Menggunakan timestamp WIB
            name: name,
            email: email,
            feedbackType: feedbackType,
            rating: rating,
            message: message
        };

        let ratingStarsText = "Belum dirating";
        if (rating > 0) {
            ratingStarsText = '⭐'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`;
        }
        const payloadDiscord = {
            username: "Hanetstore Feedback",
            avatar_url: "https://i.imgur.com/R66g1Pe.png",
            embeds: [{
                title: "📝 Feedback Baru Diterima!",
                color: getColorForFeedbackType(feedbackType),
                fields: [
                    { name: "Jenis Feedback", value: feedbackType, inline: true },
                    { name: "Rating", value: ratingStarsText, inline: true },
                    { name: "Nama", value: name, inline: false },
                    { name: "Email", value: email, inline: false },
                    { name: "Pesan", value: "```\n" + message + "\n```", inline: false }
                ],
                timestamp: new Date().toISOString(), // Timestamp untuk Discord tetap ISO UTC
                footer: { text: "Dikirim melalui Formulir Feedback Web" }
            }]
        };

        const promises = [];

        // Pengiriman ke Google Apps Script (dianggap krusial)
        promises.push(
            fetch(APPS_SCRIPT_FEEDBACK_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(dataForAppsScript)
            }).then(response => {
                return { success: true, destination: "Google Sheets" };
            }).catch(error => {
                console.error("Google Sheets Fetch Error:", error);
                return { success: false, destination: "Google Sheets", error: error.message };
            })
        );

        // Pengiriman ke Discord (opsional jika URL diset)
        if (discordUrlIsSet) {
            promises.push(
                fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloadDiscord)
                }).then(async response => {
                    if (!response.ok) {
                        let errorDetail = `Status: ${response.status} - ${response.statusText}`;
                        try {
                            const errorBody = await response.text();
                            errorDetail += ` | Body: ${errorBody.substring(0, 150)}`;
                        } catch (e) { /* Abaikan jika gagal baca body */ }
                        throw new Error(`Discord Network response was not ok: ${errorDetail}`);
                    }
                    return { success: true, destination: "Discord" };
                }).catch(error => {
                    console.error("Discord Webhook Error:", error);
                    return { success: false, destination: "Discord", error: error.message };
                })
            );
        } else {
             promises.push(Promise.resolve({success: false, destination: "Discord", error: "URL Discord tidak diatur."}));
        }

        const results = await Promise.allSettled(promises);
        let messages = [];
        let formShouldReset = false;

        results.forEach(result => {
            if (result.status === 'fulfilled') {
                const resValue = result.value;
                if (resValue.success) {
                    messages.push(`${resValue.destination}: Berhasil terkirim.`);
                    if (resValue.destination === "Google Sheets") {
                        formShouldReset = true;
                    }
                } else {
                    // Jangan tampilkan pesan gagal jika itu karena URL Discord tidak diset
                    if (!(resValue.destination === "Discord" && resValue.error === "URL Discord tidak diatur.")) {
                        messages.push(`${resValue.destination}: Gagal (${resValue.error || 'unknown error'}).`);
                    }
                }
            } else {
                messages.push(`Salah satu pengiriman mengalami kegagalan jaringan tak terduga: ${result.reason}`);
            }
        });

        if (formShouldReset) {
            showStatus("Feedback Anda telah diterima! " + messages.filter(Boolean).join(" | "), false); // filter(Boolean) untuk menghapus string kosong jika ada
            feedbackForm.reset();
            ratingInput.value = "0";
            updateStarVisuals(0);
        } else {
            showStatus("Gagal mengirim feedback. " + messages.filter(Boolean).join(" | "), true);
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Kirim Feedback';
    });

    function showStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.className = isError ? 'error' : 'success';
    }

    function getColorForFeedbackType(type) {
        switch (type) {
            case "Saran": return 0x3498db;
            case "Laporan Bug": return 0xe74c3c;
            case "Pujian": return 0x2ecc71;
            case "Keluhan": return 0xf39c12;
            default: return 0x95a5a6;
        }
    }
});
