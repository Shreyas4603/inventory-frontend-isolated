// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqn7_7xCH6I2qowH5e_8zlIa0gbZXeKDI",
  authDomain: "inventory-management-82e5f.firebaseapp.com",
  projectId: "inventory-management-82e5f",
  storageBucket: "inventory-management-82e5f.appspot.com",
  messagingSenderId: "618937699102",
  appId: "1:618937699102:web:31a2ade2f6427ccb96570f",
  measurementId: "G-H6NVKJN3Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);