import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "jira-4aca0.firebaseapp.com",
  databaseURL: "https://jira-4aca0-default-rtdb.firebaseio.com",
  projectId: "jira-4aca0",
  storageBucket: "jira-4aca0.appspot.com",
  messagingSenderId: "815265243469",
  appId: "1:815265243469:web:1ea12ca3f952003f5ad704",
  measurementId: "G-6DZYC7VTDD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {
  db,
  auth,
  storage,
}