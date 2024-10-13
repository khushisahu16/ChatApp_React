import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-7a8ee.firebaseapp.com",
  projectId: "reactchat-7a8ee",
  storageBucket: "reactchat-7a8ee.appspot.com",
  messagingSenderId: "463473708502",
  appId: "1:463473708502:web:d45e76dacfb3961315e877",
};


const app= initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore();
 export const storage=getStorage() ;