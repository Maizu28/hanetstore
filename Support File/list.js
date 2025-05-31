// list.js (atau nama file utama Anda)

//Impor Firebase jika menggunakan sistem module dan firebase-init.js (REKOMENDASI)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { auth } from './firebase-init.js'; // Jika Anda memisahkan inisialisasi

// --- Jika TIDAK menggunakan firebase-init.js terpisah, inisialisasi di sini ---
// --- Pastikan ini hanya dilakukan SEKALI di seluruh aplikasi Anda ---

const firebaseConfig = {
  apiKey: "AIzaSyDrxaF4FPNlOLvjshhcXHNALD4nyNWQmQI", // GANTI JIKA INI HANYA CONTOH
  authDomain: "pimonjoki-440c9.firebaseapp.com",
  projectId: "pimonjoki-440c9",
  storageBucket: "pimonjoki-440c9.appspot.com", // Perbaiki jika ada typo (firebasestorage -> appspot) atau gunakan yang benar dari console
  messagingSenderId: "572593756351",
  appId: "1:572593756351:web:c74fa9b4f5f50960da4e0a",
  measurementId: "G-7FBBHTEVZH" // Opsional, untuk Google Analytics
};
let app;
let auth; // Deklarasikan auth di scope yang lebih tinggi
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("Firebase App and Auth Initialized in list.js (jika tidak ada firebase-init.js)");
} catch (e) {
    console.error("Firebase initialization error in list.js:", e);
    // Mungkin tampilkan pesan error ke pengguna bahwa beberapa fitur tidak akan bekerja
}

// Catatan: Kode di atas adalah contoh inisialisasi. Jika Anda sudah punya firebase-init.js,
// cukup impor 'auth' dari sana dan hapus/komentari blok inisialisasi ini.
// Untuk contoh di bawah, kita akan asumsikan 'auth' tersedia dari 'firebase-init.js'
// dan diimpor seperti ini (hapus komentar jika Anda menggunakan firebase-init.js):



// Jika auth tidak diimpor, dan Anda mengandalkan skrip lain untuk inisialisasi:
// const auth = getAuth(); // Ini berisiko jika urutan load tidak pasti.


// === FUNGSI-FUNGSI UTILITAS ===

function getCart() {
    let cartData = [];
    try {
        const cartString = localStorage.getItem("pimonjoki_cart");
        if (cartString) {
            cartData = JSON.parse(cartString);
            if (!Array.isArray(cartData)) {
                console.warn("Data keranjang di localStorage bukan array, direset.");
                cartData = [];
            }
        }
    } catch (error) {
        console.error("Error parsing keranjang dari localStorage:", error);
        cartData = [];
    }
    return cartData;
}

function saveCart(cart) {
    try {
        localStorage.setItem("pimonjoki_cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error menyimpan keranjang ke localStorage:", error);
    }
}

// Fungsi inti untuk menambahkan item ke keranjang
function addToCart(item) {
    let currentCart = getCart();
    const existing = currentCart.find((i) => i.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        currentCart.push({ ...item, qty: 1 });
    }
    saveCart(currentCart);
    alert(`"${item.name}" berhasil ditambahkan ke keranjang.`);
    // updateCartIconCount(); // Pertimbangkan fungsi ini jika ada ikon jumlah keranjang
}

// Fungsi untuk paket dengan item yang bisa dipilih via checkbox
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
    } else { // Mode "individual"
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
    addToCart(newItemForCart);
}

// Fungsi untuk mengarahkan pencarian
function handleSearch() {
    const inputElement = document.getElementById("searchInput");
    if (!inputElement) return;
    const input = inputElement.value.trim();
    if (input) {
        window.location.href = `https://maizu28.github.io/pimonjokiid/Support%20File/Genshin%20Impact/Semua%20Pesanan%20gi.html?query=${encodeURIComponent(input)}`;
    } else {
        alert("Masukkan kata kunci pencarian.");
    }
}

// Fungsi untuk mengirim pesanan ke WhatsApp
function orderNow(buttonElement) {
    const packageCard = buttonElement.closest('.package-card');
    if (!packageCard) {
        console.error("orderNow: Tidak dapat menemukan .package-card terkait tombol.");
        alert("Terjadi kesalahan, silakan coba lagi.");
        return;
    }
    const mainPackageNameElement = packageCard.querySelector('h2');
    const mainPackageName = mainPackageNameElement ? mainPackageNameElement.textContent.trim() : "Paket Pilihan";
    let packageDetailsString = mainPackageName; 

    let selectedCheckboxes = packageCard.querySelectorAll('ul.selectable-item-list input.selectable-sub-item:checked');
    if (selectedCheckboxes.length === 0) {
        selectedCheckboxes = packageCard.querySelectorAll('ul.quest-list input[type="checkbox"]:checked');
    }

    if (selectedCheckboxes.length > 0) {
        const selectedItemNames = [];
        selectedCheckboxes.forEach(checkbox => {
            selectedItemNames.push(checkbox.value); 
        });
        if (selectedItemNames.length > 0) {
            packageDetailsString += ":\n"; 
            selectedItemNames.forEach(name => {
                packageDetailsString += `  - ${name}\n`; 
            });
            packageDetailsString = packageDetailsString.trimEnd(); 
        }
    }
    const gameName = packageCard.dataset.game || "Genshin Impact";
    const messageText = `Halo Atmin, saya ingin memesan joki game ${gameName}:\n\n${packageDetailsString}\n\nApakah masih tersedia? Terima kasih!`;
    const whatsappNumber = "6285150893694";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappLink, '_blank');
}


// === SEMUA LOGIKA YANG BERJALAN SETELAH DOM SIAP ===
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM siap, menjalankan setup Pimonjoki.js...");

    // --- 1. Setup Badge Promo Dinamis ---
    document.querySelectorAll(".package-card").forEach(card => {
        if (card.querySelector(".price-discount")) {
            if (!card.querySelector(".badge-discount")) { 
                const badge = document.createElement("span");
                badge.className = "badge-discount";
                badge.innerText = "PROMO"; 
                card.insertBefore(badge, card.firstChild); 
            }
        }
    });

    // --- 2. Setup Listener untuk Tombol ".add-to-cart" Generik ---
    const genericAddToCartButtons = document.querySelectorAll(".add-to-cart");
    genericAddToCartButtons.forEach((btn) => {
        if (!btn.onclick) { 
            btn.addEventListener("click", () => {
                const item = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: btn.dataset.price,
                    game: btn.dataset.game || "Genshin Impact",
                };
                if (item.id && item.name && item.price) {
                    addToCart(item); 
                } else {
                    console.warn("Tombol .add-to-cart tanpa atribut data-* yang cukup:", btn);
                    alert("Detail produk tidak lengkap untuk ditambahkan ke keranjang.");
                }
            });
        }
    });

    // --- 3. Setup Pencarian (Enter Key & Isi dari URL) ---
    const searchInputElement = document.getElementById("searchInput");
    if (searchInputElement) {
        searchInputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSearch(); 
            }
        });

        const params = new URLSearchParams(window.location.search);
        const query = params.get("query");
        if (query) {
            searchInputElement.value = query;
            // filterProductCardsOnPage(); // Aktifkan jika ingin filter otomatis saat halaman dimuat dengan query
        }
    }

    // --- 4. Setup Navigasi Slide-in (Burger Menu) ---
    const burgerBtn = document.getElementById('burgerBtn');
    const slideInNav = document.getElementById('slideInNav');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const overlayScreen = document.getElementById('overlayScreen');

    function toggleNav() {
        if (slideInNav) slideInNav.classList.toggle('nav-active');
        if (burgerBtn) burgerBtn.classList.toggle('burger-active');
        if (overlayScreen) {
            overlayScreen.style.display = slideInNav && slideInNav.classList.contains('nav-active') ? 'block' : 'none';
            if (slideInNav && slideInNav.classList.contains('nav-active')) {
                 setTimeout(() => overlayScreen.classList.add('overlay-active'), 10); // Untuk transisi opacity
            } else {
                 overlayScreen.classList.remove('overlay-active');
            }
        }
        // document.body.style.overflow = slideInNav && slideInNav.classList.contains('nav-active') ? 'hidden' : '';
    }

    if (burgerBtn) burgerBtn.addEventListener('click', toggleNav);
    if (navCloseBtn) navCloseBtn.addEventListener('click', toggleNav);
    if (overlayScreen) overlayScreen.addEventListener('click', toggleNav);

    if (slideInNav) {
        slideInNav.querySelectorAll('.nav-links a, .account-actions-nav a, .account-actions-nav button').forEach(link => {
            link.addEventListener('click', (event) => {
                // Hanya tutup jika bukan tombol logout (karena logout akan redirect)
                // atau jika link adalah navigasi internal (#)
                if (slideInNav.classList.contains('nav-active')) {
                    if (event.currentTarget.id !== 'logoutBtn' && !event.currentTarget.href.endsWith('#')) {
                        // toggleNav(); // Komentari jika tidak ingin menutup otomatis
                    }
                }
            });
        });
    }

    // --- 5. Manajemen Status Login Pengguna (Update UI Header) ---
    // Ini membutuhkan instance 'auth' dari Firebase.
    // Pastikan 'auth' sudah diinisialisasi dan diimpor dengan benar jika Anda mengaktifkan blok ini.
    
    if (typeof auth !== 'undefined' && auth) {
        const loginLink = document.getElementById('loginLink');
        const userInfoDiv = document.getElementById('userInfo');
        const userDisplayNameSpan = document.getElementById('userDisplayName');
        const logoutBtn = document.getElementById('logoutBtn');

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("PIMONJOKI.JS - Pengguna login:", user.displayName || user.email);
                if (loginLink) loginLink.style.display = 'none';
                if (userInfoDiv) userInfoDiv.style.display = 'flex';
                if (userDisplayNameSpan) userDisplayNameSpan.textContent = user.displayName || user.email;
                if (logoutBtn) {
                    const newLogoutBtn = logoutBtn.cloneNode(true);
                    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
                    newLogoutBtn.addEventListener('click', async () => {
                        try {
                            await signOut(auth);
                            window.location.href = 'login.html';
                        } catch (error) { console.error('Error logout:', error); }
                    });
                }
            } else {
                console.log("PIMONJOKI.JS - Tidak ada pengguna yang login.");
                if (loginLink) loginLink.style.display = 'inline-block';
                if (userInfoDiv) userInfoDiv.style.display = 'none';
                if (userDisplayNameSpan) userDisplayNameSpan.textContent = '';
            }
        });
    } else {
        console.warn("PIMONJOKI.JS - Firebase Auth tidak diinisialisasi. UI Header mungkin tidak update dengan benar.");
        const loginLink = document.getElementById('loginLink');
        const userInfoDiv = document.getElementById('userInfo');
        if (loginLink) loginLink.style.display = 'inline-block';
        if (userInfoDiv) userInfoDiv.style.display = 'none';
    }
    
}); // Akhir dari DOMContentLoaded


// === Jadikan Fungsi yang Dipanggil dari HTML Global ===
// Jika file ini dimuat sebagai <script type="module">
window.handleSearch = handleSearch;
window.addSelectedItemsToCart = addSelectedItemsToCart;
window.orderNow = orderNow;
// Jika ada fungsi lain yang dipanggil via onclick dari HTML, daftarkan juga di sini.
// window.filterProductCardsOnPage = filterProductCardsOnPage; // Jika Anda membuat tombol untuk ini