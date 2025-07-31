import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIyQLXIxnoeZK07cmiFLUN1xEw2tGDNbw",
  authDomain: "fir-app-e73ec.firebaseapp.com",
  projectId: "fir-app-e73ec",
  storageBucket: "fir-app-e73ec.firebasestorage.app",
  messagingSenderId: "656827585423",
  appId: "1:656827585423:web:8d5bf59015e22b911c31fa",
  measurementId: "G-08CX0E4DJ2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);