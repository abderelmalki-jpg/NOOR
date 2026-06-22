import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TABS = ['Adhkâr', 'Douas', 'Rabbana', 'Hadiths', 'Réflexions'];

function ArabicCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <p style={{ fontWeight: '600', fontSize: '0.9rem', flex: 1 }}>{item.title}</p>
        <span style={{ fontSize: '0.7rem', background: 'var(--green-light)', color: 'var(--green-deep)', padding: '2px 8px', borderRadius: '20px', fontWeight: '500', marginLeft: '0.5rem', flexShrink: 0 }}>
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
        style={{ color: 'var(--green-mid)', fontSize: '0.82rem', fontWeight: '500', marginTop: '0.25rem' }}
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
        <span style={{ fontSize: '0.8rem', color: done ? 'var(--green-mid)' : 'var(--charcoal-light)' }}>
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
          background: done ? 'var(--green-light)' : 'var(--green-deep)',
          color: done ? 'var(--green-deep)' : 'white',
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
    <div className="card" style={{ marginBottom: '0.75rem', borderLeft: '3px solid var(--green-mid)' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.7rem', background: item.type === 'quran' ? 'var(--green-light)' : 'var(--gold-light)', color: item.type === 'quran' ? 'var(--green-deep)' : 'var(--gold-muted)', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const [duasSnap, adhkarSnap, reflectionsSnap, rabbanaSnap, nawawiSnap] = await Promise.all([
        getDocs(collection(db, 'content_duas')),
        getDocs(collection(db, 'content_adhkar')),
        getDocs(collection(db, 'content_reflections')),
        getDocs(collection(db, 'content_rabbana')),
        getDocs(collection(db, 'content_nawawi'))
      ]);
      setDuas(duasSnap.docs.map(d => d.data()));
      setAdhkar(adhkarSnap.docs.map(d => d.data()));
      setReflections(reflectionsSnap.docs.map(d => d.data()));
      setRabbana(rabbanaSnap.docs.map(d => d.data()).sort((a, b) => a.id.localeCompare(b.id)));
      setNawawi(nawawiSnap.docs.map(d => d.data()).sort((a, b) => a.id.localeCompare(b.id)));
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
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--green-deep)' }}>Contenu islamique</h1>
          <p style={{ color: 'var(--charcoal-light)', fontSize: '0.82rem' }}>Adhkâr · Douas · Rabbana · Hadiths · Réflexions</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 1.25rem', gap: '0', borderBottom: '1px solid var(--border)', marginBottom: '0' }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              flex: 1,
              padding: '0.75rem 0',
              fontWeight: tab === i ? '600' : '400',
              color: tab === i ? 'var(--green-deep)' : 'var(--charcoal-light)',
              borderBottom: tab === i ? '2px solid var(--green-deep)' : '2px solid transparent',
              fontSize: '0.88rem',
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
                    borderRadius: '20px',
                    border: `1.5px solid ${duaFilter === f ? 'var(--green-mid)' : 'var(--border)'}`,
                    background: duaFilter === f ? 'var(--green-light)' : 'transparent',
                    color: duaFilter === f ? 'var(--green-deep)' : 'var(--charcoal-light)',
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
              Les 40 Hadiths de l'imam An-Nawawi (Al-Arba'ûn an-Nawawiyya)
            </p>
            {nawawi.map(item => <ArabicCard key={item.id} item={item} />)}
          </div>
        )}

        {tab === 4 && (
          <div className="fade-in">
            {reflections.map(item => <ReflectionCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
