import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNxlhgP125tclHDpB1izDhZe4mnczzghc",
    authDomain: "linkedin-clone-fcfdb.firebaseapp.com",
    projectId: "linkedin-clone-fcfdb",
    storageBucket: "linkedin-clone-fcfdb.appspot.com",
    messagingSenderId: "869020578516",
    appId: "1:869020578516:web:46c0fdced55f9678e18141",
    measurementId: "G-JKD9D46XPW"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };