import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BENEFITS = [
  {
    title: 'Observe ton cœur',
    body: 'Suis ton humeur au fil des jours, identifie ce qui t\'apaise et ce qui te pèse.',
    image: '/shot-accueil.png',
    span: 'large'
  },
  {
    title: 'Écris ce que tu portes',
    body: 'Un journal privé et chiffré, pour les pensées que tu ne dis qu\'à Allah.',
    span: 'small'
  },
  {
    title: 'Respire, recentre-toi',
    body: 'Des exercices de respiration guidée avant la salât, ou dès que le monde devient trop lourd.',
    span: 'small'
  },
  {
    title: 'Nourris ton âme',
    body: 'Adhkâr, douas, les 40 Rabbana, les Hadiths de l\'imam An-Nawawi, et le Coran récité — tout au même endroit.',
    span: 'large'
  }
];

const STEPS = [
  {
    time: 'Le matin',
    text: 'Tu ouvres Nour avant même de poser le pied au sol. Un adhkar, une question simple : comment tu te sens ?',
    image: '/shot-accueil.png'
  },
  {
    time: 'Dans la journée',
    text: 'Une pensée qui pèse ? Elle trouve sa place dans ton journal. Un instant de stress ? Trois minutes de respiration suffisent.',
    image: '/shot-journal.png'
  },
  {
    time: 'Le soir',
    text: 'Tu refermes la journée avec une doua, une réflexion, le Coran qui résonne doucement.',
    image: '/shot-contenu.png'
  }
];

const TESTIMONIALS = [
  { initial: 'S', name: 'Sarah', text: 'La première app de bien-être où je ne me sens pas hors-sujet en tant que musulmane. Le journal est devenu mon rituel du soir.', size: 'large' },
  { initial: 'Y', name: 'Yacine', text: 'Les exercices de respiration avant la salât m\'aident vraiment à me recentrer.', size: 'small' },
  { initial: 'I', name: 'Imane', text: 'Sobre, beau, et utile. Exactement ce qu\'il me manquait.', size: 'small' }
];

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => document.body.classList.remove('landing-page');
  }, []);

  return (
    <div style={{ background: 'var(--off-white)', color: 'var(--charcoal)', overflowX: 'hidden' }}>
      <style>{`
        .lp-serif { font-family: 'Cormorant Garamond', serif; }
        .lp-section { padding: 5rem 1.5rem; max-width: 1100px; margin: 0 auto; }
        @media (min-width: 768px) { .lp-section { padding: 7rem 2rem; } }
        .lp-grid-benefits { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 768px) { .lp-grid-benefits { grid-template-columns: repeat(3, 1fr); } .lp-grid-benefits .span-large { grid-column: span 2; } }
        .lp-hero-grid { display: grid; grid-template-columns: 1fr; align-items: center; gap: 2.5rem; }
        @media (min-width: 900px) { .lp-hero-grid { grid-template-columns: 0.85fr 1fr; gap: 3rem; } }
        .lp-step { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; margin-bottom: 4rem; }
        @media (min-width: 800px) { .lp-step { grid-template-columns: 1fr 1fr; } .lp-step.reverse > :first-child { order: 2; } }
        .lp-testimonials { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 800px) { .lp-testimonials { grid-template-columns: 1.3fr 1fr; grid-template-rows: auto auto; } .lp-testimonials .t-large { grid-row: span 2; } }
      `}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(253,250,245,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/logo-nour.png" alt="Nour" style={{ height: '34px' }} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <a href="#benefices" style={{ display: 'none' }} className="lp-nav-link">Fonctionnalités</a>
            <a href="#temoignages" style={{ display: 'none' }} className="lp-nav-link">Avis</a>
            <button onClick={() => navigate('/onboarding')} style={{ padding: '0.6rem 1.25rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: '600', fontSize: '0.88rem' }}>
              Essayer Nour
            </button>
          </nav>
        </div>
      </header>

      {/* Hero — variante A : l'arche de lumière */}
      <section style={{ padding: '3rem 1.5rem 1rem' }}>
        <div className="lp-hero-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--gold-muted)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1rem' }}>☽ ✦</span> Bien-être islamique
            </div>
            <h1 className="lp-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: '500', lineHeight: '1.12', color: 'var(--green-deep)', marginBottom: '1.5rem' }}>
              Un espace pour<br />apaiser le cœur.
            </h1>
            <p style={{ fontSize: '1.08rem', color: 'var(--charcoal-mid)', lineHeight: '1.75', marginBottom: '2.25rem', maxWidth: '440px' }}>
              Nour t'accompagne au fil de tes journées avec le suivi d'humeur, un journal privé, la respiration guidée, et le meilleur du Coran et de la Sunna.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/onboarding')} style={{ padding: '1rem 2rem', background: 'var(--green-deep)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: '600', fontSize: '1rem' }}>
                Commencer gratuitement
              </button>
              <a href="#parcours" style={{ color: 'var(--gold-muted)', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                Voir comment ça marche →
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: '28px 28px 28px 90px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 20px 60px rgba(45,80,22,0.18)' }}>
            <img src="/art-light-arch.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.1rem 1.5rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--charcoal-light)', fontWeight: '500' }}>
          <span>🔒 100% privé</span>
          <span>🕊 Sans publicité</span>
          <span>📖 Contenu authentifié</span>
        </div>
      </div>

      {/* Bénéfices */}
      <section id="benefices" className="lp-section">
        <h2 className="lp-serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '500', color: 'var(--green-deep)', marginBottom: '0.75rem' }}>
          Quatre piliers pour ton quotidien
        </h2>
        <p style={{ color: 'var(--charcoal-mid)', marginBottom: '2.5rem', maxWidth: '560px' }}>
          Pas une app de plus à ouvrir par habitude — un espace que tu retrouves parce qu'il te fait du bien.
        </p>
        <div className="lp-grid-benefits">
          {BENEFITS.map((b, i) => (
            <div key={i} className={b.span === 'large' ? 'span-large' : ''} style={{ background: i % 2 === 0 ? 'var(--green-light)' : 'var(--gold-light)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-mid)', lineHeight: '1.6' }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parcours utilisateur */}
      <section id="parcours" className="lp-section" style={{ background: 'var(--beige)', borderRadius: '40px' }}>
        <h2 className="lp-serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '500', color: 'var(--green-deep)', marginBottom: '3rem', textAlign: 'center' }}>
          Une journée avec Nour
        </h2>
        {STEPS.map((s, i) => (
          <div key={i} className={`lp-step ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div>
              <span className="lp-serif" style={{ fontSize: '1.05rem', color: 'var(--gold-muted)', fontWeight: '600', letterSpacing: '0.03em' }}>{s.time}</span>
              <p style={{ fontSize: '1.15rem', color: 'var(--charcoal)', lineHeight: '1.7', marginTop: '0.75rem', maxWidth: '420px' }}>{s.text}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={s.image} alt="" style={{ width: '220px', borderRadius: 'var(--radius-lg)', boxShadow: '0 16px 40px rgba(44,42,38,0.15)' }} />
            </div>
          </div>
        ))}
      </section>

      {/* Section immersive */}
      <section style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5rem 0', overflow: 'hidden' }}>
        <img src="/art-arch-frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(45,80,22,0.55), rgba(45,80,22,0.75))' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '640px' }}>
          <p className="arabic" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: 'white', marginBottom: '1.25rem' }}>
            أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
          </p>
          <p className="lp-serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'white', fontStyle: 'italic', marginBottom: '0.5rem' }}>
            « C'est par le rappel d'Allah que les cœurs s'apaisent. »
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '0.05em' }}>CORAN 13:28</p>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="lp-section">
        <h2 className="lp-serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '500', color: 'var(--green-deep)', marginBottom: '2.5rem' }}>
          Ce que ressentent ceux qui l'utilisent
        </h2>
        <div className="lp-testimonials">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={t.size === 'large' ? 't-large' : ''} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="lp-serif" style={{ fontSize: t.size === 'large' ? '1.3rem' : '1.1rem', lineHeight: '1.6', color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                « {t.text} »
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.85rem' }}>
                  {t.initial}
                </div>
                <span style={{ fontSize: '0.88rem', color: 'var(--charcoal-mid)', fontWeight: '500' }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ position: 'relative', background: 'var(--green-deep)', color: 'white', textAlign: 'center', padding: '5rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', fontSize: '12rem', opacity: 0.06, lineHeight: 1 }}>☽</div>
        <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
          <h2 className="lp-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '500', marginBottom: '1.25rem' }}>
            Commence ton chemin vers la sérénité.
          </h2>
          <p style={{ opacity: 0.85, marginBottom: '2.25rem', fontSize: '1.05rem' }}>
            Gratuit, privé, et pensé pour ton cœur.
          </p>
          <button onClick={() => navigate('/onboarding')} style={{ padding: '1.1rem 2.5rem', background: 'white', color: 'var(--green-deep)', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '1.05rem' }}>
            Commencer gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <img src="/logo-nour.png" alt="Nour" style={{ height: '28px', marginBottom: '1rem', opacity: 0.8 }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <a href="/privacy" style={{ color: 'var(--charcoal-light)' }}>Politique de confidentialité</a>
          <a href="mailto:abderelmalki@gmail.com" style={{ color: 'var(--charcoal-light)' }}>Contact</a>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-light)' }}>© 2026 Nour · Fait avec ❤️ pour la Oumma</p>
      </footer>
    </div>
  );
}
