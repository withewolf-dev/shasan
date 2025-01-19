import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyCbs8sNWhXF4FDZNUz7j3htWMYr_oi3nj4",
  authDomain: "test-d21a3.firebaseapp.com",
  databaseURL: "https://test-d21a3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "test-d21a3",
  storageBucket: "test-d21a3.firebasestorage.app",
  messagingSenderId: "644534585455",
  appId: "1:644534585455:web:11b35349b53d67fdaa659a",
  measurementId: "G-S5X35E8W14"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const database = getDatabase(app);
export const firestore = getFirestore(app);