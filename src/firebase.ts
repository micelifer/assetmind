// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2J7egXWqisJBMS9IW-4h32O6XhfGh6Os",
  authDomain: "assetmind-v2.firebaseapp.com",
  projectId: "assetmind-v2",
  storageBucket: "assetmind-v2.firebasestorage.app",
  messagingSenderId: "434894047551",
  appId: "1:434894047551:web:7b6318671ed1270759eb8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;