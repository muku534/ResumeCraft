// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgUFm1p29mXsY6OYbgEDoH9YCWE5G-5hQ',
  authDomain: 'resumecarft.firebaseapp.com',
  projectId: 'resumecarft',
  storageBucket: 'resumecarft.appspot.com',
  messagingSenderId: '268519969614',
  appId: '1:268519969614:web:f9613edad420af25c5c41f',
  measurementId: 'G-ELCXGWDBCW'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage(app); // Exporting Firebase Storage
const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);
console.log("stotage", storage);


export { auth, db, storage };