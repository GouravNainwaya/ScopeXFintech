// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "./config/details";
// import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "./config/details";

// import Constants from "expo-constants";
// import {  API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from "./details";

// import 'dotenv/config';

const firebaseConfig = {
    apiKey:"AIzaSyAUEhrmZ9GJ1-8yafXrg2RJyuUPL-khuuo",
    authDomain:"scopex-fintech-18997.firebaseapp.com",
    projectId:"scopex-fintech-18997",
    storageBucket:"scopex-fintech-18997.appspot.com",
    messagingSenderId:"892019028563",
    appId: "1:892019028563:web:b0de634a51b76c052ecca6"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
