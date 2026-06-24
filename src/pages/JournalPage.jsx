import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { JOURNAL_PROMPTS } from '../data/content';

const TAGS = ['Gratitude', 'Tawakkul', 'Patience', 'Dua', 'Famille', 'Foi', 'Progrès', 'Difficulté'];

export default function JournalPage() {
  const { user } = useAuth();
  const [view, setView] = useState('list'); // list | write
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'users', user.uid, 'journal_entries'), orderBy('createdAt', 'desc'), limit(30));
      const snap = await getDocs(q);
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {}
    setLoading(false);
  };

  const startEntry = (prompt = null) => {
    setSelectedPrompt(prompt);
    if (prompt) setBody(prompt.prompt + '\n\n');
    else setBody('');
    setTitle('');
    setSelectedTags([]);
    setView('write');
  };

  const handleSave = async () => {
    if (!user || !body.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'journal_entries'), {
        title: title || (new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })),
        body,
        tags: selectedTags,
        createdAt: serverTimestamp(),
        favorite: false
      });
      await fetchEntries();
      setView('list');
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filtered = entries.filter(e =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.body?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page fade-in theme-violet">
      <div className="page-header page-header-hero" style={{ marginBottom: '0', '--hero-image': "url('/art-reading-woman.png')" }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white' }}>Journal</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>Privé · chiffré · à toi</p>
        </div>
        {view === 'list' ? (
          <button onClick={() => startEntry()} style={{ marginLeft: 'auto', background: 'white', color: 'var(--accent-deep)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.9rem' }}>
            + Écrire
          </button>
        ) : (
          <button onClick={() => setView('list')} style={{ marginLeft: 'auto', color: 'white', opacity: 0.85, fontSize: '0.9rem', padding: '0.5rem' }}>
            Annuler
          </button>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        {view === 'list' && (
          <div className="fade-in">
            {/* Prompts */}
            <p className="section-title">Prompts d'écriture</p>
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
              {JOURNAL_PROMPTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => startEntry(p)}
                  style={{
                    flexShrink: 0,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    width: '140px'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{p.icon}</div>
                  <div style={{ fontWeight: '600', fontSize: '0.82rem', marginBottom: '0.2rem' }}>{p.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-light)', lineHeight: '1.4' }}>{p.prompt.substring(0, 45)}…</div>
                </button>
              ))}
            </div>

            {/* Search */}
            <input
              placeholder="🔍 Chercher dans le journal…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />

            {/* Entries */}
            {loading ? (
              <p style={{ color: 'var(--charcoal-light)', textAlign: 'center', padding: '2rem' }}>Chargement…</p>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--charcoal-light)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</p>
                <p>Ton journal t'attend.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Commence à écrire pour laisser une trace.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filtered.map(e => (
                  <div key={e.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{e.title}</p>
                      {e.favorite && <span>⭐</span>}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                      {e.body?.substring(0, 120)}{e.body?.length > 120 ? '…' : ''}
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {e.tags?.map(tag => (
                        <span key={tag} style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--accent-light)', color: 'var(--accent-deep)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>{tag}</span>
                      ))}
                      <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--charcoal-light)' }}>
                        {e.createdAt?.toDate ? e.createdAt.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Aujourd\'hui'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'write' && (
          <div className="fade-in">
            {selectedPrompt && (
              <div style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--accent-deep)' }}>
                {selectedPrompt.icon} {selectedPrompt.prompt}
              </div>
            )}
            <input
              placeholder="Titre (optionnel)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ marginBottom: '0.75rem', fontWeight: '600', fontSize: '1rem' }}
            />
            <textarea
              placeholder="Écris librement… ce que tu ressens, ce que tu penses, ce que tu veux confier à Allah…"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={10}
              style={{ marginBottom: '1rem', resize: 'none', lineHeight: '1.7' }}
            />
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-light)', marginBottom: '0.5rem' }}>Tags</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      border: `1.5px solid ${selectedTags.includes(tag) ? 'var(--accent-mid)' : 'var(--border)'}`,
                      background: selectedTags.includes(tag) ? 'var(--accent-light)' : 'transparent',
                      color: selectedTags.includes(tag) ? 'var(--accent-deep)' : 'var(--charcoal-light)',
                      fontWeight: selectedTags.includes(tag) ? '500' : '400'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={!body.trim() || saving}
              style={{ width: '100%', padding: '1rem', background: 'var(--accent-deep)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600', opacity: (!body.trim() || saving) ? 0.6 : 1 }}
            >
              {saving ? 'Enregistrement…' : 'Sauvegarder'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
