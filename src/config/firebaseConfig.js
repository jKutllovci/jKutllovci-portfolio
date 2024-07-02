// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1KYRlGVQ1hPncHoPEDxHjKuwv2eKa3oA",
  authDomain: "jkutllovci-portfolio.firebaseapp.com",
  databaseURL: "https://jkutllovci-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jkutllovci-portfolio",
  storageBucket: "jkutllovci-portfolio.appspot.com",
  messagingSenderId: "439758250226",
  appId: "1:439758250226:web:132551445069bd9579706b",
  measurementId: "G-842SLSZMFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
