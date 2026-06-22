import { useState, useEffect, useRef } from 'react';
import { BREATHING_EXERCISES } from '../data/content';

const PHASES = {
  box: ['Inspire', 'Retiens', 'Expire', 'Retiens'],
  calm: ['Inspire', 'Retiens', 'Expire'],
  '478': ['Inspire', 'Retiens', 'Expire'],
  tasbih: ['Inspire', 'Retiens', 'Expire', 'Retiens'],
};

export default function BreathingPage() {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [circles, setCircles] = useState(1);
  const intervalRef = useRef(null);
  const { user } = { user: null }; // TODO: use useAuth

  const exercise = selected !== null ? BREATHING_EXERCISES[selected] : null;

  const getPhaseDurations = (ex) => {
    const base = [ex.inhale, ex.hold1, ex.exhale, ex.hold2].filter(v => v > 0);
    return base;
  };

  const startExercise = () => {
    if (!exercise) return;
    setPhase(0);
    setCountdown(exercise.inhale);
    setElapsed(0);
    setCircles(1);
    setActive(true);
  };

  const stopExercise = () => {
    setActive(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!active || !exercise) return;
    const durations = getPhaseDurations(exercise);
    let currentPhase = 0;
    let timeInPhase = 0;

    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        const newElapsed = prev + 1;
        if (newElapsed >= exercise.duration) {
          setActive(false);
          clearInterval(intervalRef.current);
        }
        return newElapsed;
      });

      timeInPhase++;
      setCountdown(durations[currentPhase] - timeInPhase + 1);

      if (timeInPhase >= durations[currentPhase]) {
        timeInPhase = 0;
        currentPhase = (currentPhase + 1) % durations.length;
        if (currentPhase === 0) setCircles(prev => prev + 1);
        setPhase(currentPhase);
        setCountdown(durations[currentPhase]);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [active]);

  const phaseNames = exercise ? PHASES[exercise.type] : [];
  const progress = exercise ? (elapsed / exercise.duration) * 100 : 0;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--green-deep)' }}>Respiration & Calme</h1>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.82rem' }}>Exerce-toi à la présence — الحضور</p>
        </div>
      </div>

      {!active ? (
        <div style={{ padding: '1.25rem' }}>
          {selected === null ? (
            <>
              <p style={{ color: 'var(--charcoal-mid)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>Choisis un exercice</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {BREATHING_EXERCISES.map((ex, i) => (
                  <button
                    key={ex.id}
                    onClick={() => { if (!ex.premium) setSelected(i); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      opacity: ex.premium ? 0.7 : 1
                    }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                      {ex.premium ? '🔒' : '🌬'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{ex.title}</p>
                        {ex.premium && <span className="premium-badge">✦ Premium</span>}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)' }}>{ex.description}</p>
                    </div>
                    <span style={{ color: 'var(--charcoal-light)', fontSize: '0.8rem' }}>{Math.floor(ex.duration / 60)} min</span>
                  </button>
                ))}
              </div>
              {/* TODO: Premium upsell card */}
              <div className="card" style={{ marginTop: '1.25rem', background: 'var(--gold-light)', border: '1px solid rgba(184,150,62,0.2)' }}>
                <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--charcoal)' }}>✦ Débloquer tout le contenu</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-mid)', marginBottom: '0.75rem' }}>Séries guidées, audio apaisants, exercices exclusifs</p>
                <button style={{ padding: '0.6rem 1.25rem', background: 'var(--gold-muted)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}>
                  Voir Sakina Premium
                </button>
              </div>
            </>
          ) : (
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌬</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>{exercise.title}</h2>
              <p style={{ color: 'var(--charcoal-mid)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{exercise.description}</p>
              <p style={{ color: 'var(--green-mid)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>Dhikr associé : {exercise.dhikr}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', margin: '1.5rem 0', textAlign: 'center' }}>
                {[['Inspire', exercise.inhale+'s'], ['Retiens', exercise.hold1 ? exercise.hold1+'s' : '—'], ['Expire', exercise.exhale+'s'], ['Pause', exercise.hold2 ? exercise.hold2+'s' : '—']].map(([label, val]) => (
                  <div key={label} style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', marginBottom: '0.2rem' }}>{label}</p>
                    <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{val}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={() => setSelected(null)} style={{ padding: '0.85rem 1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--charcoal-mid)' }}>Retour</button>
                <button onClick={startExercise} style={{ padding: '0.85rem 2rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1rem' }}>
                  Commencer
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active breathing UI */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100dvh - 120px)', padding: '2rem', position: 'relative' }}>
          {/* Animated circle */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, var(--green-light) 0%, transparent 70%)`,
            border: `3px solid var(--green-soft)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            animation: phase === 0 ? 'pulse 1s ease-in-out infinite' : 'none',
            transition: 'transform 1s ease',
            transform: phase === 0 ? 'scale(1.1)' : phase === 2 ? 'scale(0.9)' : 'scale(1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: '300', color: 'var(--green-deep)', lineHeight: 1 }}>{countdown}</p>
              <p style={{ color: 'var(--green-mid)', fontWeight: '500', marginTop: '0.25rem' }}>
                {phaseNames[phase % phaseNames.length]}
              </p>
            </div>
          </div>

          <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {exercise.dhikr}
          </p>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.8rem', marginBottom: '2rem' }}>
            Cycle {circles} · {Math.floor((exercise.duration - elapsed) / 60)}:{String(((exercise.duration - elapsed) % 60)).padStart(2,'0')} restantes
          </p>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', marginBottom: '2rem' }}>
            <div style={{ height: '100%', background: 'var(--green-mid)', borderRadius: '2px', width: `${progress}%`, transition: 'width 1s linear' }} />
          </div>

          <button onClick={stopExercise} style={{ padding: '0.85rem 2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--charcoal-mid)', background: 'var(--surface)' }}>
            Arrêter
          </button>
        </div>
      )}
    </div>
  );
}
