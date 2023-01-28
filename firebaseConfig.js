import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOk1dhDo6OISuNRYELIfHhjmtVBmAclrY",
  authDomain: "begreen-2e7a7.firebaseapp.com",
  projectId: "begreen-2e7a7",
  storageBucket: "begreen-2e7a7.appspot.com",
  messagingSenderId: "449132039916",
  appId: "1:449132039916:web:6df2237a4376aaf0c9dfc9",
  measurementId: "G-EDW9M49LBB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase