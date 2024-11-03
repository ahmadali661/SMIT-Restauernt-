// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBBc5ExecLeXL-d6ka8rI5NbfapZxV6TYg",
//   authDomain: "e-commerce-web-app-39421.firebaseapp.com",
//   projectId: "e-commerce-web-app-39421",
//   storageBucket: "e-commerce-web-app-39421.appspot.com",
//   messagingSenderId: "595418059678",
//   appId: "1:595418059678:web:446e68f47c266315a0fc8f",
//   measurementId: "G-XMJM0BQFR2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const firestore = getFirestore(app);



// export {analytics,auth,firestore}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDev5njnlyz044xow7JlVL9A7Fo4xDZ5iI",
  authDomain: "smit-restauernt-app.firebaseapp.com",
  projectId: "smit-restauernt-app",
  storageBucket: "smit-restauernt-app.firebasestorage.app",
  messagingSenderId: "630745875551",
  appId: "1:630745875551:web:8ee50e463eeb7eddbe87ea",
  measurementId: "G-YLC0W9Q058"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {analytics,auth,firestore}
