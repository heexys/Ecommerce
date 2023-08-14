import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCxs5_l3J8ULAAvwCg3N4XEM4-KmcgckaY",
  authDomain: "ecommerce-940e7.firebaseapp.com",
  projectId: "ecommerce-940e7",
  storageBucket: "ecommerce-940e7.appspot.com",
  messagingSenderId: "18202036424",
  appId: "1:18202036424:web:b22bd02ad63e9d28bdbdfd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;