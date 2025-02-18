// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU04L27Jw9cEf8YqzWI6YhtC7s7TO1daE",
  authDomain: "muse-notes.firebaseapp.com",
  projectId: "muse-notes",
  storageBucket: "muse-notes.firebasestorage.app",
  messagingSenderId: "114946023886",
  appId: "1:114946023886:web:832d1b7638f62f22474b9f",
  measurementId: "G-WWS5KEK6W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);