// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUoSdP0NcP7CBJKJhuYe7oYxUqSOAZReo",
    authDomain: "virgo-ceeb6.firebaseapp.com",
    projectId: "virgo-ceeb6",
    storageBucket: "virgo-ceeb6.firebasestorage.app",
    messagingSenderId: "681417128727",
    appId: "1:681417128727:web:569da475d1d5c9d2d99552",
    measurementId: "G-DX4SYYE7ZH"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
