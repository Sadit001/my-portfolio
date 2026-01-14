import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For now we use placeholders. User must replace these in .env
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let db;
let auth;

try {
    if (!firebaseConfig.apiKey) {
        console.error("Firebase API Keys are missing! Check your .env file.");
        throw new Error("Missing Firebase Config");
    }
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} catch (error) {
    console.error("Firebase Initialization Error:", error);
    // Fallback dummies to prevent crash on import
    db = { type: 'dummy' };
    auth = { type: 'dummy' };
}

export { db, auth };
