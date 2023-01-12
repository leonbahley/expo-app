import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { REACT_APP_FIREBASE_KEY } from "@env";
console.log("REACT_APP_FIREBASE_KEY", REACT_APP_FIREBASE_KEY);

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: "expoapp-31b67.firebaseapp.com",
  projectId: "expoapp-31b67",
  storageBucket: "expoapp-31b67.appspot.com",
  messagingSenderId: "695288042758",
  appId: "1:695288042758:web:8512962996c90f93b8fa87",
};

export default firebase.initializeApp(firebaseConfig);
