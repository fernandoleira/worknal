import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBP1dMXfKPB-q0ltgAqBklmW7Nrqdnk2_M",
  authDomain: "worknal.firebaseapp.com",
  projectId: "worknal",
  storageBucket: "worknal.appspot.com",
  messagingSenderId: "919160196057",
  appId: "1:919160196057:web:a3e4c7d3af9a13f7b5a7c8",
  measurementId: "G-1GQL9E3CP9",
});

const db = firebaseApp.firestore();

export { db };