// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiShYrVBLu7ISQQNi_vd89nQeeNaz53xw",
  authDomain: "dissertation-4dd1c.firebaseapp.com",
  projectId: "dissertation-4dd1c",
  storageBucket: "dissertation-4dd1c.appspot.com",
  messagingSenderId: "1002479227620",
  appId: "1:1002479227620:web:e5ac1ed5e80d98ee3112f1",
  measurementId: "G-48QNMKDF3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);