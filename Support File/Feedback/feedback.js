document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = document.getElementById('submitButton');
    const ratingStarsContainer = document.querySelector('.rating-stars');
    const ratingInput = document.getElementById('rating');
    const stars = ratingStarsContainer.querySelectorAll('.star');

    // GANTI DENGAN URL WEBHOOK DISCORD ANDA YANG SEBENARNYA
    const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

    // Logika untuk rating bintang
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
                s.style.color = parseInt(s.dataset.value) <= hoverValue ? '#f39c12' : '#ccc';
            });
        });

        star.addEventListener('mouseout', () => {
            const currentValue = parseInt(ratingInput.value);
            stars.forEach(s => {
                s.style.color = parseInt(s.dataset.value) <= currentValue ? '#f39c12' : '#ccc';
            });
        });
    });


    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        statusMessage.textContent = '';
        statusMessage.className = ''; // Reset class

        if (DISCORD_WEBHOOK_URL === "https://discord.com/api/webhooks/1379482846934073374/s_M8tKLA0wWoBhQ0_qSsxeYZV0-xe-eicVgxQjyOhkjgIsEC9GBt9u2HUbA6IP4DEeYy") {
            showStatus("Error: URL Webhook Discord belum diatur di feedback.js.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            return;
        }

        const formData = new FormData(feedbackForm);
        const name = formData.get('name') || "Tidak disebutkan";
        const email = formData.get('email') || "Tidak disebutkan";
        const feedbackType = formData.get('feedbackType');
        const rating = parseInt(ratingInput.value) || 0; // Ambil dari input hidden
        const message = formData.get('message');

        if (!message.trim()) {
            showStatus("Pesan feedback tidak boleh kosong.", true);
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
            return;
        }

        // Membuat rating bintang untuk Discord
        let ratingStarsText = "Belum dirating";
        if (rating > 0) {
            ratingStarsText = '⭐'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`;
        }

        const payload = {
            username: "Feedback Bot Pelanggan", // Nama bot yang muncul di Discord
            avatar_url: "https://raw.githubusercontent.com/Maizu28/pimonjokiid/refs/heads/main/Foto%20Profile%20apk.png", // URL Avatar Bot (opsional)
            embeds: [
                {
                    title: "📝 Feedback Baru Diterima!",
                    color: getColorForFeedbackType(feedbackType), // Warna berdasarkan jenis feedback
                    fields: [
                        { name: "Jenis Feedback", value: feedbackType, inline: true },
                        { name: "Rating", value: ratingStarsText, inline: true },
                        { name: "Nama", value: name, inline: false },
                        { name: "Email", value: email, inline: false },
                        { name: "Pesan", value: "```\n" + message + "\n```", inline: false }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Dikirim melalui Formulir Feedback Web"
                    }
                }
            ]
        };

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showStatus("Feedback berhasil terkirim! Terima kasih atas masukan Anda.", false);
                feedbackForm.reset();
                ratingInput.value = "0"; // Reset rating hidden input
                stars.forEach(s => s.classList.remove('selected')); // Reset tampilan bintang
            } else {
                const errorData = await response.text();
                console.error("Discord Webhook Error:", response.status, errorData);
                showStatus(`Gagal mengirim feedback. Status: ${response.status}. Silakan coba lagi nanti.`, true);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            showStatus("Terjadi kesalahan jaringan. Silakan periksa koneksi Anda dan coba lagi.", true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Kirim Feedback';
        }
    });

    function showStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.className = isError ? 'error' : 'success';
    }

    function getColorForFeedbackType(type) {
        switch (type) {
            case "Saran":
                return 0x3498db; // Biru
            case "Laporan Bug":
                return 0xe74c3c; // Merah
            case "Pujian":
                return 0x2ecc71; // Hijau
            case "Keluhan":
                return 0xf39c12; // Oranye
            default:
                return 0x95a5a6; // Abu-abu
        }
    }
});