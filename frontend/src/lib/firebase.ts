import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnj8wPiKcsIMGddnEEQuPvmPCHpEtOMzw",
  authDomain: "flokken-99.firebaseapp.com",
  projectId: "flokken-99",
  storageBucket: "flokken-99.firebasestorage.app",
  messagingSenderId: "1028864549820",
  appId: "1:1028864549820:web:1519279e13c9a9ed5fc1b9",
  measurementId: "G-2F1WFNXRLG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Persistence not available in this browser');
    }
  });
}
