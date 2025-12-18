// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Tes infos Firebase (à remplacer par les tiennes)
const firebaseConfig = {
  apiKey: "AIzaSyBuy2iUZsjZngsY9vRpxm7VLgdqc8DRLbs",
  authDomain: "bankrewmi-b087a.firebaseapp.com",
  projectId: "bankrewmi-b087a",
  storageBucket: "bankrewmi-b087a.firebasestorage.app",
  messagingSenderId: "977446773638",
  appId: "1:977446773638:web:88e42a1fd9fba5abe58207",
  measurementId: "G-EB33B05NT8"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Authentification Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
