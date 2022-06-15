import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth  = firebase.initializeApp ({
    apiKey: "AIzaSyBOTCiPhMfIXzcaxro6JbFbCPO9pCm5SgQ",
    authDomain: "unichat-78ea2.firebaseapp.com",
    projectId: "unichat-78ea2",
    storageBucket: "unichat-78ea2.appspot.com",
    messagingSenderId: "11219676735",
    appId: "1:11219676735:web:f48ce21db40586ad8ed28a",
    measurementId: "G-8JSCM4JZ7W"
  }).auth();