// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionall

// Add these into environment variables file
const firebaseConfig = {
  apiKey: "AIzaSyBuaLG3188ZJpJvV8c0UXQMwKesFxlQm8c",
  authDomain: "amzn-2-lbs.firebaseapp.com",
  projectId: "amzn-2-lbs",
  storageBucket: "amzn-2-lbs.appspot.com",
  messagingSenderId: "893985269382",
  appId: "1:893985269382:web:9a56c6f0216275c8225307",
  measurementId: "G-W9M24K7HNE"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();

// export const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// sss
// ... --- ... .- ....
