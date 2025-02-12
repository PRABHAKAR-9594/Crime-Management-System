
import { initializeApp } from "firebase/app";
import {getStorage}  from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDwd3W_7wEdSJZ77pArr2JI04khuHj38BE",
  authDomain: "evidance-data.firebaseapp.com",
  projectId: "evidance-data",
  storageBucket: "evidance-data.firebasestorage.app",
  messagingSenderId: "757326079001",
  appId: "1:757326079001:web:87a801598991659785b688"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb =getStorage(app)