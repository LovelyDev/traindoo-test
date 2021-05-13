import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC2F01GH8yLYbfZjlEm7MW8M5R8W2O7pSI",
    authDomain: "traindoo-61713.firebaseapp.com",
    projectId: "traindoo-61713",
    storageBucket: "traindoo-61713.appspot.com",
    messagingSenderId: "32426391416",
    appId: "1:32426391416:web:742e7fedd5a36943d03a8d",
    measurementId: "G-26KV7SNBCQ"
};

// Initialize Firebase
try {
	firebase.initializeApp(firebaseConfig);
	firebase.firestore();
	console.log("Firebase Initialized");
} catch (err) {
	console.log("Error Initializing Firebase");
}

export default firebase;
