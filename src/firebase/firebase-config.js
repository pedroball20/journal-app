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
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyCmumD0Rw-HtrAOBYcmL1kjjn-S5E4h_p0',
//   authDomain: 'react-app-cursos-20604.firebaseapp.com',
//   projectId: 'react-app-cursos-20604',
//   storageBucket: 'react-app-cursos-20604.appspot.com',
//   messagingSenderId: '969986141843',
//   appId: '1:969986141843:web:5cdad22878749305f16766',
// };
// console.log(process.env);
// const firebaseConfigTesting = {
//   apiKey: 'AIzaSyBZdXeC5CSILgYVP9wruoyCa-_Q-WVS-Ms',
//   authDomain: 'prueba-6b73b.firebaseapp.com',
//   projectId: 'prueba-6b73b',
//   storageBucket: 'prueba-6b73b.appspot.com',
//   messagingSenderId: '870040021648',
//   appId: '1:870040021648:web:e0ad3e55afab33dbaac615',
//   measurementId: 'G-PGCP96M7RG',
// };

// if (process.env.NODE_ENV === 'test') {
//   //testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   //dev/prod
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
