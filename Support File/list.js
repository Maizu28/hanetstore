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

// Impor instance 'auth' dari firebase-init.js (REKOMENDASI)
import { auth } from './firebase-init.js'; 
// Impor fungsi Firebase Auth yang dibutuhkan
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"; // Sesuaikan versi jika perlu

document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('loginLink');
    const userInfoDiv = document.getElementById('userInfo');
    const userDisplayNameSpan = document.getElementById('userDisplayName');
    const logoutBtn = document.getElementById('logoutBtn'); // Tombol logout di dalam userInfoDiv

    if (!auth) {
        console.error("Firebase Auth tidak terinisialisasi! Tombol login/logout tidak akan berfungsi dengan benar.");
        // Tampilkan tombol login sebagai default jika auth error
        if(loginLink) loginLink.style.display = 'inline-block';
        if(userInfoDiv) userInfoDiv.style.display = 'none';
        return;
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Pengguna sedang login
            console.log("Status Login: Pengguna login -", user.email, "(DisplayName:", user.displayName, ")");
            if (loginLink) loginLink.style.display = 'none';
            if (userInfoDiv) userInfoDiv.style.display = 'flex'; // Tampilkan info pengguna dan tombol logout
            if (userDisplayNameSpan) userDisplayNameSpan.textContent = user.displayName || user.email; // Tampilkan nama atau email

if (logoutBtn) {
    // Remove old event listeners by replacing the button with its clone
    const newLogoutBtn = logoutBtn.cloneNode(true);
    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
    newLogoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            console.log('Pengguna berhasil logout');
            // Redirect to login page or homepage after logout
            window.location.href = '/Login/login.js'; // Change if needed
        } catch (error) {
            console.error('Error saat logout:', error);
            alert('Gagal logout: ' + error.message);
        }
    });
}
        } else {
            // Pengguna sudah logout atau belum login
            console.log("Status Login: Tidak ada pengguna yang login.");
            if (loginLink) loginLink.style.display = 'inline-block'; // Tampilkan tombol/link Login
            if (userInfoDiv) userInfoDiv.style.display = 'none'; // Sembunyikan info pengguna dan tombol logout
            if (userDisplayNameSpan) userDisplayNameSpan.textContent = '';
        }
    });
});