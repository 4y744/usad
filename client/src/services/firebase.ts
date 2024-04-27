// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtzRl7cXtIKAixwCNrD04FcEN2eFaR1Ko",
  authDomain: "usad-app.firebaseapp.com",
  databaseURL: "https://usad-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "usad-app",
  storageBucket: "usad-app.appspot.com",
  messagingSenderId: "602773963350",
  appId: "1:602773963350:web:be384369b6c8e4b2c5f1f7",
  measurementId: "G-DSFKDP57EQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
