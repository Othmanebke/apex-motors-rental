export const cars = [
  // ── LUXE / SUPERCAR (en premier, plus vendeur) ──
  {
    id: 1,
    brand: 'Porsche',
    name: 'Porsche 911 GT3',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Weekend', 'VIP'],
    priceDay: 1290,
    category: 'Supercar',
    type: 'Porsche',
    segment: 'Luxe',
    specs: { power: '510 ch', acceleration: '3.4s', topSpeed: '318 km/h', seats: 2, gearbox: 'PDK' },
    description: 'La 911 GT3 est l\'expression ultime de la polyvalence sportive. Moteur atmosphérique 4.0L, aérodynamique de circuit — une expérience hors du commun.',
    features: ['Freins céramique', 'Système PDCC', 'Siège sport carbone', 'PASM actif'],
  },
  {
    id: 2,
    brand: 'Mercedes-AMG',
    name: 'Mercedes AMG GT',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean', 'Sport'],
    priceDay: 890,
    category: 'Coupé',
    type: 'Mercedes-AMG',
    segment: 'Luxe',
    specs: { power: '639 ch', acceleration: '3.2s', topSpeed: '315 km/h', seats: 2, gearbox: 'AMG Speedshift' },
    description: 'Le coupé GT AMG conjugue design spectaculaire et performances de supercar. Son V8 biturbo de 4 litres délivre une sonorité incomparable.',
    features: ['AMG ActiveRace', 'Échappement sport', 'Jantes AMG 20"', 'Toit panoramique'],
  },
  {
    id: 3,
    brand: 'Audi',
    name: 'Audi R8 V10',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Weekend', 'New'],
    priceDay: 950,
    category: 'Supercar',
    type: 'Audi Sport',
    segment: 'Luxe',
    specs: { power: '620 ch', acceleration: '3.1s', topSpeed: '330 km/h', seats: 2, gearbox: 'S tronic' },
    description: 'La R8 V10 est une supercar quotidienne. Moteur V10 central-arrière atmosphérique, quattro intégral — brutalité et raffinement en une machine.',
    features: ['V10 atmosphérique', 'Quattro intégral', 'Virtual Cockpit', 'Suspension magnétique'],
  },
  {
    id: 4,
    brand: 'Aston Martin',
    name: 'Aston Martin Vantage',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['VIP', 'Clean'],
    priceDay: 1500,
    category: 'Coupé',
    type: 'Aston Martin',
    segment: 'Luxe',
    specs: { power: '503 ch', acceleration: '3.6s', topSpeed: '314 km/h', seats: 2, gearbox: 'ZF 8 rapports' },
    description: 'Le Vantage incarne l\'élégance britannique et la performance pure. Son V8 biturbo AMG-sourced offre des sensations étourdissantes dans un écrin raffiné.',
    features: ['V8 biturbo', 'Sport Plus mode', 'Intérieur cuir pleine-fleur', 'Freins Brembo'],
  },
  {
    id: 5,
    brand: 'McLaren',
    name: 'McLaren 720S',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Weekend', 'VIP', 'New'],
    priceDay: 2200,
    category: 'Supercar',
    type: 'McLaren',
    segment: 'Luxe',
    specs: { power: '720 ch', acceleration: '2.9s', topSpeed: '341 km/h', seats: 2, gearbox: 'SSG 7 rapports' },
    description: 'La 720S redéfinit les codes de la supercar. Châssis monocoque carbone, aérodynamique active — une expérience de conduite à nulle autre pareille.',
    features: ['Monocoque carbone', 'Aéro active', 'Dihedral doors', 'Proactive suspension'],
  },
  {
    id: 6,
    brand: 'Lamborghini',
    name: 'Lamborghini Huracán',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2080&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2080&auto=format&fit=crop',
    ],
    tags: ['Weekend', 'VIP'],
    priceDay: 2800,
    category: 'Supercar',
    type: 'Lamborghini',
    segment: 'Luxe',
    specs: { power: '640 ch', acceleration: '2.9s', topSpeed: '325 km/h', seats: 2, gearbox: 'LDF 7 rapports' },
    description: 'L\'Huracán est la supercar la plus accessible de Lamborghini — et la plus pure. V10 atmosphérique, 640 chevaux, une symphonie mécanique à chaque accélération.',
    features: ['V10 5.2L atmosphérique', 'AWD Lamborghini', 'Magneto-Rheological suspension', 'ANIMA selector'],
  },

  // ── PREMIUM / SUV ──
  {
    id: 7,
    brand: 'BMW',
    name: 'BMW Série 3 320d',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean', 'Weekend'],
    priceDay: 120,
    category: 'Berline',
    type: 'BMW',
    segment: 'Premium',
    specs: { power: '190 ch', acceleration: '7.1s', topSpeed: '234 km/h', seats: 5, gearbox: 'Steptronic 8' },
    description: 'La référence des berlines premium. Dynamique, confortable et présente — la Série 3 est le choix idéal pour les longs trajets en toute élégance.',
    features: ['iDrive 7.0', 'Sièges chauffants', 'Parking Assistant', 'Head-up display'],
  },
  {
    id: 8,
    brand: 'Mercedes',
    name: 'Mercedes Classe A 180',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['New', 'Clean'],
    priceDay: 110,
    category: 'Compacte',
    type: 'Mercedes',
    segment: 'Premium',
    specs: { power: '136 ch', acceleration: '8.5s', topSpeed: '215 km/h', seats: 5, gearbox: 'DCT 7' },
    description: 'La Classe A embarque le cockpit MBUX le plus avancé du segment. Design audacieux, finitions premium, confort de haut niveau.',
    features: ['MBUX tactile', 'Aide au stationnement', 'LED Multibeam', 'Sièges mémoire'],
  },

  // ── COMPACTES / FAMILIALES ──
  {
    id: 9,
    brand: 'Volkswagen',
    name: 'Volkswagen Golf 8',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean', 'New'],
    priceDay: 75,
    category: 'Compacte',
    type: 'Volkswagen',
    segment: 'Généraliste',
    specs: { power: '150 ch', acceleration: '8.2s', topSpeed: '225 km/h', seats: 5, gearbox: 'DSG 7' },
    description: 'La Golf 8 reste la compacte de référence. Technologie de pointe, habitacle premium pour sa catégorie, polyvalence au quotidien.',
    features: ['Digital Cockpit Pro', 'ACC adaptatif', 'Lane Assist', 'Wireless CarPlay'],
  },
  {
    id: 10,
    brand: 'Renault',
    name: 'Renault Mégane E-Tech',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean', 'New'],
    priceDay: 80,
    category: 'Compacte',
    type: 'Renault',
    segment: 'Généraliste',
    specs: { power: '160 ch', acceleration: '7.8s', topSpeed: '216 km/h', seats: 5, gearbox: 'EDC 7' },
    description: 'La Mégane dans sa dernière évolution hybride rechargeable. Économique, confortable et dotée des dernières technologies connectées.',
    features: ['E-Tech hybride', 'OpenR Link Google', 'Multi-Sense', 'Bose Sound System'],
  },

  // ── CITADINES ──
  {
    id: 11,
    brand: 'Renault',
    name: 'Renault Clio 5',
    image: 'https://images.unsplash.com/photo-1590584765028-c8b70e97e862?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1590584765028-c8b70e97e862?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean'],
    priceDay: 55,
    category: 'Citadine',
    type: 'Renault',
    segment: 'Généraliste',
    specs: { power: '100 ch', acceleration: '9.9s', topSpeed: '183 km/h', seats: 5, gearbox: 'CVT' },
    description: 'La Clio 5 est la citadine idéale pour la ville et les escapades. Maniable, économique et dotée d\'un intérieur soigné au-dessus de sa catégorie.',
    features: ['Easy Link 9.3"', 'Régulateur adaptatif', 'Alerte fatigue', 'Caméra de recul'],
  },
  {
    id: 12,
    brand: 'Peugeot',
    name: 'Peugeot 208',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['New', 'Clean'],
    priceDay: 60,
    category: 'Citadine',
    type: 'Peugeot',
    segment: 'Généraliste',
    specs: { power: '100 ch', acceleration: '9.5s', topSpeed: '190 km/h', seats: 5, gearbox: 'EAT8' },
    description: 'La 208 impressionne par son design et son cockpit i-Cockpit. Une citadine moderne avec un style affirmé, parfaite pour la ville comme la route.',
    features: ['i-Cockpit 3D', 'AppleCarPlay sans fil', 'Aide stationnement', 'Full LED'],
  },
  {
    id: 13,
    brand: 'Opel',
    name: 'Opel Corsa',
    image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean'],
    priceDay: 48,
    category: 'Citadine',
    type: 'Opel',
    segment: 'Généraliste',
    specs: { power: '100 ch', acceleration: '9.7s', topSpeed: '182 km/h', seats: 5, gearbox: 'AT8' },
    description: 'La Corsa nouvelle génération sur base PSA offre le meilleur rapport plaisir/coût. Agile en ville, efficace sur route, avec une finition moderne.',
    features: ['Multimedia Navi Pro', 'IntelliGrip', 'Matrix LED', 'Keyless Entry'],
  },
  {
    id: 14,
    brand: 'Toyota',
    name: 'Toyota Yaris Cross',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Clean', 'New'],
    priceDay: 65,
    category: 'SUV',
    type: 'Toyota',
    segment: 'Généraliste',
    specs: { power: '116 ch', acceleration: '9.5s', topSpeed: '175 km/h', seats: 5, gearbox: 'e-CVT' },
    description: 'Le Yaris Cross hybride combine le charme d\'un SUV urbain avec la technologie hybride éprouvée de Toyota. Économique, fiable, polyvalent.',
    features: ['Hybride auto-rechargeable', 'Toyota Safety Sense', 'AWD-i', 'Hayon électrique'],
  },
]

export const FILTERS = {
  make: ['Toutes marques', 'Porsche', 'Mercedes-AMG', 'Mercedes', 'BMW', 'Audi Sport', 'Aston Martin', 'McLaren', 'Lamborghini', 'Volkswagen', 'Renault', 'Peugeot', 'Opel', 'Toyota'],
  segment: ['Tous segments', 'Luxe', 'Premium', 'Généraliste'],
  category: ['Toutes catégories', 'Supercar', 'Coupé', 'Berline', 'Compacte', 'Citadine', 'SUV'],
}

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'power-desc', label: 'Puissance' },
]

export const OPTIONS = [
  { id: 'insurance', label: 'Assurance tous risques', priceDay: 80 },
  { id: 'driver', label: 'Chauffeur privé', priceDay: 250 },
  { id: 'delivery', label: 'Livraison à domicile', priceDay: 50 },
  { id: 'gps', label: 'GPS & Wi-Fi embarqué', priceDay: 20 },
]

// Génère des plages "déjà réservées" déterministes par car ID
export function getBookedRanges(carId) {
  const seed = carId * 7
  const today = new Date()
  const ranges = []
  // 3 plages réservées sur les 60 prochains jours
  const offsets = [
    [seed % 5 + 2,  seed % 5 + 2 + (seed % 3) + 2],
    [seed % 5 + 12, seed % 5 + 12 + (seed % 4) + 3],
    [seed % 5 + 28, seed % 5 + 28 + (seed % 3) + 2],
    [seed % 5 + 42, seed % 5 + 42 + (seed % 4) + 1],
  ]
  for (const [start, end] of offsets) {
    const s = new Date(today); s.setDate(today.getDate() + start)
    const e = new Date(today); e.setDate(today.getDate() + end)
    ranges.push({ start: s, end: e })
  }
  return ranges
}


