import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--beige)' }}>
      <div className="page-header">
        <button onClick={() => navigate(-1)} style={{ color: 'var(--charcoal-light)', marginRight: '0.5rem' }}>←</button>
        <h1 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--green-deep)' }}>Politique de confidentialité</h1>
      </div>

      <div style={{ padding: '0 1.25rem 3rem', maxWidth: '640px', margin: '0 auto', color: 'var(--charcoal-mid)', fontSize: '0.92rem', lineHeight: '1.7' }}>
        <p style={{ color: 'var(--charcoal-light)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Dernière mise à jour : 24 juin 2026</p>

        <p style={{ marginBottom: '1.25rem' }}>
          Nour ("l'application", "nous") est une application de bien-être islamique. Cette page explique quelles données nous collectons, pourquoi, et comment tu peux les contrôler.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>1. Qui sommes-nous</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Nour est un projet indépendant. Pour toute question relative à tes données personnelles, contacte-nous à : <a href="mailto:elmalkidigital@gmail.com" style={{ color: 'var(--green-mid)' }}>elmalkidigital@gmail.com</a>.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>2. Données que nous collectons</h2>
        <p style={{ marginBottom: '0.5rem' }}>Lorsque tu crées un compte et utilises l'application, nous traitons :</p>
        <ul style={{ marginBottom: '1.25rem', paddingLeft: '1.25rem' }}>
          <li><strong>Données de compte</strong> — email, prénom/nom affiché, mot de passe (géré de façon chiffrée par Firebase Authentication, nous n'y avons jamais accès en clair).</li>
          <li><strong>Données d'humeur</strong> — les entrées que tu enregistres dans l'onglet Humeur (niveau, intensité, déclencheurs, notes).</li>
          <li><strong>Entrées de journal</strong> — le texte que tu écris dans l'onglet Journal, et les tags associés.</li>
          <li><strong>Préférences</strong> — thème clair/sombre, langue.</li>
        </ul>
        <p style={{ marginBottom: '1.25rem' }}>
          Nous ne collectons aucune donnée de localisation, de contacts, ni d'identifiant publicitaire. L'application ne contient pas de traceurs publicitaires.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>3. Où sont stockées tes données</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Tes données sont hébergées sur <strong>Firebase</strong> (Google Cloud), dans les services Firebase Authentication et Cloud Firestore. Google agit comme sous-traitant technique ; il n'a pas accès au contenu de ton journal ou de tes humeurs au-delà de l'hébergement.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>4. Contenu audio et coranique</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          L'onglet "Coran" diffuse des récitations audio et du texte arabe depuis des services tiers publics (cdn.islamic.network et api.alquran.cloud). Lorsque tu utilises cet onglet, ton appareil communique directement avec ces services (ton adresse IP leur est visible, comme pour toute lecture de média en ligne). Nous n'envoyons aucune de tes données personnelles à ces services.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>5. Partage des données</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Nous ne vendons et ne partageons jamais tes données personnelles (humeurs, journal) avec des tiers à des fins commerciales ou publicitaires. Elles ne sont utilisées que pour faire fonctionner l'application pour toi.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>6. Tes droits</h2>
        <p style={{ marginBottom: '0.5rem' }}>Tu peux à tout moment :</p>
        <ul style={{ marginBottom: '1.25rem', paddingLeft: '1.25rem' }}>
          <li>Demander une copie de tes données (export) ;</li>
          <li>Demander la suppression de ton compte et de toutes les données associées ;</li>
          <li>Corriger les informations de ton profil directement dans l'application.</li>
        </ul>
        <p style={{ marginBottom: '1.25rem' }}>
          Pour exercer ces droits, écris-nous à <a href="mailto:elmalkidigital@gmail.com" style={{ color: 'var(--green-mid)' }}>elmalkidigital@gmail.com</a> depuis l'adresse email associée à ton compte. Nous traitons les demandes de suppression dans un délai de 30 jours.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>7. Sécurité</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          L'accès à tes données est protégé par des règles de sécurité Firestore : seul ton compte authentifié peut lire ou écrire tes propres humeurs, entrées de journal et préférences. Personne d'autre, y compris d'autres utilisateurs de l'application, ne peut y accéder.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>8. Avertissement</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Nour n'est pas un dispositif médical. Elle ne diagnostique pas, ne traite pas et ne prévient aucune maladie mentale ou physique, et ne remplace pas une consultation avec un professionnel de santé.
        </p>

        <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--charcoal)', marginTop: '1.75rem', marginBottom: '0.6rem' }}>9. Modifications de cette politique</h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Si cette politique évolue de manière significative, nous t'en informerons via l'application avant ta prochaine connexion.
        </p>
      </div>
    </div>
  );
}
