import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, userProfile, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(userProfile?.theme || 'light');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    await updateUserProfile({ theme: newTheme });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="page fade-in theme-rose">
      <div className="page-header page-header-hero" style={{ '--hero-image': "url('/art-reading-woman.png')" }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white' }}>Profil & Paramètres</h1>
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* User card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: '600', color: 'var(--accent-deep)', flexShrink: 0 }}>
            {user?.displayName?.charAt(0)?.toUpperCase() || '☽'}
          </div>
          <div>
            <p style={{ fontWeight: '600', fontSize: '1rem' }}>{user?.displayName || 'Utilisateur'}</p>
            <p style={{ color: 'var(--charcoal-light)', fontSize: '0.82rem' }}>{user?.email}</p>
            {userProfile?.premium ? (
              <span className="premium-badge" style={{ marginTop: '3px', display: 'inline-flex' }}>✦ Premium</span>
            ) : (
              <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-light)' }}>Compte gratuit</span>
            )}
          </div>
        </div>

        {/* Premium */}
        {!userProfile?.premium && (
          <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--gold-light)', border: '1px solid rgba(184,150,62,0.2)' }}>
            <p style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.25rem' }}>✦ Nour Premium</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-mid)', marginBottom: '0.75rem' }}>
              Bibliothèque complète, insights avancés, séries guidées, audio apaisants
            </p>
            <button style={{ padding: '0.6rem 1.25rem', background: 'var(--gold-muted)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}>
              {/* TODO: Implement premium subscription flow */}
              Découvrir Premium
            </button>
          </div>
        )}

        {/* Settings */}
        <p className="section-title">Paramètres</p>

        {/* Theme */}
        <div className="card" style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontWeight: '500', marginBottom: '0.75rem' }}>Apparence</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[['light', '☀️ Clair'], ['dark', '🌙 Sombre']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => handleThemeChange(val)}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${theme === val ? 'var(--accent-mid)' : 'var(--border)'}`,
                  background: theme === val ? 'var(--accent-light)' : 'transparent',
                  color: theme === val ? 'var(--accent-deep)' : 'var(--charcoal-mid)',
                  fontWeight: theme === val ? '500' : '400',
                  fontSize: '0.85rem'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders placeholder */}
        <div className="card" style={{ marginBottom: '0.75rem', opacity: 0.7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '500' }}>🔔 Rappels</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)' }}>Notifications quotidiennes</p>
            </div>
            {/* TODO: Implement push notifications via Cloud Functions */}
            <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', background: 'var(--border)', padding: '3px 8px', borderRadius: '10px' }}>Bientôt</span>
          </div>
        </div>

        {/* Language */}
        <div className="card" style={{ marginBottom: '0.75rem', opacity: 0.7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '500' }}>🌍 Langue</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)' }}>Français · العربية · English</p>
            </div>
            {/* TODO: Implement i18n */}
            <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', background: 'var(--border)', padding: '3px 8px', borderRadius: '10px' }}>Bientôt</span>
          </div>
        </div>

        {/* Data export */}
        <div className="card" style={{ marginBottom: '0.75rem' }}>
          <button style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '500' }}>📤 Exporter mes données</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)' }}>Journal et humeurs en JSON</p>
            </div>
            {/* TODO: Implement data export */}
            <span style={{ color: 'var(--accent-mid)' }}>→</span>
          </button>
        </div>

        {/* Support link */}
        <button
          onClick={() => navigate('/support')}
          style={{ width: '100%', textAlign: 'left', padding: '1rem 1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}
        >
          <p style={{ fontWeight: '500' }}>🆘 Soutien & ressources</p>
          <span style={{ color: 'var(--charcoal-light)' }}>→</span>
        </button>

        {/* Disclaimer */}
        <div className="disclaimer" style={{ marginBottom: '1.25rem' }}>
          ⚠️ Cette application n'est pas un dispositif médical. Elle ne diagnostique pas, ne traite pas et ne prévient aucune maladie.
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={{ width: '100%', padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--charcoal-mid)', marginBottom: '0.75rem', fontWeight: '500' }}>
          Se déconnecter
        </button>

        {/* Delete account */}
        {!showDeleteConfirm ? (
          <button onClick={() => setShowDeleteConfirm(true)} style={{ width: '100%', padding: '0.85rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
            Supprimer mon compte
          </button>
        ) : (
          <div className="card" style={{ borderColor: 'rgba(139,37,0,0.2)' }}>
            <p style={{ color: 'var(--danger)', fontWeight: '600', marginBottom: '0.5rem' }}>⚠️ Confirmer la suppression</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)', marginBottom: '1rem' }}>Toutes tes données seront supprimées définitivement. Cette action est irréversible.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--charcoal-mid)' }}>Annuler</button>
              <button
                style={{ flex: 1, padding: '0.75rem', background: 'var(--danger)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}
                onClick={() => {
                  // TODO: Implement account deletion with Cloud Function
                  alert('Fonctionnalité à implémenter avec Firebase Cloud Functions');
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--charcoal-light)', marginTop: '1.5rem' }}>
          Nour v1.0.0 · Fait avec ❤️ pour la Oumma
        </p>
      </div>
    </div>
  );
}
