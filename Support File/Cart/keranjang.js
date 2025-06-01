// keranjang.js

// Variabel global untuk keranjang dan promo
let cart = [];
let currentAppliedPromo = null;

// Definisi PROMO_CODES Anda
const PROMO_CODES = {
    "HEMAT10": { type: "percentage", value: 10, description: "Diskon 10%", minPurchase: 50000 },
    "PIMONJOKIYES": { type: "percentage", value: 15, description: "Diskon Spesial 15%", minPurchase: 100000 },
    "DISKON5K": { type: "fixed", value: 5000, description: "Potongan Rp 5.000", minPurchase: 25000 },
    "WELCOMENEW": {type: "fixed", value: 20000, description: "Potongan Rp 20.000", minPurchase: 75000 },
    "10TERCEPAT": { type: "fixed", value: 10000, description: "Potongan Rp 10.000 (10 tercepat)", minPurchase: 50000, usageLimit: 10 },
    "20TERCEPAT": { type: "fixed", value: 8000, description: "Potongan Rp 8.000 (20 tercepat)", minPurchase: 40000, usageLimit: 20 },
    "50TERCEPAT": { type: "fixed", value: 5000, description: "Potongan Rp 5.000 (50 tercepat)", minPurchase: 25000, usageLimit: 50 },
    "FLASHSALE": { type: "percentage", value: 20, description: "Flash Sale 20%", minPurchase: 30000, validFrom: "2024-07-01T00:00:00+07:00", validUntil: "2024-07-02T23:59:59+07:00" }, // Ganti tanggal
    "HARIJADI": { type: "fixed", value: 10000, description: "Diskon Ulang Tahun", minPurchase: 50000, validFrom: "2024-07-10T00:00:00+07:00", validUntil: "2024-07-15T23:59:59+07:00" }, // Ganti tanggal
    "LIMIT1USER": { type: "percentage", value: 25, description: "Diskon 25% (1x per user)", minPurchase: 60000, validFrom: "2024-07-03T00:00:00+07:00", validUntil: "2024-07-05T23:59:59+07:00", perUserLimit: 1 }, // Ganti tanggal
    "LIMIT3USER": { type: "fixed", value: 12000, description: "Diskon Rp 12.000 (3x per user)", minPurchase: 70000, validFrom: "2024-07-06T00:00:00+07:00", validUntil: "2024-07-10T23:59:59+07:00", perUserLimit: 3 } // Ganti tanggal
};

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxrrPdTGbpfvpYG_QMqzBdN6nmUKJuPrMFglMAn4GcJSo66z0P5hSucRrPKlX7gO5sDhg/exec";

// --- FUNGSI HELPER PROMO ---
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
}
function isPromoDateValid(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.validFrom && promo.validUntil) {
        const now = new Date(); const from = new Date(promo.validFrom); const until = new Date(promo.validUntil);
        return now >= from && now <= until;
    }
    return true;
}
function isPromoAvailable(code) {
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
            if (!Array.isArray(cartData)) cartData = [];
        }
    } catch (error) { console.error("Error parsing keranjang:", error); cartData = []; }
    return cartData;
}
function saveCart(_cart) {
    try { localStorage.setItem("pimonjoki_cart", JSON.stringify(_cart)); }
    catch (error) { console.error("Error menyimpan keranjang:", error); }
}
function loadCartAndPromo() {
    const cartString = localStorage.getItem("pimonjoki_cart");
    if (cartString) {
        try {
            const parsedCart = JSON.parse(cartString);
            cart = Array.isArray(parsedCart) ? parsedCart : [];
        } catch (e) { console.error("Gagal parse keranjang:", e); cart = []; }
    } else {
        cart = [];
    }
    // Anda bisa memuat currentAppliedPromo dari localStorage di sini jika ingin persisten
    // const savedPromo = localStorage.getItem("appliedPimonjokiPromo");
    // if (savedPromo) { try { currentAppliedPromo = JSON.parse(savedPromo); } catch(e){ /* abaikan */ } }
}

// --- FUNGSI INTERAKSI KERANJANG ---
function addToCart(item, quantityToAdd = 1) {
    let currentCart = getCart();
    const existingItem = currentCart.find((i) => i.id === item.id);
    const numQuantityToAdd = parseInt(quantityToAdd, 10) || 1;

    if (existingItem) {
        existingItem.qty += numQuantityToAdd;
    } else {
        currentCart.push({ ...item, qty: numQuantityToAdd });
    }
    saveCart(currentCart);
    cart = currentCart; 
    alert(`"${item.name}" (x${numQuantityToAdd}) berhasil ditambahkan ke keranjang.`);
    if (typeof renderCart === "function" && document.getElementById("cart-content")) renderCart();
}

function addSelectedItemsToCart(buttonElement) {
    const packageCard = buttonElement.closest('.package-card');
    if (!packageCard) { alert("Kesalahan: Kartu paket tidak ditemukan."); return; }
    const basePackageNameElement = packageCard.querySelector('h2');
    const basePackageName = basePackageNameElement ? basePackageNameElement.textContent.trim() : "Paket Pilihan";

    let selectedCheckboxes = packageCard.querySelectorAll('ul.selectable-item-list input.selectable-sub-item:checked, ul.quest-list input[type="checkbox"]:checked');
    if (selectedCheckboxes.length === 0) { alert(`Silakan pilih minimal satu item dari ${basePackageName}.`); return; }

    const qtyInput = packageCard.querySelector('.item-bundle-qty');
    let desiredQty = 1;
    if (qtyInput) {
        desiredQty = parseInt(qtyInput.value, 10);
        if (isNaN(desiredQty) || desiredQty < 1) { desiredQty = 1; qtyInput.value = 1; }
    }

    const selectedItemValues = []; const selectedItemUniqueIds = []; let totalPricePerBundle = 0;
    let priceCalculationMode = "individual";
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
            selectedItemUniqueIds.push(checkbox.value.toLowerCase().replace(/\s+/g, '-'));
        });
    } else {
        selectedCheckboxes.forEach(checkbox => {
            const itemPrice = parseInt(checkbox.dataset.price, 10);
            if (!isNaN(itemPrice) && itemPrice >= 0) {
                totalPricePerBundle += itemPrice;
                selectedItemValues.push(checkbox.value);
                selectedItemUniqueIds.push(checkbox.dataset.questId || checkbox.dataset.id || checkbox.value.toLowerCase().replace(/\s+/g, '-'));
            } else { console.warn(`Item "${checkbox.value}" tidak memiliki harga valid.`); }
        });
        if (selectedItemValues.length === 0 && selectedCheckboxes.length > 0) { alert("Item yang dipilih tidak memiliki harga yang valid."); return; }
    }
    if (selectedItemValues.length === 0) { alert(`Tidak ada item valid yang dipilih.`); return; }

    const sortedItemIds = [...selectedItemUniqueIds].sort();
    const selectionIdentifier = sortedItemIds.join('-');
    const idPrefix = basePackageName.toLowerCase().replace(/\s+/g, '-') || 'custom-package';
    const itemId = `${idPrefix}-${selectionIdentifier}`; 
    const itemName = `${basePackageName} (${selectedItemValues.join(", ")})`; 
    const formattedTotalPrice = `Rp ${totalPricePerBundle.toLocaleString('id-ID')}`;
    const gameName = packageCard.dataset.game || "Genshin Impact";
    const newItemData = { id: itemId, name: itemName, price: formattedTotalPrice, game: gameName };
    addToCart(newItemData, desiredQty);
}

function updateQty(id, delta) {
    let currentCart = getCart();
    const itemIndex = currentCart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        currentCart[itemIndex].qty += delta;
        if (currentCart[itemIndex].qty < 1) currentCart[itemIndex].qty = 1;
        saveCart(currentCart); cart = currentCart;
        if (typeof renderCart === "function") renderCart();
    }
}

function removeItem(id) {
    let currentCart = getCart();
    const initialLength = currentCart.length;
    currentCart = currentCart.filter(i => i.id !== id);
    if (currentCart.length < initialLength) {
        saveCart(currentCart); cart = currentCart;
        if (typeof renderCart === "function") renderCart();
    }
}

async function applyPromoCode() {
    const promoInput = document.getElementById('promo-code-input');
    const promoStatusDiv = document.getElementById('promo-status');
    if (!promoInput || !promoStatusDiv) { return; }
    const promoCodeEntered = promoInput.value.trim().toUpperCase();
    let currentSubtotal = 0;
    getCart().forEach(item => { currentSubtotal += (parseInt(item.price.replace(/\D/g, "")) || 0) * item.qty; });
    currentAppliedPromo = null; 
    promoStatusDiv.textContent = ""; 

    if (promoCodeEntered === "") {
        if (localStorage.getItem("appliedPimonjokiPromo")) {
             promoStatusDiv.textContent = "Kode promo dihapus."; promoStatusDiv.style.color = "orange";
        } else {
            promoStatusDiv.textContent = "Masukkan kode promo."; promoStatusDiv.style.color = "red";
        }
        localStorage.removeItem("appliedPimonjokiPromo");
    } else if (PROMO_CODES[promoCodeEntered]) {
        const promoDetails = PROMO_CODES[promoCodeEntered];
        if (promoDetails.isActive === false) {
             promoStatusDiv.textContent = "Kode promo sudah tidak aktif."; promoStatusDiv.style.color = "red";
        } else if (!isPromoDateValid(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah kedaluwarsa atau belum berlaku."; promoStatusDiv.style.color = "red";
        } else if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeEntered)) {
            promoStatusDiv.textContent = "Kode promo sudah mencapai batas penggunaan global."; promoStatusDiv.style.color = "red";
        } else if (currentSubtotal < promoDetails.minPurchase) {
            promoStatusDiv.textContent = `Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeEntered}".`; promoStatusDiv.style.color = "red";
        } else if (promoDetails.perUserLimit !== undefined) {
            const customerName = prompt("Masukkan NAMA Anda untuk validasi promo ini (digunakan saat checkout):");
            if (customerName && customerName.trim() !== "") {
                if (isPromoPerUserAvailable(promoCodeEntered, customerName)) {
                    currentAppliedPromo = { ...promoDetails, code: promoCodeEntered, customerNameForValidation: customerName.trim().toLowerCase() };
                } else {
                    promoStatusDiv.textContent = `Anda sudah menggunakan kode promo "${promoCodeEntered}" secara maksimal.`; promoStatusDiv.style.color = "red";
                }
            } else {
                promoStatusDiv.textContent = "Nama diperlukan untuk validasi promo ini. Klik 'Gunakan' lagi."; promoStatusDiv.style.color = "orange";
            }
        } else {
            currentAppliedPromo = { ...promoDetails, code: promoCodeEntered };
        }
    } else {
        promoStatusDiv.textContent = "Kode promo tidak valid."; promoStatusDiv.style.color = "red";
    }
    if (typeof renderCart === "function") renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-content");
    if (!container) { return; }

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
          } else if (promoStatusDivOnEmpty.textContent === "" && (!promoStatusDivOnEmpty.dataset || !promoStatusDivOnEmpty.dataset.transientMessage)) {
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

    let subtotalAmount = 0; let cartHtml = "";
    currentDisplayCart.forEach((item) => {
      const price = parseInt(item.price.replace(/\D/g, "")) || 0;
      const itemSubtotal = item.qty * price; subtotalAmount += itemSubtotal;
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
        </div>`;
    });

    let discountAmount = 0; let finalTotal = subtotalAmount; let discountDisplayHtml = "";
    let promoStatusTextForRender = ""; let promoStatusColorForRender = "initial";
    let isPromoCurrentlyValidAndApplicable = false;

    if (currentAppliedPromo) {
        const isValidDate = isPromoDateValid(currentAppliedPromo.code);
        const isAvailableGlobal = isPromoAvailable(currentAppliedPromo.code);
        const meetsMinPurchase = subtotalAmount >= currentAppliedPromo.minPurchase;
        let isAvailablePerUser = true;
        if (currentAppliedPromo.perUserLimit !== undefined) {
            isAvailablePerUser = isPromoPerUserAvailable(currentAppliedPromo.code, currentAppliedPromo.customerNameForValidation);
        }
        if (isValidDate && isAvailableGlobal && isAvailablePerUser && meetsMinPurchase) {
            if (currentAppliedPromo.type === "percentage") discountAmount = subtotalAmount * (currentAppliedPromo.value / 100);
            else if (currentAppliedPromo.type === "fixed") discountAmount = currentAppliedPromo.value;
            discountAmount = Math.floor(discountAmount); discountAmount = Math.min(discountAmount, subtotalAmount); 
            finalTotal = subtotalAmount - discountAmount;
            discountDisplayHtml = `<div class="discount-display">Diskon (${currentAppliedPromo.description}): -${formatRupiah(discountAmount)}</div>`;
            promoStatusTextForRender = `Kode promo "${currentAppliedPromo.code}" (${currentAppliedPromo.description}) diterapkan.`;
            promoStatusColorForRender = "green"; isPromoCurrentlyValidAndApplicable = true;
        } else { 
            discountAmount = 0; finalTotal = subtotalAmount; discountDisplayHtml = "";
            if (!isValidDate) promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah kedaluwarsa atau belum berlaku.`;
            else if (!isAvailableGlobal) promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" sudah habis digunakan (global).`;
            else if (!isAvailablePerUser && currentAppliedPromo.perUserLimit !== undefined) promoStatusTextForRender = `Anda sudah menggunakan promo "${currentAppliedPromo.code}" secara maksimal.`;
            else if (!meetsMinPurchase) promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" aktif, tapi minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)} belum terpenuhi.`;
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
      <button class="checkout-btn" onclick="checkout(${finalTotal}, ${subtotalAmount}, ${discountAmount}, 
        ${isPromoCurrentlyValidAndApplicable && currentAppliedPromo ? `'${currentAppliedPromo.code}'` : null}, 
        ${isPromoCurrentlyValidAndApplicable && currentAppliedPromo && currentAppliedPromo.customerNameForValidation ? `'${currentAppliedPromo.customerNameForValidation}'` : null}
      )">Checkout</button>`;
    container.innerHTML = cartHtml;
    const applyBtn = document.getElementById('apply-promo-btn');
    const promoInputForEnter = document.getElementById('promo-code-input');
    if(applyBtn) applyBtn.addEventListener('click', applyPromoCode);
    if (promoInputForEnter && applyBtn) {
        promoInputForEnter.addEventListener("keydown", function(e) { if (e.key === "Enter") { e.preventDefault(); applyBtn.click();}});
    }
    const promoInputRendered = document.getElementById('promo-code-input');
    if (promoInputRendered && currentAppliedPromo) promoInputRendered.value = currentAppliedPromo.code;
    const promoStatusDivRendered = document.getElementById('promo-status');
    if (promoStatusDivRendered) {
        if (promoStatusTextForRender) {
             promoStatusDivRendered.textContent = promoStatusTextForRender;
             promoStatusDivRendered.style.color = promoStatusColorForRender;
        } else if (promoStatusDivRendered.dataset && promoStatusDivRendered.dataset.transientMessage) {
             promoStatusDivRendered.textContent = promoStatusDivRendered.dataset.transientMessage;
             promoStatusDivRendered.style.color = promoStatusDivRendered.dataset.transientColor || "red";
             delete promoStatusDivRendered.dataset.transientMessage; delete promoStatusDivRendered.dataset.transientColor;
        } else if (promoStatusDivRendered.textContent === "") { 
             promoStatusDivRendered.textContent = ''; 
        }
    }
}

// --- FUNGSI CHECKOUT ---
async function checkout(finalAmount, originalSubtotal, discountValue, promoCodeUsed, customerNameForValidation) {
    let nama = customerNameForValidation; 
    if (!nama) {
        nama = prompt("Masukkan nama Anda untuk pesanan:");
        if (!nama) return alert("Nama wajib diisi.");
    } else {
        const confirmName = confirm(`Lanjutkan pesanan sebagai "${nama}"?`);
        if (!confirmName) {
            nama = prompt("Masukkan nama Anda untuk pesanan:");
            if (!nama) return alert("Nama wajib diisi.");
        }
    }
    nama = nama.trim();

    if (promoCodeUsed && PROMO_CODES[promoCodeUsed]) {
        const promoDetails = PROMO_CODES[promoCodeUsed];
        let subtotalForValidation = 0; 
        getCart().forEach(item => { subtotalForValidation += (parseInt(item.price.replace(/\D/g, "")) || 0) * item.qty; });
        if (!isPromoDateValid(promoCodeUsed)) { alert(`Kode promo "${promoCodeUsed}" sudah kedaluwarsa. Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return; }
        if (promoDetails.usageLimit !== undefined && !isPromoAvailable(promoCodeUsed)) { alert(`Kode promo "${promoCodeUsed}" sudah habis (global). Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return; }
        if (subtotalForValidation < promoDetails.minPurchase) { alert(`Minimal belanja untuk kode promo "${promoCodeUsed}" tidak terpenuhi. Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return; }
        if (promoDetails.perUserLimit !== undefined && !isPromoPerUserAvailable(promoCodeUsed, nama)) { alert(`Promo "${promoCodeUsed}" tidak bisa digunakan atau sudah maksimal untuk Anda ("${nama}"). Diskon dibatalkan.`); currentAppliedPromo = null; renderCart(); return; }
    } else if (promoCodeUsed) { 
        alert(`Kode promo "${promoCodeUsed}" tidak lagi valid. Pesanan akan diproses tanpa diskon.`);
        promoCodeUsed = null; discountValue = 0; finalAmount = originalSubtotal;
        currentAppliedPromo = null; renderCart(); 
    }

    let jenisPesananString = "";
    getCart().forEach(item => {
        const bundleMatch = item.name.match(/^(.*?)\s\((.*?)\)$/);
        if (bundleMatch && bundleMatch[1] && bundleMatch[2]) {
            const baseName = bundleMatch[1];
            const subItemsString = bundleMatch[2];
            const subItemsArray = subItemsString.split(', ');
            jenisPesananString += `- ${baseName}\n`;
            subItemsArray.forEach(subItem => {
                jenisPesananString += `  - ${subItem}\n`;
            });
        } else {
            jenisPesananString += `- ${item.name}\n`;
        }
    });
    jenisPesananString = jenisPesananString.trimEnd();

    const uniqueGames = [...new Set(getCart().map(item => item.game).filter(g => g && g !== '-'))];
    const game = uniqueGames.length > 0 ? uniqueGames.join(", ") : "Genshin Impact";
    let dataToSend = {
        nama: nama, jenis: jenisPesananString, game: game, totalBayar: finalAmount,
        subtotalAsli: originalSubtotal, promoDigunakan: promoCodeUsed || "-", jumlahDiskon: discountValue || 0
    };
    const checkoutButton = document.querySelector('.checkout-btn');
    const originalCheckoutButtonText = checkoutButton ? checkoutButton.textContent : "Checkout";
    if(checkoutButton) { checkoutButton.textContent = "Memproses..."; checkoutButton.disabled = true; }

    try {
        const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(dataToSend)
        });
        if (!res.ok && res.type !== 'opaque') { const text = await res.text(); throw new Error(`Server error: ${res.status} (${text})`); }
        let data = { status: "sukses", kodePesanan: "GAS-" + new Date().getTime() }; 
        if (res.type !== 'opaque') {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) { data = await res.json(); }
            else { const text = await res.text(); if (text.toLowerCase().includes("sukses")) {} else { throw new Error(`Format respons server tidak valid.`); }}
        }
        if (typeof data === 'object' && data !== null && data.status === "sukses") {
            const alertMessage = `Pesanan berhasil!\nSimpan dan berikan Kode Pesanan Ke admin\nKode Pesanan: ${data.kodePesanan}`;
            alert(alertMessage); 

            const whatsappNumber = "6285150893694"; 
            let whatsappMessage = `Halo Admin Pimonjoki,\n\nSaya telah melakukan pemesanan dengan detail berikut:\n`;
            whatsappMessage += `Nama Pemesan: ${nama}\n`;
            whatsappMessage += `Kode Pesanan: ${data.kodePesanan}\n`;
            whatsappMessage += `Game: ${game}\n\n`;
            whatsappMessage += `Item Dipesan:\n${jenisPesananString}\n\n`;
            whatsappMessage += `Subtotal: ${formatRupiah(originalSubtotal)}\n`;
            if (promoCodeUsed && promoCodeUsed !== "-") {
                whatsappMessage += `Promo Digunakan: ${promoCodeUsed}\n`;
                whatsappMessage += `Jumlah Diskon: -${formatRupiah(discountValue)}\n`;
            }
            whatsappMessage += `Total Bayar: ${formatRupiah(finalAmount)}\n\n`;
            whatsappMessage += `Mohon segera diproses. Terima kasih!`;
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappLink, '_blank'); 

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
            currentAppliedPromo = null; cart = [];
            if (typeof renderCart === "function") renderCart(); 
            // setTimeout(() => location.reload(), 500); 
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

// --- EVENT LISTENER DOM UTAMA ---
document.addEventListener("DOMContentLoaded", () => {
    loadCartAndPromo();
    if (typeof renderCart === "function" && document.getElementById("cart-content")) {
        renderCart();
    }

    // HAPUS BLOK UI AUTH HEADER KARENA FIREBASE DIHAPUS DARI FILE INI
    // --- Setup untuk UI Auth Header (jika ada dan Firebase diinisialisasi) ---
    /*
    if (typeof auth !== "undefined" && auth) { 
        const loginLink = document.getElementById("loginLink");
        // ... (sisa logika UI Auth Header) ...
    } else {
        const loginLink = document.getElementById("loginLink");
        const userInfoDiv = document.getElementById("userInfo");
        if (loginLink) loginLink.style.display = "inline-block";
        if (userInfoDiv) userInfoDiv.style.display = "none";
        console.warn("Firebase Auth instance tidak ditemukan atau belum diinisialisasi. UI Header mungkin tidak update dengan benar.");
    }
    */

    // --- Listener untuk tombol .add-to-cart generik ---
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

    // --- Listener untuk Enter pada Search Input (jika ada di halaman ini) ---
    const searchInputElement = document.getElementById("searchInput");
    if (searchInputElement) {
        searchInputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); 
                if (typeof handleSearch === 'function') handleSearch();
            }
        });
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query");
        if (query) {
            searchInputElement.value = query;
        }
    }

    // --- HAPUS LISTENER UNTUK NAVIGASI SLIDE-IN ---
    /*
    const burgerBtn = document.getElementById('burgerBtn');
    // ... (sisa logika navigasi slide-in) ...
    */
});

// === Jadikan Fungsi yang Dipanggil dari HTML Global (jika script ini type="module") ===
if (typeof updateQty === "function") window.updateQty = updateQty;
if (typeof removeItem === "function") window.removeItem = removeItem;
if (typeof checkout === "function") window.checkout = checkout;
if (typeof applyPromoCode === "function") window.applyPromoCode = applyPromoCode;

if (typeof handleSearch === 'function') window.handleSearch = handleSearch;
if (typeof addSelectedItemsToCart === 'function') window.addSelectedItemsToCart = addSelectedItemsToCart;
if (typeof orderNow === 'function') window.orderNow = orderNow;
