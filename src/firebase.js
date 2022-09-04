import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

import { firebaseConfig } from "./local/firebaseConfig";

// Initialize firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize firestore db
const db = getFirestore(firebaseApp);

export {db};
