import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { MOOD_LABELS } from '../data/content';

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
  { emoji: '📖', label: 'Écouter le Coran', path: '/content', state: { tab: 'Coran' }, color: '#F0EAD8', borderColor: '#B8963E' },
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

const PRAYER_NAMES = {
  Fajr: 'Fajr',
  Dhuhr: 'Dhouhr',
  Asr: 'Asr',
  Maghrib: 'Maghrib',
  Isha: 'Isha'
};

function parsePrayerTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function getNextPrayer(timings) {
  if (!timings) return null;
  const now = new Date();
  const entries = Object.keys(PRAYER_NAMES).map(key => ({
    key,
    label: PRAYER_NAMES[key],
    time: parsePrayerTime(timings[key])
  }));
  const upcoming = entries.find(e => e.time > now);
  return upcoming || entries[0];
}

function weekDayLogs(logs) {
  const dayLetters = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dayLog = logs.find(l => {
      const logDate = l.date?.toDate ? l.date.toDate() : new Date(l.date);
      return logDate.toDateString() === d.toDateString();
    });
    days.push({
      day: dayLetters[d.getDay()],
      mood: dayLog?.mood ?? null,
      intensity: dayLog?.intensity ?? null
    });
  }
  return days;
}

export default function HomePage() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [todayMood, setTodayMood] = useState(null);
  const [dailyDua, setDailyDua] = useState(null);
  const [weekMoods, setWeekMoods] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [prayerError, setPrayerError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setPrayerError('Géolocalisation non disponible sur cet appareil.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const timestamp = Math.floor(Date.now() / 1000);
          const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=3`);
          const json = await res.json();
          setPrayerTimes(json.data.timings);
        } catch (e) {
          setPrayerError("Impossible de récupérer les horaires de prière.");
        }
      },
      () => setPrayerError('Active la localisation pour voir les horaires de prière.')
    );
  }, []);

  useEffect(() => {
    const fetchDailyDua = async () => {
      const snap = await getDocs(collection(db, 'content_duas'));
      const duas = snap.docs.map(d => d.data());
      if (duas.length) setDailyDua(duas[Math.floor(Math.random() * duas.length)]);
    };
    fetchDailyDua();
  }, []);

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

  useEffect(() => {
    if (!user) return;
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0,0,0,0);
    const fetchWeekMoods = async () => {
      try {
        const q = query(
          collection(db, 'users', user.uid, 'mood_logs'),
          where('date', '>=', weekStart),
          orderBy('date', 'desc')
        );
        const snap = await getDocs(q);
        setWeekMoods(snap.docs.map(d => d.data()));
      } catch (e) {
        // Firestore index may not be ready — ignore silently
      }
    };
    fetchWeekMoods();
  }, [user]);

  const isFriday = new Date().getDay() === 5;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, rgba(45,80,22,0.88) 0%, rgba(74,124,89,0.85) 100%), url('/art-arch-frame.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        padding: '3rem 1.5rem 2rem',
        color: 'white'
      }}>
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

        {prayerTimes && (() => {
          const next = getNextPrayer(prayerTimes);
          return next ? (
            <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.7rem', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prochaine prière</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{next.label}</p>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                {next.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ) : null;
        })()}
        {!prayerTimes && prayerError && (
          <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', padding: '0.6rem 0.9rem', fontSize: '0.8rem' }}>
            🕌 {prayerError}
          </div>
        )}

        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
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
        {/* Prayer times of the day */}
        {prayerTimes && (
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            {Object.keys(PRAYER_NAMES).map(key => {
              const isNext = getNextPrayer(prayerTimes)?.key === key;
              return (
                <div key={key} style={{ textAlign: 'center', flex: 1 }}>
                  <p style={{ fontSize: '0.72rem', color: isNext ? 'var(--accent-deep)' : 'var(--charcoal-light)', fontWeight: isNext ? '600' : '400', marginBottom: '0.2rem' }}>
                    {PRAYER_NAMES[key]}
                  </p>
                  <p style={{ fontSize: '0.85rem', fontWeight: isNext ? '700' : '500', color: isNext ? 'var(--accent-deep)' : 'var(--charcoal)' }}>
                    {prayerTimes[key]}
                  </p>
                </div>
              );
            })}
          </div>
        )}

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
        {dailyDua && (
          <div className="card" style={{ marginBottom: '1rem', border: '1px solid var(--gold-light)', background: 'var(--off-white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--gold-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doua du jour</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)' }}>{dailyDua.source}</span>
            </div>
            <p className="arabic" style={{ fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>{dailyDua.arabic}</p>
            <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>{dailyDua.transliteration}</p>
            <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem' }}>{dailyDua.french}</p>
          </div>
        )}

        {/* Shortcuts */}
        <p className="section-title">Comment puis-je t'aider ?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {SHORTCUT_CARDS.map((c, i) => (
            <button
              key={i}
              onClick={() => navigate(c.path, c.state ? { state: c.state } : undefined)}
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
          {weekDayLogs(weekMoods).map(({ day, mood, intensity }, i) => {
            const height = intensity ? 16 + intensity * 12 : 0;
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
