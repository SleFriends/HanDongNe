import { initializeApp } from 'firebase/app';
import { getAuth, deleteUser } from 'firebase/auth'; // Auth 연결
import { getFirestore, collection, addDoc , doc, getDoc, updateDoc, setDoc, getDocs} from "firebase/firestore"; // Database 연결
import { getStorage } from "firebase/storage"; // storage 연결

// Firebase 구성 객체
const firebaseConfig = {
  apiKey: "AIzaSyDdgBJW-Jl2RWN_JpJslwtDapIIhqBZPXw",
  authDomain: "handongne1.firebaseapp.com",
  projectId: "handongne1",
  storageBucket: "handongne1.appspot.com",
  messagingSenderId: "873309380868",
  appId: "1:873309380868:web:3dd0b868ff4cf07f16f051",
  measurementId: "G-FBT49TJ39H"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 유저 정보 관리
const dbService = getFirestore(app); // DB 관리
const storage = getStorage(app); // 파일이나 사진등 텍스트가 아닌 내용 저장

//export { app, auth, dbService, storage, collection, addDoc,doc, getDoc, updateDoc, getDocs}; // 다른 파일에서 사용할 수 있도록 export
export { auth, dbService, collection, addDoc, doc, updateDoc, getDoc, setDoc, getDocs, deleteUser }; // 다른 파일에서 사용할 수 있도록 export

