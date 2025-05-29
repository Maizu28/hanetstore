// keranjang.js

let cart = []; 

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
    "WELCOMENew": {
        type: "fixed",
        value: 20000,
        description: "Potongan Rp 20.000",
        minPurchase: 75000
    },

    // Diskon untuk pembelian tercepat
    "10TERCEPAT": {
        type: "fixed",
        value: 10000,
        description: "Potongan Rp 10.000 untuk 10 orang tercepat",
        minPurchase: 50000,
        usageLimit: 10
    },
    "20TERCEPAT": {
        type: "fixed",
        value: 8000,
        description: "Potongan Rp 8.000 untuk 20 orang tercepat",
        minPurchase: 40000,
        usageLimit: 20
    },
    "50TERCEPAT": {
        type: "fixed",
        value: 5000,
        description: "Potongan Rp 5.000 untuk 50 orang tercepat",
        minPurchase: 25000,
        usageLimit: 50
    },

    // Contoh kode promo dengan batas tanggal & waktu
    "FLASHSALE": {
        type: "percentage",
        value: 20,
        description: "Flash Sale 20% (hanya 1-2 Juli 2024)",
        minPurchase: 30000,
        validFrom: "2024-07-01T00:00:00+07:00", // WIB
        validUntil: "2024-07-02T23:59:59+07:00"
    },
    "HARIJADI": {
        type: "fixed",
        value: 10000,
        description: "Diskon Ulang Tahun (10-15 Juli 2024)",
        minPurchase: 50000,
        validFrom: "2024-07-10T00:00:00+07:00",
        validUntil: "2024-07-15T23:59:59+07:00"
    }
};

// Helper untuk cek tanggal promo
function isPromoDateValid(code) {
    const promo = PROMO_CODES[code];
    if (!promo) return false;
    if (promo.validFrom && promo.validUntil) {
        const now = new Date();
        const from = new Date(promo.validFrom);
        const until = new Date(promo.validUntil);
        return now >= from && now <= until;
    }
    return true;
}

// Helper to check usage limit for promo codes
function isPromoAvailable(code) {
    if (!PROMO_CODES[code]) return false;
    if (PROMO_CODES[code].usageLimit !== undefined) {
        const used = parseInt(localStorage.getItem("promo_used_" + code) || "0", 10);
        return used < PROMO_CODES[code].usageLimit;
    }
    return true;
}

// Patch applyPromoCode to check usage limit
const originalApplyPromoCode = applyPromoCode;
applyPromoCode = function() {
    const promoInput = document.getElementById('promo-code-input');
    const promoStatusDiv = document.getElementById('promo-status');
    if (!promoInput || !promoStatusDiv) {
        console.error("Elemen promo tidak ditemukan di DOM.");
        return;
    }
    const promoCodeEntered = promoInput.value.trim().toUpperCase();

    let currentSubtotal = 0;
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/\D/g, "")) || 0;
        currentSubtotal += item.qty * price;
    });

    if (PROMO_CODES[promoCodeEntered]) {
        // Check usage limit
        if (PROMO_CODES[promoCodeEntered].usageLimit !== undefined && !isPromoAvailable(promoCodeEntered)) {
            currentAppliedPromo = null;
            promoStatusDiv.textContent = "Kode promo sudah mencapai batas penggunaan.";
            promoStatusDiv.style.color = "red";
            renderCart();
            return;
        }
        const promoDetails = PROMO_CODES[promoCodeEntered];
        if (currentSubtotal >= promoDetails.minPurchase) {
            currentAppliedPromo = {
                code: promoCodeEntered,
                type: promoDetails.type,
                value: promoDetails.value,
                description: promoDetails.description,
                minPurchase: promoDetails.minPurchase,
                usageLimit: promoDetails.usageLimit
            };
            promoStatusDiv.textContent = "";
            promoStatusDiv.style.color = "green";
        } else {
            currentAppliedPromo = null;
            promoStatusDiv.textContent = `Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeEntered}".`;
            promoStatusDiv.style.color = "red";
        }
    } else if (promoCodeEntered === "") {
        if (currentAppliedPromo) {
            currentAppliedPromo = null;
            promoStatusDiv.textContent = "Kode promo dihapus.";
            promoStatusDiv.style.color = "orange";
        } else {
            promoStatusDiv.textContent = "Masukkan kode promo.";
            promoStatusDiv.style.color = "red";
        }
    } else {
        currentAppliedPromo = null;
        promoStatusDiv.textContent = "Kode promo tidak valid atau sudah kedaluwarsa.";
        promoStatusDiv.style.color = "red";
    }
    renderCart();
};

// Patch checkout to increment usage count if promo with usageLimit is used
const originalCheckout = checkout;
checkout = function(finalAmount, originalSubtotal, discountValue, promoCodeUsed) {
    // Check for all promo codes with usageLimit
    if (promoCodeUsed && PROMO_CODES[promoCodeUsed] && PROMO_CODES[promoCodeUsed].usageLimit !== undefined) {
        if (!isPromoAvailable(promoCodeUsed)) {
            alert("Kode promo " + promoCodeUsed + " sudah habis digunakan.");
            return;
        }
    }
    originalCheckout(finalAmount, originalSubtotal, discountValue, promoCodeUsed);
    // After successful checkout, increment usage
    if (promoCodeUsed && PROMO_CODES[promoCodeUsed] && PROMO_CODES[promoCodeUsed].usageLimit !== undefined) {
        let used = parseInt(localStorage.getItem("promo_used_" + promoCodeUsed) || "0", 10);
        localStorage.setItem("promo_used_" + promoCodeUsed, used + 1);
    }
};
let currentAppliedPromo = null;

function loadCartAndPromo() {
  const cartString = localStorage.getItem("pimonjoki_cart");
  if (cartString) {
    try {
      const parsedCart = JSON.parse(cartString);
      if (Array.isArray(parsedCart)) {
        cart = parsedCart;
      } else {
        console.warn("Data keranjang di localStorage bukan array, direset.");
        cart = [];
      }
    } catch (e) {
      console.error("Gagal parse keranjang dari localStorage:", e);
      cart = [];
    }
  } else {
      cart = [];
  }

  // (Opsional) Muat promo yang tersimpan dari localStorage
  // const savedPromoString = localStorage.getItem("appliedPimonjokiPromo");
  // if (savedPromoString) {
  //   try {
  //     const promo = JSON.parse(savedPromoString);
  //     // Validasi ulang promo yang tersimpan dengan definisi PROMO_CODES
  //     if (PROMO_CODES[promo.code] && PROMO_CODES[promo.code].minPurchase !== undefined) {
  //         currentAppliedPromo = {
  //             code: promo.code,
  //             type: PROMO_CODES[promo.code].type,
  //             value: PROMO_CODES[promo.code].value,
  //             description: PROMO_CODES[promo.code].description,
  //             minPurchase: PROMO_CODES[promo.code].minPurchase
  //         };
  //     } else { localStorage.removeItem("appliedPimonjokiPromo"); } // Hapus jika tidak valid lagi
  //   } catch(e) { 
  //       console.error("Gagal parse promo tersimpan:", e); 
  //       localStorage.removeItem("appliedPimonjokiPromo");
  //   }
  // }
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

function applyPromoCode() {
  const promoInput = document.getElementById('promo-code-input');
  const promoStatusDiv = document.getElementById('promo-status'); // Ambil di sini untuk feedback langsung
  
  // Jika salah satu elemen tidak ditemukan, jangan lanjutkan untuk menghindari error
  if (!promoInput || !promoStatusDiv) {
      console.error("Elemen promo tidak ditemukan di DOM.");
      return;
  }
  const promoCodeEntered = promoInput.value.trim().toUpperCase();

  let currentSubtotal = 0;
  cart.forEach(item => {
      const price = parseInt(item.price.replace(/\D/g, "")) || 0;
      currentSubtotal += item.qty * price;
  });

  if (PROMO_CODES[promoCodeEntered]) {
      const promoDetails = PROMO_CODES[promoCodeEntered];
      if (currentSubtotal >= promoDetails.minPurchase) {
          currentAppliedPromo = {
              code: promoCodeEntered,
              type: promoDetails.type,
              value: promoDetails.value,
              description: promoDetails.description,
              minPurchase: promoDetails.minPurchase
          };
          // localStorage.setItem("appliedPimonjokiPromo", JSON.stringify(currentAppliedPromo));
          // Pesan sukses akan di-set oleh renderCart
          promoStatusDiv.textContent = ""; // Kosongkan pesan error/info sebelumnya
          promoStatusDiv.style.color = "green"; 
      } else {
          currentAppliedPromo = null; 
          // localStorage.removeItem("appliedPimonjokiPromo");
          promoStatusDiv.textContent = `Minimal belanja ${formatRupiah(promoDetails.minPurchase)} untuk kode "${promoCodeEntered}".`;
          promoStatusDiv.style.color = "red";
         } 
  } else if (promoCodeEntered === "") {
      if (currentAppliedPromo) {
          currentAppliedPromo = null;
          // localStorage.removeItem("appliedPimonjokiPromo");
          promoStatusDiv.textContent = "Kode promo dihapus.";
          promoStatusDiv.style.color = "orange";
      } else {
          promoStatusDiv.textContent = "Masukkan kode promo.";
          promoStatusDiv.style.color = "red";
      }
  } else {
      currentAppliedPromo = null;
      // localStorage.removeItem("appliedPimonjokiPromo");
      promoStatusDiv.textContent = "Kode promo tidak valid atau sudah kedaluwarsa.";
      promoStatusDiv.style.color = "red";
  }
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-content");
  
  // Di dalam fungsi renderCart()
  const promoSectionHTML = `
    <div class="promo-section">
        <h4>Kode Promo</h4>
        <div class="promo-input-group"> <input type="text" id="promo-code-input" placeholder="Masukkan kode promo" value="${currentAppliedPromo ? currentAppliedPromo.code : ''}">
            <button id="apply-promo-btn">${currentAppliedPromo ? 'Ganti/Hapus' : 'Gunakan'}</button>
        </div>
        <div id="promo-status"></div>
    </div>`;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart">Keranjang Anda kosong.</div>` + promoSectionHTML;
    const promoStatusDivOnEmpty = document.getElementById('promo-status');
    const promoInputOnEmpty = document.getElementById('promo-code-input');

    if (promoInputOnEmpty && currentAppliedPromo) promoInputOnEmpty.value = currentAppliedPromo.code;

    if (promoStatusDivOnEmpty) {
        if (currentAppliedPromo) {
             if (0 >= currentAppliedPromo.minPurchase) {
                 promoStatusDivOnEmpty.textContent = 'Kode promo "' + currentAppliedPromo.code + '" (' + currentAppliedPromo.description + ') diterapkan.';
                 promoStatusDivOnEmpty.style.color = "green";
            } else {
                 promoStatusDivOnEmpty.textContent = `Promo "${currentAppliedPromo.code}" aktif, min. belanja ${formatRupiah(currentAppliedPromo.minPurchase)}.`;
                 promoStatusDivOnEmpty.style.color = "orange";
            }
        } else if (promoStatusDivOnEmpty.textContent === "") { 
            // Biarkan kosong jika tidak ada pesan dari applyPromoCode juga
        }
    }
    
    const applyBtnEmpty = document.getElementById('apply-promo-btn');
    if(applyBtnEmpty) {
         applyBtnEmpty.addEventListener('click', applyPromoCode);
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

  if (currentAppliedPromo) {
      if (subtotalAmount >= currentAppliedPromo.minPurchase) {
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
      } else { 
          discountAmount = 0;
          finalTotal = subtotalAmount;
          discountDisplayHtml = "";
          promoStatusTextForRender = `Promo "${currentAppliedPromo.code}" aktif, tapi minimal belanja ${formatRupiah(currentAppliedPromo.minPurchase)} belum terpenuhi.`;
          promoStatusColorForRender = "orange";
      }
  }

  cartHtml += promoSectionHTML;
  cartHtml += `
    <div class="total-section">
      <div>Subtotal: ${formatRupiah(subtotalAmount)}</div>
      ${discountDisplayHtml}
      <div style="font-size: 1.2em; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc;">Total Akhir: ${formatRupiah(finalTotal)}</div>
    </div>
    <button class="checkout-btn" onclick="checkout(${finalTotal}, ${subtotalAmount}, ${discountAmount}, currentAppliedPromo ? currentAppliedPromo.code : null)">Checkout</button>
  `;

  container.innerHTML = cartHtml;
  document.getElementById('apply-promo-btn').addEventListener('click', applyPromoCode);
  
  const promoInputRendered = document.getElementById('promo-code-input');
  if (promoInputRendered && currentAppliedPromo) {
      promoInputRendered.value = currentAppliedPromo.code;
  }
  
  const promoStatusDivRendered = document.getElementById('promo-status');
  if (promoStatusDivRendered) {
      // Pesan dari applyPromoCode (error/info) akan muncul sesaat, lalu ditimpa oleh status render ini.
      // Jika ingin mempertahankan pesan error dari applyPromoCode, logikanya perlu lebih kompleks.
      // Untuk sekarang, renderCart akan selalu menampilkan status berdasarkan kondisi saat ini.
      if (promoStatusTextForRender) {
           promoStatusDivRendered.textContent = promoStatusTextForRender;
           promoStatusDivRendered.style.color = promoStatusColorForRender;
      } else {
           // Jika tidak ada promo aktif, dan tidak ada pesan error dari applyPromoCode (karena sudah dirender ulang),
           // maka kosongkan status.
           const tempStatus = promoStatusDivRendered.dataset.transientMessage; // Cek jika applyPromoCode set pesan sementara
           if (tempStatus) {
                promoStatusDivRendered.textContent = tempStatus;
                promoStatusDivRendered.style.color = promoStatusDivRendered.dataset.transientColor || "red";
                delete promoStatusDivRendered.dataset.transientMessage;
                delete promoStatusDivRendered.dataset.transientColor;
           } else {
                promoStatusDivRendered.textContent = ''; 
           }
      }
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

function checkout(finalAmount, originalSubtotal, discountValue, promoCodeUsed) {
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

  // GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA YANG AKTIF!
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzr8IMeZG2ZGi6FTUeCLOpGnSeuxAFCo_q-lOnGgN1UR-_JXk8UG_mR7uWxOJSongsXBg/exec"; 

  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
  })
  .then(res => {
      if (!res.ok) {
          return res.text().then(text => { throw new Error("Server merespons dengan error: " + res.status + (text ? " - " + text : "")) });
      }
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
      } else {
          return res.text().then(text => { 
              console.error("Respons bukan JSON:", text);
              throw new Error("Format respons dari server tidak valid."); 
          });
      }
  })
  .then(data => {
    if (typeof data === 'object' && data !== null && data.status === "sukses") {
      alert("Pesanan berhasil!\nKode Pesanan: " + data.kodePesanan);
      localStorage.removeItem("pimonjoki_cart");
      // localStorage.removeItem("appliedPimonjokiPromo");
      currentAppliedPromo = null;
      cart = []; 
      // renderCart(); // Cukup reload untuk membersihkan state sepenuhnya
      location.reload(); 
    } else {
      alert("Gagal mengirim pesanan: " + (data.message || data.error || (typeof data === 'string' ? data : "Format respons tidak diketahui")));
    }
  })
  .catch(err => {
    console.error("Fetch Error:", err);
    alert("Backend belum siap atau terjadi kesalahan jaringan. Detail: " + err.message);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartAndPromo();
  renderCart();
});