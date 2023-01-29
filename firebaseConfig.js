import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAOk1dhDo6OISuNRYELIfHhjmtVBmAclrY",
  authDomain: "begreen-2e7a7.firebaseapp.com",
  projectId: "begreen-2e7a7",
  storageBucket: "begreen-2e7a7.appspot.com",
  messagingSenderId: "449132039916",
  appId: "1:449132039916:web:6df2237a4376aaf0c9dfc9",
  measurementId: "G-EDW9M49LBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase