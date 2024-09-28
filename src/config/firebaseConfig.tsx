// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4PfC2nAPT5QTCCgCRtFlKGGJ8AMTyvU8",
    authDomain: "bibliotecapersonal-92d1a.firebaseapp.com",
    projectId: "bibliotecapersonal-92d1a",
    storageBucket: "bibliotecapersonal-92d1a.appspot.com",
    messagingSenderId: "1000312630128",
    appId: "1:1000312630128:web:486fc68756e7365e81bdb5"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});