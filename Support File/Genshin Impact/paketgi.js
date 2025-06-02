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
      window.location.href = `https://maizu28.github.io/pimonjokiid/Support%20File/Genshin%20Impact/Semua%20Pesanan%20gi.html?query=${encodeURIComponent(input)}`;
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


// Data quest karakter
const characterQuestsData = {
    Mondstadt: [
        { id: "cq_mon_diluc1", name: "Diluc - Act 1: Darknight Hero's Alibi", price: 10000 },
        { id: "cq_mon_Amber1", name: "Amber - Act 1: Wind, Courage and Wings", price: 10000 },
        { id: "cq_mon_Venti1", name: "Venti - Act 1: Should You Be Trapped in a Windless Land", price: 10000 },
        { id: "cq_mon_Jean1", name: "Jean - Act 1: Master's Day Off", price: 10000 },
        { id: "cq_mon_Razor1", name: "Razor - Act 1: The Meaning of Lupical", price: 10000 },
        { id: "cq_mon_Mona1", name: "Mona - Act 1: Beyond This World's Stars", price: 10000 },
        { id: "cq_mon_Lisa1", name: "Lisa - Act 1: Troublesome Work", price: 10000 },
        { id: "cq_mon_Klee1", name: "Klee - Act 1: True Treasure", price: 10000 },
        { id: "cq_mon_Kaeya1", name: "Kaeya - Act 1: Secret Pirate Treasure", price: 10000 },
        { id: "cq_mon_Albedo1", name: "Albedo - Act 1: Traveler Observation Report", price: 10000 },
        { id: "cq_mon_Eula1", name: "Eula - Act 1: The Spindrift Shall Never Return to the Sea", price: 10000 },
        
    ],
    Liyue: [
        { id: "cq_liy_xingqiu1", name: "Xingqiu - Act 1: Bookworm Swordsman", price: 10000 },
        { id: "cq_liy_xiangling1", name: "Xiangling - Act 1: Mondstadt Gastronomy Trip", price: 10000 },
        { id: "cq_liy_Zhongli1", name: "Zhongli - Act 1: Sal Flore", price: 10000 },
        { id: "cq_liy_Zhongli2", name: "Zhongli - Act 1: Act 2: No Mere Stone", price: 10000 },
        { id: "cq_liy_Tartaglia1", name: "Tartaglia - Act 1: Mighty Cyclops' Adventure", price: 10000 },
        { id: "cq_liy_Ganyu1", name: "Ganyu - Act 1: Sea of Clouds, Sea of People", price: 10000 },
        { id: "cq_liy_HuTao1", name: "Hu Tao - Act 1: Act 1: Yet the Butterfly Flutters Away", price: 10000 },
        { id: "cq_liy_Xiao1", name: "Xiao - Act 1: Butterfly's Dream", price: 10000 },
        { id: "cq_liy_Yelan1", name: "Yelan - Act 1: Calculated Gambit", price: 10000 },
        { id: "cq_liy_Xianyun1", name: "Xianyun - Act 1: A Thousand Moonlit Miles", price: 10000 },
    ],

    Inazuma: [
        { id: "cq_ina_Kazuha1", name: "Kazuha - Act 1: A Strange and Friendless Road", price: 10000 },
        { id: "cq_ina_yoimiya1", name: "Yoimiya - Act 1: Dreamlike Timelessness", price: 10000 },
        { id: "cq_ina_yoimiya2", name: "Yoimiya - Act 2: Star-Pickers' Passage", price: 10000 },
        { id: "cq_ina_Ayaka1", name: "Ayaka - Act 1: The Whispers of the Crane and the White Rabbit", price: 10000 },
        { id: "cq_ina_Kokomi1", name: "Kokomi - Act 1: Warriors' Dreams Like Spring Grass Renewing", price: 10000 },
        { id: "cq_ina_Raiden1", name: "Raiden - Act 1: Reflections of Mortality", price: 10000 },
        { id: "cq_ina_Raiden2", name: "Raiden - Act 2: Transient Dreams", price: 10000 },
        { id: "cq_ina_Itto1", name: "Itto - Act 1: Rise Up, Golden Soul", price: 10000 },
        { id: "cq_ina_YaeMiko1", name: "Yae Miko - Act 1: The Great Narukami Offering", price: 10000 },
        { id: "cq_ina_Ayato1", name: "Ayato - Act 1: The Firmiana Leaf Falls", price: 10000 },
        { id: "cq_ina_Chiori1", name: "Chiori - Act 1: When They Talk About Tonight", price: 10000 },
        { id: "cq_ina_Mizuki1", name: "Mizuki - Act 1: Dream Eater's Melancholia", price: 10000 },
        { id: "cq_ina_Baizhu1", name: "Baizhu - Act 1: The Heart of Healing", price: 10000 },
    ],

    Sumeru: [
        { id: "cq_sum_Tighnari1", name: "Tighnari - Act 1: The Unanswerable Problems", price: 10000 },
        { id: "cq_sum_Cyno1", name: "Cyno - Act 1: Sands of Solitude", price: 10000 },
        { id: "cq_sum_Cyno2", name: "Cyno - Act 2: Oathkeeper", price: 10000 },
        { id: "cq_sum_Nilou1", name: "Nilou - Act 1: To the Wise", price: 10000 },
        { id: "cq_sum_Nahida1", name: "Nahida - Act 1: Lingering Warmth", price: 10000 },
        { id: "cq_sum_Nahida2", name: "Nahida - Act 2: Homecoming", price: 10000 },
        { id: "cq_sum_Alhaitham1", name: "Alhaitham - Act 1: Illusions of the Mob", price: 10000 },
        { id: "cq_sum_Dehya1", name: "Dehya - Act 1: Lionsblood", price: 10000 },
        { id: "cq_sum_Tighnari1", name: "Tighnari - Act 1: The Unanswerable Problems", price: 10000 },
        { id: "cq_sum_Tighnari1", name: "Tighnari - Act 1: The Unanswerable Problems", price: 10000 },
    ],
    
    Fontaine: [
        { id: "cq_fon_Lyney1", name: "Lyney - Act 1: The Forgotten Thief", price: 10000 },
        { id: "cq_fon_Wriothesley1", name: "Wriothesley - Act 1: Reborn in the Land of Grievances", price: 10000 },
        { id: "cq_fon_Neuvillette1", name: "Neuvillette - Act 1: The Remains of the Past Day", price: 10000 },
        { id: "cq_fon_Furina1", name: "Furina - Act 1: The Little Oceanid", price: 10000 },
        { id: "cq_fon_Navia1", name: "Navia - Act 1: Braving the Tides Together", price: 10000 },
        { id: "cq_fon_Arlecchino1", name: "Arlecchino - Act 1: When the Hearth-Flame Goes Out", price: 10000 },
        { id: "cq_fon_Clorinde", name: "Clorinde - Act 1: Silent Night", price: 10000 },
        { id: "cq_fon_Sigewinne1", name: "Sigewinne - Act 1: The Warmth of Lies", price: 10000 },
        { id: "cq_fon_Emilie1", name: "Emilie - Act 1: Floral Debt, Blood Due", price: 10000 },
        { id: "cq_fon_Escoffier1", name: "Escoffier - Act 1: Treasured Above All", price: 10000 },
    ],

    Natlan: [
        { id: "cq_nat_Mualani1", name: "Mualani - Act 1: Journey to the Mysterious Island", price: 10000 },
        { id: "cq_nat_Kinich1", name: "Kinich - Act 1: Kinich's Deal", price: 10000 },
        { id: "cq_nat_Xilonen1", name: "Xilonen - Act 1: Melodious Chant", price: 10000 },
        { id: "cq_nat_Chasca1", name: "Chasca - Act 1: Guns and Wings", price: 10000 },
        { id: "cq_nat_Citlali1", name: "Citlali - Act 1: The Truth of the Battle of Seven Colors", price: 10000 },
        { id: "cq_nat_Mavuika1", name: "Mavuika - Act 1: Act 1: As the Blazing Sun", price: 10000 },
        { id: "cq_nat_Varesa1", name: "Varesa - Act 1: Mushroom Realm's Mystery", price: 10000 },
        { id: "cq_nat_Skirk1", name: "Skirik - Comingsoon", price: 10000 },
    ],
    // ... region lainnya
};

function populateCharacterQuests() {
    for (const region in characterQuestsData) {
        const questListElement = document.getElementById(`character-quest-${region.toLowerCase()}`);
        if (questListElement) {
            characterQuestsData[region].forEach(quest => {
                const listItem = document.createElement('li');
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'selectable-sub-item';
                checkbox.value = quest.name;
                checkbox.dataset.price = quest.price; // Menyimpan harga individual
                // checkbox.dataset.questId = quest.id; // Jika Anda punya ID unik untuk internal

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${quest.name} (Rp ${quest.price.toLocaleString('id-ID')})`));
                listItem.appendChild(label);
                questListElement.appendChild(listItem);
            });
        }
    }
}

// Panggil fungsi ini setelah DOM dimuat
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode Anda yang lain di DOMContentLoaded) ...
    if (document.getElementById('character-quest-mondstadt')) { // Cek apakah kita di halaman yang benar
         populateCharacterQuests();
    }
});