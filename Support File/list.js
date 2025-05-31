import { auth, db } from './firebase-init.js'; // db = Firestore instance
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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


// (Dihapus: Inisialisasi dan ekspor Firebase, karena sudah dilakukan di firebase-init.js)

// pimonjoki.js atau script-utama.js

import { auth } from './firebase-init.js'; // Pastikan ini ada dan path-nya benar
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

console.log("PIMONJOKI.JS: Script loaded."); // Cek apakah file JS ini dimuat

document.addEventListener('DOMContentLoaded', () => {
    console.log("PIMONJOKI.JS: DOMContentLoaded event fired.");

    const loginLink = document.getElementById('loginLink');
    const userInfoDiv = document.getElementById('userInfo');
    const userDisplayNameSpan = document.getElementById('userDisplayName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Cek apakah elemen HTML ditemukan
    console.log("Login Link Element:", loginLink);
    console.log("User Info Div Element:", userInfoDiv);

    if (!auth) {
        console.error("PIMONJOKI.JS: Firebase Auth instance is NOT available!");
        // Jika auth tidak ada, tampilkan tombol login sebagai fallback
        if(loginLink) loginLink.style.display = 'inline-block';
        if(userInfoDiv) userInfoDiv.style.display = 'none';
        return;
    }
    console.log("PIMONJOKI.JS: Firebase Auth instance IS available. Attaching onAuthStateChanged listener.");

    onAuthStateChanged(auth, (user) => {
        console.log("PIMONJOKI.JS: onAuthStateChanged callback fired. User object:", user); // Cek apakah callback ini berjalan
        if (user) {
            console.log("PIMONJOKI.JS: User is logged in.");
            if (loginLink) loginLink.style.display = 'none';
            if (userInfoDiv) userInfoDiv.style.display = 'flex';
            if (userDisplayNameSpan) userDisplayNameSpan.textContent = user.displayName || user.email;

            if (logoutBtn) {
                // Remove old event listeners by replacing the button with its clone
                const newLogoutBtn = logoutBtn.cloneNode(true);
                logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);

                newLogoutBtn.addEventListener('click', async () => {
                    try {
                        await signOut(auth);
                        console.log('Pengguna berhasil logout');
                        window.location.href = 'login.html'; 
                    } catch (error) {
                        console.error('Error saat logout:', error);
                        alert('Gagal logout: ' + error.message);
                    }
                });
            }
        } else {
            console.log("PIMONJOKI.JS: User is logged out.");
            if (loginLink) loginLink.style.display = 'inline-block';
            if (userInfoDiv) userInfoDiv.style.display = 'none';
            if (userDisplayNameSpan) userDisplayNameSpan.textContent = '';
        }
    });
});