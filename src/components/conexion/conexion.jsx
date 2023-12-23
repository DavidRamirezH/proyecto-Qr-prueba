import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
        apiKey: "AIzaSyAvDE-9T6pIBDOOf4eyQ86-xVnjea0v5as",
        authDomain: "proyecto-qr-a107d.firebaseapp.com",     
        projectId: "proyecto-qr-a107d",     
        storageBucket: "proyecto-qr-a107d.appspot.com",     
        messagingSenderId: "868513670641",     
        appId: "1:868513670641:web:260edbd99c6dff565dd050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const Auth = getAuth(app)
export const storage = getStorage(app)


// Initialize Cloud Firestore and get a reference to the service

