import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import { MOOD_LABELS, TRIGGERS } from '../data/content';

export default function MoodPage() {
  const { user } = useAuth();
  const [step, setStep] = useState('select'); // select | intensity | triggers | note | done
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(3);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentMoods, setRecentMoods] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    fetchRecentMoods();
  }, [user]);

  const fetchRecentMoods = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'users', user.uid, 'mood_logs'),
        orderBy('date', 'desc'),
        limit(14)
      );
      const snap = await getDocs(q);
      setRecentMoods(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {}
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (mood === 1) setShowEmergency(true);
    setStep('intensity');
  };

  const toggleTrigger = (id) => {
    setSelectedTriggers(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!user || !selectedMood) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'mood_logs'), {
        mood: selectedMood,
        intensity,
        triggers: selectedTriggers,
        note,
        date: new Date(),
        createdAt: serverTimestamp()
      });
      setStep('done');
      await fetchRecentMoods();
    } catch (e) {
      console.error('Erreur sauvegarde humeur:', e);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('select');
    setSelectedMood(null);
    setIntensity(3);
    setSelectedTriggers([]);
    setNote('');
    setShowEmergency(false);
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--green-deep)' }}>Comment tu te sens ?</h1>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.85rem' }}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{ marginLeft: 'auto', color: 'var(--charcoal-light)', fontSize: '0.8rem', padding: '0.4rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)' }}
        >
          {showHistory ? 'Enregistrer' : 'Historique'}
        </button>
      </div>

      <div style={{ padding: '1.25rem' }}>
        {showEmergency && (
          <div className="emergency-banner fade-in" style={{ marginBottom: '1rem' }}>
            <strong>Tu traverses un moment très difficile.</strong><br />
            Rappelle-toi que tu n'es pas seul(e). Foi et soutien professionnel peuvent aller ensemble.
            <br /><br />
            <button style={{ background: 'var(--danger)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.85rem' }}>
              🆘 Contacter une ligne d'écoute
            </button>
            <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '0.5rem', color: 'var(--danger)' }}>
              Maroc : 141 · France : 3114 · Belgique : 0800 32 123
            </span>
          </div>
        )}

        {!showHistory && (
          <>
            {step === 'select' && (
              <div className="fade-in">
                <p style={{ color: 'var(--charcoal-mid)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Appuie sur l'emoji qui te ressemble le plus en ce moment</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[5,4,3,2,1].map(mood => (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelect(mood)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{MOOD_LABELS[mood].emoji}</span>
                      <span style={{ fontWeight: '500', fontSize: '1rem', color: 'var(--charcoal)' }}>{MOOD_LABELS[mood].label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'intensity' && (
              <div className="fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3rem' }}>{MOOD_LABELS[selectedMood].emoji}</span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.75rem' }}>{MOOD_LABELS[selectedMood].label}</h2>
                </div>
                <p style={{ color: 'var(--charcoal-mid)', marginBottom: '1rem', fontSize: '0.9rem' }}>Quelle est l'intensité ? <strong>{intensity}/5</strong></p>
                <input
                  type="range" min="1" max="5" step="1"
                  value={intensity}
                  onChange={e => setIntensity(Number(e.target.value))}
                  style={{ width: '100%', marginBottom: '2rem', accentColor: 'var(--green-mid)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--charcoal-light)', marginTop: '-1.5rem', marginBottom: '2rem' }}>
                  <span>Peu intense</span><span>Très intense</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setStep('select')} style={{ flex: 1, padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--charcoal-mid)' }}>Retour</button>
                  <button onClick={() => setStep('triggers')} style={{ flex: 2, padding: '0.85rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>Continuer</button>
                </div>
              </div>
            )}

            {step === 'triggers' && (
              <div className="fade-in">
                <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Qu'est-ce qui influence ton humeur ?</h2>
                <p style={{ color: 'var(--charcoal-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Optionnel — choisis autant que tu veux</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {TRIGGERS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => toggleTrigger(t.id)}
                      style={{
                        padding: '0.5rem 0.9rem',
                        borderRadius: '20px',
                        border: `1.5px solid ${selectedTriggers.includes(t.id) ? 'var(--green-mid)' : 'var(--border)'}`,
                        background: selectedTriggers.includes(t.id) ? 'var(--green-light)' : 'var(--surface)',
                        color: selectedTriggers.includes(t.id) ? 'var(--green-deep)' : 'var(--charcoal-mid)',
                        fontSize: '0.88rem',
                        fontWeight: selectedTriggers.includes(t.id) ? '500' : '400'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Une note personnelle… (optionnel)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  style={{ marginBottom: '1.25rem', resize: 'none' }}
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setStep('intensity')} style={{ flex: 1, padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--charcoal-mid)' }}>Retour</button>
                  <button onClick={handleSave} disabled={loading} style={{ flex: 2, padding: '0.85rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                </div>
              </div>
            )}

            {step === 'done' && (
              <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--green-deep)' }}>Enregistré — الحَمدُ لِلَّه</h2>
                <p style={{ color: 'var(--charcoal-mid)', marginBottom: '2rem', fontSize: '0.9rem' }}>Prendre soin de toi est une forme d'ibadah.</p>
                <button onClick={reset} style={{ padding: '0.85rem 2rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>
                  Enregistrer une autre
                </button>
              </div>
            )}
          </>
        )}

        {showHistory && (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Historique récent</h2>
            {recentMoods.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--charcoal-light)' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌱</p>
                <p>Aucune humeur enregistrée encore.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {recentMoods.map(m => (
                  <div key={m.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{MOOD_LABELS[m.mood]?.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{MOOD_LABELS[m.mood]?.label}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)' }}>
                        {m.date?.toDate ? m.date.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Aujourd\'hui'}
                      </p>
                      {m.triggers?.length > 0 && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--green-mid)', marginTop: '2px' }}>{m.triggers.join(' · ')}</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{ width: '4px', height: `${i <= m.intensity ? 16 : 6}px`, background: i <= m.intensity ? 'var(--green-mid)' : 'var(--border)', borderRadius: '2px' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
