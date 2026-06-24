import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TABS = ['Adhkâr', 'Douas', 'Rabbana', 'Jawami', 'Hadiths', 'Réflexions', 'Coran'];

const SURAHS = [
  { number: 112, name: 'Al-Ikhlâs', frenchName: 'Le monothéisme pur' },
  { number: 113, name: 'Al-Falaq', frenchName: "L'aube naissante" },
  { number: 114, name: 'An-Nâs', frenchName: 'Les hommes' },
  { number: 2, name: 'Al-Baqara', frenchName: 'La vache' }
];

function SurahPlayer({ surah, onBack }) {
  const [ayahs, setAyahs] = useState(null);

  useEffect(() => {
    setAyahs(null);
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/quran-uthmani`)
      .then(r => r.json())
      .then(j => setAyahs(j.data.ayahs))
      .catch(() => setAyahs([]));
  }, [surah.number]);

  return (
    <div className="fade-in">
      <button onClick={onBack} style={{ color: 'var(--accent-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>← Retour aux sourates</button>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.2rem' }}>{surah.name} — {surah.frenchName}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-light)', marginBottom: '0.75rem' }}>Récité par Mishary Rashid Al-Afasy</p>
        <audio controls style={{ width: '100%' }} src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surah.number}.mp3`} />
      </div>
      {ayahs === null ? (
        <p style={{ textAlign: 'center', color: 'var(--charcoal-light)', padding: '2rem 0' }}>Chargement du texte…</p>
      ) : (
        <div className="card">
          {ayahs.map(a => (
            <p key={a.number} className="arabic" style={{ fontSize: '1.3rem', lineHeight: '2.4', marginBottom: '0.5rem' }}>
              {a.text} <span style={{ fontSize: '0.7rem', color: 'var(--accent-mid)' }}>({a.numberInSurah})</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function QuranTab() {
  const [selected, setSelected] = useState(null);
  if (selected) return <SurahPlayer surah={selected} onBack={() => setSelected(null)} />;
  return (
    <div className="fade-in">
      <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Récitation de Mishary Rashid Al-Afasy
      </p>
      {SURAHS.map(s => (
        <button
          key={s.number}
          onClick={() => setSelected(s)}
          className="card"
          style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}
        >
          <div>
            <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{s.name}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-light)' }}>{s.frenchName}</p>
          </div>
          <span style={{ color: 'var(--accent-mid)' }}>▶</span>
        </button>
      ))}
    </div>
  );
}

function ArabicCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <p style={{ fontWeight: '600', fontSize: '0.9rem', flex: 1 }}>{item.title}</p>
        <span style={{ fontSize: '0.7rem', background: 'var(--accent-light)', color: 'var(--accent-deep)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: '500', marginLeft: '0.5rem', flexShrink: 0 }}>
          {item.authenticity || 'Authentique'}
        </span>
      </div>
      <p className="arabic" style={{ fontSize: '1.4rem', color: 'var(--charcoal)', marginBottom: '0.5rem', lineHeight: '2.2' }}>{item.arabic}</p>
      {expanded && (
        <>
          {item.transliteration && <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-light)', fontStyle: 'italic', marginBottom: '0.25rem' }}>{item.transliteration}</p>}
          <p style={{ fontSize: '0.88rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>{item.french}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
            Source : {item.source}
          </p>
        </>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ color: 'var(--accent-mid)', fontSize: '0.82rem', fontWeight: '500', marginTop: '0.25rem' }}
      >
        {expanded ? '↑ Réduire' : '↓ Voir la traduction'}
      </button>
    </div>
  );
}

function AdhkarCard({ item }) {
  const [count, setCount] = useState(0);
  const done = count >= item.repetitions;
  return (
    <div className="card" style={{ marginBottom: '0.75rem', opacity: done ? 0.7 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.title}</p>
        <span style={{ fontSize: '0.8rem', color: done ? 'var(--accent-mid)' : 'var(--charcoal-light)' }}>
          {count}/{item.repetitions}
        </span>
      </div>
      <p className="arabic" style={{ fontSize: '1.5rem', marginBottom: '0.75rem', lineHeight: '2.2' }}>{item.arabic}</p>
      <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-light)', fontStyle: 'italic', marginBottom: '0.75rem' }}>{item.transliteration}</p>
      <button
        onClick={() => setCount(Math.min(count + 1, item.repetitions))}
        disabled={done}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: done ? 'var(--accent-light)' : 'var(--accent-deep)',
          color: done ? 'var(--accent-deep)' : 'white',
          borderRadius: 'var(--radius-sm)',
          fontWeight: '600',
          fontSize: '0.9rem',
          transition: 'all 0.2s'
        }}
      >
        {done ? '✓ Complété — الحَمدُ لِلَّه' : `Compter · ${item.repetitions - count} restant${item.repetitions - count > 1 ? 's' : ''}`}
      </button>
    </div>
  );
}

function ReflectionCard({ item }) {
  return (
    <div className="card" style={{ marginBottom: '0.75rem', borderLeft: '3px solid var(--accent-mid)' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.7rem', background: item.type === 'quran' ? 'var(--green-light)' : 'var(--gold-light)', color: item.type === 'quran' ? 'var(--green-deep)' : 'var(--gold-muted)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: '600' }}>
          {item.type === 'quran' ? 'Coran' : 'Hadith'}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)' }}>{item.source}</span>
      </div>
      <p className="arabic" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '2' }}>{item.arabic}</p>
      <p style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--charcoal)', marginBottom: '0.75rem', fontStyle: 'italic' }}>« {item.french} »</p>
      <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)', lineHeight: '1.6', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        {item.reflection}
      </p>
    </div>
  );
}

export default function ContentPage() {
  const [tab, setTab] = useState(0);
  const [duaFilter, setDuaFilter] = useState('all');
  const [duas, setDuas] = useState([]);
  const [adhkar, setAdhkar] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [rabbana, setRabbana] = useState([]);
  const [nawawi, setNawawi] = useState([]);
  const [jawami, setJawami] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const [duasSnap, adhkarSnap, reflectionsSnap, rabbanaSnap, nawawiSnap, jawamiSnap] = await Promise.all([
        getDocs(collection(db, 'content_duas')),
        getDocs(collection(db, 'content_adhkar')),
        getDocs(collection(db, 'content_reflections')),
        getDocs(collection(db, 'content_rabbana')),
        getDocs(collection(db, 'content_nawawi')),
        getDocs(collection(db, 'content_jawami'))
      ]);
      setDuas(duasSnap.docs.map(d => d.data()));
      setAdhkar(adhkarSnap.docs.map(d => d.data()));
      setReflections(reflectionsSnap.docs.map(d => d.data()));
      setRabbana(rabbanaSnap.docs.map(d => d.data()).sort((a, b) => a.id.localeCompare(b.id)));
      setNawawi(nawawiSnap.docs.map(d => d.data()).sort((a, b) => a.id.localeCompare(b.id)));
      setJawami(jawamiSnap.docs.map(d => d.data()).sort((a, b) => a.id.localeCompare(b.id)));
      setLoading(false);
    };
    fetchContent();
  }, []);

  const DUA_FILTERS = ['all', 'anxiete', 'stress', 'tristesse', 'sommeil', 'gratitude'];
  const filteredDuas = duaFilter === 'all' ? duas : duas.filter(d => d.category === duaFilter);

  if (loading) {
    return (
      <div className="page fade-in" style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--charcoal-light)' }}>
        Chargement…
      </div>
    );
  }

  return (
    <div className="page fade-in theme-gold">
      <div className="page-header page-header-hero" style={{ '--hero-image': "url('/art-arch-frame.png')" }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white' }}>Contenu islamique</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>Adhkâr · Douas · Rabbana · Hadiths · Réflexions</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 1.25rem', gap: '1.25rem', overflowX: 'auto', borderBottom: '1px solid var(--border)', marginBottom: '0' }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              flexShrink: 0,
              padding: '0.75rem 0',
              fontWeight: tab === i ? '600' : '400',
              color: tab === i ? 'var(--accent-deep)' : 'var(--charcoal-light)',
              borderBottom: tab === i ? '2px solid var(--accent-deep)' : '2px solid transparent',
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div className="disclaimer" style={{ marginBottom: '1rem' }}>
          📚 Contenu provisoire — à réviser par un érudit qualifié avant publication finale.
        </div>

        {tab === 0 && (
          <div className="fade-in">
            <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Appuie pour compter tes dhikr du jour
            </p>
            {adhkar.map(item => <AdhkarCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 1 && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {DUA_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setDuaFilter(f)}
                  style={{
                    flexShrink: 0,
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    border: `1.5px solid ${duaFilter === f ? 'var(--accent-mid)' : 'var(--border)'}`,
                    background: duaFilter === f ? 'var(--accent-light)' : 'transparent',
                    color: duaFilter === f ? 'var(--accent-deep)' : 'var(--charcoal-light)',
                    fontSize: '0.82rem',
                    fontWeight: duaFilter === f ? '500' : '400',
                    textTransform: 'capitalize'
                  }}
                >
                  {f === 'all' ? 'Toutes' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            {filteredDuas.map(item => <ArabicCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 2 && (
          <div className="fade-in">
            <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Les 40 invocations coraniques commençant par « Rabbanâ — Ô notre Seigneur »
            </p>
            {rabbana.map(item => <ArabicCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 3 && (
          <div className="fade-in">
            <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Les invocations complètes (jawâmi') du Prophète ﷺ
            </p>
            {jawami.map(item => <ArabicCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 4 && (
          <div className="fade-in">
            <p style={{ color: 'var(--charcoal-mid)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Les 40 Hadiths de l'imam An-Nawawi (Al-Arba'ûn an-Nawawiyya)
            </p>
            {nawawi.map(item => <ArabicCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 5 && (
          <div className="fade-in">
            {reflections.map(item => <ReflectionCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 6 && <QuranTab />}
      </div>
    </div>
  );
}
