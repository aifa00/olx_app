import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMxuf3ZqCZ7YFfHIx40kwYHN3WoKhzUUo",
    authDomain: "olx-app-2492f.firebaseapp.com",
    projectId: "olx-app-2492f",
    storageBucket: "olx-app-2492f.appspot.com",
    messagingSenderId: "212664617867",
    appId: "1:212664617867:web:06367e890808430db1bd8e",
    measurementId: "G-R1CBJJ5M95"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();//root reference

