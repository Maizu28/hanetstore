// firebase-init.js

// Import fungsi inti initializeApp dari Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; // Ganti dengan versi SDK terbaru jika perlu

// Import fungsi untuk mendapatkan instance layanan Firebase yang Anda butuhkan
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"; // Jika Anda menggunakan Storage
// import { getFunctions } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-functions.js"; // Jika Anda menggunakan Functions

// TODO: GANTI DENGAN KONFIGURASI FIREBASE PROYEK ANDA YANG SEBENARNYA
// Anda bisa mendapatkan ini dari Firebase Console:
// Project settings > General > Your apps > Web app > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDrxaF4FPNlOLvjshhcXHNALD4nyNWQmQI", // GANTI JIKA INI HANYA CONTOH
  authDomain: "pimonjoki-440c9.firebaseapp.com",
  projectId: "pimonjoki-440c9",
  storageBucket: "pimonjoki-440c9.appspot.com", // Perbaiki jika ada typo (firebasestorage -> appspot) atau gunakan yang benar dari console
  messagingSenderId: "572593756351",
  appId: "1:572593756351:web:c74fa9b4f5f50960da4e0a",
  measurementId: "G-7FBBHTEVZH" // Opsional, untuk Google Analytics
};

// Inisialisasi Firebase App sekali saja di sini
const app = initializeApp(firebaseConfig);

// Dapatkan instance layanan Firebase yang Anda butuhkan dan ekspor
const auth = getAuth(app);
const db = getFirestore(app); // Contoh jika Anda menggunakan Firestore
// const storage = getStorage(app); // Contoh untuk Firebase Storage
// const functions = getFunctions(app); // Contoh untuk Firebase Functions (sesuaikan region jika perlu)

// Ekspor instance yang sudah diinisialisasi agar bisa digunakan di file JavaScript lain
export { app, auth, db /*, storage, functions */ };