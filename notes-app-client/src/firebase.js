import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPKPrr-P3qnhImtS-bpu9TB00xojMl9GE",
  authDomain: "notes-app-a7719.firebaseapp.com",
  projectId: "notes-app-a7719",
  storageBucket: "notes-app-a7719.appspot.com",
  messagingSenderId: "258973792177",
  appId: "1:258973792177:web:5ad44d9e67b68c616e6f90",
  measurementId: "G-VXNN08LYM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export { auth, provider, signInWithPopup };
