// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyArG9OF-g0VqOepE8eVO_s8_AwjbxvEYN4",
  authDomain: "ibuilder-561ae.firebaseapp.com",
  projectId: "ibuilder-561ae",
  storageBucket: "ibuilder-561ae.appspot.com",
  messagingSenderId: "369325995638",
  appId: "1:369325995638:web:668fe1661fcace3e87d157"
};

const app = initializeApp(firebaseConfig);
export const fire = getFirestore(app)
export const auth = getAuth()
