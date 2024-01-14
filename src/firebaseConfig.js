// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANtaPCHJGaPYrjWiYDw0LZ1ACgC4lMN1I",
  authDomain: "task-1f3dd.firebaseapp.com",
  projectId: "task-1f3dd",
  storageBucket: "task-1f3dd.appspot.com",
  messagingSenderId: "251375684874",
  appId: "1:251375684874:web:226550441727d6b883bef3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
