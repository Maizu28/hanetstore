// keranjang.js

// === VARIABEL GLOBAL ===
let cart = [];
let currentAppliedPromo = null; // Menyimpan detail promo yang SEDANG diterapkan atau akan diterapkan

// === KONFIGURASI PROMO & ENDPOINT ===
const PROMO_CODES = {
    "HEMAT10": { type: "percentage", value: 10, description: "Diskon 10%", minPurchase: 50000 },
    "PIMONJOKIYES": { type: "percentage", value: 15, description: "Diskon Spesial 15%", minPurchase: 100000 },
    "DISKON5K": { type: "fixed", value: 5000, description: "Potongan Rp 5.000", minPurchase: 25000 },
    "WELCOMENEW": {type: "fixed", value: 20000, description: "Potongan Rp 20.000", minPurchase: 75000 },
    "10TERCEPAT": { type: "fixed", value: 10000, description: "Potongan Rp 10.000 (10 tercepat)", minPurchase: 50000, usageLimit: 10 },
    "20TERCEPAT": { type: "fixed", value: 8000, description: "Potongan Rp 8.000 (20 tercepat)", minPurchase: 40000, usageLimit: 20 },
    "50TERCEPAT": { type: "fixed", value: 5000, description: "Potongan Rp 5.000 (50 tercepat)", minPurchase: 25000, usageLimit: 50 },
    "FLASHSALE": { type: "percentage", value: 20, description: "Flash Sale 20%", minPurchase: 30000, validFrom: "2024-07-01T00:00:00+07:00", validUntil: "2024-07-02T23:59:59+07:00" },
    "HARIJADI": { type: "fixed", value: 10000, description: "Diskon Ulang Tahun", minPurchase: 50000, validFrom: "2024-07-10T00:00:00+07:00", validUntil: "2024-07-15T23:59:59+07:00" },
    "LIMIT1USER": { type: "percentage", value: 25, description: "Diskon 25% (1x per user)", minPurchase: 60000, validFrom: "2024-07-03T00:00:00+07:00", validUntil: "2024-07-05T23:59:59+07:00", perUserLimit: 1 },
    "LIMIT3USER": { type: "fixed", value: 12000, description: "Diskon Rp 12.000 (3x per user)", minPurchase: 70000, validFrom: "2024-07-06T00:00:00+07:00", validUntil: "2024-07-10T23:59:59+07:00", perUserLimit: 3 }
};
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxrrPdTGbpfvpYG_QMqzBdN6nmUKJuPrMFglMAn4GcJSo66z0P5hSucRrPKlX7gO5sDhg/exec";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1379468686347341894/qOP1Jpep2bpDg1zXxZo3gbkgooCEq24TOGNEoKHdVvBhaQfnrn1ZztFejjEQ3dKJwp8S"; // Ganti dengan URL Webhook Discord Anda yang sebenarnya

// === HELPER PROMO ===
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
}

function isPromoDateValid(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    // Jika promo tidak memiliki validFrom dan validUntil, anggap selalu valid dari segi tanggal
    if (promo.validFrom && promo.validUntil) {
        const now = new Date();
        const from = new Date(promo.validFrom);
        const until = new Date(promo.validUntil);
        return now >= from && now <= until;
    }
    return true; // Selalu valid jika tidak ada batasan tanggal
}

function isPromoAvailable(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.usageLimit !== undefined) {
        const usedCount = parseInt(localStorage.getItem(`promo_used_count_${code}`) || "0", 10);
        return usedCount < promo.usageLimit;
    }
    return true; // Selalu tersedia jika tidak ada batasan penggunaan global
}

function isPromoPerUserAvailable(code, userName) {
    const promo = PROMO_CODES[code];
    if (!promo || promo.perUserLimit === undefined || !userName) return true; // Selalu tersedia jika tidak ada batasan per user atau nama tidak diberikan
    const normalizedUserName = userName.trim().toLowerCase();
    const userPromoKey = `promo_user_${normalizedUserName}_${code}`;
    const usedCountByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
    return usedCountByUser < promo.perUserLimit;
}

// === KERANJANG (localStorage) ===
function getCart() {
    let cartData = [];
    try {
        const cartString = localStorage.getItem("pimonjoki_cart");
        if (cartString) {
            cartData = JSON.parse(cartString);
            if (!Array.isArray(cartData)) { // Pastikan hasilnya array
                console.warn("Data keranjang di localStorage bukan array, direset menjadi array kosong.");
                cartData = [];
            }
        }
    } catch (error) {
        console.error("Error parsing keranjang dari localStorage:", error);
        cartData = []; // Reset ke array kosong jika ada error parsing
    }
    return cartData;
}

function saveCart(_cart) {
    try {
        localStorage.setItem("pimonjoki_cart", JSON.stringify(_cart));
    } catch (error) {
        console.error("Error menyimpan keranjang ke localStorage:", error);
        // Pertimbangkan untuk memberi tahu pengguna jika penyimpanan gagal, tergantung kebutuhan
    }
}

function loadCartAndPromo() {
    cart = getCart(); // Menggunakan getCart yang sudah menghandle error parsing
    // Opsi: Memuat currentAppliedPromo dari localStorage jika ingin persisten antar sesi/refresh
    // const savedPromoString = localStorage.getItem("appliedPimonjokiPromo");
    // if (savedPromoString) {
    //     try {
    //         const savedPromo = JSON.parse(savedPromoString);
    //         // Lakukan validasi tambahan di sini jika perlu, misalnya apakah promo masih ada di PROMO_CODES
    //         if (savedPromo && PROMO_CODES[savedPromo.code]) {
    //            currentAppliedPromo = savedPromo;
    //         } else {
    //            localStorage.removeItem("appliedPimonjokiPromo"); // Hapus jika tidak valid
    //         }
    //     } catch (e) {
    //         console.error("Gagal parse promo tersimpan:", e);
    //         localStorage.removeItem("appliedPimonjokiPromo");
    //     }
    // }
}

// === INTERAKSI KERANJANG ===
function addToCart(item, quantityToAdd = 1) {
    let currentCart = getCart();
    const numQuantityToAdd = parseInt(quantityToAdd, 10);

    if (isNaN(numQuantityToAdd) || numQuantityToAdd < 1) {
        console.warn(`Kuantitas tidak valid untuk item ${item.name}, diatur ke 1.`);
        numQuantityToAdd = 1;
    }

    const existingItemIndex = currentCart.findIndex((i) => i.id === item.id);

    if (existingItemIndex > -1) {
        currentCart[existingItemIndex].qty += numQuantityToAdd;
    } else {
        currentCart.push({ ...item, qty: numQuantityToAdd });
    }
    saveCart(currentCart);
    cart = currentCart; // Update variabel global cart
    alert(`"${item.name}" (x${numQuantityToAdd}) berhasil ditambahkan ke keranjang.`);
    if (typeof renderCart === "function" && document.getElementById("cart-content")) {
        renderCart();
    }
}

function addSelectedItemsToCart(buttonElement) {
    const packageCard = buttonElement.closest('.package-card');
    if (!packageCard) {
        alert("Kesalahan: Kartu paket tidak ditemukan.");
        return;
    }
    const basePackageNameElement = packageCard.querySelector('h2');
    const basePackageName = basePackageNameElement ? basePackageNameElement.textContent.trim() : "Paket Pilihan";

    const selectedCheckboxes = packageCard.querySelectorAll('ul.selectable-item-list input.selectable-sub-item:checked, ul.quest-list input[type="checkbox"]:checked');
    if (selectedCheckboxes.length === 0) {
        alert(`Silakan pilih minimal satu item dari ${basePackageName}.`);
        return;
    }

    const qtyInput = packageCard.querySelector('.item-bundle-qty');
    let desiredQty = 1;
    if (qtyInput) {
        desiredQty = parseInt(qtyInput.value, 10);
        if (isNaN(desiredQty) || desiredQty < 1) {
            desiredQty = 1;
            qtyInput.value = 1; // Koreksi input pengguna jika tidak valid
        }
    }

    const selectedItemValues = [];
    const selectedItemUniqueIds = [];
    let totalPricePerBundle = 0;
    let priceCalculationMode = "individual"; // default

    const pricePerActDiv = packageCard.querySelector('div[data-price-per-act]');
    if (pricePerActDiv && pricePerActDiv.dataset.pricePerAct) {
        const pricePerActFromCard = parseInt(pricePerActDiv.dataset.pricePerAct, 10);
        if (!isNaN(pricePerActFromCard) && pricePerActFromCard > 0) {
            priceCalculationMode = "perAct";
            totalPricePerBundle = selectedCheckboxes.length * pricePerActFromCard;
        }
    }

    if (priceCalculationMode === "perAct") {
        selectedCheckboxes.forEach(checkbox => {
            selectedItemValues.push(checkbox.value);
            // Gunakan ID yang lebih konsisten jika ada, atau fallback ke value
            selectedItemUniqueIds.push(checkbox.dataset.questId || checkbox.dataset.id || checkbox.value.toLowerCase().replace(/\s+/g, '-'));
        });
    } else { // priceCalculationMode === "individual"
        selectedCheckboxes.forEach(checkbox => {
            const itemPriceText = checkbox.dataset.price; // Harga mungkin masih dalam format "Rp xxx" atau angka saja
            if (itemPriceText === undefined) {
                 console.warn(`Item "${checkbox.value}" tidak memiliki atribut data-price.`);
                 return; // Lewati item ini
            }
            const itemPrice = parseInt(String(itemPriceText).replace(/\D/g, ""), 10); // Bersihkan dari non-digit

            if (!isNaN(itemPrice) && itemPrice >= 0) {
                totalPricePerBundle += itemPrice;
                selectedItemValues.push(checkbox.value);
                selectedItemUniqueIds.push(checkbox.dataset.questId || checkbox.dataset.id || checkbox.value.toLowerCase().replace(/\s+/g, '-'));
            } else {
                console.warn(`Item "${checkbox.value}" tidak memiliki harga (data-price) yang valid atau harganya nol.`);
            }
        });
        if (selectedItemValues.length === 0 && selectedCheckboxes.length > 0) {
            alert("Item yang dipilih tidak memiliki harga yang valid atau semua harga nol.");
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
    // Harga yang disimpan di keranjang haruslah harga numerik per bundle, bukan string berformat
    // formattedTotalPrice hanya untuk tampilan jika diperlukan, tapi untuk data, simpan angka
    const gameName = packageCard.dataset.game || "Genshin Impact"; // Default game
    const newItemData = {
        id: itemId,
        name: itemName,
        price: totalPricePerBundle, // Simpan sebagai angka
        game: gameName
    };
    addToCart(newItemData, desiredQty);
}


function updateQty(id, delta) {
    let currentCart = getCart();
    const itemIndex = currentCart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        currentCart[itemIndex].qty += delta;
        if (currentCart[itemIndex].qty < 1) {
            currentCart[itemIndex].qty = 1; // Kuantitas minimal 1
        }
        saveCart(currentCart);
        cart = currentCart;
        if (typeof renderCart === "function") renderCart();
    }
}

function removeItem(id) {
    let currentCart = getCart();
    const initialLength = currentCart.length;
    currentCart = currentCart.filter(i => i.id !== id);
    if (currentCart.length < initialLength) {
        saveCart(currentCart);
        cart = currentCart;
        if (currentAppliedPromo && currentCart.length === 0) {
            // Jika keranjang jadi kosong, pertimbangkan untuk mereset promo atau memvalidasi ulang
            // currentAppliedPromo = null; // Opsi: hapus promo jika keranjang kosong
            // localStorage.removeItem("appliedPimonjokiPromo"); // Jika promo disimpan di localStorage
        }
        if (typeof renderCart === "function") renderCart();
    }
}

// === PROMO (applyPromoCode, renderCart) ===
async function applyPromoCode() {
    const promoInput = document.getElementById('promo-code-input');
    const promoStatusDiv = document.getElementById('promo-status');
    if (!promoInput || !promoStatusDiv) {
        console.error("Elemen input promo atau status tidak ditemukan.");
        return;
    }

    const promoCodeEntered = promoInput.value.trim().toUpperCase();
    let currentSubtotal = 0;
    getCart().forEach(item => {
        const price = typeof item.price === 'string' ? parseInt(item.price.replace(/\D/g, ""), 10) : item.price;
        currentSubtotal += (price || 0) * item.qty;
    });

    currentAppliedPromo = null; // Reset promo saat ini sebelum validasi baru
    // localStorage.removeItem("appliedPimonjokiPromo"); // Jika promo disimpan di localStorage

    promoStatusDiv.textContent = ""; // Bersihkan status sebelumnya

    if (promoCodeEntered === "") {
        // Jika input kosong, pengguna mungkin ingin menghapus promo yang ada
        // (currentAppliedPromo sudah di-null-kan di atas)
        promoStatusDiv.textContent = "Kode promo dihapus (jika ada yang diterapkan).";
        promoStatusDiv.style.color = "orange";
    } else if (PROMO_CODES[promoCodeEntered]) {
        const promoDetails = PROMO_CODES[promoCodeEntered];

        // Hapus pemeriksaan promoDetails.isActive karena tidak ada di definisi PROMO_CODES
        // if (promoDetails.isActive === false) {
        //     promoStatusDiv.textContent = "Kode promo sudah tidak aktif.";
        //     promoStatusDiv.style.color = "red";
        // } else
        if (!isPromoDateValid(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah kedaluwarsa atau belum berlaku.";
            promoStatusDiv.style.color = "red";
        } else if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah mencapai batas penggunaan global.";
            promoStatusDiv.style.color = "red";
        } else if (currentSubtotal < promoDetails.minPurchase) {
            promoStatusDiv.textContent = `Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeEntered}".`;
            promoStatusDiv.style.color = "red";
        } else if (promoDetails.perUserLimit !== undefined) {
            // Untuk validasi perUserLimit, nama diperlukan.
            // Bisa minta di sini, atau idealnya, nama sudah ada dari input form lain.
            // Untuk sementara, gunakan prompt, tapi ini bisa ditingkatkan.
            const customerNameInput = document.getElementById('customer-name-checkout'); // Asumsi ada input nama
            let customerName = customerNameInput ? customerNameInput.value.trim() : '';

            if (!customerName) {
                 customerName = prompt("Masukkan NAMA Anda untuk validasi promo ini (akan digunakan saat checkout):");
            }

            if (customerName && customerName.trim() !== "") {
                const normalizedName = customerName.trim().toLowerCase();
                if (isPromoPerUserAvailable(promoCodeEntered, normalizedName)) {
                    currentAppliedPromo = { ...promoDetails, code: promoCodeEntered, customerNameForValidation: normalizedName };
                    // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo)); // Jika ingin persisten
                    promoStatusDiv.textContent = `Kode promo "${promoCodeEntered}" siap diterapkan.`;
                    promoStatusDiv.style.color = "green";
                } else {
                    promoStatusDiv.textContent = `Anda sudah menggunakan kode promo "${promoCodeEntered}" secara maksimal.`;
                    promoStatusDiv.style.color = "red";
                }
            } else {
                promoStatusDiv.textContent = "Nama diperlukan untuk validasi promo ini. Klik 'Gunakan' lagi setelah mengisi nama.";
                promoStatusDiv.style.color = "orange";
                // Reset promo jika nama tidak dimasukkan
                currentAppliedPromo = null;
                // localStorage.removeItem("appliedPimonjokiPromo");
            }
        } else {
            // Promo valid dan tidak memerlukan validasi nama pengguna khusus di tahap ini
            currentAppliedPromo = { ...promoDetails, code: promoCodeEntered };
            // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo)); // Jika ingin persisten
            promoStatusDiv.textContent = `Kode promo "${promoCodeEntered}" siap diterapkan.`;
            promoStatusDiv.style.color = "green";
        }
    } else {
        promoStatusDiv.textContent = "Kode promo tidak valid.";
        promoStatusDiv.style.color = "red";
    }

    // Selalu render ulang keranjang untuk update tampilan diskon dan total
    if (typeof renderCart === "function") renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-content");
    if (!container) {
        console.error("Container keranjang #cart-content tidak ditemukan.");
        return;
    }

    // Bagian Promo selalu ditampilkan, baik keranjang isi maupun kosong
    const promoSectionHTML = `
      <div class="promo-section">
        <h4>Kode Promo</h4>
        <div style="display: flex; gap: 5px; align-items: stretch;">
          <input type="text" id="promo-code-input" placeholder="Masukkan kode promo" value="${currentAppliedPromo ? currentAppliedPromo.code : ''}">
          <button id="apply-promo-btn">${currentAppliedPromo ? 'Ganti/Hapus' : 'Gunakan'}</button>
        </div>
        <div id="promo-status" style="font-size: 0.9em; margin-top: 8px; min-height: 1.2em;"></div>
      </div>`;

    const currentDisplayCart = getCart();
    let cartHtml = "";

    if (currentDisplayCart.length === 0) {
        cartHtml = `<div class="empty-cart">Keranjang Anda kosong.</div>` + promoSectionHTML;
        container.innerHTML = cartHtml;

        // Setelah innerHTML diubah, elemen promo-status perlu diambil lagi
        const promoStatusDivOnEmpty = document.getElementById('promo-status');
        const promoInputOnEmpty = document.getElementById('promo-code-input'); // Untuk Enter key

        if (promoInputOnEmpty && currentAppliedPromo) promoInputOnEmpty.value = currentAppliedPromo.code; // jaga input value

        if (promoStatusDivOnEmpty) {
            if (currentAppliedPromo) {
                // Logika ini mungkin lebih baik disatukan dengan logika di bawah (setelah kalkulasi subtotal)
                // tapi untuk kasus keranjang kosong, subtotal selalu 0.
                if (0 >= currentAppliedPromo.minPurchase && isPromoDateValid(currentAppliedPromo.code) && isPromoAvailable(currentAppliedPromo.code) && (currentAppliedPromo.perUserLimit === undefined || isPromoPerUserAvailable(currentAppliedPromo.code, currentAppliedPromo.customerNameForValidation))) {
                    promoStatusDivOnEmpty.textContent = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan (minimal belanja terpenuhi karena keranjang kosong atau min belanja 0).`;
                    promoStatusDivOnEmpty.style.color = "green";
                } else if (!isPromoDateValid(currentAppliedPromo.code)){
                    promoStatusDivOnEmpty.textContent = `Promo "${currentAppliedPromo.code}" sudah kedaluwarsa/belum berlaku.`;
                    promoStatusDivOnEmpty.style.color = "red";
                } else if (currentAppliedPromo.minPurchase > 0) {
                    promoStatusDivOnEmpty.textContent = `Promo "${currentAppliedPromo.code}" aktif. Minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)}.`;
                    promoStatusDivOnEmpty.style.color = "orange";
                }
            } else if (promoStatusDivOnEmpty.textContent === "" && (!promoStatusDivOnEmpty.dataset || !promoStatusDivOnEmpty.dataset.transientMessage)) {
                // promoStatusDivOnEmpty.textContent = 'Masukkan kode promo jika ada.'; // Pesan default jika perlu
            }
        }
    } else {
        let subtotalAmount = 0;
        let itemsHtml = "";
        currentDisplayCart.forEach((item) => {
            const price = typeof item.price === 'string' ? parseInt(item.price.replace(/\D/g, ""), 10) : item.price;
            if (isNaN(price)) {
                console.error(`Item ${item.name} memiliki harga yang tidak valid: ${item.price}`);
                // Berikan penanganan, misal skip item ini atau beri harga 0
                item.price = 0; // atau item.priceNumerik = 0;
            }
            const itemSubtotal = item.qty * price;
            subtotalAmount += itemSubtotal;
            itemsHtml += `
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
              </div>`;
        });

        cartHtml += itemsHtml;
        cartHtml += promoSectionHTML; // Tambahkan bagian promo setelah item

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
            let isAvailablePerUser = true;
            if (currentAppliedPromo.perUserLimit !== undefined) {
                // Pastikan customerNameForValidation ada di currentAppliedPromo
                if (currentAppliedPromo.customerNameForValidation) {
                    isAvailablePerUser = isPromoPerUserAvailable(currentAppliedPromo.code, currentAppliedPromo.customerNameForValidation);
                } else {
                    // Jika nama belum divalidasi/disimpan, promo ini belum bisa dianggap valid untuk user
                    isAvailablePerUser = false;
                    promoStatusTextForRender = `Nama pelanggan diperlukan untuk promo "${currentAppliedPromo.code}". Silakan masukkan nama dan klik 'Gunakan' pada kode promo.`;
                    promoStatusColorForRender = "orange";
                }
            }

            if (isValidDate && isAvailableGlobal && isAvailablePerUser && meetsMinPurchase) {
                if (currentAppliedPromo.type === "percentage") {
                    discountAmount = subtotalAmount * (currentAppliedPromo.value / 100);
                } else if (currentAppliedPromo.type === "fixed") {
                    discountAmount = currentAppliedPromo.value;
                }
                discountAmount = Math.floor(discountAmount);
                discountAmount = Math.min(discountAmount, subtotalAmount); // Diskon tidak boleh lebih besar dari subtotal
                finalTotal = subtotalAmount - discountAmount;

                discountDisplayHtml = `<div class="discount-display">Diskon (${currentAppliedPromo.description || currentAppliedPromo.code}): -${formatRupiah(discountAmount)}</div>`;
                promoStatusTextForRender = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description || ''}) diterapkan.`;
                promoStatusColorForRender = "green";
                isPromoCurrentlyValidAndApplicable = true;
            } else {
                // Promo ada tapi tidak memenuhi syarat
                discountAmount = 0;
                finalTotal = subtotalAmount;
                discountDisplayHtml = "";
                // Hapus promo jika sudah tidak valid lagi agar tidak membingungkan pengguna saat checkout
                // Kecuali jika hanya masalah minPurchase yang bisa diperbaiki dengan menambah item
                if (!isValidDate) {
                    promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah kedaluwarsa atau belum berlaku.`;
                    // currentAppliedPromo = null; // Opsi: hapus promo jika sudah tidak valid
                } else if (!isAvailableGlobal) {
                    promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah habis digunakan (global).`;
                    // currentAppliedPromo = null;
                } else if (!isAvailablePerUser && currentAppliedPromo.perUserLimit !== undefined) {
                     if (currentAppliedPromo.customerNameForValidation) {
                        promoStatusTextForRender = `Anda sudah menggunakan promo "${currentAppliedPromo.code}" secara maksimal.`;
                     } // Pesan untuk 'nama belum ada' sudah dihandle di atas
                    // currentAppliedPromo = null;
                } else if (!meetsMinPurchase) {
                    promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" aktif, tapi minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)} belum terpenuhi. Subtotal Anda ${formatRupiah(subtotalAmount)}.`;
                }
                promoStatusColorForRender = (isValidDate && isAvailableGlobal && isAvailablePerUser) ? "orange" : "red";
                // Jika promo menjadi tidak valid sama sekali (bukan hanya minPurchase), pertimbangkan untuk meresetnya
                if (!isValidDate || !isAvailableGlobal || (!isAvailablePerUser && currentAppliedPromo.customerNameForValidation)) {
                    // currentAppliedPromo = null; // Reset promo
                    // localStorage.removeItem("appliedPimonjokiPromo");
                    // Jika direset, input promo code juga harus dikosongkan
                    // document.getElementById('promo-code-input').value = '';
                }
            }
        }

        cartHtml += `
          <div class="total-section">
            <div>Subtotal: ${formatRupiah(subtotalAmount)}</div>
            ${discountDisplayHtml}
            <div class="final-total-amount">Total Akhir: ${formatRupiah(finalTotal)}</div>
          </div>
          <button class="checkout-btn" onclick="checkout(${finalTotal}, ${subtotalAmount}, ${discountAmount}, 
            ${isPromoCurrentlyValidAndApplicable && currentAppliedPromo ? `'${currentAppliedPromo.code}'` : null}, 
            ${isPromoCurrentlyValidAndApplicable && currentAppliedPromo && currentAppliedPromo.customerNameForValidation ? `'${currentAppliedPromo.customerNameForValidation}'` : null}
          )">Checkout</button>`;
        container.innerHTML = cartHtml;

        // Setelah innerHTML, ambil lagi elemen promo status dan input
        const promoStatusDivRendered = document.getElementById('promo-status');
        const promoInputRendered = document.getElementById('promo-code-input');

        if (promoInputRendered && currentAppliedPromo) promoInputRendered.value = currentAppliedPromo.code;

        if (promoStatusDivRendered) {
            if (promoStatusTextForRender) {
                promoStatusDivRendered.textContent = promoStatusTextForRender;
                promoStatusDivRendered.style.color = promoStatusColorForRender;
            } else if (promoStatusDivRendered.dataset && promoStatusDivRendered.dataset.transientMessage) {
                // Handle pesan transient dari operasi sebelumnya jika ada
                promoStatusDivRendered.textContent = promoStatusDivRendered.dataset.transientMessage;
                promoStatusDivRendered.style.color = promoStatusDivRendered.dataset.transientColor || "red";
                delete promoStatusDivRendered.dataset.transientMessage;
                delete promoStatusDivRendered.dataset.transientColor;
            } else if (promoStatusDivRendered.textContent === "" && !currentAppliedPromo) {
                // promoStatusDivRendered.textContent = 'Masukkan kode promo jika ada.';
            }
        }
    }

    // Event listener untuk tombol promo dan input (harus dipasang setelah render)
    const applyBtn = document.getElementById('apply-promo-btn');
    const promoInputForEnter = document.getElementById('promo-code-input');

    if (applyBtn) {
        applyBtn.addEventListener('click', applyPromoCode);
    }
    if (promoInputForEnter && applyBtn) {
        promoInputForEnter.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                applyBtn.click();
            }
        });
    }
}


// === NOTIFIKASI DISCORD ===
async function sendOrderToDiscordWebhook(orderDetails) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === "https://discord.com/api/webhooks/YOUR_PLACEHOLDER_URL") { // Sesuaikan dengan URL placeholder Anda jika ada
        console.warn("URL Webhook Discord belum dikonfigurasi atau menggunakan placeholder. Notifikasi tidak dikirim.");
        return { success: false, message: "Konfigurasi webhook Discord tidak valid atau belum diatur." };
    }
    const embed = {
        title: `🔔 Pesanan Baru Diterima! (Kode: ${orderDetails.kodePesanan})`,
        color: 0x00AAFF, // Biru
        fields: [
            { name: "Nama Pemesan", value: orderDetails.nama, inline: true },
            { name: "Game", value: orderDetails.game, inline: true },
            { name: "Subtotal Asli", value: formatRupiah(orderDetails.subtotalAsli), inline: true },
            { name: "Promo Digunakan", value: orderDetails.promoDigunakan || "-", inline: true },
            { name: "Jumlah Diskon", value: formatRupiah(orderDetails.jumlahDiskon || 0), inline: true },
            { name: "Total Bayar", value: `**${formatRupiah(orderDetails.totalBayar)}**`, inline: true },
            { name: "Detail Item Dipesan", value: "```\n" + orderDetails.jenis + "\n```" } // ``` untuk blok kode
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Pimonjoki.id Order System" }
    };
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] }),
        });
        if (response.ok) {
            console.log("Notifikasi pesanan berhasil dikirim ke Discord.");
            return { success: true, message: "Notifikasi Discord terkirim." };
        } else {
            const errorData = await response.text(); // Dapatkan teks error untuk debugging
            console.error("Gagal mengirim notifikasi ke Discord:", response.status, errorData);
            return { success: false, message: `Gagal kirim notifikasi Discord: ${response.status} - ${errorData.substring(0, 100)}` }; // Batasi panjang pesan error
        }
    } catch (error) {
        console.error("Error saat mengirim ke webhook Discord:", error);
        return { success: false, message: `Error koneksi ke Discord: ${error.message}` };
    }
}

// === CHECKOUT ===
async function checkout(finalAmount, originalSubtotal, discountValue, promoCodeUsed, customerNameForValidation) {
    let nama = customerNameForValidation; // Nama dari validasi promo, jika ada

    // Coba dapatkan nama dari input field jika ada, sebagai prioritas jika belum ada dari promo
    const customerNameInput = document.getElementById('customer-name-checkout'); // Ganti 'customer-name-checkout' dengan ID input nama Anda
    if (customerNameInput && customerNameInput.value.trim() !== "") {
        nama = customerNameInput.value.trim();
    }

    if (!nama) {
        nama = prompt("Masukkan NAMA LENGKAP Anda untuk pesanan:");
        if (!nama || nama.trim() === "") { // Periksa apakah nama kosong atau hanya spasi
            alert("Nama wajib diisi untuk melanjutkan pesanan.");
            return;
        }
    } else {
        const confirmName = confirm(`Lanjutkan pesanan sebagai "${nama}"?`);
        if (!confirmName) {
            const newName = prompt("Masukkan nama Anda untuk pesanan:");
            if (!newName || newName.trim() === "") {
                alert("Nama wajib diisi untuk melanjutkan pesanan.");
                return;
            }
            nama = newName;
        }
    }
    nama = nama.trim(); // Pastikan nama di-trim
    const normalizedNameForPromo = nama.toLowerCase(); // Untuk konsistensi validasi promo

    // Validasi ulang promo sebelum mengirim (sangat penting)
    let actualDiscountValue = 0;
    let actualFinalAmount = originalSubtotal;
    let actualPromoCodeUsed = null;

    if (promoCodeUsed && PROMO_CODES[promoCodeUsed] && currentAppliedPromo && currentAppliedPromo.code === promoCodeUsed) {
        const promoDetails = PROMO_CODES[promoCodeUsed];
        let subtotalForValidation = 0;
        const currentCartForValidation = getCart();
        currentCartForValidation.forEach(item => {
            const price = typeof item.price === 'string' ? parseInt(item.price.replace(/\D/g, ""), 10) : item.price;
            subtotalForValidation += (price || 0) * item.qty;
        });

        let isStillValid = true;
        let alertMessagePromoInvalid = "";

        if (!isPromoDateValid(promoCodeUsed)) {
            alertMessagePromoInvalid = `Kode promo "${promoCodeUsed}" sudah kedaluwarsa/belum berlaku.`;
            isStillValid = false;
        } else if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeUsed)) {
            alertMessagePromoInvalid = `Kode promo "${promoCodeUsed}" sudah habis (global).`;
            isStillValid = false;
        } else if (subtotalForValidation < promoDetails.minPurchase) {
            alertMessagePromoInvalid = `Minimal belanja untuk kode promo "${promoCodeUsed}" (${formatRupiah(promoDetails.minPurchase)}) tidak lagi terpenuhi. Subtotal saat ini ${formatRupiah(subtotalForValidation)}.`;
            isStillValid = false;
        } else if (promoDetails.perUserLimit !== undefined) {
            // Gunakan nama yang baru dikonfirmasi/dimasukkan untuk validasi ulang
            if (!isPromoPerUserAvailable(promoCodeUsed, normalizedNameForPromo)) {
                alertMessagePromoInvalid = `Promo "${promoCodeUsed}" tidak bisa digunakan atau sudah maksimal untuk Anda ("${nama}").`;
                isStillValid = false;
            } else if (customerNameForValidation && normalizedNameForPromo !== customerNameForValidation.toLowerCase()){
                // Jika nama yang digunakan untuk checkout berbeda dengan nama saat apply promo, validasi ulang dengan nama baru
                if (!isPromoPerUserAvailable(promoCodeUsed, normalizedNameForPromo)) {
                     alertMessagePromoInvalid = `Promo "${promoCodeUsed}" tidak bisa digunakan dengan nama "${nama}" atau sudah maksimal.`;
                     isStillValid = false;
                } else {
                    // Jika valid dengan nama baru, update customerNameForValidation di currentAppliedPromo
                    currentAppliedPromo.customerNameForValidation = normalizedNameForPromo;
                }
            }
        }


        if (isStillValid) {
            if (promoDetails.type === "percentage") {
                actualDiscountValue = subtotalForValidation * (promoDetails.value / 100);
            } else if (promoDetails.type === "fixed") {
                actualDiscountValue = promoDetails.value;
            }
            actualDiscountValue = Math.floor(actualDiscountValue);
            actualDiscountValue = Math.min(actualDiscountValue, subtotalForValidation);
            actualFinalAmount = subtotalForValidation - actualDiscountValue;
            actualPromoCodeUsed = promoCodeUsed;
        } else {
            alert(`${alertMessagePromoInvalid} Diskon dibatalkan. Pesanan akan diproses tanpa diskon.`);
            currentAppliedPromo = null; // Hapus promo yang tidak valid
            // localStorage.removeItem("appliedPimonjokiPromo");
            // Update nilai yang akan dikirim dan ditampilkan
            discountValue = 0;
            finalAmount = originalSubtotal;
            promoCodeUsed = null; // untuk data yang dikirim
            if (typeof renderCart === "function") renderCart(); // Render ulang untuk menunjukkan promo dihapus
            // Tidak return, biarkan pengguna melanjutkan tanpa promo jika mau, atau mereka bisa cancel.
            // Jika ingin memaksa kembali, uncomment return di bawah
            // return;
        }
    } else if (promoCodeUsed) { // Jika promoCodeUsed ada tapi tidak lagi valid atau tidak cocok dengan currentAppliedPromo
        alert(`Kode promo "${promoCodeUsed}" tidak lagi valid atau ada perubahan. Pesanan akan diproses tanpa diskon.`);
        currentAppliedPromo = null;
        // localStorage.removeItem("appliedPimonjokiPromo");
        discountValue = 0;
        finalAmount = originalSubtotal;
        promoCodeUsed = null;
        if (typeof renderCart === "function") renderCart();
    }
    // Gunakan nilai yang sudah divalidasi ulang
    const finalAmountToSend = actualPromoCodeUsed ? actualFinalAmount : originalSubtotal;
    const discountValueToSend = actualPromoCodeUsed ? actualDiscountValue : 0;


    let jenisPesananString = "";
    const cartForCheckout = getCart();
    if (cartForCheckout.length === 0) {
        alert("Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.");
        return;
    }

    cartForCheckout.forEach(item => {
        const bundleMatch = item.name.match(/^(.*?)\s\((.*?)\)$/);
        if (bundleMatch && bundleMatch[1] && bundleMatch[2]) {
            const baseName = bundleMatch[1];
            const subItemsString = bundleMatch[2];
            jenisPesananString += `- ${baseName} (Qty: ${item.qty})\n`; // Tambahkan kuantitas item bundle
            const subItemsArray = subItemsString.split(', ');
            subItemsArray.forEach(subItem => {
                jenisPesananString += `  - ${subItem.trim()}\n`;
            });
        } else {
            jenisPesananString += `- ${item.name} (Qty: ${item.qty})\n`; // Tambahkan kuantitas item biasa
        }
    });
    jenisPesananString = jenisPesananString.trimEnd();

    const uniqueGames = [...new Set(cartForCheckout.map(item => item.game).filter(g => g && g !== '-'))];
    const game = uniqueGames.length > 0 ? uniqueGames.join(", ") : "Genshin Impact"; // Default jika tidak ada game spesifik
    const kodePesananCustom = "PIMON-" + new Date().getFullYear() +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        ("0" + new Date().getDate()).slice(-2) + "-" +
        Math.floor(1000 + Math.random() * 9000);

    let dataToSendToAppsScript = {
        nama: nama,
        jenis: jenisPesananString,
        game: game,
        totalBayar: finalAmountToSend,
        subtotalAsli: originalSubtotal, // originalSubtotal dari parameter fungsi, yang merupakan subtotal sebelum diskon checkout ini
        promoDigunakan: actualPromoCodeUsed || "-",
        jumlahDiskon: discountValueToSend || 0,
        kodePesanan: kodePesananCustom
    };

    const checkoutButton = document.querySelector('.checkout-btn');
    const originalCheckoutButtonText = checkoutButton ? checkoutButton.textContent : "Checkout";
    if (checkoutButton) {
        checkoutButton.textContent = "Memproses...";
        checkoutButton.disabled = true;
    }

    // Kirim ke Discord dulu atau paralel
    const discordNotificationResult = await sendOrderToDiscordWebhook({
        nama: nama,
        game: game,
        jenis: jenisPesananString,
        subtotalAsli: originalSubtotal,
        promoDigunakan: actualPromoCodeUsed || "-",
        jumlahDiskon: discountValueToSend || 0,
        totalBayar: finalAmountToSend,
        kodePesanan: kodePesananCustom
    });

    if (!discordNotificationResult.success) {
        console.warn("Gagal mengirim notifikasi Discord, tapi pesanan tetap diproses ke Spreadsheet:", discordNotificationResult.message);
        // Anda bisa memberi tahu pengguna bahwa notifikasi Discord mungkin gagal
        // alert("Notifikasi ke admin via Discord mungkin gagal, tapi pesanan Anda tetap diproses.");
    }

    // Lanjutkan mengirim ke Google Apps Script
    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Jika Apps Script tidak di-deploy untuk mengizinkan CORS dari domain Anda
            headers: { "Content-Type": "application/json" }, // Kirim sebagai JSON jika Apps Script Anda mengharapkannya
            body: JSON.stringify(dataToSendToAppsScript)
            // Jika Apps Script Anda mengharapkan text/plain:
            // headers: { "Content-Type": "text/plain;charset=utf-8" },
            // body: JSON.stringify(dataToSendToAppsScript) // GAS akan menerima string JSON
        });

        // Dengan mode: "no-cors", kita tidak bisa memeriksa res.ok atau membaca respons secara detail.
        // Kita asumsikan berhasil jika tidak ada error network.
        // Jika Anda BISA mengkonfigurasi CORS di Apps Script, hapus mode: "no-cors"
        // dan gunakan logika parsing respons yang lebih detail.

        // Logika di bawah ini berlaku jika BUKAN "no-cors" atau jika Anda ingin mencoba parsing (mungkin gagal di "no-cors")
        let dataAppsScript = { status: "sukses", kodePesanan: kodePesananCustom, message: "Pesanan diterima (asumsi sukses karena no-cors)." };

        // Jika BUKAN 'no-cors', uncomment dan sesuaikan:
        /*
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Server error (Apps Script): ${res.status} (${text})`);
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            dataAppsScript = await res.json();
        } else {
            const text = await res.text();
            // Cek apakah teks respons mengandung indikasi sukses jika bukan JSON
            if (text.toLowerCase().includes("sukses") || text.toLowerCase().includes("success")) {
                 dataAppsScript = { status: "sukses", kodePesanan: dataToSendToAppsScript.kodePesanan, message: text };
            } else {
                 throw new Error(`Format respons Apps Script tidak valid atau error: ${text}`);
            }
        }
        */


        // Asumsi sukses jika tidak ada error network dengan "no-cors" atau jika parsing di atas berhasil
        // (dataAppsScript.status === "sukses" akan selalu true jika pakai default di atas)
        // if (dataAppsScript.status === "sukses") { //
            const alertMessage = `Pesanan berhasil!\nSimpan dan berikan Kode Pesanan ke admin (085150893694)\nKode Pesanan: ${dataAppsScript.kodePesanan || kodePesananCustom}`;
            alert(alertMessage);

            const whatsappNumber = "6285150893694"; // Nomor WA Admin
            let whatsappMessage = `Halo Admin Pimonjoki,\n\nSaya telah melakukan pemesanan dengan detail berikut:\n`;
            whatsappMessage += `Nama Pemesan: ${nama}\n`;
            whatsappMessage += `Kode Pesanan: ${dataAppsScript.kodePesanan || kodePesananCustom}\n`;
            whatsappMessage += `Game: ${game}\n\n`;
            whatsappMessage += `Item Dipesan:\n${jenisPesananString}\n\n`;
            whatsappMessage += `Subtotal: ${formatRupiah(originalSubtotal)}\n`;
            if (actualPromoCodeUsed && actualPromoCodeUsed !== "-") {
                whatsappMessage += `Promo Digunakan: ${actualPromoCodeUsed}\n`;
                whatsappMessage += `Jumlah Diskon: -${formatRupiah(discountValueToSend)}\n`;
            }
            whatsappMessage += `Total Bayar: ${formatRupiah(finalAmountToSend)}\n\n`;
            whatsappMessage += `Mohon segera diproses. Terima kasih!`;
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappLink, '_blank'); // Buka tab baru untuk WhatsApp

            // Increment usage count promo SETELAH pesanan berhasil dikirim dan dikonfirmasi
            if (actualPromoCodeUsed && PROMO_CODES[actualPromoCodeUsed]) {
                const promoDetails = PROMO_CODES[actualPromoCodeUsed];
                if (promoDetails.usageLimit !== undefined) {
                    let used = parseInt(localStorage.getItem(`promo_used_count_${actualPromoCodeUsed}`) || "0", 10);
                    localStorage.setItem(`promo_used_count_${actualPromoCodeUsed}`, used + 1);
                }
                if (promoDetails.perUserLimit !== undefined && nama) {
                    const userPromoKey = `promo_user_${normalizedNameForPromo}_${actualPromoCodeUsed}`;
                    let usedByUser = parseInt(localStorage.getItem(userPromoKey) || "0", 10);
                    localStorage.setItem(userPromoKey, usedByUser + 1);
                }
            }
            localStorage.removeItem("pimonjoki_cart");
            currentAppliedPromo = null;
            // localStorage.removeItem("appliedPimonjokiPromo");
            cart = []; // Kosongkan variabel global cart
            if (typeof renderCart === "function") renderCart(); // Render ulang keranjang (akan jadi kosong)
        // } else { // Untuk kasus jika BUKAN no-cors dan Apps Script mengembalikan status != "sukses"
            // alert(`Gagal mengirim pesanan ke Spreadsheet: ${dataAppsScript.message || dataAppsScript.error || "Format respons tidak diketahui dari Apps Script."}`);
        // }
    } catch (err) {
        console.error("Fetch Error (Apps Script atau parsing):", err);
        alert(`Gagal mengirim pesanan ke Spreadsheet atau memproses respons. Detail: ${err.message}\nNotifikasi Discord mungkin sudah terkirim. Harap hubungi admin jika ragu.`);
    } finally {
        if (checkoutButton) {
            checkoutButton.textContent = originalCheckoutButtonText;
            checkoutButton.disabled = false;
        }
    }
}

// === EVENT LISTENER DOM UTAMA ===
document.addEventListener("DOMContentLoaded", () => {
    loadCartAndPromo(); // Muat keranjang dan promo yang mungkin tersimpan
    if (typeof renderCart === "function" && document.getElementById("cart-content")) {
        renderCart(); // Render keranjang saat halaman dimuat
    }

    // Event listener untuk tombol "Tambah ke Keranjang" generik
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
        // Hanya tambahkan event listener jika belum ada (untuk menghindari duplikasi jika ada pemanggilan ulang)
        if (!btn.dataset.listenerAttached) {
            btn.addEventListener("click", () => {
                const item = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    // Harga dari data-* bisa jadi string "Rp xxx" atau angka. Pastikan di-parse jadi angka.
                    price: parseInt(String(btn.dataset.price).replace(/\D/g, ""), 10),
                    game: btn.dataset.game || "Genshin Impact", // Default game jika tidak ada
                };
                if (item.id && item.name && !isNaN(item.price)) {
                    addToCart(item);
                } else {
                    console.warn("Tombol .add-to-cart tidak memiliki data-* yang lengkap/valid (id, name, price):", btn, item);
                    alert("Tidak dapat menambahkan item: informasi produk tidak lengkap.");
                }
            });
            btn.dataset.listenerAttached = "true";
        }
    });

    // Event listener untuk input pencarian (jika ada fungsi handleSearch)
    const searchInputElement = document.getElementById("searchInput");
    if (searchInputElement) {
        searchInputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (typeof handleSearch === 'function') {
                    handleSearch();
                } else {
                    console.warn("Fungsi handleSearch tidak ditemukan.");
                }
            }
        });
        // Isi input pencarian dari URL parameter jika ada
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query");
        if (query) {
            searchInputElement.value = decodeURIComponent(query); // decodeURIComponent untuk spasi dll.
            // if (typeof handleSearch === 'function') handleSearch(); // Opsional: langsung cari saat load jika ada query
        }
    }
    // Anda mungkin perlu menambahkan input field untuk nama pelanggan di HTML, misalnya:
    // <input type="text" id="customer-name-checkout" placeholder="Nama Anda untuk Checkout">
    // Ini akan membantu validasi promo per pengguna dan pengisian otomatis nama di checkout.
});

// === GLOBAL FUNGSI ===
// Menyediakan fungsi-fungsi ini secara global agar bisa dipanggil dari atribut onclick di HTML
if (typeof updateQty === "function") window.updateQty = updateQty;
if (typeof removeItem === "function") window.removeItem = removeItem;
if (typeof checkout === "function") window.checkout = checkout;
if (typeof applyPromoCode === "function") window.applyPromoCode = applyPromoCode; // Sudah ada di renderCart
if (typeof addSelectedItemsToCart === 'function') window.addSelectedItemsToCart = addSelectedItemsToCart;

// Pastikan fungsi handleSearch dan orderNow didefinisikan di tempat lain jika diekspos ke window.
// Jika tidak digunakan, Anda bisa menghapus baris berikut.
if (typeof handleSearch === 'function') {
    window.handleSearch = handleSearch;
} else {
    // Definisikan placeholder jika tidak ada, untuk menghindari error jika dipanggil dari HTML
    // window.handleSearch = () => console.warn("Fungsi handleSearch belum diimplementasikan.");
}
if (typeof orderNow === 'function') {
    window.orderNow = orderNow;
} else {
    // window.orderNow = () => console.warn("Fungsi orderNow belum diimplementasikan.");
}