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

// Les 40 Rabbana : invocations coraniques commençant par "Rabbanâ" (Ô notre Seigneur)
// Référence : compilation "Forty Rabbana" (Fisabilillah Publications), versets vérifiés via l'API Quran (King Fahd Complex - Uthmani / Hamidullah)
export const RABBANA = [
  { id: "rabbana_01", title: "Accepter notre œuvre", arabic: "رَبَّنَا تَقَبَّلْ مِنَّآ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ", transliteration: "Rabbanaa taqabbal minnaa innaka Antas Samee'ul Aleem", french: "Notre Seigneur, accepte ceci de notre part! Car c'est Toi l'Audient, l'Omniscient.", source: "Coran 2:127", authenticity: "Invocation d'Ibrâhîm et Ismâ'îl en élevant la Kaaba" },
  { id: "rabbana_02", title: "Nous soumettre à Toi", arabic: "رَبَّنَا وَٱجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَآ أُمَّةًۭ مُّسْلِمَةًۭ لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَآ ۖ إِنَّكَ أَنتَ ٱلتَّوَّابُ ٱلرَّحِيمُ", transliteration: "Rabbanaa waj'alnaa muslimaini laka wa min zurriyyatinaaa ummatam muslimatal laka wa arinaa manaasikanaa wa tub 'alainaa innaka antat Tawwaabur Raheem", french: "Notre Seigneur! Fais de nous Tes Soumis, et de notre descendance une communauté soumise à Toi. Et montre-nous nos rites et accepte de nous le repentir. Car c'est Toi certes l'Accueillant au repentir, le Miséricordieux.", source: "Coran 2:128", authenticity: "Invocation d'Ibrâhîm et Ismâ'îl" },
  { id: "rabbana_03", title: "Le bien ici-bas et dans l'au-delà", arabic: "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةًۭ وَفِى ٱلْءَاخِرَةِ حَسَنَةًۭ وَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbanaaa aatina fid dunyaa hasanatawn wa fil aakhirati hasanatanw wa qinaa azaaban Naar", french: "Seigneur! Accorde-nous belle part ici-bas, et belle part aussi dans l'au-delà; et protège-nous du châtiment du Feu!", source: "Coran 2:201", authenticity: "Invocation coranique" },
  { id: "rabbana_04", title: "Endurance face à l'adversité", arabic: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًۭا وَثَبِّتْ أَقْدَامَنَا وَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", transliteration: "Rabbanaaa afrigh 'alainaa sabranw wa sabbit aqdaamanaa wansurnaa 'alal qawmil kaafireen", french: "Seigneur! Déverse sur nous l'endurance, affermis nos pas et donne-nous la victoire sur ce peuple infidèle.", source: "Coran 2:250", authenticity: "Invocation des soldats de Tâlût face à Jâlût" },
  { id: "rabbana_05", title: "Pardon de l'oubli et de l'erreur", arabic: "رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا", transliteration: "Rabbanaa la tu'aakhiznaa in naseenaaa aw akhtaanaa", french: "Seigneur, ne nous châtie pas s'il nous arrive d'oublier ou de commettre une erreur.", source: "Coran 2:286", authenticity: "Invocation coranique" },
  { id: "rabbana_06", title: "Ne pas être accablés comme nos prédécesseurs", arabic: "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا", transliteration: "Rabbanaa wa laa tahmil 'alainaaa isran kamaa hamaltahoo 'alal-lazeena min qablinaa", french: "Seigneur! Ne nous charge pas d'un fardeau lourd comme Tu as chargé ceux qui vécurent avant nous.", source: "Coran 2:286", authenticity: "Invocation coranique" },
  { id: "rabbana_07", title: "Ne pas être chargés au-delà de nos forces", arabic: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", transliteration: "Rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bih wa'fu 'annaa waghfir lanaa warhamnaa; Anta mawlaanaa fansurnaa 'alal qawmil kaafireen", french: "Seigneur! Ne nous impose pas ce que nous ne pouvons supporter, efface nos fautes, pardonne-nous et fais-nous miséricorde. Tu es notre Maître, accorde-nous donc la victoire sur les peuples infidèles.", source: "Coran 2:286", authenticity: "Invocation coranique" },
  { id: "rabbana_08", title: "Garder nos cœurs droits", arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ", transliteration: "Rabbanaa laa tuzigh quloobanaa ba'da iz hadaitanaa wa hab lanaa mil ladunka rahmah; innaka antal Wahhaab", french: "Seigneur! Ne laisse pas dévier nos cœurs après que Tu nous aies guidés; et accorde-nous Ta miséricorde. C'est Toi, certes, le Grand Donateur!", source: "Coran 3:8", authenticity: "Invocation coranique" },
  { id: "rabbana_09", title: "Le Jour du Rassemblement", arabic: "رَبَّنَآ إِنَّكَ جَامِعُ ٱلنَّاسِ لِيَوْمٍۢ لَّا رَيْبَ فِيهِ ۚ إِنَّ ٱللَّهَ لَا يُخْلِفُ ٱلْمِيعَادَ", transliteration: "Rabbanaaa innaka jaami'un-naasi li Yawmil laa raiba feeh; innal laaha laa yukhliful mee'aad", french: "Seigneur! C'est Toi qui rassembleras les gens, un jour - en quoi il n'y a point de doute - Allah, vraiment, ne manque jamais à Sa promesse.", source: "Coran 3:9", authenticity: "Invocation coranique" },
  { id: "rabbana_10", title: "Pardon de nos péchés", arabic: "رَبَّنَآ إِنَّنَآ ءَامَنَّا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbanaaa innanaaa aamannaa faghfir lanaa zunoobanaa wa qinaa 'azaaban Naar", french: "O notre Seigneur, nous avons la foi; pardonne-nous donc nos péchés, et protège-nous du châtiment du Feu.", source: "Coran 3:16", authenticity: "Invocation coranique" },
  { id: "rabbana_11", title: "Suivre le Messager", arabic: "رَبَّنَآ ءَامَنَّا بِمَآ أَنزَلْتَ وَٱتَّبَعْنَا ٱلرَّسُولَ فَٱكْتُبْنَا مَعَ ٱلشَّٰهِدِينَ", transliteration: "Rabbanaaa aamannaa bimaaa anzalta wattaba'nar Rasoola faktubnaa ma'ash shaahideen", french: "Seigneur! Nous avons cru à ce que Tu as fait descendre et suivi le messager. Inscris-nous donc parmi ceux qui témoignent.", source: "Coran 3:53", authenticity: "Invocation coranique" },
  { id: "rabbana_12", title: "Pardon et excès dans nos affaires", arabic: "رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِىٓ أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", transliteration: "Rabbanagh fir lanaa zunoobanaa wa israafanaa feee amirnaa wa sabbit aqdaamanaa wansurnaa 'alal qawmil kaafireen", french: "Seigneur, pardonne-nous nos péchés ainsi que nos excès dans nos comportements, affermis nos pas et donne-nous la victoire sur les gens mécréants.", source: "Coran 3:147", authenticity: "Invocation des compagnons des prophètes" },
  { id: "rabbana_13", title: "Tu n'as rien créé en vain", arabic: "رَبَّنَا مَا خَلَقْتَ هَٰذَا بَٰطِلًۭا سُبْحَٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "Rabbanaa maa khalaqta haaza baatilan Subhaanak faqinaa 'azaaban Naar", french: "Notre Seigneur! Tu n'as pas créé cela en vain. Gloire à Toi! Garde-nous du châtiment du Feu.", source: "Coran 3:191", authenticity: "Invocation de ceux qui méditent sur la création" },
  { id: "rabbana_14", title: "Préserve-nous de l'humiliation du Feu", arabic: "رَبَّنَآ إِنَّكَ مَن تُدْخِلِ ٱلنَّارَ فَقَدْ أَخْزَيْتَهُۥ ۖ وَمَا لِلظَّٰلِمِينَ مِنْ أَنصَارٍۢ", transliteration: "Rabbanaaa innaka man tudkhilin Naara faqad akhzaitahoo wa maa lizzaalimeena min ansaar", french: "Seigneur! Quiconque Tu fais entrer dans le Feu, Tu le couvres vraiment d'ignominie. Et pour les injustes, il n'y a pas de secoureurs!", source: "Coran 3:192", authenticity: "Invocation coranique" },
  { id: "rabbana_15", title: "Nous avons entendu l'appel à la foi", arabic: "رَّبَّنَآ إِنَّنَا سَمِعْنَا مُنَادِيًۭا يُنَادِى لِلْإِيمَٰنِ أَنْ ءَامِنُوا۟ بِرَبِّكُمْ فَـَٔامَنَّا", transliteration: "Rabbanaaa innanaa sami'naa munaadiyai yunaadee lil eemaani an aaminoo bi Rabbikum fa aamannaa", french: "Seigneur! Nous avons entendu l'appel de celui qui a appelé ainsi à la foi: «Croyez en votre Seigneur» et dès lors nous avons cru.", source: "Coran 3:193", authenticity: "Invocation coranique" },
  { id: "rabbana_16", title: "Mourir parmi les gens de bien", arabic: "رَبَّنَا فَٱغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّـَٔاتِنَا وَتَوَفَّنَا مَعَ ٱلْأَبْرَارِ", transliteration: "Rabbanaa faghfir lanaa zunoobanaa wa kaffir 'annaa saiyi aatina wa tawaffanaa ma'al abraar", french: "Seigneur, pardonne-nous nos péchés, efface de nous nos méfaits, et place-nous, à notre mort, avec les gens de bien.", source: "Coran 3:193", authenticity: "Invocation coranique" },
  { id: "rabbana_17", title: "Accomplis Tes promesses", arabic: "رَبَّنَا وَءَاتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ ٱلْقِيَٰمَةِ ۗ إِنَّكَ لَا تُخْلِفُ ٱلْمِيعَادَ", transliteration: "Rabbanaa wa aatinaa maa wa'attanaa 'alaa Rusulika wa laa tukhzinaa Yawmal Qiyaamah; innaka laa tukhliful mee'aad", french: "Seigneur! Donne-nous ce que Tu nous as promis par Tes messagers. Et ne nous couvre pas d'ignominie au Jour de la Résurrection. Car Toi, Tu ne manques pas à Ta promesse.", source: "Coran 3:194", authenticity: "Invocation coranique" },
  { id: "rabbana_18", title: "Larmes face à la vérité", arabic: "رَبَّنَآ ءَامَنَّا فَٱكْتُبْنَا مَعَ ٱلشَّٰهِدِينَ", transliteration: "Rabbanaaa aamannaa faktubnaa ma'ash shaahideen", french: "O notre Seigneur! Nous croyons: inscris-nous donc parmi ceux qui témoignent.", source: "Coran 5:83", authenticity: "Invocation de croyants sincères émus aux larmes" },
  { id: "rabbana_19", title: "La table servie", arabic: "ٱللَّهُمَّ رَبَّنَآ أَنزِلْ عَلَيْنَا مَآئِدَةًۭ مِّنَ ٱلسَّمَآءِ تَكُونُ لَنَا عِيدًۭا لِّأَوَّلِنَا وَءَاخِرِنَا وَءَايَةًۭ مِّنكَ ۖ وَٱرْزُقْنَا وَأَنتَ خَيْرُ ٱلرَّٰزِقِينَ", transliteration: "Allaahumma Rabbanaaa anzil 'alainaa maaa'idatam minas samaaa'i takoonu lanaa 'eedal li awwalinaa wa aakirinaa wa Aayatam minka warzuqnaa wa Anta khairur raaziqeen", french: "O Allah, notre Seigneur, fais descendre du ciel sur nous une table servie qui soit une fête pour nous, pour le premier d'entre nous comme pour le dernier, ainsi qu'un signe de Ta part. Nourris-nous: Tu es le meilleur des nourrisseurs.", source: "Coran 5:114", authenticity: "Invocation de 'Îsâ (Jésus), fils de Marie" },
  { id: "rabbana_20", title: "Nous nous sommes fait du tort", arabic: "رَبَّنَا ظَلَمْنَآ أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ ٱلْخَٰسِرِينَ", transliteration: "Rabbanaa zalamnaaa anfusanaa wa illam taghfir lanaa wa tarhamnaa lanakoonanna minal khaasireen", french: "O notre Seigneur, nous avons fait du tort à nous-mêmes. Et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants.", source: "Coran 7:23", authenticity: "Invocation d'Adam et Hawwâ (Ève)" },
  { id: "rabbana_21", title: "Ne pas être avec les injustes", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ ٱلْقَوْمِ ٱلظَّٰلِمِينَ", transliteration: "Rabbanaa laa taj'alnaa ma'al qawmiz zaalimneen", french: "O notre Seigneur! Ne nous mets pas avec le peuple injuste.", source: "Coran 7:47", authenticity: "Invocation coranique" },
  { id: "rabbana_22", title: "Trancher avec la vérité", arabic: "رَبَّنَا ٱفْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِٱلْحَقِّ وَأَنتَ خَيْرُ ٱلْفَٰتِحِينَ", transliteration: "Rabbanaf tah bainanaa wa baina qawminaa bilhaqqi wa Anta khairul faatiheen", french: "O notre Seigneur, tranche par la vérité, entre nous et notre peuple, car Tu es le meilleur des juges.", source: "Coran 7:89", authenticity: "Invocation de Shu'ayb et des croyants de son peuple" },
  { id: "rabbana_23", title: "Mourir pleinement soumis", arabic: "رَبَّنَآ أَفْرِغْ عَلَيْنَا صَبْرًۭا وَتَوَفَّنَا مُسْلِمِينَ", transliteration: "Rabbanaaa afrigh 'alainaa sabranw wa tawaffanaa muslimeen", french: "O notre Seigneur! Déverse sur nous l'endurance et fais-nous mourir entièrement soumis.", source: "Coran 7:126", authenticity: "Invocation des magiciens de Pharaon devenus croyants" },
  { id: "rabbana_24", title: "Ne pas être une cible pour les injustes", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةًۭ لِّلْقَوْمِ ٱلظَّٰلِمِينَ", transliteration: "Rabbanaa laa taj'alnaa fitnatal lilqawmiz zaalimeen", french: "O notre Seigneur, ne fais pas de nous une cible pour les persécutions des injustes.", source: "Coran 10:85", authenticity: "Invocation de Moïse et des croyants de son peuple" },
  { id: "rabbana_25", title: "Tu sais ce que nous cachons", arabic: "رَبَّنَآ إِنَّكَ تَعْلَمُ مَا نُخْفِى وَمَا نُعْلِنُ ۗ وَمَا يَخْفَىٰ عَلَى ٱللَّهِ مِن شَىْءٍۢ فِى ٱلْأَرْضِ وَلَا فِى ٱلسَّمَآءِ", transliteration: "Rabbanaaa innaka ta'lamu maa nukhfee wa maa nu'lin; wa maa yakhfaa 'alal laahi min shai'in fil ardi wa laa fis samaaa'", french: "O notre Seigneur, Tu sais, vraiment, ce que nous cachons et ce que nous divulguons: rien n'échappe à Allah, ni sur terre, ni au ciel.", source: "Coran 14:38", authenticity: "Invocation d'Ibrâhîm" },
  { id: "rabbana_26", title: "Accomplir la prière", arabic: "رَبَّنَا وَتَقَبَّلْ دُعَآءِ", transliteration: "Rabbanaa wa taqabbal du'aaa'", french: "Exauce ma prière, ô notre Seigneur!", source: "Coran 14:40", authenticity: "Invocation d'Ibrâhîm pour lui et sa descendance" },
  { id: "rabbana_27", title: "Pardon pour mes parents", arabic: "رَبَّنَا ٱغْفِرْ لِى وَلِوَٰلِدَىَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ ٱلْحِسَابُ", transliteration: "Rabbanagh fir lee wa liwaalidaiya wa lilmu'mineena Yawma yaqoomul hisaab", french: "O notre Seigneur! Pardonne-moi, ainsi qu'à mes père et mère et aux croyants, le jour de la reddition des comptes.", source: "Coran 14:41", authenticity: "Invocation d'Ibrâhîm" },
  { id: "rabbana_28", title: "Miséricorde et droiture", arabic: "رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا", transliteration: "Rabbanaaa aatinaa mil ladunka rahmatanw wa haiyi' lanaa min amrinaa rashadaa", french: "O notre Seigneur, donne-nous de Ta part une miséricorde; et assure-nous la droiture dans tout ce qui nous concerne.", source: "Coran 18:10", authenticity: "Invocation des gens de la caverne" },
  { id: "rabbana_29", title: "Crainte face à la tyrannie", arabic: "رَبَّنَآ إِنَّنَا نَخَافُ أَن يَفْرُطَ عَلَيْنَآ أَوْ أَن يَطْغَىٰ", transliteration: "Rabbanaaa innanaa nakhaafu ai yafruta 'alainaaa aw ai yatghaa", french: "O notre Seigneur, nous craignons qu'il ne nous maltraite indûment, ou qu'il dépasse les limites.", source: "Coran 20:45", authenticity: "Invocation de Moïse et Aaron avant de se présenter à Pharaon" },
  { id: "rabbana_30", title: "Une maison auprès de Toi au Paradis", arabic: "رَبِّ ٱبْنِ لِى عِندَكَ بَيْتًۭا فِى ٱلْجَنَّةِ وَنَجِّنِى مِن فِرْعَوْنَ وَعَمَلِهِۦ وَنَجِّنِى مِنَ ٱلْقَوْمِ ٱلظَّٰلِمِينَ", transliteration: "Rabbi-bni lee 'indaka baitan fil jannati wa najjinee min Fir'awna wa 'amalihii wa najjinee minal qawmiz zaalimeen", french: "Seigneur, construis-moi auprès de Toi une maison dans le Paradis, et sauve-moi de Pharaon et de son œuvre; et sauve-moi des gens injustes.", source: "Coran 66:11", authenticity: "Invocation de la femme de Pharaon (Âsiya)" },
  { id: "rabbana_31", title: "Le meilleur des miséricordieux", arabic: "رَبَّنَآ ءَامَنَّا فَٱغْفِرْ لَنَا وَٱرْحَمْنَا وَأَنتَ خَيْرُ ٱلرَّٰحِمِينَ", transliteration: "Rabbanaaa aamannaa faghfir lanaa warhamnaa wa Anta khairur raahimeen", french: "Seigneur, nous croyons; pardonne-nous donc et fais-nous miséricorde, car Tu es le meilleur des Miséricordieux.", source: "Coran 23:109", authenticity: "Invocation des croyants sincères" },
  { id: "rabbana_32", title: "Écarte de nous le châtiment de l'Enfer", arabic: "رَبَّنَا ٱصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا", transliteration: "Rabbanas rif 'annnaa 'azaaba Jahannama inn 'azaabahaa kaana gharaamaa", french: "Seigneur, écarte de nous le châtiment de l'Enfer, car son châtiment est permanent.", source: "Coran 25:65", authenticity: "Invocation des serviteurs d'Allah" },
  { id: "rabbana_33", title: "La joie de nos épouses et descendants", arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّٰتِنَا قُرَّةَ أَعْيُنٍۢ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", transliteration: "Rabbanaa hab lanaa min azwaajinaa wa zurriyaatinaa qurrata a'yuninw waj'alnaa lilmuttaqeena Imaamaa", french: "Seigneur, donne-nous, en nos épouses et nos descendants, la joie des yeux, et fais de nous un guide pour les pieux.", source: "Coran 25:74", authenticity: "Invocation des serviteurs d'Allah" },
  { id: "rabbana_34", title: "Louange d'avoir écarté l'affliction", arabic: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَذْهَبَ عَنَّا ٱلْحَزَنَ ۖ إِنَّ رَبَّنَا لَغَفُورٌۭ شَكُورٌ", transliteration: "Alhamdu lillaahil lazeee azhaba 'annal hazan; inna Rabbanaa la Ghafoorun Shakoor", french: "Louange à Allah qui a écarté de nous l'affliction. Notre Seigneur est certes Pardonneur et Reconnaissant.", source: "Coran 35:34", authenticity: "Parole des gens du Paradis" },
  { id: "rabbana_35", title: "Ta miséricorde embrasse toute chose", arabic: "رَبَّنَا وَسِعْتَ كُلَّ شَىْءٍۢ رَّحْمَةًۭ وَعِلْمًۭا فَٱغْفِرْ لِلَّذِينَ تَابُوا۟ وَٱتَّبَعُوا۟ سَبِيلَكَ وَقِهِمْ عَذَابَ ٱلْجَحِيمِ", transliteration: "Rabbanaa wasi'ta kulla shai'ir rahmantanw wa 'ilman faghfir lillazeena taaboo wattaba'oo sabeelaka wa qihim 'azaabal Jaheem", french: "Seigneur! Tu étends sur toute chose Ta miséricorde et Ta science. Pardonne donc à ceux qui se repentent et suivent Ton chemin, et protège-les du châtiment de l'Enfer.", source: "Coran 40:7", authenticity: "Invocation des anges qui portent le Trône" },
  { id: "rabbana_36", title: "Fais-les entrer aux Jardins d'Eden", arabic: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّٰتِ عَدْنٍ ٱلَّتِى وَعَدتَّهُمْ وَمَن صَلَحَ مِنْ ءَابَآئِهِمْ وَأَزْوَٰجِهِمْ وَذُرِّيَّٰتِهِمْ ۚ إِنَّكَ أَنتَ ٱلْعَزِيزُ ٱلْحَكِيمُ", transliteration: "Rabbanaa wa adkhilhum Jannaati 'adninil latee wa'attahum wa man salaha min aabaaa'ihim wa azwaajihim wa zurriyyaatihim; innaka Antal 'Azeezul Hakeem", french: "Seigneur! Fais-les entrer aux jardins d'Eden que Tu leur as promis, ainsi qu'aux vertueux parmi leurs ancêtres, leurs épouses et leurs descendants, car c'est Toi le Puissant, le Sage.", source: "Coran 40:8", authenticity: "Invocation des anges qui portent le Trône" },
  { id: "rabbana_37", title: "Pardon pour nos frères dans la foi", arabic: "رَبَّنَا ٱغْفِرْ لَنَا وَلِإِخْوَٰنِنَا ٱلَّذِينَ سَبَقُونَا بِٱلْإِيمَٰنِ وَلَا تَجْعَلْ فِى قُلُوبِنَا غِلًّۭا لِّلَّذِينَ ءَامَنُوا۟ رَبَّنَآ إِنَّكَ رَءُوفٌۭ رَّحِيمٌ", transliteration: "Rabbanagh fir lanaa wa li ikhwaani nal lazeena sabqoonaa bil eemaani wa laa taj'al fee quloobinaa ghillalil lazeena aamanoo rabbannaaa innaka Ra'oofur Raheem", french: "Seigneur, pardonne-nous, ainsi qu'à nos frères qui nous ont précédés dans la foi; et ne mets dans nos cœurs aucune rancœur pour ceux qui ont cru. Seigneur, Tu es Compatissant et Très Miséricordieux.", source: "Coran 59:10", authenticity: "Invocation des croyants venus après les premiers musulmans" },
  { id: "rabbana_38", title: "En Toi nous plaçons notre confiance", arabic: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ ٱلْمَصِيرُ", transliteration: "Rabbanaa 'alaika tawakkalnaa wa ilaika anabnaa wa ilaikal maseer", french: "Seigneur, c'est en Toi que nous mettons notre confiance et à Toi nous revenons. Et vers Toi est le devenir.", source: "Coran 60:4", authenticity: "Invocation d'Ibrâhîm et des croyants avec lui" },
  { id: "rabbana_39", title: "Ne pas être une épreuve pour les mécréants", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةًۭ لِّلَّذِينَ كَفَرُوا۟ وَٱغْفِرْ لَنَا رَبَّنَآ ۖ إِنَّكَ أَنتَ ٱلْعَزِيزُ ٱلْحَكِيمُ", transliteration: "Rabbanaa laa taj'alnaa fitnatal lillazeena kafaroo waghfir lanaa rabbanaa innaka antal azeezul hakeem", french: "Seigneur, ne fais pas de nous un sujet de tentation pour ceux qui ont mécru; et pardonne-nous, Seigneur, car c'est Toi le Puissant, le Sage.", source: "Coran 60:5", authenticity: "Invocation d'Ibrâhîm et des croyants avec lui" },
  { id: "rabbana_40", title: "Parfais notre lumière", arabic: "رَبَّنَآ أَتْمِمْ لَنَا نُورَنَا وَٱغْفِرْ لَنَآ ۖ إِنَّكَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌۭ", transliteration: "Rabbanaaa atmim lanaa nooranaa waghfir lana innaka 'alaa kulli shai'in qadeer", french: "Seigneur, parfais-nous notre lumière et pardonne-nous. Car Tu es Omnipotent.", source: "Coran 66:8", authenticity: "Invocation des croyants au Jour de la Résurrection" }
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
