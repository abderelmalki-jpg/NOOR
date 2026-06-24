import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profileRef = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(profileRef);
        if (snap.exists()) setUserProfile(snap.data());
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const profileRef = doc(db, 'users', cred.user.uid);
    const profile = {
      uid: cred.user.uid,
      displayName,
      email,
      createdAt: serverTimestamp(),
      goals: [],
      reminderTimes: [],
      theme: 'light',
      language: 'fr',
      premium: false,
      onboardingComplete: false
    };
    await setDoc(profileRef, profile);
    setUserProfile(profile);
    return cred;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const syncGoogleProfile = async (firebaseUser) => {
    const profileRef = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(profileRef);
    if (!snap.exists()) {
      const profile = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || '',
        email: firebaseUser.email,
        createdAt: serverTimestamp(),
        goals: [],
        reminderTimes: [],
        theme: 'light',
        language: 'fr',
        premium: false,
        onboardingComplete: false
      };
      await setDoc(profileRef, profile);
      setUserProfile(profile);
    } else {
      setUserProfile(snap.data());
    }
  };

  const loginWithGoogle = async () => {
    if (Capacitor.isNativePlatform()) {
      // signInWithPopup doesn't work inside a WebView — use the native Google Sign-In flow,
      // then hand its ID token to the Firebase JS SDK so the rest of the app keeps working unchanged.
      const result = await FirebaseAuthentication.signInWithGoogle();
      const credential = GoogleAuthProvider.credential(result.credential?.idToken);
      const userCred = await signInWithCredential(auth, credential);
      await syncGoogleProfile(userCred.user);
      return userCred;
    }
    const cred = await signInWithPopup(auth, new GoogleAuthProvider());
    await syncGoogleProfile(cred.user);
    return cred;
  };

  const logout = () => signOut(auth);

  const updateUserProfile = async (data) => {
    if (!user) return;
    const profileRef = doc(db, 'users', user.uid);
    await setDoc(profileRef, data, { merge: true });
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, register, login, loginWithGoogle, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
