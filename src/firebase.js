import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCs_UbUMZDbG6prAoAOYp5KQFDkvstWydQ",
  authDomain: "auth-5d9d7.firebaseapp.com",
  projectId: "auth-5d9d7",
  storageBucket: "auth-5d9d7.firebasestorage.app",
  messagingSenderId: "945686362251",
  appId: "1:945686362251:web:8f96240a82d484b2117c8e",
  measurementId: "G-HXR1HGFY3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Provider with scopes to ensure profile picture and email
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// GitHub Provider with scopes to ensure profile picture and email
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("read:user");
githubProvider.addScope("user:email");
