// Fungsi untuk menampilkan Label Diskon
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".package-card").forEach((card) => {
    if (card.querySelector(".price-discount")) {
      const badge = document.createElement("span");
      badge.className = "badge-discount";
      badge.innerText = "PROMO!";
      card.insertBefore(badge, card.firstChild); // Letakkan sebelum elemen pertama
    }
  });
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
      };
      addToCart(item);
    });
  });
});
