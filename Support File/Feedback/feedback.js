// feedback.js

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = document.getElementById('submitButton');
    const ratingStarsContainer = document.querySelector('.rating-stars');
    const ratingInput = document.getElementById('rating');
    const stars = ratingStarsContainer.querySelectorAll('.star');

    // GANTI DENGAN URL WEBHOOK DISCORD ANDA
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1379482846934073374/s_M8tKLA0wWoBhQ0_qSsxeYZV0-xe-eicVgxQjyOhkjgIsEC9GBt9u2HUbA6IP4DEeYy";
    // GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA UNTUK FEEDBACK
    const APPS_SCRIPT_FEEDBACK_URL = "https://script.google.com/macros/s/AKfycbwUSS0qogJ6fEmpGhum0aRaKxXLhinrJR0GuMM-FlU3HcmlBwYrjLzOonDyAN_XygEu-g/exec";

    // ... (logika rating bintang tetap sama) ...
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            stars.forEach(s => {
                s.classList.toggle('selected', parseInt(s.dataset.value) <= value);
            });
        });
        star.addEventListener('mouseover', () => {
            const hoverValue = parseInt(star.dataset.value);
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= hoverValue ? 'var(--feedback-star-color)' : '#e0e0e0';
            });
        });
        star.addEventListener('mouseout', () => {
            const currentValue = parseInt(ratingInput.value);
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= currentValue ? 'var(--feedback-star-color)' : '#e0e0e0';
            });
        });
    });


    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        statusMessage.textContent = '';
        statusMessage.className = '';

        let discordUrlValid = true;
        let appsScriptUrlValid = true;

        if (DISCORD_WEBHOOK_URL === "https://discord.com/api/webhooks/1379482846934073374/s_M8tKLA0wWoBhQ0_qSsxeYZV0-xe-eicVgxQjyOhkjgIsEC9GBt9u2HUbA6IP4DEeYy") {
            console.warn("URL Webhook Discord belum diatur di feedback.js.");
            discordUrlValid = false; // Tetap lanjut jika salah satu URL tidak diset, tapi akan dilaporkan
        }
        if (APPS_SCRIPT_FEEDBACK_URL === "https://script.google.com/macros/s/AKfycbwUSS0qogJ6fEmpGhum0aRaKxXLhinrJR0GuMM-FlU3HcmlBwYrjLzOonDyAN_XygEu-g/exec") {
            showStatus("Error: URL Google Apps Script belum diatur di feedback.js.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            // Jika Apps Script adalah tujuan utama, mungkin return di sini.
            // Jika Discord juga penting atau bisa berjalan sendiri, biarkan lanjut.
            // Untuk contoh ini, kita anggap Apps Script penting.
            return;
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

        // Data untuk Google Apps Script
        const dataForAppsScript = {
            timestamp: new Date().toISOString(), // Format tanggal standar
            name: name,
            email: email,
            feedbackType: feedbackType,
            rating: rating,
            message: message
        };

        // Data untuk Discord Webhook
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

        // Persiapan promise
        const promises = [];

        if (appsScriptUrlValid) {
            promises.push(
                fetch(APPS_SCRIPT_FEEDBACK_URL, {
                    method: "POST",
                    mode: "no-cors", // Umumnya 'no-cors' untuk Apps Script dasar. Ubah ke 'cors' jika GAS Anda dikonfigurasi untuk CORS.
                    headers: {
                        // "Content-Type": "application/json", // Jika GAS Anda mem-parse JSON secara langsung dari header
                        "Content-Type": "text/plain;charset=utf-8", // Atau kirim sebagai string jika GAS mem-parse e.postData.contents
                    },
                    body: JSON.stringify(dataForAppsScript) // Selalu stringify objeknya
                }).then(response => {
                    // Dengan 'no-cors', kita tidak bisa membaca response.ok atau body.
                    // Jadi, kita asumsikan sukses jika fetch tidak error.
                    // Jika menggunakan 'cors' dan GAS mengembalikan JSON:
                    // if (!response.ok) throw new Error(`Google Sheets Network response was not ok: ${response.statusText}`);
                    // return response.json();
                    return { success: true, destination: "Google Sheets" }; // Asumsi sukses untuk no-cors
                }).catch(error => {
                    console.error("Google Sheets Fetch Error:", error);
                    return { success: false, destination: "Google Sheets", error: error.message };
                })
            );
        } else {
            // Tambahkan promise yang langsung resolve jika URL tidak valid, agar Promise.allSettled tetap berjalan
             promises.push(Promise.resolve({success: false, destination: "Google Sheets", error: "URL tidak valid"}));
        }

        if (discordUrlValid) {
            promises.push(
                fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloadDiscord)
                }).then(response => {
                    if (!response.ok) throw new Error(`Discord Network response was not ok: ${response.status} - ${response.statusText}`);
                    return { success: true, destination: "Discord" };
                }).catch(error => {
                    console.error("Discord Webhook Error:", error);
                    return { success: false, destination: "Discord", error: error.message };
                })
            );
        } else {
             promises.push(Promise.resolve({success: false, destination: "Discord", error: "URL tidak valid"}));
        }


        // Tunggu semua promise selesai
        const results = await Promise.allSettled(promises);

        let allSuccessful = true;
        let messages = [];
        let formShouldReset = false;

        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value.success) {
                messages.push(`${result.value.destination}: Berhasil terkirim.`);
                if (result.value.destination === "Google Sheets") {
                    formShouldReset = true; // Anggap form berhasil jika data utama (Sheets) berhasil
                }
            } else if (result.status === 'fulfilled' && !result.value.success) {
                messages.push(`${result.value.destination}: Gagal (${result.value.error || 'unknown error'}).`);
                allSuccessful = false;
            } else if (result.status === 'rejected') { // Jarang terjadi jika catch sudah dihandle di promise individu
                messages.push(`Salah satu pengiriman gagal total: ${result.reason}`);
                allSuccessful = false;
            }
        });

        if (formShouldReset) { // Jika penyimpanan utama (Sheets) berhasil
            showStatus("Feedback Anda telah diterima! " + messages.join(" "), false);
            feedbackForm.reset();
            ratingInput.value = "0";
            stars.forEach(s => s.classList.remove('selected'));
            stars.forEach(s => s.style.color = '#e0e0e0'); // Reset warna bintang secara eksplisit
        } else {
            // Jika Google Sheets gagal, tapi mungkin Discord berhasil atau keduanya gagal
            showStatus("Gagal mengirim feedback. " + messages.join(" "), true);
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Kirim Feedback';
    });

    function showStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.className = isError ? 'error' : 'success';
    }

    function getColorForFeedbackType(type) {
        // ... (fungsi ini tetap sama) ...
        switch (type) {
            case "Saran": return 0x3498db;
            case "Laporan Bug": return 0xe74c3c;
            case "Pujian": return 0x2ecc71;
            case "Keluhan": return 0xf39c12;
            default: return 0x95a5a6;
        }
    }
});