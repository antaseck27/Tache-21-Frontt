// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeg3Ac7nEFAQ_nsYC5fo0aLjdHY-uQ2uE",
  authDomain: "banquerewmi.firebaseapp.com",
  projectId: "banquerewmi",
  storageBucket: "banquerewmi.appspot.com", 
  messagingSenderId: "9207360200",
  appId: "1:9207360200:web:40d2446d8834cdc68f53fd"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Auth Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
