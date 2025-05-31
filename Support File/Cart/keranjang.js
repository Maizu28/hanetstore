// keranjang.js

let cart = [];
let currentAppliedPromo = null; // Format: { code, type, value, description, minPurchase, usageLimit?, validFrom?, validUntil?, perUser? }

const PROMO_CODES = {
    // Diskon kode promo yang tersedia
    "HEMAT10": {
        type: "percentage",
        value: 10,
        description: "Diskon 10%",
        minPurchase: 50000
    },
    "PIMONJOKIYES": {
        type: "percentage",
        value: 15,
        description: "Diskon Spesial 15%",
        minPurchase: 100000
    },
    // Diskon Tetap
    "DISKON5K": {
        type: "fixed",
        value: 5000,
        description: "Potongan Rp 5.000",
        minPurchase: 25000
    },
    "WELCOMENEW": {
        type: "fixed",
        value: 20000,
        description: "Potongan Rp 20.000",
        minPurchase: 75000
        // Untuk validasi "NEW", idealnya dilakukan di server dengan database pelanggan
    },
    // Diskon untuk pembelian tercepat (Global Limit)
    "10TERCEPAT": {
        type: "fixed",
        value: 10000,
        description: "Potongan Rp 10.000 (10 tercepat)",
        minPurchase: 50000,
        usageLimit: 10 // Batas penggunaan global
    },
    "20TERCEPAT": {
        type: "fixed",
        value: 8000,
        description: "Potongan Rp 8.000 (20 tercepat)",
        minPurchase: 40000,
        usageLimit: 20
    },
    "50TERCEPAT": {
        type: "fixed",
        value: 5000,
        description: "Potongan Rp 5.000 (50 tercepat)",
        minPurchase: 25000,
        usageLimit: 50
    },
    // Contoh kode promo dengan batas tanggal & waktu
    "FLASHSALE": {
        type: "percentage",
        value: 20,
        description: "Flash Sale 20%",
        minPurchase: 30000,
        validFrom: "2024-07-01T00:00:00+07:00", // Ganti dengan tanggal valid Anda
        validUntil: "2024-07-02T23:59:59+07:00" // Ganti dengan tanggal valid Anda
    },
    "HARIJADI": {
        type: "fixed",
        value: 10000,
        description: "Diskon Ulang Tahun",
        minPurchase: 50000,
        validFrom: "2024-07-10T00:00:00+07:00", // Ganti dengan tanggal valid Anda
        validUntil: "2024-07-15T23:59:59+07:00" // Ganti dengan tanggal valid Anda
    },
    // Promo dengan batas per user (memerlukan validasi sisi server yang lebih canggih untuk robust)
    "LIMIT1USER": {
        type: "percentage",
        value: 25,
        description: "Diskon 25% (1x per user)",
        minPurchase: 60000,
        validFrom: "2024-07-03T00:00:00+07:00", // Ganti tanggal
        validUntil: "2024-07-05T23:59:59+07:00", // Ganti tanggal
        perUserLimit: 1 // Batas penggunaan per user
    },
    "LIMIT3USER": {
        type: "fixed",
        value: 12000,
        description: "Diskon Rp 12.000 (3x per user)",
        minPurchase: 70000,
        validFrom: "2024-07-06T00:00:00+07:00", // Ganti tanggal
        validUntil: "2024-07-10T23:59:59+07:00", // Ganti tanggal
        perUserLimit: 3
    }
};

// Fungsi untuk memuat keranjang dan status promo dari localStorage
function loadCartAndPromo() {
    const cartString = localStorage.getItem("pimonjoki_cart");
    if (cartString) {
        try {
            const parsedCart = JSON.parse(cartString);
            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            }
        } catch (e) {
            console.error("Gagal parse keranjang dari localStorage:", e);
            cart = [];
        }
    } else {
        cart = [];
    }
}

function isPromoDateValid(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.validFrom && promo.validUntil) {
        const now = new Date();
        const from = new Date(promo.validFrom);
        const until = new Date(promo.validUntil);
        // Pastikan tanggal dikonversi dan dibandingkan dengan benar (termasuk zona waktu jika relevan)
        return now >= from && now <= until;
    }
    return true; // Jika tidak ada validFrom/validUntil, anggap selalu valid dari segi tanggal
}

function isPromoAvailable(code) { // Untuk global usageLimit
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.usageLimit !== undefined) {
        const usedCount = parseInt(localStorage.getItem(`promo_used_count_${code}`) || "0", 10);
        return usedCount < promo.usageLimit;
    }
    return true; // Jika tidak ada usageLimit, anggap tersedia
}

// Catatan: Validasi perUserLimit memerlukan database pelanggan di sisi server.
// Fungsi di bawah ini adalah contoh SANGAT SEDERHANA menggunakan localStorage,
// TIDAK AMAN dan TIDAK ROBUST untuk pelacakan per pengguna yang sebenarnya.
function isPromoPerUserAvailable(code, userName) {
    const promo = PROMO_CODES[code];
    if (!promo || promo.perUserLimit === undefined || !userName) return true; // Jika tidak ada batasan perUser atau tidak ada userName

    const userPromoKey = `promo_user_${userName.trim().toLowerCase()}_${code}`;
    const usedCountByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
    return usedCountByUser < promo.perUserLimit;
}


function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function saveCart() {
    localStorage.setItem("pimonjoki_cart", JSON.stringify(cart));
}

async function applyPromoCode() { // Dijadikan async jika validasi perUser memanggil server
    const promoInput = document.getElementById('promo-code-input');
    const promoStatusDiv = document.getElementById('promo-status');
    if (!promoInput || !promoStatusDiv) return;

    const promoCodeEntered = promoInput.value.trim().toUpperCase();

    let currentSubtotal = 0;
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/\D/g, "")) || 0;
        currentSubtotal += item.qty * price;
    });

    // Reset status sebelum validasi baru
    promoStatusDiv.textContent = "";
    currentAppliedPromo = null; // Selalu reset promo saat mencoba kode baru/kosong

    if (promoCodeEntered === "") {
        if (localStorage.getItem("appliedPimonjokiPromo")) { // Cek apakah ada promo yang dihapus
            promoStatusDiv.textContent = "Kode promo dihapus.";
            promoStatusDiv.style.color = "orange";
        } else {
            promoStatusDiv.textContent = "Masukkan kode promo.";
            promoStatusDiv.style.color = "red";
        }
        localStorage.removeItem("appliedPimonjokiPromo"); // Hapus dari persistensi juga
    } else if (PROMO_CODES[promoCodeEntered]) {
        const promoDetails = PROMO_CODES[promoCodeEntered];

        if (!promoDetails.isActive && promoDetails.isActive !== undefined) { // Cek jika ada flag isActive
             promoStatusDiv.textContent = "Kode promo sudah tidak aktif.";
             promoStatusDiv.style.color = "red";
        } else if (!isPromoDateValid(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah kedaluwarsa atau belum berlaku.";
            promoStatusDiv.style.color = "red";
        } else if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah mencapai batas penggunaan global.";
            promoStatusDiv.style.color = "red";
        } else if (currentSubtotal < promoDetails.minPurchase) {
            promoStatusDiv.textContent = `Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeEntered}".`;
            promoStatusDiv.style.color = "red";
        } else if (promoDetails.perUserLimit !== undefined) {
            // Untuk validasi perUser yang robust, idealnya panggil server.
            // Untuk demo client-side (TIDAK AMAN):
            const customerName = prompt("Masukkan nama Anda untuk validasi promo per pengguna:"); // Perlu nama pengguna
            if (customerName && isPromoPerUserAvailable(promoCodeEntered, customerName)) {
                currentAppliedPromo = { ...promoDetails, code: promoCodeEntered };
                // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo));
            } else if (customerName) {
                promoStatusDiv.textContent = `Anda sudah menggunakan kode promo "${promoCodeEntered}" secara maksimal.`;
                promoStatusDiv.style.color = "red";
            } else if (!customerName) {
                promoStatusDiv.textContent = `Nama diperlukan untuk validasi promo ini.`;
                promoStatusDiv.style.color = "red";
            }
        }
        else { // Semua validasi client-side terpenuhi
            currentAppliedPromo = { ...promoDetails, code: promoCodeEntered };
            // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo));
            // Pesan sukses akan di-set oleh renderCart
        }
    } else {
        promoStatusDiv.textContent = "Kode promo tidak valid.";
        promoStatusDiv.style.color = "red";
    }
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-content");
    const promoSectionHTML = `
      <div class="promo-section">
        <h4>Kode Promo</h4>
        <div style="display: flex; gap: 5px; align-items: stretch;">
            <input type="text" id="promo-code-input" placeholder="Masukkan kode promo" value="${currentAppliedPromo ? currentAppliedPromo.code : ''}">
            <button id="apply-promo-btn">${currentAppliedPromo ? 'Ganti/Hapus' : 'Gunakan'}</button>
        </div>
        <div id="promo-status" style="font-size: 0.9em; margin-top: 8px; min-height: 1.2em;"></div>
      </div>`;

    if (cart.length === 0) {
      container.innerHTML = `<div class="empty-cart">Keranjang Anda kosong.</div>` + promoSectionHTML;
      const promoStatusDivOnEmpty = document.getElementById('promo-status');
      const promoInputOnEmpty = document.getElementById('promo-code-input');
      if (promoInputOnEmpty && currentAppliedPromo) promoInputOnEmpty.value = currentAppliedPromo.code;

      if (promoStatusDivOnEmpty) {
        if (currentAppliedPromo) {
            if (0 >= currentAppliedPromo.minPurchase && isPromoDateValid(currentAppliedPromo.code) && isPromoAvailable(currentAppliedPromo.code) /* && (await isPromoPerUserAvailableClientSide(currentAppliedPromo.code, 'some_user_identifier_if_any')) */) {
                 promoStatusDivOnEmpty.textContent = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan.`;
                 promoStatusDivOnEmpty.style.color = "green";
            } else {
                 promoStatusDivOnEmpty.textContent = `Promo "${currentAppliedPromo.code}" aktif. Min. belanja ${formatRupiah(currentAppliedPromo.minPurchase)}.`;
                 promoStatusDivOnEmpty.style.color = "orange";
            }
        } else if (promoStatusDivOnEmpty.textContent === "") { /* Biarkan jika applyPromoCode memberi pesan */ }
      }
      const applyBtnEmpty = document.getElementById('apply-promo-btn');
      if(applyBtnEmpty) applyBtnEmpty.addEventListener('click', applyPromoCode);
      const promoInputForEnterEmpty = document.getElementById('promo-code-input');
      if (promoInputForEnterEmpty && applyBtnEmpty) {
        promoInputForEnterEmpty.addEventListener("keydown", function(e) { if (e.key === "Enter") { e.preventDefault(); applyBtnEmpty.click();}});
      }
      return;
    }

    let subtotalAmount = 0;
    let cartHtml = "";
    cart.forEach((item) => {
      const price = parseInt(item.price.replace(/\D/g, "")) || 0;
      const itemSubtotal = item.qty * price;
      subtotalAmount += itemSubtotal;
      cartHtml += `
        <div class="cart-card">
          <h3>${item.name}</h3>
          <div style="font-size: 0.9rem; color: #555;">Game: ${item.game || '-'}</div>
          <div class="cart-info">
            <div class="price">${formatRupiah(price)} / item</div>
            <div class="qty-controls">
              <button onclick="updateQty('${item.id}', -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <div class="subtotal">Subtotal: ${formatRupiah(itemSubtotal)}</div>
          <button class="remove-btn" onclick="removeItem('${item.id}')">Hapus</button>
        </div>
      `;
    });

    let discountAmount = 0;
    let finalTotal = subtotalAmount;
    let discountDisplayHtml = "";
    let promoStatusTextForRender = "";
    let promoStatusColorForRender = "initial";
    let isPromoCurrentlyValidAndApplicable = false;

    if (currentAppliedPromo) {
        // Validasi ulang semua kondisi promo saat render
        const isValidDate = isPromoDateValid(currentAppliedPromo.code);
        const isAvailableGlobal = isPromoAvailable(currentAppliedPromo.code);
        // const isAvailablePerUser = await isPromoPerUserAvailableClientSide(currentAppliedPromo.code, 'some_user_identifier_if_any'); // Perlu cara dapatkan user
        const meetsMinPurchase = subtotalAmount >= currentAppliedPromo.minPurchase;

        if (isValidDate && isAvailableGlobal /*&& isAvailablePerUser*/ && meetsMinPurchase) {
            if (currentAppliedPromo.type === "percentage") {
                discountAmount = subtotalAmount * (currentAppliedPromo.value / 100);
            } else if (currentAppliedPromo.type === "fixed") {
                discountAmount = currentAppliedPromo.value;
            }
            discountAmount = Math.floor(discountAmount);
            discountAmount = Math.min(discountAmount, subtotalAmount); 
            finalTotal = subtotalAmount - discountAmount;
            discountDisplayHtml = `<div style="color: green; text-align: right; margin-top: 5px;">Diskon (${currentAppliedPromo.description}): -${formatRupiah(discountAmount)}</div>`;
            promoStatusTextForRender = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan.`;
            promoStatusColorForRender = "green";
            isPromoCurrentlyValidAndApplicable = true;
        } else { 
            // Promo ada tapi salah satu kondisi tidak terpenuhi
            discountAmount = 0; finalTotal = subtotalAmount; discountDisplayHtml = "";
            if (!isValidDate) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah kedaluwarsa atau belum berlaku.`;
                promoStatusColorForRender = "red";
            } else if (!isAvailableGlobal) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah habis digunakan (global).`;
                promoStatusColorForRender = "red";
            // } else if (!isAvailablePerUser) {
            //     promoStatusTextForRender = `Anda sudah menggunakan promo "${currentAppliedPromo.code}" secara maksimal.`;
            //     promoStatusColorForRender = "red";
            } else if (!meetsMinPurchase) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" aktif, tapi minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)} belum terpenuhi.`;
                promoStatusColorForRender = "orange";
            }
        }
    }

    cartHtml += promoSectionHTML;
    cartHtml += `
      <div class="total-section">
        <div>Subtotal: ${formatRupiah(subtotalAmount)}</div>
        ${discountDisplayHtml}
        <div style="font-size: 1.2em; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc;">Total Akhir: ${formatRupiah(finalTotal)}</div>
      </div>
      <button class="checkout-btn" onclick="checkout(${finalTotal}, ${subtotalAmount}, ${discountAmount}, isPromoCurrentlyValidAndApplicable ? currentAppliedPromo.code : null)">Checkout</button>
    `;

    container.innerHTML = cartHtml;
    const applyBtn = document.getElementById('apply-promo-btn');
    const promoInputForEnter = document.getElementById('promo-code-input');

    if(applyBtn) applyBtn.addEventListener('click', applyPromoCode);
    if (promoInputForEnter && applyBtn) {
        promoInputForEnter.addEventListener("keydown", function(e) { if (e.key === "Enter") { e.preventDefault(); applyBtn.click();}});
    }
    
    const promoInputRendered = document.getElementById('promo-code-input');
    if (promoInputRendered && currentAppliedPromo) {
        promoInputRendered.value = currentAppliedPromo.code;
    }
    
    const promoStatusDivRendered = document.getElementById('promo-status');
    if (promoStatusDivRendered) {
        // Jika applyPromoCode (yang dipanggil user action) sudah mengisi text, jangan timpa kecuali ada update status dari render
        // Jika promoStatusTextForRender ada isinya (dari validasi renderCart), itu yang ditampilkan
        if (promoStatusTextForRender) {
             promoStatusDivRendered.textContent = promoStatusTextForRender;
             promoStatusDivRendered.style.color = promoStatusColorForRender;
        } else if (promoStatusDivRendered.textContent === "") { // Jika kosong dan tidak ada status dari render
             promoStatusDivRendered.textContent = ''; 
        }
        // Jika applyPromoCode memberi pesan error, pesan itu akan ada di promoStatusDivRendered.textContent sebelum baris ini.
        // Jika kemudian promoStatusTextForRender kosong (misalnya currentAppliedPromo null), pesan error itu tetap ada.
        // Jika promoStatusTextForRender ada (misalnya promo diterapkan atau butuh min purchase), maka itu akan menimpa.
    }
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) item.qty = 1;
        saveCart();
        renderCart();
    }
}

function removeItem(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
}

async function checkout(finalAmount, originalSubtotal, discountValue, promoCodeUsed) {
    if (promoCodeUsed && PROMO_CODES[promoCodeUsed]) {
        const promoDetails = PROMO_CODES[promoCodeUsed];
        if (!isPromoDateValid(promoCodeUsed)) {
            alert("Kode promo " + promoCodeUsed + " sudah kedaluwarsa atau belum berlaku. Pesanan tidak dapat dilanjutkan dengan promo ini.");
            currentAppliedPromo = null; renderCart(); return;
        }
        if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeUsed)) {
            alert("Kode promo " + promoCodeUsed + " sudah habis digunakan (global). Pesanan tidak dapat dilanjutkan dengan promo ini.");
            currentAppliedPromo = null; renderCart(); return;
        }
        // Validasi perUser SANGAT disarankan dilakukan di server. Ini hanya contoh client-side yang lemah.
        if (promoDetails.perUserLimit !== undefined) {
            const customerName = prompt("Verifikasi nama Anda untuk penggunaan promo terbatas:");
            if (!customerName || !isPromoPerUserAvailable(promoCodeUsed, customerName)) {
                 alert(`Promo "${promoCodeUsed}" tidak bisa digunakan atau sudah maksimal untuk Anda. Pesanan tidak dapat dilanjutkan dengan promo ini.`);
                 currentAppliedPromo = null; renderCart(); return;
            }
        }
        // Re-check minimal purchase, karena cart bisa saja tidak berubah tapi checkout diklik
        if (originalSubtotal < promoDetails.minPurchase) {
            alert(`Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeUsed}" belum terpenuhi. Diskon dibatalkan.`);
            currentAppliedPromo = null; renderCart(); return;
        }
    } else if (promoCodeUsed) { // Jika promoCodeUsed ada tapi tidak dikenali lagi (misal dihapus dari PROMO_CODES)
        alert(`Kode promo "${promoCodeUsed}" tidak lagi valid. Pesanan akan diproses tanpa diskon.`);
        promoCodeUsed = null; // Jangan kirim kode promo yang tidak valid
        discountValue = 0;
        finalAmount = originalSubtotal;
        currentAppliedPromo = null; renderCart(); // Update tampilan sebelum prompt nama
        // Mungkin perlu konfirmasi user apakah mau lanjut tanpa promo
        // Untuk sekarang, kita biarkan lanjut tanpa promo jika user klik OK pada prompt nama
    }


    const nama = prompt("Masukkan nama Anda:");
    if (!nama) return alert("Nama wajib diisi.");

    const jenis = cart.map(i => i.name).join(", ");
    const uniqueGames = [...new Set(cart.map(item => item.game).filter(g => g && g !== '-'))];
    const game = uniqueGames.length > 0 ? uniqueGames.join(", ") : "Genshin Impact";

    let dataToSend = {
        nama: nama,
        jenis: jenis,
        game: game,
        totalBayar: finalAmount,
        subtotalAsli: originalSubtotal,
        promoDigunakan: promoCodeUsed || "-",
        jumlahDiskon: discountValue || 0
    };

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzr8IMeZG2ZGi6FTUeCLOpGnSeuxAFCo_q-lOnGgN1UR-_JXk8UG_mR7uWxOJSongsXBg/exec"; 

    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend)
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Server merespons dengan error: ${res.status} (${text})`);
        }

        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await res.json();
        } else {
            const text = await res.text();
            throw new Error(`Format respons dari server tidak valid: ${text}`);
        }

        if (typeof data === 'object' && data !== null && data.status === "sukses") {
            alert(`Pesanan berhasil!\nKode Pesanan: ${data.kodePesanan}`);
            localStorage.removeItem("pimonjoki_cart");
            // localStorage.removeItem("appliedPimonjokiPromo"); 

            // Increment usage count untuk promo global jika berhasil & digunakan
            if (promoCodeUsed && PROMO_CODES[promoCodeUsed] && PROMO_CODES[promoCodeUsed].usageLimit !== undefined) {
                let used = parseInt(localStorage.getItem(`promo_used_count_${promoCodeUsed}`) || "0", 10);
                localStorage.setItem(`promo_used_count_${promoCodeUsed}`, used + 1);
            }
            // Increment usage count untuk promo perUser jika berhasil & digunakan (client-side lemah)
            if (promoCodeUsed && PROMO_CODES[promoCodeUsed] && PROMO_CODES[promoCodeUsed].perUserLimit !== undefined && nama) {
                const userPromoKey = `promo_user_${nama.trim().toLowerCase()}_${promoCodeUsed}`;
                let usedByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
                localStorage.setItem(userPromoKey, usedByUser + 1);
            }

            currentAppliedPromo = null;
            cart = [];
            location.reload(); 
        } else {
            alert(`Gagal mengirim pesanan: ${data.message || data.error || "Format respons tidak diketahui"}`);
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert(`Backend belum siap atau terjadi kesalahan jaringan. Detail: ${err.message}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartAndPromo();
    renderCart(); // renderCart akan memasang listener untuk promo button dan input enter
});

/**
 * Ambil keranjang dari Firestore (asumsi sudah ada Firebase SDK di halaman)
 * Ganti 'users' dan 'cart' sesuai struktur koleksi Firestore Anda.
 * userId bisa didapat dari auth, localStorage, atau input user.
 */
async function fetchCartFromFirestore(userId) {
    if (!window.firebase || !firebase.firestore) {
        console.error("Firebase SDK belum dimuat.");
        return;
    }
    if (!userId) {
        alert("User ID tidak ditemukan. Tidak bisa mengambil keranjang.");
        return;
    }
    try {
        const docRef = firebase.firestore().collection("users").doc(userId).collection("cart");
        const snapshot = await docRef.get();
        const items = [];
        snapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
        cart = items;
        saveCart();
        renderCart();
    } catch (err) {
        console.error("Gagal mengambil keranjang dari Firestore:", err);
        alert("Gagal mengambil keranjang dari server.");
    }
}

// Contoh pemakaian (misal userId dari localStorage atau auth):
// fetchCartFromFirestore(localStorage.getItem("userId"));