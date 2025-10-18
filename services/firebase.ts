import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: Replace with your own Firebase project configuration.
// You can find this in your project's settings in the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyCv7f9LFV3kUb3ll8NXiRxvL3KRHbwl-o8",
  authDomain: "zenithfitness-21f2a.firebaseapp.com",
  projectId: "zenithfitness-21f2a",
  storageBucket: "zenithfitness-21f2a.firebasestorage.app",
  messagingSenderId: "206981897513",
  appId: "1:206981897513:web:10c8dae92f9588549f2b38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };