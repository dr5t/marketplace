import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtLcFHFk2iU3jWdr9hxu_A_Nj_rw0J90o",
  authDomain: "vrindaa-marketplace.firebaseapp.com",
  projectId: "vrindaa-marketplace",
  storageBucket: "vrindaa-marketplace.firebasestorage.app",
  messagingSenderId: "748498472912",
  appId: "1:748498472912:web:e775aceff21249619073d5",
  measurementId: "G-PBH0VDY2Q9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testNotification() {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      title: "Real-time Magic Yarn 🧶",
      price: 25.0,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Success! Document written with ID: ", docRef.id);
    console.log("Check your website (localhost:3000) - you should see a notification!");
  } catch (e) {
    console.error("❌ Error adding document: ", e);
  }
}

testNotification();
