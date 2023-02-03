// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// From firebase/authentication module we are going to import "getAuth" function
import {getAuth , GoogleAuthProvider} from "firebase/auth"

import {getFirestore} from 'firebase/firestore'

// import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAT48bI_80KrmvglfeJhDfCZ94xxWFZECQ",
  authDomain: "fir-course-c03e1.firebaseapp.com",
  projectId: "fir-course-c03e1",
  storageBucket: "fir-course-c03e1.appspot.com",
  messagingSenderId: "732938328396",
  appId: "1:732938328396:web:345133d33eaeef69fa57e9",
  measurementId: "G-MGBGMYQMC0"
};

// Initialize Firebase
// Basically the below statement will allow us to acces all the firebase services in our app
const app = initializeApp(firebaseConfig);
// the above app is passed in "getAuth" function and we are exporting the constan so as to use in the whole project
export const auth = getAuth(app);

// Now we are using the "GoogleAuthProvider"
export const googleProvider = new GoogleAuthProvider();

// Now we are going to use variable "db" to access the "getFirestore" and will export the variable so that all other components in the project can use it

export const db = getFirestore(app);

// export const storage = getStorage(app);