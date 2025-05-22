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