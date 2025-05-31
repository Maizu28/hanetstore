// keranjang.js

// Asumsi variabel global ini akan diinisialisasi dengan benar
let cart = [];
let currentAppliedPromo = null;
// (Opsional) Untuk menyimpan nama pengguna jika sudah login/dimasukkan
window.pimonjokiCurrentUserName = null; 

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


const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxrrPdTGbpfvpYG_QMqzBdN6nmUKJuPrMFglMAn4GcJSo66z0P5hSucRrPKlX7gO5sDhg/exec";

// --- FUNGSI HELPER ---
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function isPromoDateValid(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false; // Kode promo tidak ditemukan di definisi klien
    if (promo.validFrom && promo.validUntil) {
        const now = new Date();
        const from = new Date(promo.validFrom);
        const until = new Date(promo.validUntil);
        return now >= from && now <= until;
    }
    return true;
}

function isPromoAvailable(code) { // Untuk global usageLimit
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.usageLimit !== undefined) {
        const usedCount = parseInt(localStorage.getItem(`promo_used_count_${code}`) || "0", 10);
        return usedCount < promo.usageLimit;
    }
    return true;
}

function isPromoPerUserAvailable(code, userName) {
    const promo = PROMO_CODES[code];
    if (!promo || promo.perUserLimit === undefined || !userName) return true;
    const userPromoKey = `promo_user_${userName.trim().toLowerCase()}_${code}`;
    const usedCountByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
    return usedCountByUser < promo.perUserLimit;
}

// --- FUNGSI KERANJANG (localStorage) ---
function getCart() {
    let cartData = [];
    try {
        const cartString = localStorage.getItem("pimonjoki_cart");
        if (cartString) {
            cartData = JSON.parse(cartString);
            if (!Array.isArray(cartData)) {
                cartData = [];
            }
        }
    } catch (error) {
        console.error("Error parsing keranjang dari localStorage:", error);
        cartData = [];
    }
    return cartData;
}

function saveCart(_cart) { // Parameter diganti nama agar tidak konflik dengan var global `cart`
    try {
        localStorage.setItem("pimonjoki_cart", JSON.stringify(_cart));
    } catch (error) {
        console.error("Error menyimpan keranjang ke localStorage:", error);
    }
}

function loadCartAndPromo() {
    const cartString = localStorage.getItem("pimonjoki_cart");
    if (cartString) {
        try {
            const parsedCart = JSON.parse(cartString);
            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            } else {
                cart = [];
            }
        } catch (e) {
            console.error("Gagal parse keranjang dari localStorage:", e);
            cart = [];
        }
    } else {
        cart = [];
    }
    // Di sini Anda juga bisa memuat `currentAppliedPromo` dari localStorage jika ingin persisten
    // const savedPromo = localStorage.getItem("appliedPimonjokiPromo");
    // if (savedPromo) { try { currentAppliedPromo = JSON.parse(savedPromo); } catch(e){ /* abaikan */ } }
}

// --- FUNGSI INTERAKSI KERANJANG ---
function addToCart(item) {
    let currentCart = getCart(); // Ambil cart dari localStorage
    const existing = currentCart.find((i) => i.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        currentCart.push({ ...item, qty: 1 });
    }
    saveCart(currentCart); // Simpan kembali ke localStorage
    cart = currentCart; // Update variabel global cart
    alert(`"${item.name}" berhasil ditambahkan ke keranjang.`);
    // updateCartUI(); // Pertimbangkan fungsi untuk update ikon keranjang di header, dll.
}

function addSelectedItemsToCart(buttonElement) {
    const packageCard = buttonElement.closest('.package-card');
    if (!packageCard) {
        alert("Kesalahan: Kartu paket tidak ditemukan.");
        return;
    }
    const basePackageNameElement = packageCard.querySelector('h2');
    const basePackageName = basePackageNameElement ? basePackageNameElement.textContent.trim() : "Paket Pilihan";

    let selectedCheckboxes = packageCard.querySelectorAll('ul.selectable-item-list input.selectable-sub-item:checked');
    if (selectedCheckboxes.length === 0) {
        selectedCheckboxes = packageCard.querySelectorAll('ul.quest-list input[type="checkbox"]:checked');
    }
    if (selectedCheckboxes.length === 0) {
        alert(`Silakan pilih minimal satu item dari ${basePackageName}.`);
        return;
    }

    const selectedItemValues = [];
    const selectedItemUniqueIds = [];
    let totalPrice = 0;
    let priceCalculationMode = "individual";
    const pricePerActDiv = packageCard.querySelector('div[data-price-per-act]');
    if (pricePerActDiv && pricePerActDiv.dataset.pricePerAct) {
        const pricePerActFromCard = parseInt(pricePerActDiv.dataset.pricePerAct, 10);
        if (!isNaN(pricePerActFromCard) && pricePerActFromCard > 0) {
            priceCalculationMode = "perAct";
            totalPrice = selectedCheckboxes.length * pricePerActFromCard;
        }
    }

    if (priceCalculationMode === "perAct") {
        selectedCheckboxes.forEach(checkbox => {
            selectedItemValues.push(checkbox.value);
            selectedItemUniqueIds.push(checkbox.value.toLowerCase().replace(/\s+/g, '-'));
        });
    } else {
        selectedCheckboxes.forEach(checkbox => {
            const itemPrice = parseInt(checkbox.dataset.price, 10);
            if (!isNaN(itemPrice) && itemPrice >= 0) {
                totalPrice += itemPrice;
                selectedItemValues.push(checkbox.value);
                selectedItemUniqueIds.push(checkbox.dataset.questId || checkbox.dataset.id || checkbox.value.toLowerCase().replace(/\s+/g, '-'));
            } else {
                console.warn(`Item "${checkbox.value}" tidak memiliki harga valid (data-price) dan dilewati.`);
            }
        });
        if (selectedItemValues.length === 0 && selectedCheckboxes.length > 0) {
            alert("Item yang dipilih tidak memiliki harga yang valid.");
            return;
        }
    }
    
    if (selectedItemValues.length === 0) {
        alert(`Tidak ada item valid yang dipilih dari ${basePackageName}.`);
        return;
    }

    const sortedItemIds = [...selectedItemUniqueIds].sort();
    const selectionIdentifier = sortedItemIds.join('-');
    const idPrefix = basePackageName.toLowerCase().replace(/\s+/g, '-') || 'custom-package';
    const itemId = `${idPrefix}-${selectionIdentifier}`; 
    const itemName = `${basePackageName} (${selectedItemValues.join(", ")})`; 
    const formattedTotalPrice = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    const gameName = packageCard.dataset.game || "Genshin Impact";

    const newItemForCart = { id: itemId, name: itemName, price: formattedTotalPrice, game: gameName };
    addToCart(newItemForCart); // Memanggil fungsi addToCart inti
}


function updateQty(id, delta) {
    let currentCart = getCart();
    const itemIndex = currentCart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        currentCart[itemIndex].qty += delta;
        if (currentCart[itemIndex].qty < 1) currentCart[itemIndex].qty = 1;
        saveCart(currentCart);
        cart = currentCart; // Update variabel global
        renderCart();
    }
}

function removeItem(id) {
    let currentCart = getCart();
    const initialLength = currentCart.length;
    currentCart = currentCart.filter(i => i.id !== id);
    if (currentCart.length < initialLength) {
        saveCart(currentCart);
        cart = currentCart; // Update variabel global
        renderCart();
    }
}

async function applyPromoCode() {
    const promoInput = document.getElementById('promo-code-input');
    const promoStatusDiv = document.getElementById('promo-status');
    if (!promoInput || !promoStatusDiv) {
        console.error("Elemen promo (#promo-code-input atau #promo-status) tidak ditemukan.");
        return;
    }
    const promoCodeEntered = promoInput.value.trim().toUpperCase();

    let currentSubtotal = 0;
    getCart().forEach(item => { // Gunakan getCart() untuk subtotal terbaru
        const price = parseInt(item.price.replace(/\D/g, "")) || 0;
        currentSubtotal += item.qty * price;
    });

    currentAppliedPromo = null; // Reset dulu
    promoStatusDiv.textContent = ""; // Bersihkan status lama

    if (promoCodeEntered === "") {
        // Tidak perlu pesan khusus jika hanya mengosongkan, renderCart akan handle
        // Jika sebelumnya ada promo, pesan "dihapus" bisa ditambahkan
        if (localStorage.getItem("appliedPimonjokiPromo")) {
             promoStatusDiv.textContent = "Kode promo dihapus.";
             promoStatusDiv.style.color = "orange";
        } else {
            promoStatusDiv.textContent = "Masukkan kode promo.";
            promoStatusDiv.style.color = "red";
        }
        localStorage.removeItem("appliedPimonjokiPromo");
    } else if (PROMO_CODES[promoCodeEntered]) {
        const promoDetails = PROMO_CODES[promoCodeEntered];
        if (promoDetails.isActive === false) {
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
            const customerName = prompt("Masukkan NAMA Anda untuk validasi promo ini (digunakan saat checkout):");
            if (customerName && customerName.trim() !== "") {
                if (isPromoPerUserAvailable(promoCodeEntered, customerName)) {
                    currentAppliedPromo = { ...promoDetails, code: promoCodeEntered, customerNameForValidation: customerName.trim().toLowerCase() };
                    // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo));
                    // Pesan sukses akan diatur oleh renderCart
                } else {
                    promoStatusDiv.textContent = `Anda sudah menggunakan kode promo "${promoCodeEntered}" secara maksimal.`;
                    promoStatusDiv.style.color = "red";
                }
            } else {
                promoStatusDiv.textContent = "Nama diperlukan untuk validasi promo ini. Klik 'Gunakan' lagi dan masukkan nama.";
                promoStatusDiv.style.color = "orange";
            }
        } else {
            currentAppliedPromo = { ...promoDetails, code: promoCodeEntered };
            // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo));
        }
    } else {
        promoStatusDiv.textContent = "Kode promo tidak valid.";
        promoStatusDiv.style.color = "red";
    }
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-content");
    if (!container) return; // Exit jika container tidak ada (misal di halaman lain)

    const promoSectionHTML = `
      <div class="promo-section">
        <h4>Kode Promo</h4>
        <div style="display: flex; gap: 5px; align-items: stretch;">
            <input type="text" id="promo-code-input" placeholder="Masukkan kode promo" value="${currentAppliedPromo ? currentAppliedPromo.code : ''}">
            <button id="apply-promo-btn">${currentAppliedPromo ? 'Ganti/Hapus' : 'Gunakan'}</button>
        </div>
        <div id="promo-status" style="font-size: 0.9em; margin-top: 8px; min-height: 1.2em;"></div>
      </div>`;

    const currentDisplayCart = getCart(); // Selalu gunakan data terbaru dari localStorage untuk render

    if (currentDisplayCart.length === 0) {
      container.innerHTML = `<div class="empty-cart">Keranjang Anda kosong.</div>` + promoSectionHTML;
      const promoStatusDivOnEmpty = document.getElementById('promo-status');
      const promoInputOnEmpty = document.getElementById('promo-code-input');
      
      if (promoInputOnEmpty && currentAppliedPromo) promoInputOnEmpty.value = currentAppliedPromo.code;

      if (promoStatusDivOnEmpty) {
          if (currentAppliedPromo) {
               if (0 >= currentAppliedPromo.minPurchase && isPromoDateValid(currentAppliedPromo.code) && isPromoAvailable(currentAppliedPromo.code)) {
                   promoStatusDivOnEmpty.textContent = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan.`;
                   promoStatusDivOnEmpty.style.color = "green";
              } else {
                   promoStatusDivOnEmpty.textContent = `Promo "${currentAppliedPromo.code}" aktif. Min. belanja ${formatRupiah(currentAppliedPromo.minPurchase)}.`;
                   promoStatusDivOnEmpty.style.color = "orange";
              }
          } else if (promoStatusDivOnEmpty.textContent === "" && !promoStatusDivOnEmpty.dataset.transientMessage) {
              promoStatusDivOnEmpty.textContent = ''; 
          }
      }
      const applyBtnEmpty = document.getElementById('apply-promo-btn');
      if(applyBtnEmpty) applyBtnEmpty.addEventListener('click', applyPromoCode);
      if (promoInputOnEmpty && applyBtnEmpty) {
        promoInputOnEmpty.addEventListener("keydown", function(e) { if (e.key === "Enter") { e.preventDefault(); applyBtnEmpty.click();}});
      }
      return;
    }

    let subtotalAmount = 0;
    let cartHtml = "";
    currentDisplayCart.forEach((item) => {
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
        const isValidDate = isPromoDateValid(currentAppliedPromo.code);
        const isAvailableGlobal = isPromoAvailable(currentAppliedPromo.code);
        const meetsMinPurchase = subtotalAmount >= currentAppliedPromo.minPurchase;
        let isAvailablePerUser = true; // Default true, akan dicek jika ada perUserLimit
        if (currentAppliedPromo.perUserLimit !== undefined) {
            // Asumsi nama pelanggan untuk validasi perUser sudah ada di currentAppliedPromo.customerNameForValidation
            // atau Anda perlu cara lain untuk mendapatkannya di sini.
            // Ini tetap validasi client-side yang lemah.
            isAvailablePerUser = isPromoPerUserAvailable(currentAppliedPromo.code, currentAppliedPromo.customerNameForValidation);
        }


        if (isValidDate && isAvailableGlobal && isAvailablePerUser && meetsMinPurchase) {
            if (currentAppliedPromo.type === "percentage") {
                discountAmount = subtotalAmount * (currentAppliedPromo.value / 100);
            } else if (currentAppliedPromo.type === "fixed") {
                discountAmount = currentAppliedPromo.value;
            }
            discountAmount = Math.floor(discountAmount);
            discountAmount = Math.min(discountAmount, subtotalAmount); 
            finalTotal = subtotalAmount - discountAmount;
            discountDisplayHtml = `<div class="discount-display">Diskon (${currentAppliedPromo.description}): -${formatRupiah(discountAmount)}</div>`;
            promoStatusTextForRender = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan.`;
            promoStatusColorForRender = "green";
            isPromoCurrentlyValidAndApplicable = true;
        } else { 
            discountAmount = 0; finalTotal = subtotalAmount; discountDisplayHtml = "";
            if (!isValidDate) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah kedaluwarsa atau belum berlaku.`;
            } else if (!isAvailableGlobal) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah habis digunakan (global).`;
            } else if (!isAvailablePerUser && currentAppliedPromo.perUserLimit !== undefined) {
                 promoStatusTextForRender = `Anda sudah menggunakan promo "${currentAppliedPromo.code}" secara maksimal.`;
            } else if (!meetsMinPurchase) {
                promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" aktif, tapi minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)} belum terpenuhi.`;
            }
            promoStatusColorForRender = (isValidDate && isAvailableGlobal && isAvailablePerUser) ? "orange" : "red";
        }
    }

    cartHtml += promoSectionHTML;
    cartHtml += `
      <div class="total-section">
        <div>Subtotal: ${formatRupiah(subtotalAmount)}</div>
        ${discountDisplayHtml}
        <div class="final-total-amount">Total Akhir: ${formatRupiah(finalTotal)}</div>
      </div>
      <button class="checkout-btn" onclick="checkout(${finalTotal}, ${subtotalAmount}, ${discountAmount}, isPromoCurrentlyValidAndApplicable ? currentAppliedPromo.code : null, isPromoCurrentlyValidAndApplicable && currentAppliedPromo.customerNameForValidation ? currentAppliedPromo.customerNameForValidation : null)">Checkout</button>
    `; // Menambahkan customerNameForValidation ke checkout jika ada

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
        // Jika promoStatusDivRendered.textContent sudah diisi oleh applyPromoCode (misal dengan error)
        // dan tidak ada status render baru (promoStatusTextForRender kosong), biarkan pesan error tersebut.
        // Jika ada status render baru, timpa.
        if (promoStatusTextForRender) {
             promoStatusDivRendered.textContent = promoStatusTextForRender;
             promoStatusDivRendered.style.color = promoStatusColorForRender;
        } else if (promoStatusDivRendered.textContent === "") { 
             promoStatusDivRendered.textContent = ''; 
        }
    }
}


async function checkout(finalAmount, originalSubtotal, discountValue, promoCodeUsed, customerNameForValidation) {
    // Jika nama untuk validasi promo perUser ada, gunakan itu. Jika tidak, prompt nama utama.
    let nama = customerNameForValidation; 
    if (!nama) {
        nama = prompt("Masukkan nama Anda untuk pesanan:");
        if (!nama) return alert("Nama wajib diisi.");
    } else {
        // Jika nama sudah ada dari validasi promo, konfirmasi atau langsung gunakan
        const confirmName = confirm(`Lanjutkan pesanan sebagai "${nama}"?`);
        if (!confirmName) {
            nama = prompt("Masukkan nama Anda untuk pesanan:");
            if (!nama) return alert("Nama wajib diisi.");
        }
    }
    nama = nama.trim(); // Pastikan nama di-trim

    // Validasi ulang promo sebelum mengirim ke server (sangat penting)
    if (promoCodeUsed && PROMO_CODES[promoCodeUsed]) {
        const promoDetails = PROMO_CODES[promoCodeUsed];
        let subtotalForValidation = 0; // Hitung ulang subtotal berdasarkan cart saat ini
        getCart().forEach(item => {
            subtotalForValidation += (parseInt(item.price.replace(/\D/g, "")) || 0) * item.qty;
        });

        if (!isPromoDateValid(promoCodeUsed)) {
            alert(`Kode promo "${promoCodeUsed}" sudah kedaluwarsa. Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return;
        }
        if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeUsed)) {
            alert(`Kode promo "${promoCodeUsed}" sudah habis (global). Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return;
        }
        if (subtotalForValidation < promoDetails.minPurchase) {
            alert(`Minimal belanja untuk kode promo "${promoCodeUsed}" tidak terpenuhi. Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return;
        }
        if (promoDetails.perUserLimit !== undefined && !isPromoPerUserAvailable(promoCodeUsed, nama)) { // Gunakan 'nama' yang sudah dikonfirmasi
            alert(`Promo "${promoCodeUsed}" tidak bisa digunakan atau sudah maksimal untuk Anda ("${nama}"). Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return;
        }
    } else if (promoCodeUsed) { 
        alert(`Kode promo "${promoCodeUsed}" tidak lagi valid. Pesanan akan diproses tanpa diskon.`);
        promoCodeUsed = null; discountValue = 0; finalAmount = originalSubtotal;
        currentAppliedPromo = null; renderCart(); 
    }

    const jenis = getCart().map(i => i.name).join(", "); // Ambil dari getCart()
    const uniqueGames = [...new Set(getCart().map(item => item.game).filter(g => g && g !== '-'))];
    const game = uniqueGames.length > 0 ? uniqueGames.join(", ") : "Genshin Impact";

    let dataToSend = {
        nama: nama, jenis: jenis, game: game, totalBayar: finalAmount,
        subtotalAsli: originalSubtotal, promoDigunakan: promoCodeUsed || "-", jumlahDiskon: discountValue || 0
    };

    const checkoutButton = document.querySelector('.checkout-btn');
    const originalCheckoutButtonText = checkoutButton ? checkoutButton.textContent : "Checkout";
    if(checkoutButton) { checkoutButton.textContent = "Memproses..."; checkoutButton.disabled = true; }

    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(dataToSend)
        });
        if (!res.ok && res.type !== 'opaque') {
            const text = await res.text(); throw new Error(`Server error: ${res.status} (${text})`);
        }
        let data = { status: "sukses", kodePesanan: "GAS-" + new Date().getTime() }; 
        if (res.type !== 'opaque') {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) { data = await res.json(); }
            else { const text = await res.text(); if (text.toLowerCase().includes("sukses")) {} else { throw new Error(`Format respons server tidak valid.`); }}
        }

        if (typeof data === 'object' && data !== null && data.status === "sukses") {
            alert(`Pesanan berhasil!\nKode Pesanan: ${data.kodePesanan}`);
            if (promoCodeUsed && PROMO_CODES[promoCodeUsed]) {
                const promoDetails = PROMO_CODES[promoCodeUsed];
                if (promoDetails.usageLimit !== undefined) {
                    let used = parseInt(localStorage.getItem(`promo_used_count_${promoCodeUsed}`) || "0", 10);
                    localStorage.setItem(`promo_used_count_${promoCodeUsed}`, used + 1);
                }
                if (promoDetails.perUserLimit !== undefined && nama) {
                    const userPromoKey = `promo_user_${nama.toLowerCase()}_${promoCodeUsed}`;
                    let usedByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
                    localStorage.setItem(userPromoKey, usedByUser + 1);
                }
            }
            localStorage.removeItem("pimonjoki_cart");
            // localStorage.removeItem("appliedPimonjokiPromo");
            currentAppliedPromo = null; cart = [];
            renderCart(); // Tampilkan keranjang kosong sebelum reload
            setTimeout(() => location.reload(), 500); 
        } else {
            alert(`Gagal mengirim pesanan: ${data.message || data.error || "Format respons tidak diketahui"}`);
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert(`Backend belum siap atau terjadi kesalahan jaringan. Detail: ${err.message}`);
    } finally {
        if(checkoutButton) { checkoutButton.textContent = originalCheckoutButtonText; checkoutButton.disabled = false; }
    }
}

// --- Event Listener DOM Utama ---
document.addEventListener("DOMContentLoaded", () => {
    loadCartAndPromo(); // Muat keranjang dan status promo tersimpan (jika ada)
    renderCart();       // Render awal keranjang

    // --- Setup untuk UI Auth Header (jika ada dan Firebase diinisialisasi) ---
    // Blok ini bisa dipindahkan ke file terpisah yang di-import jika 'auth' diinisialisasi di sana.
    // Untuk sekarang, ini adalah contoh jika Anda ingin menyertakannya di sini dan 'auth' bisa diakses.
    /*
    if (typeof auth !== 'undefined' && auth) { // 'auth' harus diimpor atau diinisialisasi
        const loginLink = document.getElementById('loginLink');
        const userInfoDiv = document.getElementById('userInfo');
        const userDisplayNameSpan = document.getElementById('userDisplayName');
        const logoutBtn = document.getElementById('logoutBtn');

        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (loginLink) loginLink.style.display = 'none';
                if (userInfoDiv) userInfoDiv.style.display = 'flex';
                if (userDisplayNameSpan) userDisplayNameSpan.textContent = user.displayName || user.email;
                if (logoutBtn) {
                    const newLogoutBtn = logoutBtn.cloneNode(true);
                    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
                    newLogoutBtn.addEventListener('click', async () => {
                        try { await signOut(auth); window.location.href = 'login.html'; } 
                        catch (error) { console.error('Error logout:', error); }
                    });
                }
            } else {
                if (loginLink) loginLink.style.display = 'inline-block';
                if (userInfoDiv) userInfoDiv.style.display = 'none';
                if (userDisplayNameSpan) userDisplayNameSpan.textContent = '';
            }
        });
    } else {
        // Fallback UI jika auth tidak ada
        const loginLink = document.getElementById('loginLink');
        const userInfoDiv = document.getElementById('userInfo');
        if (loginLink) loginLink.style.display = 'inline-block';
        if (userInfoDiv) userInfoDiv.style.display = 'none';
    }
    */

    // --- Listener untuk tombol .add-to-cart generik ---
    // (Ini akan menangani tombol yang tidak punya onclick spesifik)
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
        if (!btn.onclick) { 
            btn.addEventListener("click", () => {
                const item = {
                    id: btn.dataset.id, name: btn.dataset.name,
                    price: btn.dataset.price, game: btn.dataset.game || "Genshin Impact",
                };
                if (item.id && item.name && item.price) { addToCart(item); }
                else { console.warn("Tombol .add-to-cart kurang data-*:", btn); }
            });
        }
    });

    // --- Listener untuk Enter pada Search Input ---
    const searchInputElement = document.getElementById("searchInput");
    if (searchInputElement) {
        searchInputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); handleSearch();
            }
        });
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query");
        if (query) {
            searchInputElement.value = query;
            // filterProductCardsOnPage(); // Jika ingin filter otomatis
        }
    }

}); // Akhir DOMContentLoaded


// === Jadikan Fungsi yang Dipanggil dari HTML Global (jika script ini type="module") ===
window.updateQty = updateQty;
window.removeItem = removeItem;
window.checkout = checkout; // checkout sekarang async
window.applyPromoCode = applyPromoCode; // applyPromoCode sekarang async
// Jika ada fungsi lain yang dipanggil dari onclick di HTML:
// window.handleSearch = handleSearch;
// window.addSelectedItemsToCart = addSelectedItemsToCart;
// window.orderNow = orderNow;
// window.filterProductCardsOnPage = filterProductCardsOnPage;

// Catatan: Jika Anda memindahkan definisi fungsi seperti handleSearch, addSelectedItemsToCart, orderNow
// ke dalam DOMContentLoaded, maka Anda tidak bisa menempelkannya ke window seperti ini.
// Biarkan definisi fungsi utama di luar DOMContentLoaded jika ingin diakses global.
// Untuk contoh ini, saya asumsikan definisi handleSearch, addSelectedItemsToCart, orderNow ada di luar DOMContentLoaded.
// Karena kode Anda menempatkan banyak fungsi di luar, saya akan menempatkan window. assignments di bawahnya.
if (typeof handleSearch === 'function') window.handleSearch = handleSearch;
if (typeof addSelectedItemsToCart === 'function') window.addSelectedItemsToCart = addSelectedItemsToCart;
if (typeof orderNow === 'function') window.orderNow = orderNow;
if (typeof filterProductCardsOnPage === 'function') window.filterProductCardsOnPage = filterProductCardsOnPage;