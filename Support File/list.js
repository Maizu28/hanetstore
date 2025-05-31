// list.js 



// Import fungsi inti initializeApp dari Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; // Ganti dengan versi SDK terbaru jika perlu

// Import fungsi untuk mendapatkan instance layanan Firebase yang Anda butuhkan
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"; // Jika Anda menggunakan Storage
// import { getFunctions } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-functions.js"; // Jika Anda menggunakan Functions

// TODO: GANTI DENGAN KONFIGURASI FIREBASE PROYEK ANDA YANG SEBENARNYA
// Anda bisa mendapatkan ini dari Firebase Console:
// Project settings > General > Your apps > Web app > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDrxaF4FPNlOLvjshhcXHNALD4nyNWQmQI", // GANTI JIKA INI HANYA CONTOH
  authDomain: "pimonjoki-440c9.firebaseapp.com",
  projectId: "pimonjoki-440c9",
  storageBucket: "pimonjoki-440c9.appspot.com", // Perbaiki jika ada typo (firebasestorage -> appspot) atau gunakan yang benar dari console
  messagingSenderId: "572593756351",
  appId: "1:572593756351:web:c74fa9b4f5f50960da4e0a",
  measurementId: "G-7FBBHTEVZH" // Opsional, untuk Google Analytics
};

// Inisialisasi Firebase App sekali saja di sini
const app = initializeApp(firebaseConfig);

// Dapatkan instance layanan Firebase yang Anda butuhkan dan ekspor
const auth = getAuth(app);
const db = getFirestore(app); // Contoh jika Anda menggunakan Firestore
// const storage = getStorage(app); // Contoh untuk Firebase Storage
// const functions = getFunctions(app); // Contoh untuk Firebase Functions (sesuaikan region jika perlu)

// Ekspor instance yang sudah diinisialisasi agar bisa digunakan di file JavaScript lain
export { app, auth, db /*, storage, functions */ };

// === FUNGSI UNTUK FILTER KARTU PRODUK DI HALAMAN INI ===
function filterProductCardsOnPage() {
    const inputElement = document.getElementById("searchInput");
    if (!inputElement) return; // Pastikan elemen ada

    const input = inputElement.value.toLowerCase();
    const cards = document.querySelectorAll(".package-card"); // Menggunakan .package-card

    cards.forEach(card => {
        let cardTextContent = "";
        const titleElement = card.querySelector("h2"); // Menggunakan h2
        if (titleElement) {
            cardTextContent += titleElement.textContent.toLowerCase();
        }
        // Tambahkan pencarian berdasarkan data-title jika ada dan relevan
        if (card.dataset.title) {
            cardTextContent += " " + card.dataset.title.toLowerCase();
        }
        // Anda juga bisa menambahkan pencarian berdasarkan konten <li> jika perlu
        // card.querySelectorAll("li").forEach(li => cardTextContent += " " + li.textContent.toLowerCase());

        if (cardTextContent.includes(input)) {
            card.style.display = ""; // Tampilkan kartu
        } else {
            card.style.display = "none"; // Sembunyikan kartu
        }
    });
}

// === FUNGSI UNTUK MENGARAHKAN PENCARIAN KE HALAMAN HASIL ===
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

// === FUNGSI KERANJANG (localStorage) ===
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
    // updateCartIconCount(); // Panggil fungsi untuk update ikon jumlah keranjang jika ada
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
    let priceCalculationMode = "individual"; // Default ke harga individual

    const pricePerActDiv = packageCard.querySelector('div[data-price-per-act]');
    let pricePerActFromCard = 0;

    if (pricePerActDiv && pricePerActDiv.dataset.pricePerAct) {
        pricePerActFromCard = parseInt(pricePerActDiv.dataset.pricePerAct, 10);
        if (!isNaN(pricePerActFromCard) && pricePerActFromCard > 0) {
            priceCalculationMode = "perAct";
        }
    }

    if (priceCalculationMode === "perAct") {
        totalPrice = selectedCheckboxes.length * pricePerActFromCard;
        selectedCheckboxes.forEach(checkbox => {
            selectedItemValues.push(checkbox.value);
            selectedItemUniqueIds.push(checkbox.value.toLowerCase().replace(/\s+/g, '-'));
        });
    } else { // Mode "individual"
        selectedCheckboxes.forEach(checkbox => {
            const itemPrice = parseInt(checkbox.dataset.price, 10); // Ambil harga dari data-price checkbox
            if (!isNaN(itemPrice) && itemPrice >= 0) { // Harga 0 mungkin valid untuk item gratis
                totalPrice += itemPrice;
                selectedItemValues.push(checkbox.value);
                // Gunakan data-quest-id jika ada untuk ID yang lebih stabil, fallback ke value
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
    
    if (selectedItemValues.length === 0) { // Double check jika semua item tidak valid harganya
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

    const newItemForCart = {
        id: itemId,
        name: itemName,
        price: formattedTotalPrice,
        game: gameName,
    };

    addToCart(newItemForCart); // Panggil fungsi addToCart inti
}


// === EVENT LISTENER UTAMA SETELAH DOM SIAP ===
document.addEventListener("DOMContentLoaded", function () {
    
    // --- Inisialisasi Badge Promo ---
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

    // --- Listener untuk tombol .add-to-cart generik ---
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

    // --- Listener untuk Pencarian dengan Enter & Mengisi input dari URL query ---
    const searchInputElement = document.getElementById("searchInput");
    if (searchInputElement) {
        searchInputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Mencegah submit form jika input ada di dalam form
                handleSearch(); // Panggil fungsi handleSearch yang mengarahkan ke halaman lain
                // Jika Anda ingin filter di halaman ini: filterProductCardsOnPage();
            }
        });

        // Isi input pencarian jika ada query di URL
        const params = new URLSearchParams(window.location.search);
        const query = params.get("query");
        if (query) {
            searchInputElement.value = query;
            // Jika Anda ingin filter otomatis saat halaman dimuat dengan query:
            // filterProductCardsOnPage(); 
        }
    }

    // --- (OPSIONAL) Manajemen Status Login Pengguna (Update UI Header) ---
    // Jika file ini juga bertanggung jawab untuk update header login/logout
    // Anda perlu mengimpor 'auth', 'onAuthStateChanged', 'signOut' dari Firebase
    // dan memastikan Firebase sudah diinisialisasi.
    
    const loginLink = document.getElementById('loginLink');
    const userInfoDiv = document.getElementById('userInfo');
    const userDisplayNameSpan = document.getElementById('userDisplayName');
    const logoutBtn = document.getElementById('logoutBtn');

    if (typeof auth !== 'undefined' && auth) { // Cek apakah auth sudah diinisialisasi
        onAuthStateChanged(auth, (user) => {
            if (user) {
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
                if (loginLink) loginLink.style.display = 'inline-block';
                if (userInfoDiv) userInfoDiv.style.display = 'none';
                if (userDisplayNameSpan) userDisplayNameSpan.textContent = '';
            }
        });
    } else {
        console.warn("Firebase Auth tidak ditemukan/diinisialisasi di pimonjoki.js. UI Header mungkin tidak update.");
        if (loginLink) loginLink.style.display = 'inline-block'; // Tampilkan login sebagai default
        if (userInfoDiv) userInfoDiv.style.display = 'none';
    }
    

}); // Akhir dari DOMContentLoaded


// === FUNGSI YANG DIPANGGIL DARI ATRIBUT ONCLICK HTML ===
// Agar fungsi ini bisa diakses dari HTML saat skrip dimuat sebagai module,
// Anda perlu menempelkannya ke objek window.
window.handleSearch = handleSearch;
window.addSelectedItemsToCart = addSelectedItemsToCart;
// Jika ada fungsi orderNow(this) yang dipanggil dari HTML, daftarkan juga:
// window.orderNow = function(buttonElement) { /* ... implementasi Anda ... */ };

// (Fungsi-fungsi lain yang mungkin Anda miliki atau akan tambahkan)
