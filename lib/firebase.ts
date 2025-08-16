// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBRtXmsvOjEFo6UAJL8jI1L5ZcQUtlrYt0",
  authDomain: "mtc-e-learning.firebaseapp.com",
  projectId: "mtc-e-learning",
  storageBucket: "mtc-e-learning.firebasestorage.app",
  messagingSenderId: "95303408712",
  appId: "1:95303408712:web:7d35aface550a8f728cc7d"
};


// Initialize Firebase (check to prevent re-initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
