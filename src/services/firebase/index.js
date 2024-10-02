// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNup9HfLih21a8CtP3PGQQu3flt2GWh7g",
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
const auth = getAuth(app)

export {
    auth
}