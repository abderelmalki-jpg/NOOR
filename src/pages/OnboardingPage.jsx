import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GOALS = [
  { id: 'stress', label: 'Réduire le stress', emoji: '🌊' },
  { id: 'sadness', label: 'Gérer la tristesse', emoji: '🌧' },
  { id: 'anxiety', label: 'L\'anxiété', emoji: '💭' },
  { id: 'anger', label: 'La colère', emoji: '🔥' },
  { id: 'sleep', label: 'Mieux dormir', emoji: '🌙' },
  { id: 'motivation', label: 'Me motiver', emoji: '✨' },
  { id: 'spiritual', label: 'Me reconnecter spirituellement', emoji: '🤲' },
];

const REMINDER_TIMES = [
  { id: 'matin', label: 'Après Fajr', time: '06:00' },
  { id: 'midi', label: 'Avant Dhuhr', time: '12:00' },
  { id: 'aprem', label: 'Après Asr', time: '16:00' },
  { id: 'soir', label: 'Après Maghrib', time: '19:30' },
  { id: 'nuit', label: 'Avant de dormir', time: '22:00' },
];

const slides = [
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
    body: 'Des adhkâr authentiques, des douas pour chaque moment, des réflexions et des exercices de respiration ancrés dans la tradition islamique.'
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedReminders, setSelectedReminders] = useState([]);

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleReminder = (id) => {
    setSelectedReminders(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/register');
  };

  const stepContent = () => {
    if (step === 0 || step === 1) {
      const slide = slides[step];
      return (
        <div style={{ textAlign: 'center', padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{slide.emoji}</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '600', color: 'var(--green-deep)', marginBottom: '0.35rem' }}>{slide.title}</h1>
          {slide.subtitle && (
            <p className="arabic" style={{ fontSize: '1.4rem', color: 'var(--gold-muted)', marginBottom: '1rem' }}>{slide.subtitle}</p>
          )}
          <p style={{ color: 'var(--charcoal-mid)', lineHeight: '1.7', fontSize: '1rem' }}>{slide.body}</p>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div style={{ padding: '1.5rem', flex: 1 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--green-deep)' }}>Quels sont tes objectifs ?</h2>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Choisis tout ce qui te correspond</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {GOALS.map(g => (
              <button
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: `1.5px solid ${selectedGoals.includes(g.id) ? 'var(--green-mid)' : 'var(--border)'}`,
                  background: selectedGoals.includes(g.id) ? 'var(--green-light)' : 'var(--surface)',
                  color: selectedGoals.includes(g.id) ? 'var(--green-deep)' : 'var(--charcoal-mid)',
                  fontSize: '0.9rem',
                  fontWeight: selectedGoals.includes(g.id) ? '500' : '400',
                  transition: 'all 0.2s'
                }}
              >
                {g.emoji} {g.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div style={{ padding: '1.5rem', flex: 1 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--green-deep)' }}>Rappels quotidiens</h2>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Quand veux-tu être rappelé ? (optionnel)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {REMINDER_TIMES.map(r => (
              <button
                key={r.id}
                onClick={() => toggleReminder(r.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${selectedReminders.includes(r.id) ? 'var(--green-mid)' : 'var(--border)'}`,
                  background: selectedReminders.includes(r.id) ? 'var(--green-light)' : 'var(--surface)',
                  color: 'var(--charcoal)',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontWeight: '500' }}>{r.label}</span>
                <span style={{ color: 'var(--charcoal-light)', fontSize: '0.85rem' }}>{r.time}</span>
              </button>
            ))}
          </div>
          <div className="disclaimer">
            ⚠️ <strong>Avertissement important</strong><br />
            Cette application n'est pas un dispositif médical. Elle ne diagnostique pas, ne traite pas et ne prévient aucune maladie mentale ou physique. En cas de détresse sévère, contacte un professionnel de santé.
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--beige)', display: 'flex', flexDirection: 'column' }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '1.5rem 1rem 0' }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: i === step ? '24px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i === step ? 'var(--green-mid)' : 'var(--border)',
            transition: 'all 0.3s'
          }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {stepContent()}
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
          {step === 3 ? 'Commencer — بسم الله' : 'Continuer'}
        </button>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ width: '100%', marginTop: '0.6rem', color: 'var(--charcoal-light)', fontSize: '0.9rem', padding: '0.5rem' }}>
            Retour
          </button>
        )}
        {step === 0 && (
          <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '0.6rem', color: 'var(--charcoal-light)', fontSize: '0.9rem', padding: '0.5rem' }}>
            J'ai déjà un compte
          </button>
        )}
      </div>
    </div>
  );
}
