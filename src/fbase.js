import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdgBJW-Jl2RWN_JpJslwtDapIIhqBZPXw",
  authDomain: "handongne1.firebaseapp.com",
  projectId: "handongne1",
  storageBucket: "handongne1.appspot.com",
  messagingSenderId: "873309380868",
  appId: "1:873309380868:web:3dd0b868ff4cf07f16f051",
  measurementId: "G-FBT49TJ39H"
};

// Initialize the Firebase app with the config
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);
