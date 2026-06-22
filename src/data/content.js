// Contenu de démonstration en français
// TODO: Faire réviser l'ensemble du contenu par un érudit qualifié avant la mise en production

export const DUAS = [
  {
    id: "dua_anxiete_1",
    title: "Dua pour l'anxiété",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
    french: "Ô Allah, je me réfugie en Toi contre l'inquiétude et la tristesse",
    source: "Rapporté par Al-Bukhârî",
    authenticity: "Sahîh",
    category: "anxiete",
    tags: ["stress", "anxiete", "tristesse"]
  },
  {
    id: "dua_stress_1",
    title: "Dua pour le stress",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    french: "Allah nous suffit, et Il est le meilleur des protecteurs",
    source: "Coran 3:173",
    authenticity: "Authentique — Parole d'Ibrahim (a.s.) et des croyants",
    category: "stress",
    tags: ["stress", "tawakkul", "confiance"]
  },
  {
    id: "dua_sommeil_1",
    title: "Dua avant de dormir",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    french: "En Ton nom, ô Allah, je meurs et je vis",
    source: "Al-Bukhârî",
    authenticity: "Sahîh",
    category: "sommeil",
    tags: ["sommeil", "nuit", "repos"]
  },
  {
    id: "dua_gratitude_1",
    title: "Dua pour la gratitude",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    french: "Ô Allah, aide-moi à Te mentionner, à T'être reconnaissant et à T'adorer de la meilleure façon",
    source: "Abu Dawud, An-Nasa'i",
    authenticity: "Sahîh",
    category: "gratitude",
    tags: ["gratitude", "reconnaissance", "ibadah"]
  },
  {
    id: "dua_tristesse_1",
    title: "Dua pour la tristesse",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ",
    transliteration: "La ilaha illallahul-'Adhimul-Halim",
    french: "Il n'y a de divinité qu'Allah, le Sublime, le Patient",
    source: "Al-Bukhârî, Muslim",
    authenticity: "Sahîh",
    category: "tristesse",
    tags: ["tristesse", "deuil", "soulagement"]
  }
];

export const ADHKAR = [
  {
    id: "adhkar_matin_1",
    title: "Adhkâr du matin",
    time: "matin",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah",
    french: "Nous avons atteint le matin et tout le règne appartient à Allah",
    repetitions: 1,
    source: "Muslim",
    authenticity: "Sahîh"
  },
  {
    id: "adhkar_soir_1",
    title: "Adhkâr du soir",
    time: "soir",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah",
    french: "Nous avons atteint le soir et tout le règne appartient à Allah",
    repetitions: 1,
    source: "Muslim",
    authenticity: "Sahîh"
  },
  {
    id: "adhkar_subhanallah",
    title: "Subhânallah",
    time: "any",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhanallah",
    french: "Gloire à Allah",
    repetitions: 33,
    source: "Al-Bukhârî, Muslim",
    authenticity: "Sahîh"
  },
  {
    id: "adhkar_alhamdulillah",
    title: "Alhamdulillah",
    time: "any",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    french: "Louange à Allah",
    repetitions: 33,
    source: "Al-Bukhârî, Muslim",
    authenticity: "Sahîh"
  },
  {
    id: "adhkar_allahuakbar",
    title: "Allahu Akbar",
    time: "any",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    french: "Allah est le Plus Grand",
    repetitions: 34,
    source: "Al-Bukhârî, Muslim",
    authenticity: "Sahîh"
  }
];

export const REFLECTIONS = [
  {
    id: "ref_tawakkul_1",
    title: "La confiance en Allah",
    type: "quran",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    french: "Celui qui place sa confiance en Allah, Il lui suffit",
    source: "Coran 65:3",
    theme: "tawakkul",
    reflection: "Dans les moments d'incertitude, rappelle-toi qu'Allah connaît ce que tu ne sais pas. Ta confiance en Lui est ta plus grande force."
  },
  {
    id: "ref_sabr_1",
    title: "La patience",
    type: "quran",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    french: "Certes, Allah est avec les patients",
    source: "Coran 2:153",
    theme: "patience",
    reflection: "La patience n'est pas passive. C'est choisir de rester ancré dans ta foi même quand les vagues sont fortes."
  },
  {
    id: "ref_rahma_1",
    title: "La miséricorde divine",
    type: "hadith",
    arabic: "إِنَّ رَحْمَتِي سَبَقَتْ غَضَبِي",
    french: "Ma miséricorde devance Ma colère",
    source: "Al-Bukhârî — Hadith Qudsi",
    authenticity: "Sahîh",
    theme: "rahma",
    reflection: "Peu importe où tu en es, la porte du retour vers Allah est toujours ouverte. Sa miséricorde est infinie."
  },
  {
    id: "ref_ease_1",
    title: "Après la difficulté, l'aisance",
    type: "quran",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    french: "Certes, avec la difficulté vient l'aisance",
    source: "Coran 94:5",
    theme: "espoir",
    reflection: "Allah promet dans le Coran que chaque épreuve porte en elle la graine de l'aisance. Tu n'es pas seul."
  }
];

export const BREATHING_EXERCISES = [
  {
    id: "breath_2min",
    title: "Pause de 2 minutes",
    duration: 120,
    description: "Un reset rapide pour calmer le mental",
    type: "box",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    premium: false,
    dhikr: "Bismillah"
  },
  {
    id: "breath_salah",
    title: "Avant la salâh — 3 min",
    duration: 180,
    description: "Se recentrer avant la prière",
    type: "calm",
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    premium: false,
    dhikr: "Subhânallah"
  },
  {
    id: "breath_sleep",
    title: "Détente pour le sommeil — 5 min",
    duration: 300,
    description: "Préparer le corps et l'esprit au repos",
    type: "478",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    premium: true,
    dhikr: "Allahu Akbar"
  },
  {
    id: "breath_tasbih",
    title: "Respiration Tasbîh",
    duration: 240,
    description: "Synchroniser le souffle avec le dhikr",
    type: "tasbih",
    inhale: 3,
    hold1: 1,
    exhale: 3,
    hold2: 1,
    premium: true,
    dhikr: "Subhânallah — Alhamdulillah — Allahu Akbar"
  }
];

export const JOURNAL_PROMPTS = [
  { id: "gratitude", label: "Gratitude", prompt: "Qu'est-ce que je suis reconnaissant aujourd'hui, même dans les petites choses ?", icon: "🤲" },
  { id: "tawakkul", label: "Confiance", prompt: "Qu'est-ce que je remets entre les mains d'Allah aujourd'hui ?", icon: "☁️" },
  { id: "patience", label: "Patience", prompt: "Dans quelle situation ai-je besoin de plus de sabr en ce moment ?", icon: "🌱" },
  { id: "blessings", label: "Bienfaits", prompt: "Quels bienfaits d'Allah ai-je peut-être oubliés de reconnaître ?", icon: "✨" },
  { id: "worries", label: "Préoccupations", prompt: "Qu'est-ce qui m'inquiète ? Puis-je confier cela à Allah ?", icon: "🌊" },
  { id: "growth", label: "Croissance", prompt: "Comment cette épreuve me fait-elle grandir dans ma foi ?", icon: "🌿" }
];

export const MOOD_LABELS = {
  5: { label: "Très bien", emoji: "😊", color: "#4A7C59" },
  4: { label: "Bien", emoji: "🙂", color: "#6B9E78" },
  3: { label: "Neutre", emoji: "😐", color: "#A89070" },
  2: { label: "Difficile", emoji: "😔", color: "#8B7355" },
  1: { label: "Très difficile", emoji: "😢", color: "#6B4C3B" }
};

export const TRIGGERS = [
  { id: "travail", label: "Travail" },
  { id: "famille", label: "Famille" },
  { id: "sante", label: "Santé" },
  { id: "solitude", label: "Solitude" },
  { id: "foi", label: "Foi" },
  { id: "finances", label: "Finances" },
  { id: "fatigue", label: "Fatigue" },
  { id: "relations", label: "Relations" }
];
