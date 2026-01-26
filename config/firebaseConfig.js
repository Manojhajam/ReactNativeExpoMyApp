// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp9fQr5MQmK-XartW6yT6QyZMsuI-zEmI",
  authDomain: "dine-time-58358.firebaseapp.com",
  projectId: "dine-time-58358",
  storageBucket: "dine-time-58358.firebasestorage.app",
  messagingSenderId: "809142622258",
  appId: "1:809142622258:web:3615dc7dc2cc52762c042b",
  measurementId: "G-DMH29DZX7T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
