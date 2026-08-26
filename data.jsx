// data.jsx — Contenu de l'app d'orientation 3e
// Filières (résultats possibles), questions du quiz + scoring, et fiches détaillées.

// ── Les 5 voies possibles après la 3e ──────────────────────────
const FILIERES = {
  gen: {
    key: 'gen',
    stats: [{ v: '≈ 99 %', l: 'poursuivent dans le supérieur' }, { v: 'Bac +3 à +5', l: 'niveau le plus souvent visé' }],
    onisep: 'https://www.onisep.fr/formation/apres-la-3-la-voie-generale-et-technologique/qu-est-ce-que-la-voie-generale-et-technologique',
    name: 'Voie générale',
    badge: '2ⁿᵈᵉ GT → Bac général',
    hue: 280,                       // indigo / violet
    tagline: 'Garder un maximum de portes ouvertes.',
    duree: '3 ans — 2ⁿᵈᵉ, 1ʳᵉ, Terminale',
    intro: "Tu entres en 2ⁿᵈᵉ générale et technologique, puis tu choisis des spécialités selon tes goûts. Le bac général prépare surtout à des études supérieures longues.",
    fais: [
      'Un tronc commun : français, philo, langues, histoire-géo, sciences.',
      '3 spécialités en 1ʳᵉ, puis 2 que tu gardes en Terminale.',
      'Beaucoup de réflexion, d\u2019écrit et d\u2019analyse.',
    ],
    listLabel: 'Quelques spécialités',
    list: ['Mathématiques', 'Physique-chimie', 'SVT', 'SES (économie)', 'Histoire-géo, géopolitique', 'Humanités & philo', 'Langues & cultures', 'NSI (informatique)'],
    apresLabel: 'Et après le bac ?',
    apres: ['Université', 'Classes prépa (CPGE)', 'Écoles d\u2019ingénieurs & de commerce', 'BUT / BTS'],
    pour: ['Tu aimes comprendre le « pourquoi » des choses.', 'Tu ne veux pas encore te fermer de portes.', 'Tu te vois faire des études longues.'],
  },
  tech: {
    key: 'tech',
    stats: [{ v: '≈ 80 %', l: 'poursuivent en BTS, BUT…' }, { v: 'Bac +2 / +3', l: 'niveau le plus courant' }],
    onisep: 'https://www.onisep.fr/formation/apres-la-3-la-voie-generale-et-technologique/qu-est-ce-que-la-voie-generale-et-technologique',
    name: 'Voie technologique',
    badge: '2ⁿᵈᵉ GT → Bac techno',
    hue: 200,                       // cyan / bleu
    tagline: 'Allier la théorie à des applications concrètes.',
    duree: '3 ans — 2ⁿᵈᵉ, 1ʳᵉ, Terminale',
    intro: "Tu passes aussi par la 2ⁿᵈᵉ GT, mais le bac techno est plus appliqué : il s\u2019organise autour d\u2019un domaine (gestion, industrie, santé, design…).",
    fais: [
      'Des cours, mais surtout des projets et des travaux pratiques.',
      'Une série choisie selon le domaine qui t\u2019attire.',
      'Un pont idéal vers des études supérieures concrètes.',
    ],
    listLabel: 'Les séries possibles',
    list: ['STMG — management & gestion', 'STI2D — industrie & dév. durable', 'ST2S — santé & social', 'STL — laboratoire', 'STD2A — design & arts appliqués', 'STHR — hôtellerie-restauration', 'S2TMD — musique & danse'],
    apresLabel: 'Et après le bac ?',
    apres: ['BUT', 'BTS', 'Écoles spécialisées', 'Université & prépas techno'],
    pour: ['Tu aimes le concret et travailler en projet.', 'Tu as déjà un domaine qui te plaît.', 'Tu retiens mieux en appliquant.'],
  },
  pro: {
    key: 'pro',
    stats: [{ v: '≈ 1 sur 2', l: 'poursuit ses études (souvent BTS)' }, { v: '≈ 1 sur 2', l: 'entre dans la vie active' }],
    onisep: 'https://www.onisep.fr/orientation/le-college/que-faire-apres-la-3',
    name: 'Bac professionnel',
    badge: '2ⁿᵈᵉ pro → Bac pro',
    hue: 45,                        // ambre / orange
    tagline: 'Apprendre un métier sans renoncer au bac.',
    duree: '3 ans — 2ⁿᵈᵉ, 1ʳᵉ, Terminale',
    intro: "Dès la 2ⁿᵈᵉ pro tu choisis une famille de métiers. Beaucoup de pratique, des stages en entreprise (PFMP), et un bac qui mène à l\u2019emploi ou à des études courtes.",
    fais: [
      'De la pratique en atelier ou en plateau technique.',
      'Des périodes de stage en entreprise chaque année.',
      'Un métier qui se précise progressivement.',
    ],
    listLabel: 'Familles de métiers',
    list: ['Relation client & commerce', 'Gestion-administration', 'Maintenance & industrie', 'Construction & bâtiment', 'Numérique & réseaux', 'Hygiène, santé, social', 'Métiers de bouche', 'Esthétique & beauté'],
    apresLabel: 'Et après le bac ?',
    apres: ['Emploi direct', 'BTS (priorité aux bacs pro)', 'Écoles spécialisées'],
    pour: ['Tu aimes le terrain et la pratique.', 'Tu veux un métier concret et utile.', 'Tu apprends mieux en faisant qu\u2019en écoutant.'],
  },
  cap: {
    key: 'cap',
    stats: [{ v: '≈ 60 %', l: 'poursuivent (bac pro, MC…)' }, { v: '2 ans', l: 'pour un premier métier' }],
    onisep: 'https://www.onisep.fr/orientation/le-college/que-faire-apres-la-3',
    name: 'CAP',
    badge: 'Certificat d\u2019aptitude pro. — 2 ans',
    hue: 155,                       // menthe / vert
    tagline: 'Un métier, vite et bien.',
    duree: '2 ans',
    intro: "Le CAP forme à un métier précis en 2 ans, avec beaucoup de pratique et des stages. C\u2019est la voie la plus directe vers un savoir-faire reconnu.",
    fais: [
      'Surtout de l\u2019atelier et de la pratique professionnelle.',
      'Des stages réguliers en entreprise.',
      'Un savoir-faire concret et reconnu en 2 ans.',
    ],
    listLabel: 'Exemples de CAP',
    list: ['Cuisine', 'Pâtisserie', 'Coiffure', 'Mécanique auto', 'Électricité', 'Menuiserie', 'Vente', 'Petite enfance (AEPE)'],
    apresLabel: 'Et après ?',
    apres: ['Emploi rapide', 'Mention complémentaire (1 an)', 'Poursuite en bac pro'],
    pour: ['Tu veux apprendre un métier rapidement.', 'Tu préfères l\u2019atelier au cours théorique.', 'Tu veux devenir autonome vite.'],
  },
  alt: {
    key: 'alt',
    stats: [{ v: '≈ 70 %', l: 'en emploi peu après le diplôme' }, { v: 'Salaire', l: 'versé pendant la formation' }],
    onisep: 'https://www.onisep.fr/orientation/le-college/que-faire-apres-la-3',
    name: 'Apprentissage',
    badge: 'Alternance — école + entreprise',
    hue: 350,                       // rose / magenta
    tagline: 'Se former en travaillant (et être payé·e).',
    duree: 'Variable — selon le diplôme préparé (CAP, bac pro, BTS…)',
    intro: "L\u2019apprentissage n\u2019est pas un diplôme : c\u2019est une façon d\u2019étudier. Tu prépares un CAP, un bac pro (ou plus) en alternant centre de formation et entreprise, avec un vrai contrat et un salaire.",
    fais: [
      'Un rythme alterné (ex. 1 semaine en cours / 2 en entreprise).',
      'Un contrat d\u2019apprentissage et un salaire (% du SMIC selon l\u2019âge).',
      'De l\u2019expérience pro avant même d\u2019avoir ton diplôme.',
    ],
    listLabel: 'Secteurs qui recrutent',
    list: ['Artisanat', 'BTP & bâtiment', 'Commerce', 'Hôtellerie-restauration', 'Industrie', 'Services à la personne', 'Numérique'],
    apresLabel: 'Et après ?',
    apres: ['Diplôme + expérience reconnue', 'Embauche facilitée', 'Poursuite d\u2019études possible'],
    pour: ['Tu veux entrer tôt dans le monde du travail.', 'Tu apprends mieux en situation réelle.', 'Tu veux gagner ta vie tout en te formant.'],
  },
};

const FILIERE_ORDER = ['gen', 'tech', 'pro', 'cap', 'alt'];

// ── Les 10 questions ───────────────────────────────────────────
// kind : étiquette de catégorie. w : poids ajoutés à chaque voie.
const QUESTIONS = [
  {
    kind: 'Matières',
    q: 'Quelle matière te motive le plus le matin ?',
    options: [
      { label: 'Le français, l\u2019histoire, les langues', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'Les maths, la physique, les sciences', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'La techno, l\u2019informatique, le numérique', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'Les ateliers & travaux pratiques', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 1 } },
    ],
  },
  {
    kind: 'Intérêts',
    q: 'Tu préfères apprendre…',
    options: [
      { label: 'En réfléchissant à des idées et des théories', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'En analysant des situations réelles', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'En manipulant et en construisant', w: { gen: 0, tech: 1, pro: 2, cap: 2, alt: 1 } },
      { label: 'Directement sur le terrain, en entreprise', w: { gen: 0, tech: 0, pro: 1, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Personnalité',
    q: 'On dirait plutôt de toi que tu es…',
    options: [
      { label: 'Curieux·se, et à l\u2019aise à l\u2019écrit', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'Organisé·e, à l\u2019aise avec les chiffres', w: { gen: 1, tech: 2, pro: 0, cap: 0, alt: 0 } },
      { label: 'Créatif·ve et minutieux·se', w: { gen: 0, tech: 2, pro: 1, cap: 1, alt: 0 } },
      { label: 'Concret·ète et débrouillard·e', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 1 } },
    ],
  },
  {
    kind: 'Projet',
    q: 'Dans 10 ans, tu te vois plutôt…',
    options: [
      { label: 'Après de longues études (fac, école…)', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Avec un métier technique reconnu', w: { gen: 0, tech: 2, pro: 2, cap: 0, alt: 0 } },
      { label: 'Avec un vrai savoir-faire manuel', w: { gen: 0, tech: 0, pro: 1, cap: 2, alt: 1 } },
      { label: 'Déjà autonome, dans le monde du travail', w: { gen: 0, tech: 0, pro: 0, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Intérêts',
    q: 'Dans un projet de groupe, ton rôle naturel c\u2019est…',
    options: [
      { label: 'Faire les recherches et rédiger', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'Gérer le budget et l\u2019organisation', w: { gen: 0, tech: 2, pro: 0, cap: 0, alt: 0 } },
      { label: 'Fabriquer la maquette ou le prototype', w: { gen: 0, tech: 1, pro: 2, cap: 2, alt: 0 } },
      { label: 'Présenter et convaincre', w: { gen: 1, tech: 2, pro: 0, cap: 0, alt: 1 } },
    ],
  },
  {
    kind: 'Matières',
    q: 'Les longs cours théoriques, pour toi c\u2019est…',
    options: [
      { label: 'Ça me va, j\u2019aime approfondir', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'OK si c\u2019est utile et appliqué', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'Je préfère bouger et pratiquer', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 2 } },
    ],
  },
  {
    kind: 'Projet',
    q: 'Le rythme idéal pour toi, ce serait…',
    options: [
      { label: 'Surtout des cours, avec quelques projets', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Moitié cours, moitié pratique', w: { gen: 0, tech: 1, pro: 2, cap: 1, alt: 0 } },
      { label: 'Surtout sur le terrain, en entreprise', w: { gen: 0, tech: 0, pro: 1, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Personnalité',
    q: 'Face à un problème, tu…',
    options: [
      { label: 'Cherches d\u2019abord à comprendre le « pourquoi »', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Analyses les options puis décides', w: { gen: 0, tech: 2, pro: 0, cap: 0, alt: 0 } },
      { label: 'Veux une solution concrète tout de suite', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 1 } },
      { label: 'Demandes à quelqu\u2019un d\u2019expérimenté', w: { gen: 0, tech: 0, pro: 0, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Intérêts',
    q: 'Quel univers t\u2019attire le plus ?',
    options: [
      { label: 'Sciences, recherche, santé, ingénierie', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Commerce, gestion, communication', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'Art, design, mode, spectacle', w: { gen: 1, tech: 2, pro: 1, cap: 1, alt: 0 } },
      { label: 'Métiers manuels & techniques', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 2 } },
    ],
  },
  {
    kind: 'Projet',
    q: 'Le plus important pour toi après la 3ᵉ, c\u2019est…',
    options: [
      { label: 'Garder un max de portes ouvertes', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Me spécialiser dans un domaine qui me plaît', w: { gen: 0, tech: 2, pro: 2, cap: 1, alt: 0 } },
      { label: 'Apprendre un métier et gagner ma vie vite', w: { gen: 0, tech: 0, pro: 1, cap: 2, alt: 2 } },
    ],
  },
];

// ── Témoignages d'élèves par filière (illustratifs) ────────────
const TEMOIGNAGES = {
  gen:  [{ qui: 'Léa, 16 ans', role: '1ʳᵉ générale', txt: 'J\u2019hésitais entre plein de choses, alors j\u2019ai gardé maths et SES pour me décider plus tard. Ça m\u2019a enlevé la pression.' }],
  tech: [{ qui: 'Hugo, 17 ans', role: 'Terminale STI2D', txt: 'Les projets en groupe m\u2019ont fait découvrir l\u2019ingénierie. Beaucoup plus concret que ce que j\u2019imaginais.' }],
  pro:  [{ qui: 'Inès, 16 ans', role: 'Bac pro Commerce', txt: 'Les stages m\u2019ont donné confiance. J\u2019ai déjà une promesse d\u2019embauche pour cet été.' }],
  cap:  [{ qui: 'Tom, 16 ans', role: 'CAP Cuisine', txt: 'En 2 ans j\u2019ai un vrai métier. Je continue avec une mention complémentaire pour me spécialiser.' }],
  alt:  [{ qui: 'Sarah, 17 ans', role: 'Bac pro en alternance', txt: 'Être payée tout en apprenant, c\u2019est ce qui a tout changé pour moi. Je me sens déjà dans la vie active.' }],
};

// ── Métiers (liste plate) : chaque métier liste TOUTES les voies ─
// qui y mènent (général ET pro), + le parcours d'études type.
// sector : pilote l'icône. slug : fiche Onisep directe si dispo.
const METIERS = [
  { id: 'infirmier', name: 'Infirmier·ère', sector: 'sante', voies: ['gen', 'tech'],
    parcours: 'Bac général ou techno ST2S, puis 3 ans en institut de formation (IFSI).', slug: 'infirmier-infirmiere' },
  { id: 'aide-soignant', name: 'Aide-soignant·e', sector: 'sante', voies: ['pro', 'cap', 'alt'],
    parcours: 'Bac pro ASSP ou diplôme d\u2019État (DEAS), accessible aussi en apprentissage.' },
  { id: 'medecin', name: 'Médecin', sector: 'sante', voies: ['gen'],
    parcours: 'Bac général (spés scientifiques), puis 9 à 11 ans d\u2019études à l\u2019université.', slug: 'medecin' },
  { id: 'developpeur', name: 'Développeur·se web', sector: 'numerique', voies: ['gen', 'tech', 'pro', 'alt'],
    parcours: 'Bac général/techno STI2D puis BUT/BTS info ; ou bac pro SN puis BTS. Souvent en alternance.' },
  { id: 'technicien-reseaux', name: 'Technicien·ne réseaux', sector: 'numerique', voies: ['tech', 'pro', 'alt'],
    parcours: 'Bac pro Systèmes numériques ou STI2D, puis BTS, possible en alternance.' },
  { id: 'cuisinier', name: 'Cuisinier·ère', sector: 'restauration', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP Cuisine ou bac pro Cuisine, très souvent en apprentissage.', slug: 'cuisinier-cuisiniere' },
  { id: 'boulanger', name: 'Boulanger·ère', sector: 'alimentation', voies: ['cap', 'alt'],
    parcours: 'CAP Boulanger, idéalement en apprentissage, puis BP pour se perfectionner.' },
  { id: 'electricien', name: 'Électricien·ne', sector: 'batiment', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP ou bac pro MELEC, fréquemment en apprentissage.' },
  { id: 'plombier', name: 'Plombier·ère-chauffagiste', sector: 'batiment', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP puis bac pro, souvent en apprentissage.' },
  { id: 'menuisier', name: 'Menuisier·ère', sector: 'batiment', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP Menuiserie puis bac pro, en apprentissage le plus souvent.' },
  { id: 'ingenieur', name: 'Ingénieur·e', sector: 'industrie', voies: ['gen', 'tech'],
    parcours: 'Bac général ou techno STI2D, puis prépa ou école d\u2019ingénieurs (bac +5).' },
  { id: 'technicien-maintenance', name: 'Technicien·ne de maintenance', sector: 'industrie', voies: ['tech', 'pro', 'alt'],
    parcours: 'Bac pro Maintenance ou STI2D, puis BTS. Beaucoup d\u2019offres en alternance.' },
  { id: 'comptable', name: 'Comptable', sector: 'gestion', voies: ['gen', 'tech', 'pro', 'alt'],
    parcours: 'Bac STMG, pro Gestion-admin ou général, puis BTS/BUT/DCG. Possible en alternance.' },
  { id: 'commercial', name: 'Commercial·e / Vente', sector: 'commerce', voies: ['tech', 'pro', 'gen', 'alt'],
    parcours: 'Bac STMG, pro ou général, puis BTS NDRC ou BUT Techniques de commercialisation.' },
  { id: 'designer', name: 'Designer graphique', sector: 'design', voies: ['gen', 'tech', 'pro'],
    parcours: 'Bac STD2A ou général, puis BTS Design / DN MADE / BUT.' },
  { id: 'architecte', name: 'Architecte', sector: 'design', voies: ['gen', 'tech'],
    parcours: 'Bac général ou STD2A, puis école d\u2019architecture (bac +5).' },
  { id: 'coiffeur', name: 'Coiffeur·se', sector: 'beaute', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP Coiffure puis BP, très souvent en apprentissage.' },
  { id: 'esthateticien', name: 'Esthéticien·ne', sector: 'beaute', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP Esthétique puis bac pro ou BP.' },
  { id: 'educateur', name: 'Éducateur·rice spécialisé·e', sector: 'social', voies: ['gen', 'tech'],
    parcours: 'Bac général ou ST2S, puis diplôme d\u2019État (bac +3).' },
  { id: 'petite-enfance', name: 'Accompagnant·e petite enfance', sector: 'social', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP AEPE ou bac pro, accessible en apprentissage.' },
  { id: 'mecanicien', name: 'Mécanicien·ne auto', sector: 'automobile', voies: ['cap', 'pro', 'alt'],
    parcours: 'CAP ou bac pro Maintenance des véhicules, en apprentissage possible.' },
  { id: 'professeur', name: 'Professeur·e', sector: 'education', voies: ['gen', 'tech'],
    parcours: 'Bac puis licence et master MEEF (bac +5), avec concours.' },
  { id: 'avocat', name: 'Avocat·e', sector: 'droit', voies: ['gen'],
    parcours: 'Bac général, puis fac de droit (bac +5) et école d\u2019avocats.' },
  { id: 'labo', name: 'Technicien·ne de laboratoire', sector: 'recherche', voies: ['tech', 'gen'],
    parcours: 'Bac STL ou général, puis BTS/BUT en biologie ou chimie.' },
];

// ── Salaire débutant indicatif (brut mensuel approximatif) ─────
// Ordres de grandeur seulement ; la fiche renvoie vers l'Onisep
// pour les chiffres officiels et à jour.
const SALAIRES = {
  infirmier: '≈ 1 900 – 2 100 €', 'aide-soignant': '≈ 1 700 – 1 800 €', medecin: '≈ 4 000 € et +',
  developpeur: '≈ 2 200 – 2 800 €', 'technicien-reseaux': '≈ 1 900 – 2 200 €',
  cuisinier: '≈ 1 600 – 1 900 €', boulanger: '≈ 1 600 – 1 800 €',
  electricien: '≈ 1 700 – 2 000 €', plombier: '≈ 1 700 – 2 000 €', menuisier: '≈ 1 600 – 1 900 €',
  ingenieur: '≈ 3 000 – 3 500 €', 'technicien-maintenance': '≈ 2 000 – 2 400 €',
  comptable: '≈ 2 000 – 2 300 €', commercial: '≈ 1 800 – 2 500 € (+ primes)',
  designer: '≈ 1 800 – 2 200 €', architecte: '≈ 2 200 – 2 800 €',
  coiffeur: '≈ 1 600 – 1 800 €', esthateticien: '≈ 1 600 – 1 800 €',
  educateur: '≈ 1 800 – 2 000 €', 'petite-enfance': '≈ 1 600 – 1 800 €',
  mecanicien: '≈ 1 600 – 1 900 €', professeur: '≈ 2 100 – 2 300 €',
  avocat: '≈ 2 500 € (très variable)', labo: '≈ 1 800 – 2 100 €',
};

const SECTOR_LABEL = {
  sante: 'Santé', numerique: 'Numérique', restauration: 'Restauration', alimentation: 'Alimentation',
  batiment: 'Bâtiment', industrie: 'Industrie', gestion: 'Gestion', commerce: 'Commerce',
  design: 'Design', beaute: 'Beauté', social: 'Social', automobile: 'Automobile',
  education: 'Éducation', droit: 'Droit', recherche: 'Recherche',
};

// Métiers accessibles depuis une voie donnée (préserve l'ordre de la liste).
function metiersForVoie(fk) { return METIERS.filter((m) => m.voies.includes(fk)); }
function metierById(id) { return METIERS.find((m) => m.id === id); }

const ONISEP_BASE = 'https://www.onisep.fr';
function letterOf(name) {
  const c = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : 'A';
}
function onisepUrl(m) {
  return m && m.slug
    ? `${ONISEP_BASE}/ressources/univers-metier/metiers/${m.slug}`
    : `${ONISEP_BASE}/recherche/metiers/${letterOf((m && m.name) || 'A')}`;
}
const metierId = (m) => m.id;

// ── Quiz express (ré-orientation) — 5 questions ────────────────
const QUESTIONS_EXPRESS = [
  {
    kind: 'En bref',
    q: 'Aujourd\u2019hui, tu es plutôt…',
    options: [
      { label: 'À l\u2019aise avec les idées et la réflexion', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Organisé·e, à l\u2019aise avec l\u2019analyse', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'Du genre à fabriquer et réparer', w: { gen: 0, tech: 1, pro: 2, cap: 2, alt: 1 } },
      { label: 'Mieux sur le terrain qu\u2019en classe', w: { gen: 0, tech: 0, pro: 1, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Rythme',
    q: 'Le rythme qui te conviendrait le mieux ?',
    options: [
      { label: 'Surtout des cours', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Moitié cours, moitié pratique', w: { gen: 0, tech: 2, pro: 2, cap: 1, alt: 0 } },
      { label: 'Surtout de la pratique', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 1 } },
      { label: 'Le plus possible en entreprise', w: { gen: 0, tech: 0, pro: 1, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Objectif',
    q: 'Ton objectif après cette année ?',
    options: [
      { label: 'Viser des études longues', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Un métier technique reconnu', w: { gen: 0, tech: 2, pro: 2, cap: 0, alt: 0 } },
      { label: 'Un métier manuel, assez vite', w: { gen: 0, tech: 0, pro: 1, cap: 2, alt: 1 } },
      { label: 'Travailler et être payé·e', w: { gen: 0, tech: 0, pro: 0, cap: 1, alt: 2 } },
    ],
  },
  {
    kind: 'Univers',
    q: 'Quel univers t\u2019attire le plus ?',
    options: [
      { label: 'Sciences, santé, lettres', w: { gen: 2, tech: 1, pro: 0, cap: 0, alt: 0 } },
      { label: 'Gestion, commerce, communication', w: { gen: 0, tech: 2, pro: 1, cap: 0, alt: 0 } },
      { label: 'Art, design, création', w: { gen: 1, tech: 2, pro: 1, cap: 1, alt: 0 } },
      { label: 'Métiers manuels & techniques', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 2 } },
    ],
  },
  {
    kind: 'Toi',
    q: 'On dit de toi que tu es…',
    options: [
      { label: 'Curieux·se, à l\u2019aise à l\u2019écrit', w: { gen: 2, tech: 0, pro: 0, cap: 0, alt: 0 } },
      { label: 'Méthodique, à l\u2019aise avec les chiffres', w: { gen: 1, tech: 2, pro: 0, cap: 0, alt: 0 } },
      { label: 'Créatif·ve et minutieux·se', w: { gen: 0, tech: 2, pro: 1, cap: 1, alt: 0 } },
      { label: 'Concret·ète et débrouillard·e', w: { gen: 0, tech: 0, pro: 2, cap: 2, alt: 1 } },
    ],
  },
];

// ── « Pourquoi cette voie ? » — raisons tirées des réponses ────
// Normalise une réponse en tableau d'index (compat : nombre, tableau, ou null).
function asIdxArray(ai) {
  if (ai == null) return [];
  return Array.isArray(ai) ? ai : [ai];
}

// Renvoie les libellés des réponses qui ont le plus pesé pour la voie.
function rationaleFor(answers, questions, voieKey, max) {
  const qs = questions || QUESTIONS;
  const hits = [];
  answers.forEach((ai, qi) => {
    if (!qs[qi]) return;
    asIdxArray(ai).forEach((idx) => {
      const opt = qs[qi].options[idx];
      if (!opt) return;
      const w = opt.w[voieKey] || 0;
      if (w > 0) hits.push({ label: opt.label, w });
    });
  });
  hits.sort((a, b) => b.w - a.w);
  // dédoublonne les libellés identiques
  const seen = new Set();
  const out = [];
  for (const h of hits) {
    if (seen.has(h.label)) continue;
    seen.add(h.label);
    out.push(h.label);
    if (out.length >= (max || 3)) break;
  }
  return out;
}

// ── Étapes clés de l'orientation après la 3ᵉ (procédure) ───────
// when : libellé de période en mode trimestre (t) ou semestre (s).
const ETAPES = [
  { t: 'Je m’informe', when: { t: 'Automne → hiver', s: 'Automne → hiver' }, txt: 'Portes ouvertes, salons, CIO, prof principal : tu explores les voies et les métiers.' },
  { t: 'Intentions provisoires', when: { t: '2ᵉ trimestre', s: '1ᵉʳ semestre' }, txt: 'Tes parents saisissent des vœux provisoires sur le service en ligne Orientation (ÉduConnect).' },
  { t: 'Conseil de classe', when: { t: 'Fin 2ᵉ trimestre', s: 'Fin 1ᵉʳ semestre' }, txt: 'L’équipe éducative donne un avis provisoire sur tes intentions.' },
  { t: 'Vœux définitifs', when: { t: '3ᵉ trimestre', s: '2ᵉ semestre' }, txt: 'Voie GT, voie pro, CAP… : tu formules tes demandes définitives, par ordre de préférence.' },
  { t: 'Proposition d’orientation', when: { t: 'Fin 3ᵉ trimestre', s: 'Fin 2ᵉ semestre' }, txt: 'Le conseil de classe propose une orientation (dialogue possible, voire commission d’appel).' },
  { t: 'Affectation', when: { t: 'Fin juin', s: 'Fin juin' }, txt: 'Tu reçois une notification : la formation et le lycée / CFA qui t’accueillent.' },
  { t: 'Inscription', when: { t: 'Début juillet', s: 'Début juillet' }, txt: 'Dernière étape : l’inscription dans ton établissement. C’est parti !' },
];

const ETAPES_ONISEP = 'https://www.onisep.fr/orientation/le-college/que-faire-apres-la-3/preparer-son-orientation-apres-la-3';

// ── Rythme par voie (pour le comparateur) ──────────────────────
const RYTHME = {
  gen: 'Surtout des cours et de la réflexion',
  tech: 'Cours + projets appliqués',
  pro: 'Beaucoup de pratique + stages en entreprise',
  cap: 'Surtout de l’atelier et de la pratique',
  alt: 'École + entreprise (en alternance)',
};

// ── Checklist des démarches d'orientation ──────────────────────
// auto : l'étape se coche toute seule (ici : « passer le test »).
const CHECKLIST = [
  { id: 'explorer', label: 'Explorer des métiers qui m’attirent' },
  { id: 'test', label: 'Passer le test d’orientation', auto: true },
  { id: 'famille', label: 'En parler en famille' },
  { id: 'jpo', label: 'Repérer 2–3 journées portes ouvertes (JPO)' },
  { id: 'cio', label: 'Prendre rendez-vous au CIO / avec le psy-EN' },
  { id: 'intentions', label: 'Saisir mes intentions provisoires (ÉduConnect)' },
  { id: 'visite', label: 'Visiter au moins un lycée ou un CFA' },
  { id: 'voeux', label: 'Formuler mes vœux définitifs' },
  { id: 'affectation', label: 'Vérifier ma notification d’affectation' },
  { id: 'inscription', label: 'M’inscrire dans mon établissement' },
];

// ── Glossaire des sigles ───────────────────────────────────────
const GLOSSAIRE = [
  { s: '2ⁿᵈᵉ GT', n: 'Seconde générale et technologique', d: 'La première année du lycée général et technologique.' },
  { s: 'LEGT', n: 'Lycée d’enseignement général et technologique', d: 'Le lycée qui mène au bac général ou technologique.' },
  { s: 'LP', n: 'Lycée professionnel', d: 'L’établissement où l’on prépare un CAP ou un bac pro.' },
  { s: 'Bac pro', n: 'Baccalauréat professionnel', d: 'Un bac qui prépare à un métier, en 3 ans.' },
  { s: 'CAP', n: 'Certificat d’aptitude professionnelle', d: 'Le diplôme d’un métier précis, en 2 ans.' },
  { s: 'MC', n: 'Mention complémentaire', d: 'Une année pour se spécialiser après un CAP ou un bac pro.' },
  { s: 'BMA', n: 'Brevet des métiers d’art', d: 'Une formation aux métiers d’art accessible après la 3ᵉ ou un CAP.' },
  { s: 'BTS', n: 'Brevet de technicien supérieur', d: 'Un diplôme professionnel en 2 ans après le bac.' },
  { s: 'BUT', n: 'Bachelor universitaire de technologie', d: 'Un diplôme en 3 ans, préparé en IUT.' },
  { s: 'CPGE', n: 'Classe préparatoire aux grandes écoles', d: 'La « prépa » qui mène aux concours des grandes écoles.' },
  { s: 'DN MADE', n: 'Diplôme national des métiers d’art et du design', d: 'Un diplôme en 3 ans dans le design et les métiers d’art.' },
  { s: 'DCG', n: 'Diplôme de comptabilité et de gestion', d: 'La filière des études de comptabilité (bac+3).' },
  { s: 'CFA', n: 'Centre de formation d’apprentis', d: 'L’organisme où se forment les apprentis, en alternance.' },
  { s: 'PFMP', n: 'Période de formation en milieu professionnel', d: 'Les stages en entreprise de la voie professionnelle.' },
  { s: 'Alternance', n: 'Apprentissage / alternance', d: 'Se former en partageant son temps entre l’école et l’entreprise, avec un salaire.' },
  { s: 'ÉduConnect', n: 'Compte ÉduConnect', d: 'Le compte en ligne des familles pour saisir les vœux d’orientation.' },
  { s: 'CIO', n: 'Centre d’information et d’orientation', d: 'Un lieu public où s’informer et rencontrer un conseiller.' },
  { s: 'Psy-EN', n: 'Psychologue de l’Éducation nationale', d: 'Le professionnel qui aide à construire son projet d’orientation.' },
  { s: 'JPO', n: 'Journées portes ouvertes', d: 'Les journées où l’on visite les lycées et les CFA.' },
  { s: 'Spécialités', n: 'Enseignements de spécialité', d: 'Les matières approfondies choisies en voie générale (1ʳᵉ et terminale).' },
  { s: 'STMG', n: 'Sciences et technologies du management et de la gestion', d: 'La série techno tournée vers la gestion et le commerce.' },
  { s: 'STI2D', n: 'Sciences et technologies de l’industrie et du développement durable', d: 'La série techno de l’industrie et de l’ingénierie.' },
  { s: 'ST2S', n: 'Sciences et technologies de la santé et du social', d: 'La série techno des métiers de la santé et du social.' },
  { s: 'STL', n: 'Sciences et technologies de laboratoire', d: 'La série techno des sciences et de la recherche.' },
  { s: 'STD2A', n: 'Sciences et technologies du design et des arts appliqués', d: 'La série techno du design et des arts appliqués.' },
  { s: 'STHR', n: 'Sciences et technologies de l’hôtellerie et de la restauration', d: 'La série techno de l’hôtellerie-restauration.' },
  { s: 'NSI', n: 'Numérique et sciences informatiques', d: 'La spécialité d’informatique de la voie générale.' },
  { s: 'SES', n: 'Sciences économiques et sociales', d: 'La spécialité d’économie et de sociologie.' },
];

// ── Matières fortes (module « points forts ») ──────────────────
// reinforces : voies que la matière nourrit (pour l'insight de match).
// specs : ce qu'elle ouvre concrètement DANS chaque voie (spé / série / domaine).
const SUBJECTS = [
  { id: 'fr', label: 'Français & lettres', reinforces: ['gen'],
    specs: { gen: ['Humanités, littérature & philo', 'Langues & cultures'], tech: ['STMG', 'STHR'] } },
  { id: 'maths', label: 'Maths', reinforces: ['gen', 'tech'],
    specs: { gen: ['Mathématiques', 'NSI (informatique)'], tech: ['STI2D', 'STMG'] } },
  { id: 'hg', label: 'Histoire-géo', reinforces: ['gen'],
    specs: { gen: ['Histoire-géo, géopolitique', 'SES (économie)'] } },
  { id: 'lv', label: 'Langues (anglais…)', reinforces: ['gen', 'tech'],
    specs: { gen: ['LLCER — langues', 'Langues & cultures'], tech: ['STHR', 'STMG'] } },
  { id: 'sci', label: 'Sciences (SVT, physique)', reinforces: ['gen', 'tech'],
    specs: { gen: ['Physique-chimie', 'SVT', 'Mathématiques'], tech: ['STL — laboratoire', 'ST2S — santé & social', 'STI2D'] } },
  { id: 'techno', label: 'Techno & numérique', reinforces: ['tech', 'pro'],
    specs: { tech: ['STI2D — industrie', 'NSI (informatique)'], pro: ['Numérique & réseaux', 'Maintenance & industrie'], cap: ['Électricité'] } },
  { id: 'arts', label: 'Arts & création', reinforces: ['tech', 'pro'],
    specs: { gen: ['Arts'], tech: ['STD2A — design & arts'], pro: ['Métiers du design', 'Esthétique & beauté'] } },
  { id: 'pratique', label: 'Travaux pratiques / atelier', reinforces: ['pro', 'cap', 'alt'],
    specs: { pro: ['Construction & bâtiment', 'Maintenance & industrie'], cap: ['Cuisine', 'Menuiserie', 'Mécanique auto'], alt: ['Artisanat', 'BTP & bâtiment'] } },
];

// Croise les matières fortes avec une voie : matières qui « collent »
// + spécialités/séries/domaines à regarder dans cette voie.
function pointsForts(ids, voieKey) {
  const chosen = SUBJECTS.filter((s) => (ids || []).includes(s.id));
  const matched = chosen.filter((s) => s.reinforces.includes(voieKey));
  const specs = [];
  chosen.forEach((s) => (s.specs[voieKey] || []).forEach((x) => { if (!specs.includes(x)) specs.push(x); }));
  return {
    chosenLabels: chosen.map((s) => s.label),
    matchedLabels: matched.map((s) => s.label),
    specs: specs.slice(0, 6),
  };
}

// ── Calcul du résultat ─────────────────────────────────────────
// pct = score obtenu / score maximum atteignable pour cette voie → vrai
// taux d'alignement (pas de plancher artificiel).
function computeResult(answers, questions) {
  const qs = questions || QUESTIONS;
  const scores = { gen: 0, tech: 0, pro: 0, cap: 0, alt: 0 };
  const maxima = { gen: 0, tech: 0, pro: 0, cap: 0, alt: 0 };
  // somme des n plus grandes valeurs (>=0) d'un tableau
  const topNSum = (arr, n) => arr.slice().sort((a, b) => b - a).slice(0, n).reduce((t, v) => t + Math.max(0, v), 0);
  qs.forEach((q, qi) => {
    // l'élève peut choisir jusqu'à 2 réponses → max = somme des 2 meilleures
    for (const k in maxima) {
      maxima[k] += topNSum(q.options.map((o) => o.w[k] || 0), 2);
    }
    asIdxArray(answers[qi]).forEach((idx) => {
      const opt = q.options[idx];
      if (!opt) return;
      for (const k in opt.w) scores[k] += opt.w[k];
    });
  });
  const ranked = FILIERE_ORDER
    .map((key) => ({
      key,
      score: scores[key],
      pct: Math.min(100, Math.round(100 * scores[key] / Math.max(1, maxima[key]))),
    }))
    .sort((a, b) => b.score - a.score);
  return { ranked, main: ranked[0], alts: ranked.slice(1, 3), scores };
}

// ── Côté parents : la procédure expliquée simplement ───────────
const PARENTS = [
  { t: 'Votre rôle', txt: 'Accompagner sans décider à sa place : écouter ses envies, l’aider à s’informer, dédramatiser. Aucun choix n’est définitif — des passerelles existent.' },
  { t: 'Le compte ÉduConnect', txt: 'C’est par ce compte en ligne que vous saisissez les vœux d’orientation. Le collège fournit les identifiants (ou connectez-vous via FranceConnect).' },
  { t: 'Les deux temps de l’année', txt: 'Au 2ᵉ trimestre, vous indiquez des intentions provisoires. Au 3ᵉ trimestre, vous formulez les vœux définitifs, par ordre de préférence.' },
  { t: 'Le dialogue', txt: 'Le conseil de classe donne un avis, puis une proposition d’orientation. En cas de désaccord, un entretien est prévu, et une commission d’appel reste possible.' },
  { t: 'Affectation ≠ orientation', txt: 'Obtenir une voie (l’orientation) ne garantit pas toujours une place dans l’établissement souhaité (l’affectation), surtout en voie pro où il n’y a pas de secteur.' },
  { t: 'Où trouver de l’aide', txt: 'Le professeur principal, le psy-EN (au collège ou au CIO), les journées portes ouvertes et le site de l’Onisep sont vos meilleurs alliés.' },
];

// ── Questions à poser (JPO, prof principal, salon) ─────────────
const QUESTIONS_POSER = [
  { g: 'Sur la formation', items: ['Combien d’heures de cours, de pratique, de stages ?', 'Quelles matières comptent le plus ?', 'À quoi ressemble une semaine type ?'] },
  { g: 'Sur la suite', items: ['Que font les élèves après ce diplôme ?', 'Peut-on poursuivre des études ? Lesquelles ?', 'Quels métiers concrets ça ouvre ?'] },
  { g: 'Sur le concret', items: ['Y a-t-il un internat, une cantine, des transports ?', 'Comment se passe l’ambiance, l’accompagnement ?', 'Faut-il un dossier, une lettre, un entretien ?'] },
  { g: 'À te poser à toi-même', items: ['Est-ce que je me vois y aller chaque matin ?', 'Est-ce que ça colle avec ce que j’aime faire ?', 'Qu’est-ce qui m’attire vraiment ici ?'] },
];

// ── Mini-quiz « est-ce fait pour moi ? » (par métier) ──────────
// Questions génériques oui/non, adaptées au secteur du métier.
const FIT_QUESTIONS = [
  { q: 'Tu es prêt·e à te former plusieurs années pour ce métier ?' },
  { q: 'Le quotidien décrit te donne envie de te lever le matin ?' },
  { q: 'Tu te vois à l’aise dans l’ambiance de ce secteur ?' },
  { q: 'Tu acceptes ses contraintes (horaires, conditions, exigences) ?' },
  { q: 'Si tu en avais l’occasion, tu ferais un stage pour l’essayer ?' },
];
function fitVerdict(ouiCount) {
  const total = FIT_QUESTIONS.length;
  if (ouiCount >= total - 1) return { t: 'Ça te ressemble vraiment !', d: 'Tes réponses montrent une belle motivation. Vas-y : renseigne-toi, fais un stage, parles-en autour de toi.', tone: 'go' };
  if (ouiCount >= 3) return { t: 'Bonne piste à creuser', d: 'Il y a clairement de l’intérêt. Approfondis les points qui t’ont fait hésiter avant de te décider.', tone: 'maybe' };
  if (ouiCount >= 1) return { t: 'À explorer prudemment', d: 'Quelques doutes ressortent. C’est normal ! Compare avec d’autres métiers et garde ta curiosité.', tone: 'soft' };
  return { t: 'Peut-être pas pour toi', d: 'Ce métier ne semble pas te correspondre pour l’instant — et c’est une info utile. Explore d’autres pistes sans pression.', tone: 'soft' };
}

// ── #12 Source des statistiques (transparence) ─────────────────
const STATS_META = {
  source: 'Onisep & DEPP (ministère de l’Éducation)',
  year: '2024',
  note: 'Chiffres nationaux indicatifs, arrondis. Les taux varient selon la filière précise, l’établissement et l’académie.',
  url: 'https://www.onisep.fr/',
};

// ── #9 Anti-autocensure (cadrage non hiérarchique) ─────────────
const ANTI_AUTOCENSURE = {
  banner: 'Aucune voie n’est « meilleure » qu’une autre : la bonne, c’est celle qui te correspond.',
  points: [
    { t: 'Pas de voie au rabais', d: 'Bac pro, CAP, apprentissage mènent à des métiers recherchés, bien payés, et permettent de continuer ses études.' },
    { t: 'Tu peux changer d’avis', d: 'Passerelles, réorientations, poursuites d’études… rien n’est figé après la 3ᵉ.' },
    { t: 'Tes goûts comptent autant que tes notes', d: 'On réussit mieux dans ce qui nous plaît. Choisis pour toi, pas pour « faire plaisir » ou « par défaut ».' },
    { t: 'Le métier d’abord', d: 'Pars de ce que tu veux faire au quotidien, puis remonte vers la formation — pas l’inverse.' },
  ],
};

// ── #1 Quiz RIASEC (modèle d'intérêts de Holland) ──────────────
const RIASEC_DIMS = {
  R: { key: 'R', label: 'Réaliste', short: 'Concret', hue: 45, desc: 'Agir, construire, réparer, travailler avec ses mains, des outils, la nature ou des machines.', metiers: ['Électricien·ne', 'Mécanicien·ne', 'Menuisier·ère', 'Technicien·ne'] },
  I: { key: 'I', label: 'Investigateur', short: 'Analyser', hue: 200, desc: 'Comprendre, chercher, résoudre des problèmes, observer, expérimenter.', metiers: ['Ingénieur·e', 'Médecin', 'Technicien·ne de labo', 'Développeur·se'] },
  A: { key: 'A', label: 'Artistique', short: 'Créer', hue: 310, desc: 'Imaginer, créer, s’exprimer, concevoir des formes, des images, des sons.', metiers: ['Designer', 'Graphiste', 'Métiers d’art', 'Architecte'] },
  S: { key: 'S', label: 'Social', short: 'Aider', hue: 155, desc: 'Aider, accompagner, soigner, enseigner, prendre soin des autres.', metiers: ['Infirmier·ère', 'Éducateur·rice', 'Enseignant·e', 'Aide-soignant·e'] },
  E: { key: 'E', label: 'Entreprenant', short: 'Convaincre', hue: 25, desc: 'Diriger, convaincre, vendre, organiser, entreprendre, animer une équipe.', metiers: ['Commercial·e', 'Chef·fe d’entreprise', 'Manager', 'Conseiller·ère de vente'] },
  C: { key: 'C', label: 'Conventionnel', short: 'Organiser', hue: 260, desc: 'Organiser, classer, gérer des données, suivre des procédures précises.', metiers: ['Comptable', 'Gestionnaire', 'Assistant·e', 'Logisticien·ne'] },
};
const RIASEC_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];
// 12 affirmations, 2 par dimension — réponse sur échelle (pas/un peu/beaucoup)
const RIASEC_QUESTIONS = [
  { d: 'R', q: 'Réparer ou bricoler un objet, ça me plaît.' },
  { d: 'I', q: 'J’aime comprendre comment les choses fonctionnent.' },
  { d: 'A', q: 'Dessiner, écrire, créer me met de bonne humeur.' },
  { d: 'S', q: 'Aider quelqu’un qui en a besoin me rend heureux·se.' },
  { d: 'E', q: 'J’aime convaincre et entraîner les autres.' },
  { d: 'C', q: 'Ranger, classer et organiser me détend.' },
  { d: 'R', q: 'Travailler dehors ou avec des machines me tente.' },
  { d: 'I', q: 'Résoudre une énigme ou un problème difficile m’amuse.' },
  { d: 'A', q: 'J’ai souvent des idées originales.' },
  { d: 'S', q: 'On vient facilement me parler de ses soucis.' },
  { d: 'E', q: 'J’aime prendre les choses en main dans un groupe.' },
  { d: 'C', q: 'J’aime quand les consignes sont claires et précises.' },
];
// answers : tableau de 0..2 (pas/un peu/beaucoup)
function computeRiasec(answers) {
  const score = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  RIASEC_QUESTIONS.forEach((q, i) => { score[q.d] += (answers[i] || 0); });
  const max = 4; // 2 questions × 2 pts
  const ranked = RIASEC_ORDER
    .map((k) => ({ key: k, score: score[k], pct: Math.round(100 * score[k] / max) }))
    .sort((a, b) => b.score - a.score);
  return { ranked, top: ranked.slice(0, 3), code: ranked.slice(0, 3).map((r) => r.key).join('') };
}

// ── #4 Métiers / secteurs qui recrutent (sourcé) ───────────────
const TENSION_META = {
  source: 'France Travail — « Les métiers en tension » & enquête BMO',
  year: '2024',
  url: 'https://www.francetravail.org/statistiques-analyses/',
  note: 'Tendances nationales indicatives ; la réalité varie fortement selon les régions.',
};
const SECTEURS_TENSION = [
  { s: 'Santé & soin', tag: 'Forte demande', hue: 155, ex: ['Aide-soignant·e', 'Infirmier·ère', 'Aide à domicile'] },
  { s: 'Bâtiment & travaux publics', tag: 'Recrute partout', hue: 45, ex: ['Couvreur·se', 'Électricien·ne', 'Plombier·ère'] },
  { s: 'Hôtellerie-restauration', tag: 'Très recherché', hue: 25, ex: ['Cuisinier·ère', 'Serveur·se', 'Boulanger·ère'] },
  { s: 'Industrie & maintenance', tag: 'En tension', hue: 200, ex: ['Technicien·ne de maintenance', 'Soudeur·se', 'Usineur·se'] },
  { s: 'Numérique', tag: 'Croissance', hue: 260, ex: ['Développeur·se', 'Technicien·ne réseaux', 'Cybersécurité'] },
  { s: 'Transport & logistique', tag: 'Recrute', hue: 220, ex: ['Conducteur·rice', 'Préparateur·rice de commandes', 'Logisticien·ne'] },
  { s: 'Services à la personne', tag: 'Demande durable', hue: 340, ex: ['Auxiliaire de puériculture', 'Assistant·e de vie', 'Agent·e d’entretien'] },
];

// ── #3 Événements d'orientation (route vers sources officielles) ──
const EVENTS_LINKS = [
  { t: 'Trouver un salon ou un forum', d: 'L’agenda officiel de l’orientation, par région et par date.', url: 'https://www.onisep.fr/agenda', cta: 'Agenda Onisep' },
  { t: 'Journées portes ouvertes (JPO)', d: 'Les dates de JPO des lycées et CFA près de chez toi.', url: 'https://www.onisep.fr/recherche?context=portes-ouvertes', cta: 'Voir les JPO' },
  { t: 'Mini-stages en lycée pro / CFA', d: 'Essaie un métier le temps d’une journée : renseigne-toi auprès de l’établissement.', url: 'https://www.onisep.fr/orientation/le-college/que-faire-apres-la-3', cta: 'Comment faire' },
  { t: 'Nuit de l’orientation', d: 'Organisée par les CCI : rencontres, ateliers, conseils gratuits.', url: 'https://www.cci.fr/', cta: 'Près de chez toi' },
];

// ── #6 Badges (succès doux, calculés depuis le profil) ─────────
const BADGES = [
  { id: 'first_test', label: 'Premier test', d: 'Tu as passé ton premier test d’orientation.', icon: 'star' },
  { id: 'riasec', label: 'Profil d’intérêts', d: 'Tu as découvert ton code RIASEC.', icon: 'compass' },
  { id: 'explorer3', label: 'Explorateur·rice', d: 'Tu as enregistré 3 métiers favoris.', icon: 'heart' },
  { id: 'voies2', label: 'Comparateur·rice', d: 'Tu as épinglé 2 voies.', icon: 'flag' },
  { id: 'journal', label: 'Carnet ouvert', d: 'Tu as écrit ta première note.', icon: 'book' },
  { id: 'checklist', label: 'En marche', d: 'Tu as coché 3 démarches.', icon: 'check' },
];
function earnedBadges(profile) {
  const f = profile || {};
  const got = {};
  got.first_test = !!f.result;
  got.riasec = !!f.riasec;
  got.explorer3 = (f.favorites || []).length >= 3;
  got.voies2 = (f.voieFavs || []).length >= 2;
  got.journal = (f.journal || []).length >= 1;
  got.checklist = (f.checklist || []).length >= 3;
  return got;
}

// ── Rappels : échéances clés de l'orientation (dates indicatives) ──
// month = 1..12, day = jour. Les dates exactes varient selon l'académie
// et l'année ; ce sont des repères. L'élève peut les activer/désactiver.
const REMINDER_KEYS = [
  { id: 'jpo', label: 'Saison des portes ouvertes', month: 1, day: 15, note: 'Repère 2-3 JPO et note leurs dates dans tes rappels.' },
  { id: 'intentions', label: 'Intentions provisoires', month: 2, day: 1, note: 'Saisie des vœux provisoires sur ÉduConnect.' },
  { id: 'conseil2', label: 'Conseil de classe (2ᵉ trim.)', month: 3, day: 10, note: 'Avis provisoire de l’équipe éducative.' },
  { id: 'voeux', label: 'Vœux définitifs', month: 5, day: 12, note: 'Tes demandes définitives, par ordre de préférence.' },
  { id: 'affectation', label: 'Résultats d’affectation', month: 6, day: 28, note: 'Tu découvres ta formation et ton établissement.' },
  { id: 'inscription', label: 'Inscription', month: 7, day: 4, note: 'Dernière étape : inscription dans ton établissement.' },
];

// Prochaine occurrence d'un (mois, jour) à partir d'aujourd'hui.
function reminderDate(month, day) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let dt = new Date(now.getFullYear(), month - 1, day);
  if (dt < today) dt = new Date(now.getFullYear() + 1, month - 1, day);
  return dt;
}
// Jours entre aujourd'hui et une date (>=0 = à venir).
function daysUntil(dt) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d = (dt instanceof Date) ? dt : new Date(dt);
  return Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - today) / 86400000);
}
function formatFrDate(dt) {
  return (dt instanceof Date ? dt : new Date(dt)).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
// Liste fusionnée et triée des rappels actifs (clés activées + dates perso).
function activeReminders(reminders) {
  const r = reminders || {};
  const enabled = r.enabled || [];
  const out = [];
  REMINDER_KEYS.forEach((k) => {
    if (enabled.includes(k.id)) {
      const dt = reminderDate(k.month, k.day);
      out.push({ id: k.id, kind: 'key', title: k.label, note: k.note, date: dt, days: daysUntil(dt) });
    }
  });
  (r.custom || []).forEach((c) => {
    const dt = new Date(c.date + 'T00:00:00');
    out.push({ id: c.id, kind: 'custom', title: c.title, note: '', date: dt, days: daysUntil(dt) });
  });
  return out.filter((x) => x.days >= 0).sort((a, b) => a.date - b.date);
}

// ── Académies (différenciation des résultats par zone) ─────────
// Une académie a un (ou plusieurs) code(s) code_academie et libellé(s)
// libelle_academie tels qu'ils apparaissent dans l'Annuaire de l'éducation.
// On filtre les établissements là-dessus pour ne JAMAIS mélanger deux
// académies (cas fréquent en Île-de-France et aux frontières d'académies).
// Normandie = ancien découpage Caen + Rouen → on accepte les deux.
const ACADEMIES = [
  { name: 'Aix-Marseille',     codes: ['02'],       labels: ['Aix-Marseille'],            site: 'https://www.ac-aix-marseille.fr' },
  { name: 'Amiens',            codes: ['20'],       labels: ['Amiens'],                   site: 'https://www.ac-amiens.fr' },
  { name: 'Besançon',          codes: ['03'],       labels: ['Besançon'],                 site: 'https://www.ac-besancon.fr' },
  { name: 'Bordeaux',          codes: ['04'],       labels: ['Bordeaux'],                 site: 'https://www.ac-bordeaux.fr' },
  { name: 'Clermont-Ferrand',  codes: ['06'],       labels: ['Clermont-Ferrand'],         site: 'https://www.ac-clermont.fr' },
  { name: 'Corse',             codes: ['27'],       labels: ['Corse'],                    site: 'https://www.ac-corse.fr' },
  { name: 'Créteil',           codes: ['24'],       labels: ['Créteil'],                  site: 'https://www.ac-creteil.fr' },
  { name: 'Dijon',             codes: ['07'],       labels: ['Dijon'],                    site: 'https://www.ac-dijon.fr' },
  { name: 'Grenoble',          codes: ['08'],       labels: ['Grenoble'],                 site: 'https://www.ac-grenoble.fr' },
  { name: 'Guadeloupe',        codes: ['32'],       labels: ['Guadeloupe'],               site: 'https://www.ac-guadeloupe.fr' },
  { name: 'Guyane',            codes: ['33'],       labels: ['Guyane'],                   site: 'https://www.ac-guyane.fr' },
  { name: 'La Réunion',        codes: ['28'],       labels: ['La Réunion', 'Réunion'],    site: 'https://www.ac-reunion.fr' },
  { name: 'Lille',             codes: ['09'],       labels: ['Lille'],                    site: 'https://www.ac-lille.fr' },
  { name: 'Limoges',           codes: ['22'],       labels: ['Limoges'],                  site: 'https://www.ac-limoges.fr' },
  { name: 'Lyon',              codes: ['10'],       labels: ['Lyon'],                     site: 'https://www.ac-lyon.fr' },
  { name: 'Martinique',        codes: ['31'],       labels: ['Martinique'],               site: 'https://www.ac-martinique.fr' },
  { name: 'Mayotte',           codes: ['43'],       labels: ['Mayotte'],                  site: 'https://www.ac-mayotte.fr' },
  { name: 'Montpellier',       codes: ['11'],       labels: ['Montpellier'],              site: 'https://www.ac-montpellier.fr' },
  { name: 'Nancy-Metz',        codes: ['12'],       labels: ['Nancy-Metz'],               site: 'https://www.ac-nancy-metz.fr' },
  { name: 'Nantes',            codes: ['17'],       labels: ['Nantes'],                   site: 'https://www.ac-nantes.fr' },
  { name: 'Nice',              codes: ['23'],       labels: ['Nice'],                     site: 'https://www.ac-nice.fr' },
  { name: 'Normandie',         codes: ['70', '05'], labels: ['Normandie', 'Caen', 'Rouen'], site: 'https://www.ac-normandie.fr' },
  { name: 'Orléans-Tours',     codes: ['18'],       labels: ['Orléans-Tours'],            site: 'https://www.ac-orleans-tours.fr' },
  { name: 'Paris',             codes: ['01'],       labels: ['Paris'],                    site: 'https://www.ac-paris.fr' },
  { name: 'Poitiers',          codes: ['13'],       labels: ['Poitiers'],                 site: 'https://www.ac-poitiers.fr' },
  { name: 'Reims',             codes: ['19'],       labels: ['Reims'],                    site: 'https://www.ac-reims.fr' },
  { name: 'Rennes',            codes: ['14'],       labels: ['Rennes'],                   site: 'https://www.ac-rennes.fr' },
  { name: 'Strasbourg',        codes: ['15'],       labels: ['Strasbourg'],               site: 'https://www.ac-strasbourg.fr' },
  { name: 'Toulouse',          codes: ['16'],       labels: ['Toulouse'],                 site: 'https://www.ac-toulouse.fr' },
  { name: 'Versailles',        codes: ['25'],       labels: ['Versailles'],               site: 'https://www.ac-versailles.fr' },
];

function acadByName(name) {
  return ACADEMIES.find((a) => a.name === name) || null;
}
// Un établissement appartient-il à l'académie choisie ? (code OU libellé)
function acadMatch(etab, acad) {
  if (!acad) return true;
  const code = String(etab.code_academie || '').padStart(2, '0');
  if (acad.codes && acad.codes.includes(code)) return true;
  if (acad.labels && acad.labels.includes(etab.libelle_academie)) return true;
  return false;
}

Object.assign(window, {
  ACADEMIES, acadByName, acadMatch,
  FILIERES, FILIERE_ORDER, QUESTIONS, QUESTIONS_EXPRESS, computeResult,
  METIERS, SECTOR_LABEL, TEMOIGNAGES, metiersForVoie, metierById, onisepUrl, metierId,
  SALAIRES, rationaleFor, ETAPES, ETAPES_ONISEP, SUBJECTS, pointsForts,
  RYTHME, CHECKLIST, GLOSSAIRE, PARENTS, QUESTIONS_POSER, FIT_QUESTIONS, fitVerdict,
  STATS_META, ANTI_AUTOCENSURE, RIASEC_DIMS, RIASEC_ORDER, RIASEC_QUESTIONS, computeRiasec,
  TENSION_META, SECTEURS_TENSION, EVENTS_LINKS, BADGES, earnedBadges,
  REMINDER_KEYS, reminderDate, daysUntil, formatFrDate, activeReminders,
});
