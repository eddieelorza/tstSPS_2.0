// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7OnAiF19B1HJISP4NpYNIZCavKs3caSk",
  authDomain: "fake-shop-d2807.firebaseapp.com",
  databaseURL: "https://fake-shop-d2807-default-rtdb.firebaseio.com",
  projectId: "fake-shop-d2807",
  storageBucket: "fake-shop-d2807.appspot.com",
  messagingSenderId: "928478379097",
  appId: "1:928478379097:web:e926d09a3fdc539dd64548"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;