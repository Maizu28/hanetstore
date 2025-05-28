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