import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        onClick={goToLogin}
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
    </div>
  );
}
