import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MoodPage from './pages/MoodPage';
import JournalPage from './pages/JournalPage';
import BreathingPage from './pages/BreathingPage';
import ContentPage from './pages/ContentPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import WelcomePage from './pages/WelcomePage';
import Layout from './components/Layout';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100dvh', background:'var(--beige)' }}>
    <div style={{ textAlign:'center' }}>
      <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>☽</div>
      <p style={{ color:'var(--charcoal-light)', fontSize:'0.9rem' }}>Chargement…</p>
    </div>
  </div>;
  if (!user) return <Navigate to={localStorage.getItem('nour_onboarding_seen') ? '/login' : '/onboarding'} replace />;
  return children;
}

function AppRoutes() {
  const { user, userProfile } = useAuth();
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userProfile?.theme) setTheme(userProfile.theme);
  }, [userProfile]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let handle;
    CapacitorApp.addListener('backButton', () => {
      if (location.pathname === '/' || location.pathname === '/login') {
        CapacitorApp.exitApp();
      } else {
        navigate(-1);
      }
    }).then(h => { handle = h; });
    return () => { handle?.remove(); };
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="mood" element={<MoodPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="breathing" element={<BreathingPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
