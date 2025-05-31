// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNbAw9NjlZ0a1giftm7hx58rlwG8nkzOI",
  authDomain: "pimonjoki-c59a2.firebaseapp.com",
  projectId: "pimonjoki-c59a2",
  storageBucket: "pimonjoki-c59a2.firebasestorage.app",
  messagingSenderId: "990671465240",
  appId: "1:990671465240:web:ee3497afdd91b0b0e2cc6d",
  measurementId: "G-9DM1GTJBD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);