// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5JbIh6oHOQPzCXFDG1wUsDCOcli0bdds",
  authDomain: "todo-300926.firebaseapp.com",
  databaseURL:
    "https://todo-300926-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-300926",
  storageBucket: "todo-300926.firebasestorage.app",
  messagingSenderId: "817732510298",
  appId: "1:817732510298:web:c31a445fd0293ee3d8ee63",
  measurementId: "G-E45CHS7Z22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
