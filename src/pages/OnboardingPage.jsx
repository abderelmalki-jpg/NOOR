import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    emoji: '☽',
    title: 'Bienvenue dans Nour',
    subtitle: 'نور',
    body: 'Un espace calme et privé pour prendre soin de ton âme — à travers le dhikr, la respiration guidée, le journal et le suivi émotionnel.'
  },
  {
    emoji: '🤲',
    title: 'Inspiré du Coran et de la Sunna',
    subtitle: null,
    body: 'Adhkâr, douas, les 40 Rabbana et les Hadiths de l\'imam An-Nawawi — un contenu authentique pour nourrir ton lien avec Allah à chaque instant.'
  },
  {
    emoji: '💭',
    title: 'Prends soin de ton âme',
    subtitle: null,
    body: 'Suis ton humeur au fil des jours et écris librement dans un journal privé, chiffré et à toi seul(e).'
  },
  {
    emoji: '🌬',
    title: 'Respire, recentre-toi',
    subtitle: null,
    body: 'Des exercices de respiration guidée pour calmer le mental, avant la salâh, au coucher, ou dès que tu en as besoin.'
  },
  {
    emoji: '🤝',
    title: 'Tu n\'es jamais seul(e)',
    subtitle: null,
    body: 'Un annuaire de psychologues musulmans et d\'institutions reconnues, et les numéros d\'urgence de ton pays, toujours à portée de main.'
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  const goToLogin = () => {
    localStorage.setItem('nour_onboarding_seen', '1');
    navigate('/login');
  };

  const handleNext = () => {
    if (isLast) goToLogin();
    else setStep(step + 1);
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--beige)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Skip */}
      <button
        onClick={goToLogin}
        aria-label="Passer"
        style={{
          position: 'absolute',
          top: 'calc(1.25rem + env(safe-area-inset-top))',
          right: '1.25rem',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--charcoal-light)',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        ✕
      </button>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: 'calc(3.5rem + env(safe-area-inset-top)) 1rem 0' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            style={{
              width: i === step ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === step ? 'var(--green-mid)' : 'var(--border)',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{slide.emoji}</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600', color: 'var(--green-deep)', marginBottom: '0.35rem' }}>{slide.title}</h1>
        {slide.subtitle && (
          <p className="arabic" style={{ fontSize: '1.4rem', color: 'var(--gold-muted)', marginBottom: '1rem' }}>{slide.subtitle}</p>
        )}
        <p style={{ color: 'var(--charcoal-mid)', lineHeight: '1.7', fontSize: '1rem' }}>{slide.body}</p>
      </div>

      <div style={{ padding: '1rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom))' }}>
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
          <button onClick={() => setStep(step - 1)} style={{ width: '100%', marginTop: '0.6rem', color: 'var(--charcoal-light)', fontSize: '0.9rem', padding: '0.5rem' }}>
            Retour
          </button>
        )}
      </div>
    </div>
  );
}
