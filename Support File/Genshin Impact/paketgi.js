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
function getCart() {
  return JSON.parse(localStorage.getItem("pimonjoki_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("pimonjoki_cart", JSON.stringify(cart));
}

function addToCart(item) {
  let cart = getCart();

  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
  alert(`"${item.name}" berhasil ditambahkan ke keranjang.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        game: btn.dataset.game,
      };
      addToCart(item);
    });
  });
});

// === FUNGSI HELPER UNTUK MANAJEMEN KERANJANG (localStorage) ===
// Pastikan fungsi-fungsi ini sudah ada di skrip Anda.
function getCart() {
  let cartData = [];
  try {
      const cartString = localStorage.getItem("pimonjoki_cart"); // Gunakan kunci yang konsisten
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
      localStorage.setItem("pimonjoki_cart", JSON.stringify(cart)); // Gunakan kunci yang konsisten
  } catch (error) {
      console.error("Error menyimpan keranjang ke localStorage:", error);
      alert("Gagal menyimpan keranjang. Penyimpanan browser mungkin penuh atau tidak diizinkan.");
  }
}

// === FUNGSI HELPER UNTUK MANAJEMEN KERANJANG (localStorage) ===
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

function saveCart(cart) {
  try {
      localStorage.setItem("pimonjoki_cart", JSON.stringify(cart));
  } catch (error) {
      console.error("Error menyimpan keranjang ke localStorage:", error);
  }
}

// === FUNGSI UTAMA UNTUK TOMBOL "+ KERANJANG" PADA KARTU PAKET DENGAN CHECKBOX ===
function addSelectedToCart(buttonElement) {
  const packageCard = buttonElement.closest('.package-card');
  if (!packageCard) {
    console.error("Tidak dapat menemukan .package-card terkait tombol.");
    alert("Terjadi kesalahan. Tidak dapat menambahkan ke keranjang.");
    return;
  }

  const basePackageNameElement = packageCard.querySelector('h2');
  const basePackageName = basePackageNameElement ? basePackageNameElement.textContent : "Paket Pilihan";

  const selectedCheckboxes = packageCard.querySelectorAll('.quest-list input[type="checkbox"]:checked');
  if (selectedCheckboxes.length === 0) {
    alert(`Silakan pilih minimal satu item dari ${basePackageName}.`);
    return;
  }

  const selectedItemValues = [];
  selectedCheckboxes.forEach(checkbox => {
    selectedItemValues.push(checkbox.value);
  });

  const priceDiv = packageCard.querySelector('.price');
  let pricePerItem = 0; // Mengganti nama variabel agar lebih umum

  if (priceDiv && priceDiv.dataset.pricePerAct) { // Tetap menggunakan pricePerAct jika itu nama data attribute Anda
    pricePerItem = parseInt(priceDiv.dataset.pricePerAct, 10);
  } else if (priceDiv) { 
    const priceText = priceDiv.textContent;
    const priceMatch = priceText.match(/Rp\s*([\d.]+)/);
    if (priceMatch && priceMatch[1]) {
      pricePerItem = parseInt(priceMatch[1].replace(/\./g, ''), 10);
    }
  }

  if (isNaN(pricePerItem) || pricePerItem <= 0) {
    alert("Harga per item tidak valid atau tidak dapat ditemukan. Pastikan atribut data-price-per-act ada dan benar.");
    console.error("Harga per item tidak valid atau tidak ditemukan. Nilai terambil: ", pricePerItem);
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

  // Asumsi game: "Genshin Impact". Jika bisa berbeda, tambahkan data-game di .package-card
  const gameName = packageCard.dataset.game || "Genshin Impact"; 

  const newItem = {
    id: itemId,
    name: itemName,
    price: formattedTotalPrice,
    game: gameName, 
    qty: 1                 
  };

  let cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === newItem.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += 1;
  } else {
    cart.push(newItem);
  }

  saveCart(cart);
  alert(`"${itemName}" (Total: ${formattedTotalPrice}) telah ditambahkan ke keranjang!`);
}

// Fungsi orderNow(packageName) akan membutuhkan implementasinya sendiri.
// function orderNow(packageName) {
//   // ...
// }