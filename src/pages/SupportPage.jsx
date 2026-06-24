import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ANNUAIRE_CATEGORIES = {
  psychologue: { label: 'Psychologues & thérapeutes musulmans', icon: '🧠' },
  institution: { label: 'Institutions & savants reconnus', icon: '🕌' },
  mufti: { label: 'Autorités religieuses officielles', icon: '📜' }
};

function AnnuaireCard({ item }) {
  return (
    <div className="card" style={{ marginBottom: '0.75rem' }}>
      <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.15rem' }}>{item.name}</p>
      <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-light)', marginBottom: '0.5rem' }}>{item.country}</p>
      <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)', lineHeight: '1.5', marginBottom: '0.75rem' }}>{item.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--accent-light)', color: 'var(--accent-deep)', borderRadius: 'var(--radius-full)', fontWeight: '500', textDecoration: 'none' }}>
            🔗 Site web
          </a>
        )}
        {item.phone && (
          <a href={`tel:${item.phone}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--charcoal)', borderRadius: 'var(--radius-full)', fontWeight: '500', textDecoration: 'none' }}>
            📞 {item.phone}
          </a>
        )}
        {item.whatsapp && (
          <a href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--charcoal)', borderRadius: 'var(--radius-full)', fontWeight: '500', textDecoration: 'none' }}>
            💬 WhatsApp
          </a>
        )}
        {item.email && (
          <a href={`mailto:${item.email}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--charcoal)', borderRadius: 'var(--radius-full)', fontWeight: '500', textDecoration: 'none' }}>
            ✉️ Email
          </a>
        )}
      </div>
    </div>
  );
}

const EMERGENCY_NUMBERS = [
  { country: '🇲🇦 Maroc', numbers: [{ label: 'Urgences psychologiques', number: '141' }, { label: 'SAMU Social', number: '080 060 0909' }] },
  { country: '🇫🇷 France', numbers: [{ label: 'Numéro national prévention suicide', number: '3114' }, { label: 'SAMU', number: '15' }] },
  { country: '🇧🇪 Belgique', numbers: [{ label: 'Centre de Prévention du Suicide', number: '0800 32 123' }] },
  { country: '🇨🇦 Canada', numbers: [{ label: 'Prévention suicide', number: '1-866-APPELLE' }] },
];

export default function SupportPage() {
  const navigate = useNavigate();
  const [annuaire, setAnnuaire] = useState([]);

  useEffect(() => {
    const fetchAnnuaire = async () => {
      const snap = await getDocs(collection(db, 'content_annuaire'));
      setAnnuaire(snap.docs.map(d => d.data()));
    };
    fetchAnnuaire();
  }, []);

  return (
    <div className="page fade-in theme-teal">
      <div className="page-header page-header-hero" style={{ marginBottom: '0', '--hero-image': "url('/art-light-arch.png')" }}>
        <button onClick={() => navigate(-1)} style={{ color: 'white', marginRight: '0.5rem' }}>←</button>
        <h1 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'white' }}>Soutien et ressources</h1>
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* Crisis notice */}
        <div className="emergency-banner" style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.4rem' }}>🆘 Si tu es en danger immédiat</p>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>Appelle les urgences de ton pays immédiatement ou demande à quelqu'un de rester avec toi.</p>
          <p style={{ fontWeight: '600', fontSize: '1rem' }}>Maroc: 141 · France: 3114 · Belgique: 0800 32 123</p>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer" style={{ marginBottom: '1.25rem' }}>
          <strong>⚠️ Avertissement médical</strong><br />
          Cette application n'est pas un dispositif médical. Elle ne diagnostique pas, ne traite pas et ne prévient aucune maladie mentale ou physique. Elle ne remplace pas une consultation médicale ou psychologique professionnelle.
        </div>

        {/* Faith + therapy */}
        <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--accent-light)', border: '1px solid rgba(75,124,89,0.2)' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🤝</p>
          <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent-deep)' }}>La foi et le soin professionnel coexistent</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)', lineHeight: '1.7' }}>
            L'Islam nous enseigne de prendre soin de notre corps et de notre âme. Consulter un professionnel de santé mentale n'est pas une faiblesse — c'est une forme de tawakkul (confiance en Allah) et de responsabilité envers soi-même.
          </p>
          <p className="arabic" style={{ fontSize: '1rem', marginTop: '0.75rem', color: 'var(--accent-deep)' }}>وَأَنَّ إِلَىٰ رَبِّكَ الْمُنتَهَىٰ</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-mid)', marginTop: '0.25rem' }}>Et qu'à ton Seigneur appartient la finalité — Coran 53:42</p>
        </div>

        {/* Emergency numbers */}
        <p className="section-title">Lignes d'aide par pays</p>
        {EMERGENCY_NUMBERS.map(({ country, numbers }) => (
          <div key={country} className="card" style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.6rem' }}>{country}</p>
            {numbers.map(({ label, number }) => (
              <div key={number} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-mid)' }}>{label}</span>
                <a href={`tel:${number.replace(/\s/g, '')}`} style={{ fontWeight: '700', color: 'var(--danger)', fontSize: '0.9rem', textDecoration: 'none' }}>{number}</a>
              </div>
            ))}
          </div>
        ))}

        {/* Annuaire */}
        <p className="section-title">Annuaire</p>
        <div className="disclaimer" style={{ marginBottom: '1rem' }}>
          📋 Organismes publics indépendants, non affiliés à Nour. Vérifie toujours les qualifications avant de prendre rendez-vous.
        </div>
        {Object.entries(ANNUAIRE_CATEGORIES).map(([cat, { label, icon }]) => {
          const items = annuaire.filter(a => a.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat} style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--charcoal-mid)', marginBottom: '0.6rem' }}>{icon} {label}</p>
              {items.map(item => <AnnuaireCard key={item.id} item={item} />)}
            </div>
          );
        })}

        {/* Privacy */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.4rem', fontSize: '0.9rem' }}>🔒 Confidentialité</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-mid)', lineHeight: '1.6' }}>
            Tes données sont privées et ne sont jamais partagées avec des tiers. Tu peux demander l'export ou la suppression de toutes tes données — voir notre politique de confidentialité ci-dessous.
          </p>
          <button onClick={() => navigate('/privacy')} style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--charcoal-light)', textDecoration: 'underline' }}>
            Politique de confidentialité →
          </button>
        </div>
      </div>
    </div>
  );
}
