// import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
/**
 * La nueva version de firebase es la 9.0.0 y para que funcione con la de el curso que es la 7.algo se debe importar de compat
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCmumD0Rw-HtrAOBYcmL1kjjn-S5E4h_p0',
  authDomain: 'react-app-cursos-20604.firebaseapp.com',
  projectId: 'react-app-cursos-20604',
  storageBucket: 'react-app-cursos-20604.appspot.com',
  messagingSenderId: '969986141843',
  appId: '1:969986141843:web:5cdad22878749305f16766',
};

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
