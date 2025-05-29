function orderNow(packageName) {
    const whatsappLink = `https://wa.me/6285150893694?text=Halo%20Atmin,%20saya%20ingin%20memesan%20joki%20${encodeURIComponent(packageName)}%20game%20Genshin%20Impact.%20Apakah%20masih%20ada?%20Terima%20kasih!`;
    window.open(whatsappLink, '_blank');
  }

  
function searchCategory() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].getElementsByTagName("h3")[0].textContent.toLowerCase();
    if (title.includes(input)) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Fungsi untuk menampilkan Label Diskon
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".package-card").forEach(card => {
      if (card.querySelector(".price-discount")) {
        const badge = document.createElement("span");
        badge.className = "badge-discount";
        badge.innerText = "PROMO!";
        card.insertBefore(badge, card.firstChild); // Letakkan sebelum elemen pertama
      }
    });
  });


// Fungsi untuk pencarian kategori

  function handleSearch() {
    const input = document.getElementById("searchInput").value.trim();
    if (input) {
      window.location.href = `https://maizu28.github.io/pimonjokiid/Support%20File/Genshin%20Impact/Semua%20Pesanan%20gi.html?query=${encodeURIComponent(input)}`;
    } else {
      alert("Masukan kata kunci pencarian.");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchInput").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        handleSearch();
      }
    });

    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (query) {
      document.getElementById("searchInput").value = query;
    }
  });

  // Add to Cart
// File JavaScript Anda (misalnya, paketgi.js atau script.js)

// === BAGIAN 1: FUNGSI HELPER DAN INTI MANAJEMEN KERANJANG (Dari kode Anda) ===
function getCart() {
  // Lebih baik menggunakan versi yang lebih robust untuk menangani JSON parsing error
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
    // Mungkin tambahkan alert jika gagal simpan, misal karena storage penuh
  }
}

// Fungsi inti untuk menambahkan item ke keranjang (Dari kode Anda)
// Fungsi ini akan dipanggil oleh listener generik DAN oleh fungsi khusus checkbox
function addToCart(item) {
  let cart = getCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.qty += 1; // Selalu tambah 1 jika sudah ada
  } else {
    // Jika item baru, tambahkan dengan qty: 1.
    // Pastikan objek item yang masuk tidak memiliki qty, atau qty-nya diabaikan di sini.
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
  alert(`"${item.name}" berhasil ditambahkan ke keranjang.`);
}

// === BAGIAN 2: FUNGSI KHUSUS UNTUK PAKET DENGAN CHECKBOX (ARCHON QUEST, WORLD QUEST) ===
// Fungsi ini akan MENYIAPKAN item lalu MEMANGGIL addToCart() dari BAGIAN 1
function addSelectedToCart(buttonElement) {
  const packageCard = buttonElement.closest('.package-card');
  if (!packageCard) {
    console.error("Tombol tidak berada di dalam .package-card.");
    alert("Terjadi kesalahan internal (package card tidak ditemukan).");
    return;
  }

  const basePackageNameElement = packageCard.querySelector('h2');
  const basePackageName = basePackageNameElement ? basePackageNameElement.textContent : "Paket Pilihan";

  const selectedCheckboxes = packageCard.querySelectorAll('ul.quest-list input[type="checkbox"]:checked');
  if (selectedCheckboxes.length === 0) {
    alert(`Silakan pilih minimal satu item dari ${basePackageName}.`);
    return;
  }

  const selectedItemValues = [];
  selectedCheckboxes.forEach(checkbox => {
    selectedItemValues.push(checkbox.value);
  });

  const priceDiv = packageCard.querySelector('.price');
  let pricePerItem = 0;

  if (priceDiv && priceDiv.dataset.pricePerAct) {
    pricePerItem = parseInt(priceDiv.dataset.pricePerAct, 10);
  } else if (priceDiv) {
    const priceText = priceDiv.textContent;
    const priceMatch = priceText.match(/Rp\s*([\d.]+)/);
    if (priceMatch && priceMatch[1]) {
      pricePerItem = parseInt(priceMatch[1].replace(/\./g, ''), 10);
    }
  }

  if (isNaN(pricePerItem) || pricePerItem <= 0) {
    alert("Harga per item tidak valid. Pastikan atribut data-price-per-act ada dan benar pada elemen .price di HTML.");
    return;
  }

  const totalItemsSelected = selectedCheckboxes.length;
  const totalPrice = totalItemsSelected * pricePerItem;

  const sortedItemValues = [...selectedItemValues].sort();
  const selectionIdentifier = sortedItemValues.join('-').toLowerCase().replace(/\s+/g, '-');
  const idPrefix = basePackageName.toLowerCase().replace(/\s+/g, '-') || 'custom-package';
  const itemId = `${idPrefix}-${selectionIdentifier}`;
  const itemName = `${basePackageName} (${sortedItemValues.join(", ")})`;
  const formattedTotalPrice = `Rp ${totalPrice.toLocaleString('id-ID')}`;
  const gameName = packageCard.dataset.game || "Genshin Impact"; // Ambil dari data-game di card, atau default

  // Siapkan objek item untuk dikirim ke fungsi addToCart() inti
  // TIDAK perlu properti 'qty' di sini, karena fungsi addToCart() inti akan menanganinya.
  const itemForCart = {
    id: itemId,
    name: itemName,
    price: formattedTotalPrice,
    game: gameName
  };

  // Panggil fungsi addToCart() inti
  addToCart(itemForCart);
  // Alert akan ditampilkan oleh fungsi addToCart() inti.
}

// === BAGIAN 3: EVENT LISTENER GENERIK UNTUK TOMBOL .add-to-cart (Dari kode Anda, dengan penyesuaian) ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    // Pasang listener ini HANYA jika tombol TIDAK memiliki handler onclick di HTML.
    // Ini untuk mencegah eksekusi ganda pada tombol yang sudah punya onclick="addSelectedToCart(this)"
    // dan juga memiliki class "add-to-cart".
    if (!btn.onclick) {
      btn.addEventListener("click", () => {
        const item = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: btn.dataset.price,
          game: btn.dataset.game || "Genshin Impact", // Default jika tidak ada data-game
        };

        // Pastikan data dasar ada sebelum memanggil addToCart
        if (item.id && item.name && item.price) {
          addToCart(item); // Panggil fungsi addToCart() inti
        } else {
          console.warn("Tombol .add-to-cart tanpa onclick dan tanpa atribut data-* yang cukup:", btn);
          // Anda bisa menambahkan alert di sini jika mau, tapi biasanya ini adalah kesalahan konfigurasi HTML
        }
      });
    }
  });
});

