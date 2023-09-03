import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxlanjrJIcaKo62h4aTLg7ASsLkYKcXSI",
  authDomain: "maps-n-bags.firebaseapp.com",
  projectId: "maps-n-bags",
  storageBucket: "maps-n-bags.appspot.com",
  messagingSenderId: "779486675714",
  appId: "1:779486675714:web:886b4c7de816df9c48381b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);