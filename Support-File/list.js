// list.js (atau nama file utama Anda)

// === FUNGSI-FUNGSI UTILITAS ===

function getCart() {
    let cartData = [];
    try {
        const cartString = localStorage.getItem("hanetstore_cart");
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
        localStorage.setItem("hanetstore_cart", JSON.stringify(cart));
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
        window.location.href = `https://maizu28.github.io/hanetstore/Support%20File/search-menu/search-menu.html?query=${encodeURIComponent(input)}`;
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
    const whatsappNumber = "6285850131912";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappLink, '_blank');
}


// === SEMUA LOGIKA YANG BERJALAN SETELAH DOM SIAP ===
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM siap, menjalankan setup hanetstore.js...");

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
}); 
