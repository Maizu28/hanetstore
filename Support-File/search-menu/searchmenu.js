//kirim ke Whatsapp
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
  const messageText = `Halo Atmin, saya ingin memesan joki game ${gameName}: \n\n${packageDetailsString}\n\n Apakah masih tersedia? Terima kasih!`;
  const whatsappNumber = "6285150893694";// Nomor WhatsApp Anda
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  window.open(whatsappLink, '_blank');
}

//Search bar
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
      window.location.href = `https://thanets28.site/hanetstore/Support-File/search-menu/search-menu?query=${encodeURIComponent(input)}`;
    } else {
      alert("Masukan kata kunci pencarian.");
    }
  }

// Pencarian dengan Enter
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
  } else {
    selectedCheckboxes.forEach(checkbox => {
      const itemPrice = parseInt(checkbox.dataset.price, 10);
      if (!isNaN(itemPrice) && itemPrice >= 0) {
        totalPrice += itemPrice;
        selectedItemValues.push(checkbox.value);
        selectedItemUniqueIds.push(checkbox.dataset.questId || checkbox.value.toLowerCase().replace(/\s+/g, '-'));
      } else {
        console.warn(`Item "${checkbox.value}" tidak memiliki harga valid dan dilewati.`);
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

  const newItemForCart = {
    id: itemId,
    name: itemName,
    price: formattedTotalPrice,
    game: gameName,
  };

  addToCart(newItemForCart);
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
          addToCart(item); 
        } else {
          console.warn("Tombol .add-to-cart tanpa onclick dan tanpa atribut data-* yang cukup:", btn);
        }
      });
    }
  });
});

