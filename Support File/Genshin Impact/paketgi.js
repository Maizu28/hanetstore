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

// === FUNGSI SPESIFIK UNTUK PAKET DENGAN ITEM PILIHAN (ARCHON QUEST, WORLD QUEST) ===
function addSelectedToCart(buttonElement) {
  const packageCard = buttonElement.closest('.package-card');
  if (!packageCard) {
    console.error("Tombol tidak berada di dalam .package-card.");
    alert("Terjadi kesalahan internal.");
    return;
  }

  const basePackageNameElement = packageCard.querySelector('h2');
  const basePackageName = basePackageNameElement ? basePackageNameElement.textContent : "Paket Pilihan";

  // Selector yang lebih spesifik untuk checkbox di dalam .quest-list
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

  if (priceDiv && priceDiv.dataset.pricePerAct) { // Membaca data-price-per-act
    pricePerItem = parseInt(priceDiv.dataset.pricePerAct, 10);
  } else if (priceDiv) {
    const priceText = priceDiv.textContent;
    const priceMatch = priceText.match(/Rp\s*([\d.]+)/);
    if (priceMatch && priceMatch[1]) {
      pricePerItem = parseInt(priceMatch[1].replace(/\./g, ''), 10);
    }
  }

  if (isNaN(pricePerItem) || pricePerItem <= 0) {
    alert("Harga per item tidak valid. Pastikan ada data-price-per-act di HTML.");
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

// === SKRIP GENERIK UNTUK TOMBOL .add-to-cart (RAWAT AKUN MONTHLY, DLL) ===
// (Ini adalah skrip yang Anda berikan sebelumnya, dengan sedikit pengaman)
function genericAddToCart(itemData) { // Fungsi ini sekarang menerima objek itemData
  if (!itemData || !itemData.id || !itemData.name || !itemData.price) {
    // console.warn("Data item tidak lengkap untuk genericAddToCart, proses diabaikan.", itemData);
    // Tidak menampilkan alert agar tidak mengganggu jika tombol sudah ditangani onclick
    return;
  }
  let cart = getCart();
  const existing = cart.find((i) => i.id === itemData.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ game: "Genshin Impact", ...itemData, qty: itemData.qty || 1 });
  }
  saveCart(cart);
  alert(`"${itemData.name}" berhasil ditambahkan ke keranjang.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    if (!btn.onclick) { 
      btn.addEventListener("click", () => {
        const item = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: btn.dataset.price,
          game: btn.dataset.game || "Genshin Impact", 
        };
        if (item.id && item.name && item.price) {
          genericAddToCart(item);
        } else {
          console.warn("Tombol .add-to-cart tanpa onclick dan tanpa data-* yang cukup:", btn);
        }
      });
    }
    // Jika tombol memiliki class .add-to-cart DAN onclick yang memanggil addSelectedToCart,
    // maka addSelectedToCart akan dieksekusi dari HTML.
    // Listener generik ini tidak akan terpasang pada tombol tersebut karena kondisi if (!btn.onclick).
    // Ini adalah cara untuk memisahkan tugas.
  });
});

