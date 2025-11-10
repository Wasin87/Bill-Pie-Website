// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwUVzZwQzMDhd-I74FQoM0LyonDgGolTo",
  authDomain: "smart-deals-c7f0b.firebaseapp.com",
  projectId: "smart-deals-c7f0b",
  storageBucket: "smart-deals-c7f0b.firebasestorage.app",
  messagingSenderId: "697207271777",
  appId: "1:697207271777:web:2d5c286f42f1a58c165520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);