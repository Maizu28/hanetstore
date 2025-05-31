import { auth, db } from './firebase-init.js'; // db = Firestore instance
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Ambil keranjang user dari Firestore
async function getCartFromAccount(userId) {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Gagal mengambil keranjang:", error);
    return [];
  }
}

// Simpan keranjang user ke Firestore
async function saveCartToAccount(userId, cart) {
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, { items: cart }, { merge: true });
  } catch (error) {
    console.error("Gagal menyimpan keranjang:", error);
  }
}

// Tambah item ke keranjang user di Firestore
async function addToCartAccount(item) {
  const user = auth.currentUser;
  if (!user) {
    alert("Silakan login untuk menambahkan ke keranjang.");
    return;
  }
  const userId = user.uid;
  let cart = await getCartFromAccount(userId);
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  await saveCartToAccount(userId, cart);
  alert(`"${item.name}" berhasil ditambahkan ke keranjang akun.`);
}

// Contoh penggunaan pada tombol:
document.addEventListener("DOMContentLoaded", function () {
  const genericAddToCartButtons = document.querySelectorAll(".add-to-cart");
  genericAddToCartButtons.forEach((btn) => {
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener("click", async () => {
        const item = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: btn.dataset.price,
          game: btn.dataset.game || "Genshin Impact",
        };
        if (item.id && item.name && item.price) {
          await addToCartAccount(item);
        } else {
          alert("Detail produk tidak lengkap untuk ditambahkan ke keranjang.");
        }
      });
    }
  });
});
