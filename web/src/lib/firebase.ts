import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtLcFHFk2iU3jWdr9hxu_A_Nj_rw0J90o",
  authDomain: "vrindaa-marketplace.firebaseapp.com",
  projectId: "vrindaa-marketplace",
  storageBucket: "vrindaa-marketplace.firebasestorage.app",
  messagingSenderId: "748498472912",
  appId: "1:748498472912:web:e775aceff21249619073d5",
  measurementId: "G-PBH0VDY2Q9",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
