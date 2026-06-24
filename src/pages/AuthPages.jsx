import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function authErrorMessage(err) {
  switch (err?.code) {
    case 'auth/email-already-in-use': return 'Cet email est déjà utilisé par un autre compte.';
    case 'auth/invalid-email': return 'Adresse email invalide.';
    case 'auth/weak-password': return 'Le mot de passe doit contenir au moins 6 caractères.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Email ou mot de passe incorrect.';
    case 'auth/too-many-requests': return 'Trop de tentatives. Réessaie dans quelques minutes.';
    case 'auth/popup-closed-by-user': return '';
    case 'auth/operation-not-allowed': return 'Ce mode de connexion n\'est pas encore activé.';
    case 'auth/network-request-failed': return 'Problème de connexion réseau.';
    default: return `Une erreur est survenue (${err?.code || err?.message || 'inconnue'}).`;
  }
}

function GoogleButton({ onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{ padding: '0.9rem', background: 'white', color: 'var(--charcoal)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', fontWeight: '500', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', opacity: disabled ? 0.7 : 1 }}>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.73v2.27h2.92c1.71-1.57 2.69-3.88 2.69-6.64z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"/>
        <path fill="#FBBC05" d="M3.97 10.7c-.18-.54-.28-1.11-.28-1.7s.1-1.16.28-1.7V4.96H.96A8.99 8.99 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.34z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"/>
      </svg>
      Continuer avec Google
    </button>
  );
}

function AuthLayout({ children, title }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--beige)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/logo-nour.png" alt="Nour" style={{ width: '160px', marginBottom: '0.25rem' }} />
        <p style={{ color: 'var(--charcoal-light)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Connecte-toi pour continuer">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>{error}</div>}
        <input type="email" placeholder="Adresse email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Mot de passe" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button type="submit" disabled={loading} style={{ padding: '1rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--charcoal-light)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} /> ou <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>
        <GoogleButton onClick={handleGoogle} disabled={loading} />
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--charcoal-light)', fontSize: '0.9rem' }}>
        Pas encore de compte ?{' '}
        <Link to="/register" style={{ color: 'var(--green-mid)', fontWeight: '500', textDecoration: 'none' }}>Créer un compte</Link>
      </p>
      <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem' }}>
        <Link to="/onboarding" style={{ color: 'var(--charcoal-light)', textDecoration: 'none' }}>← Revoir l'introduction</Link>
      </p>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
      navigate('/');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Crée ton espace Nour">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>{error}</div>}
        <input type="text" placeholder="Ton prénom" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="email" placeholder="Adresse email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Mot de passe (min. 6 caractères)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <div className="disclaimer" style={{ fontSize: '0.78rem' }}>
          En créant un compte, tu acceptes que tes données de bien-être soient stockées de manière privée et sécurisée. Elles ne sont jamais partagées. Cette app n'est pas un dispositif médical.
        </div>
        <button type="submit" disabled={loading} style={{ padding: '1rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Création…' : 'Créer mon compte'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--charcoal-light)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} /> ou <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>
        <GoogleButton onClick={handleGoogle} disabled={loading} />
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--charcoal-light)', fontSize: '0.9rem' }}>
        Déjà un compte ?{' '}
        <Link to="/login" style={{ color: 'var(--green-mid)', fontWeight: '500', textDecoration: 'none' }}>Se connecter</Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
