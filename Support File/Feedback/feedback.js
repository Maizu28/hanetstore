// feedback.js (Diperbaiki)

// Definisikan string placeholder generik di sini untuk perbandingan yang benar.
// Pengguna HARUS mengganti DISCORD_WEBHOOK_URL dan APPS_SCRIPT_FEEDBACK_URL di bawah dengan URL mereka yang sebenarnya.
const GENERIC_PLACEHOLDER_DISCORD_URL = "https://discord.com/api/webhooks/1379482846934073374/s_M8tKLA0wWoBhQ0_qSsxeYZV0-xe-eicVgxQjyOhkjgIsEC9GBt9u2HUbA6IP4DEeYy";
const GENERIC_PLACEHOLDER_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUSS0qogJ6fEmpGhum0aRaKxXLhinrJR0GuMM-FlU3HcmlBwYrjLzOonDyAN_XygEu-g/exec";

// Definisikan warna bintang sebagai konstanta JavaScript untuk konsistensi,
// terutama karena style.color akan menimpa gaya dari kelas CSS.
// Pastikan warna ini sesuai dengan variabel --feedback-star-color di CSS Anda jika ada.
const FEEDBACK_STAR_SELECTED_COLOR = '#ffc107'; // Contoh warna kuning/oranye untuk bintang terpilih
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
    if (stars.length === 0 && ratingStarsContainer) { // Hanya log warning jika container ada tapi bintang tidak
        console.warn("Elemen bintang rating (.star) tidak ditemukan di dalam .rating-stars.");
    }

    // === URL Konfigurasi ===
    // PENTING: GANTI URL DI BAWAH INI DENGAN URL ANDA YANG SEBENARNYA.
    // JANGAN BIARKAN MENGGUNAKAN GENERIC_PLACEHOLDER... KECUALI UNTUK PENGUJIAN AWAL.
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1379482846934073374/s_M8tKLA0wWoBhQ0_qSsxeYZV0-xe-eicVgxQjyOhkjgIsEC9GBt9u2HUbA6IP4DEeYy";
    const APPS_SCRIPT_FEEDBACK_URL = "https://script.google.com/macros/s/AKfycbwUSS0qogJ6fEmpGhum0aRaKxXLhinrJR0GuMM-FlU3HcmlBwYrjLzOonDyAN_XygEu-g/exec";

    // Logika Rating Bintang
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            // Perbarui visual semua bintang berdasarkan nilai rating yang baru
            stars.forEach(s => {
                const starValue = parseInt(s.dataset.value);
                if (starValue <= value) {
                    s.classList.add('selected');
                    s.style.color = FEEDBACK_STAR_SELECTED_COLOR;
                } else {
                    s.classList.remove('selected');
                    s.style.color = FEEDBACK_STAR_DEFAULT_COLOR;
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const hoverValue = parseInt(star.dataset.value);
            // Sorot bintang hingga yang sedang di-hover
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= hoverValue ? FEEDBACK_STAR_SELECTED_COLOR : FEEDBACK_STAR_DEFAULT_COLOR;
            });
        });

        star.addEventListener('mouseout', () => {
            // Kembalikan warna bintang berdasarkan nilai rating yang sebenarnya (dari input)
            const currentValue = parseInt(ratingInput.value);
            stars.forEach(s => {
                if (parseInt(s.dataset.value) <= currentValue) {
                    s.style.color = FEEDBACK_STAR_SELECTED_COLOR;
                    // Pastikan class 'selected' juga konsisten jika belum ada
                    if (!s.classList.contains('selected')) s.classList.add('selected');
                } else {
                    s.style.color = FEEDBACK_STAR_DEFAULT_COLOR;
                    if (s.classList.contains('selected')) s.classList.remove('selected');
                }
            });
        });
    });


    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        statusMessage.textContent = '';
        statusMessage.className = ''; // Reset kelas status

        let discordUrlValid = true;
        let appsScriptUrlValid = true;

        // Pengecekan apakah URL masih menggunakan placeholder generik atau kosong
        if (DISCORD_WEBHOOK_URL === GENERIC_PLACEHOLDER_DISCORD_URL || DISCORD_WEBHOOK_URL.trim() === "") {
            console.warn("Peringatan Konfigurasi: URL Webhook Discord belum diatur dengan benar (masih placeholder generik atau kosong). Pengiriman ke Discord akan dilewati.");
            discordUrlValid = false;
        }
        if (APPS_SCRIPT_FEEDBACK_URL === GENERIC_PLACEHOLDER_APPS_SCRIPT_URL || APPS_SCRIPT_FEEDBACK_URL.trim() === "") {
            showStatus("Error Konfigurasi: URL Google Apps Script belum diatur dengan benar (masih placeholder generik atau kosong).", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            return; // Hentikan jika URL Apps Script (dianggap tujuan utama) tidak valid
        }

        const formData = new FormData(feedbackForm);
        const name = formData.get('name') || "Tidak disebutkan";
        const email = formData.get('email') || "Tidak disebutkan";
        const feedbackType = formData.get('feedbackType');
        const rating = parseInt(ratingInput.value) || 0;
        const message = formData.get('message');

        if (!message.trim()) {
            showStatus("Pesan feedback tidak boleh kosong.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            return;
        }

        const dataForAppsScript = {
            timestamp: new Date().toISOString(),
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
            username: "Feedback Bot Pelanggan",
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
                timestamp: new Date().toISOString(),
                footer: { text: "Dikirim melalui Formulir Feedback Web" }
            }]
        };

        const promises = [];

        if (appsScriptUrlValid) { // Akan true jika URL Apps Script tidak sama dengan placeholder generik
            promises.push(
                fetch(APPS_SCRIPT_FEEDBACK_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "text/plain;charset=utf-8" }, // Sesuai contoh GAS sebelumnya
                    body: JSON.stringify(dataForAppsScript)
                }).then(response => { // Untuk 'no-cors', objek response tidak banyak memberikan info status
                    return { success: true, destination: "Google Sheets" }; // Asumsikan sukses jika fetch tidak error
                }).catch(error => {
                    console.error("Google Sheets Fetch Error:", error);
                    return { success: false, destination: "Google Sheets", error: error.message };
                })
            );
        } else {
             // Jika appsScriptUrlValid adalah false karena pengecekan placeholder di atas (seharusnya tidak terjadi jika URL sudah benar)
             promises.push(Promise.resolve({success: false, destination: "Google Sheets", error: "URL Apps Script tidak dikonfigurasi dengan benar."}));
        }

        if (discordUrlValid) { // Akan true jika URL Discord tidak sama dengan placeholder generik
            promises.push(
                fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloadDiscord)
                }).then(async response => { // Tandai sebagai async untuk await response.text()
                    if (!response.ok) {
                        // Coba dapatkan detail error dari body respons Discord
                        let errorDetail = `Status: ${response.status} - ${response.statusText}`;
                        try {
                            const errorBody = await response.text();
                            errorDetail += ` | Body: ${errorBody.substring(0, 150)}`; // Ambil sebagian body error
                        } catch (e) {
                            // Abaikan jika gagal membaca body
                        }
                        throw new Error(`Discord Network response was not ok: ${errorDetail}`);
                    }
                    return { success: true, destination: "Discord" };
                }).catch(error => {
                    console.error("Discord Webhook Error:", error);
                    return { success: false, destination: "Discord", error: error.message };
                })
            );
        } else {
             promises.push(Promise.resolve({success: false, destination: "Discord", error: "URL Discord tidak dikonfigurasi dengan benar."}));
        }

        const results = await Promise.allSettled(promises);
        let messages = [];
        let formShouldReset = false;
        // Variabel allSuccessful tidak digunakan secara aktif untuk mengubah flow, jadi bisa diabaikan jika tidak ada logika khusus untuknya
        // let allSuccessful = true;

        results.forEach(result => {
            if (result.status === 'fulfilled') {
                const resValue = result.value;
                if (resValue.success) {
                    messages.push(`${resValue.destination}: Berhasil terkirim.`);
                    if (resValue.destination === "Google Sheets") {
                        formShouldReset = true;
                    }
                } else {
                    messages.push(`${resValue.destination}: Gagal (${resValue.error || 'unknown error'}).`);
                    // allSuccessful = false;
                }
            } else { // status === 'rejected'
                // Ini seharusnya sudah ditangani oleh .catch() di dalam promise individu,
                // tapi sebagai fallback jika ada error yang tidak tertangkap.
                messages.push(`Salah satu pengiriman mengalami kegagalan jaringan tak terduga: ${result.reason}`);
                // allSuccessful = false;
            }
        });

        if (formShouldReset) { // Jika penyimpanan utama (Google Sheets) berhasil
            showStatus("Feedback Anda telah diterima! " + messages.join(" | "), false);
            feedbackForm.reset();
            ratingInput.value = "0";
            stars.forEach(s => {
                s.classList.remove('selected');
                s.style.color = FEEDBACK_STAR_DEFAULT_COLOR; // Reset warna bintang ke default
            });
        } else {
            // Jika Google Sheets gagal, tapi mungkin Discord berhasil atau keduanya gagal
            showStatus("Gagal mengirim feedback. " + messages.join(" | "), true);
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
            default: return 0x95a5a6; // Warna default netral
        }
    }
});
