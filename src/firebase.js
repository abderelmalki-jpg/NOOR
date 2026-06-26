import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_3DTpVwwEFMIYbj_mw9n9kS5JXfPfbNI",
  authDomain: "noor-27215.firebaseapp.com",
  projectId: "noor-27215",
  storageBucket: "noor-27215.firebasestorage.app",
  messagingSenderId: "92160312647",
  appId: "1:92160312647:web:f211b5cb3e010f35c77862",
  measurementId: "G-GGRB63EKHM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export let analytics = null;
isSupported().then(supported => {
  if (supported) analytics = getAnalytics(app);
});

export default app;
