import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdYk5fUY4107kcXbKIjn-KaXEW_z1q_fk",
    authDomain: "acciojob-typingtest.firebaseapp.com",
    projectId: "acciojob-typingtest",
    storageBucket: "acciojob-typingtest.appspot.com",
    messagingSenderId: "32951564012",
    appId: "1:32951564012:web:811cf7dd18d7172b5157c9",
    measurementId: "G-E76PXTG7KM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const db = firebaseApp.firestore();

  export {auth , db};