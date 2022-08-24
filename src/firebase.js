import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

import { firebaseConfig } from "./local/firebaseConfig";


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db};
