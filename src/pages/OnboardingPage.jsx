import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SLIDES = [
  {
    image: '/art-onboarding-cover.png',
    showText: false
  },
  {
    image: '/art-light-arch.png',
    title: 'Inspiré du Coran et de la Sunna',
    body: 'Adhkâr, douas, les 40 Rabbana et les Hadiths de l\'imam An-Nawawi — un contenu authentique pour nourrir ton lien avec Allah à chaque instant.'
  },
  {
    image: '/art-writing-man.png',
    title: 'Prends soin de ton âme',
    body: 'Suis ton humeur au fil des jours et écris librement dans un journal privé, chiffré et à toi seul(e).'
  },
  {
    image: '/art-arch-frame.png',
    title: 'Respire, recentre-toi',
    body: 'Des exercices de respiration guidée pour calmer le mental, avant la salâh, au coucher, ou dès que tu en as besoin.'
  },
  {
    image: '/art-light-arch.png',
    title: 'Tu n\'es jamais seul(e)',
    body: 'Un annuaire de psychologues musulmans et d\'institutions reconnues, et les numéros d\'urgence de ton pays, toujours à portée de main.'
  }
];

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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.85rem',
        background: 'white',
        color: '#333',
        border: '1.5px solid #e0e0e0',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        opacity: disabled ? 0.7 : 1,
        width: '100%'
      }}
    >
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

function AuthBottomSheet({ onClose, navigate }) {
  const { login, loginWithGoogle, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.password, form.name);
      }
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

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 20,
          backdropFilter: 'blur(2px)'
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 21,
          background: 'var(--beige, #F9F5EF)',
          borderRadius: '24px 24px 0 0',
          padding: '0 1.5rem calc(2rem + env(safe-area-inset-bottom))',
          animation: 'slideUp 0.32s cubic-bezier(0.32,0.72,0,1)',
          maxHeight: '88dvh',
          overflowY: 'auto'
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.75rem', paddingBottom: '0.5rem' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.15)' }} />
        </div>

        {/* Logo */}
        <div style={{ textAlign: 'center', padding: '0.75rem 0 1.25rem' }}>
          <img src="/logo-nour.png" alt="Nour" style={{ width: '120px' }} />
          <p style={{ color: 'var(--charcoal-light, #666)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {mode === 'login' ? 'Connecte-toi pour continuer' : 'Crée ton espace Nour'}
          </p>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.06)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setForm({ name: '', email: '', password: '' }); }}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: mode === m ? '600' : '400',
                background: mode === m ? 'white' : 'transparent',
                color: mode === m ? 'var(--charcoal, #1a1a1a)' : 'var(--charcoal-light, #666)',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {m === 'login' ? 'Se connecter' : 'Créer un compte'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {error && (
            <div style={{ background: 'var(--danger-bg, #FEE2E2)', color: 'var(--danger, #DC2626)', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.88rem' }}>
              {error}
            </div>
          )}
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Ton prénom"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder={mode === 'register' ? 'Mot de passe (min. 6 caractères)' : 'Mot de passe'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          {mode === 'register' && (
            <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-light, #888)', lineHeight: '1.5' }}>
              En créant un compte, tu acceptes que tes données de bien-être soient stockées de manière privée et sécurisée. Elles ne sont jamais partagées.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem',
              background: 'var(--green-deep, #2D5016)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1rem',
              opacity: loading ? 0.7 : 1,
              marginTop: '0.15rem'
            }}
          >
            {loading
              ? (mode === 'login' ? 'Connexion…' : 'Création…')
              : (mode === 'login' ? 'Se connecter' : 'Créer mon compte')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--charcoal-light, #888)', fontSize: '0.8rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border, #e5e5e5)' }} />
            ou
            <div style={{ flex: 1, height: '1px', background: 'var(--border, #e5e5e5)' }} />
          </div>

          <GoogleButton onClick={handleGoogle} disabled={loading} />
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showAuth, setShowAuth] = useState(false);

  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  const goToAuth = () => {
    localStorage.setItem('nour_onboarding_seen', '1');
    setShowAuth(true);
  };

  const handleNext = () => {
    if (isLast) goToAuth();
    else setStep(step + 1);
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--beige)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Background art */}
      <div
        key={slide.image}
        className="fade-in"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      {slide.showText !== false && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(45,80,22,0) 35%, rgba(20,30,12,0.78) 78%, rgba(15,22,9,0.92) 100%)', zIndex: 1 }} />
      )}

      {/* Skip */}
      <button
        onClick={goToAuth}
        aria-label="Passer"
        style={{
          position: 'absolute',
          top: 'calc(1.25rem + env(safe-area-inset-top))',
          right: '1.25rem',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          border: 'none',
          color: 'var(--charcoal)',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          backdropFilter: 'blur(4px)'
        }}
      >
        ✕
      </button>

      {/* Progress dots */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', gap: '6px', padding: 'calc(1.25rem + env(safe-area-inset-top)) 1rem 0' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            style={{
              width: i === step ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === step ? '#fff' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Text content */}
      {slide.showText !== false && (
        <div className="fade-in" style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 1.75rem 1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>{slide.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', fontSize: '0.95rem' }}>{slide.body}</p>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 5, padding: '0 1.5rem calc(1.5rem + env(safe-area-inset-bottom))' }}>
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--green-deep)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '0.01em'
          }}
        >
          {isLast ? 'Commencer — بسم الله' : 'Continuer'}
        </button>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ width: '100%', marginTop: '0.6rem', color: 'white', opacity: 0.8, fontSize: '0.9rem', padding: '0.5rem' }}>
            Retour
          </button>
        )}
      </div>

      {/* Auth bottom sheet */}
      {showAuth && (
        <AuthBottomSheet
          onClose={() => setShowAuth(false)}
          navigate={navigate}
        />
      )}
    </div>
  );
}
