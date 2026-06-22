import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { DUAS, MOOD_LABELS } from '../data/content';

const SALAMS = [
  'السَّلَامُ عَلَيْكُمْ',
  'بِسْمِ اللَّهِ',
  'الحَمدُ لِلَّه',
];

const SHORTCUT_CARDS = [
  { emoji: '🌊', label: 'Je me sens stressé', path: '/breathing', color: '#E8F0E4', borderColor: '#6B9E78' },
  { emoji: '🌧', label: 'Je me sens triste', path: '/content', color: '#EDE8F8', borderColor: '#9B8EC4' },
  { emoji: '🌙', label: "Je n'arrive pas à dormir", path: '/breathing', color: '#F0EAD8', borderColor: '#B8963E' },
  { emoji: '✨', label: "J'ai besoin d'un rappel", path: '/content', color: '#E8F0E4', borderColor: '#4A7C59' },
];

function getGreeting(name) {
  const hour = new Date().getHours();
  const firstName = name?.split(' ')[0] || 'frère/sœur';
  if (hour < 12) return `Bonjour, ${firstName}`;
  if (hour < 17) return `Bon après-midi, ${firstName}`;
  return `Bonsoir, ${firstName}`;
}

function getDayOfWeek() {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[new Date().getDay()];
}

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [todayMood, setTodayMood] = useState(null);
  const [streak, setStreak] = useState(3); // TODO: calculate from Firestore streak doc
  const [dailyDua] = useState(DUAS[Math.floor(Math.random() * DUAS.length)]);
  const [weekMoods, setWeekMoods] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    if (!user) return;
    const today = new Date();
    today.setHours(0,0,0,0);
    const fetchMoods = async () => {
      try {
        const q = query(
          collection(db, 'users', user.uid, 'mood_logs'),
          where('date', '>=', today),
          orderBy('date', 'desc'),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) setTodayMood(snap.docs[0].data());
      } catch (e) {
        // Firestore index may not be ready — ignore silently
      }
    };
    fetchMoods();
  }, [user]);

  const isFriday = new Date().getDay() === 5;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, var(--green-deep) 0%, var(--green-mid) 100%)', padding: '3rem 1.5rem 2rem', color: 'white' }}>
        <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '0.25rem', fontFamily: 'var(--font-arabic)' }}>
          {SALAMS[new Date().getDay() % SALAMS.length]}
        </p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>
          {getGreeting(user?.displayName)}
        </h1>
        <p style={{ opacity: 0.75, fontSize: '0.85rem' }}>{getDayOfWeek()} · {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>

        {isFriday && (
          <div style={{ marginTop: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', fontSize: '0.82rem' }}>
            ✨ Vendredi béni — N'oublie pas la Sourate Al-Kahf
          </div>
        )}

        {/* Streak */}
        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🔥</span>
            <div>
              <p style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: 1 }}>{streak}</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.75 }}>jours de suite</p>
            </div>
          </div>
          {todayMood ? (
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{MOOD_LABELS[todayMood.mood]?.emoji}</span>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: '500', lineHeight: 1.2 }}>{MOOD_LABELS[todayMood.mood]?.label}</p>
                <p style={{ fontSize: '0.7rem', opacity: 0.75 }}>Aujourd'hui</p>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/mood')} style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px dashed rgba(255,255,255,0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 1rem',
              color: 'white',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span>+</span> Comment tu te sens ?
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '1.25rem 1.25rem 0' }}>
        {/* Emergency banner */}
        {showEmergency && (
          <div className="emergency-banner fade-in" style={{ marginBottom: '1rem' }}>
            <strong>Tu traverses un moment difficile.</strong> Rappelle-toi que tu n'es pas seul(e). La foi et le soutien professionnel peuvent coexister.{' '}
            <button onClick={() => navigate('/support')} style={{ color: 'var(--danger)', fontWeight: '600', textDecoration: 'underline', fontSize: '0.85rem' }}>
              Voir les ressources →
            </button>
          </div>
        )}

        {/* Dua du jour */}
        <div className="card" style={{ marginBottom: '1rem', border: '1px solid var(--gold-light)', background: 'var(--off-white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--gold-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doua du jour</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)' }}>{dailyDua.source}</span>
          </div>
          <p className="arabic" style={{ fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>{dailyDua.arabic}</p>
          <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>{dailyDua.transliteration}</p>
          <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem' }}>{dailyDua.french}</p>
        </div>

        {/* Shortcuts */}
        <p className="section-title">Comment puis-je t'aider ?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {SHORTCUT_CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => navigate(c.path)}
              style={{
                background: c.color,
                border: `1px solid ${c.borderColor}30`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{c.emoji}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--charcoal)', lineHeight: '1.3' }}>{c.label}</span>
            </button>
          ))}
        </div>

        {/* This week summary */}
        <p className="section-title">Cette semaine</p>
        <div className="card" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          {['L','M','M','J','V','S','D'].map((day, i) => {
            const height = [40, 60, 35, 70, 50, 0, 0][i];
            const mood = [3, 4, 2, 4, 3, null, null][i];
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '100%',
                  height: `${height}px`,
                  background: mood ? `${['#6B4C3B','#8B7355','#A89070','#6B9E78','#4A7C59'][mood-1]}40` : 'var(--border)',
                  borderRadius: '4px 4px 0 0',
                  border: mood ? `1.5px solid ${['#6B4C3B','#8B7355','#A89070','#6B9E78','#4A7C59'][mood-1]}` : '1.5px solid var(--border)',
                  transition: 'height 0.3s'
                }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--charcoal-light)' }}>{day}</span>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
          <button
            onClick={() => navigate('/journal')}
            style={{ flex: 1, padding: '0.85rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '500', color: 'var(--charcoal)' }}
          >
            📝 Écrire dans mon journal
          </button>
          <button
            onClick={() => navigate('/breathing')}
            style={{ flex: 1, padding: '0.85rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: '500', color: 'var(--charcoal)' }}
          >
            🌬 Exercice de souffle
          </button>
        </div>
      </div>
    </div>
  );
}
