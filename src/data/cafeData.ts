import { MenuItem, CoffeeReview } from '../types/cafe';

export const HERO_IMAGE = '/src/assets/images/hero_cafe_ambiance_1791172461005.jpg';
export const LATTE_IMAGE = '/src/assets/images/latte_art_ceramic_1791172474114.jpg';
export const PASTRY_IMAGE = '/src/assets/images/artisan_pastries_1791172485545.jpg';
export const POUROVER_IMAGE = '/src/assets/images/pourover_brewing_1791172496018.jpg';
export const BEANS_IMAGE = '/src/assets/images/roasted_beans_1791172506168.jpg';

export const MENU_ITEMS: MenuItem[] = [
  // Espresso & Milk
  {
    id: 'flat-white-signature',
    name: 'Artisan Flat White',
    category: 'espresso',
    price: 5.75,
    description: 'Double ristretto pulled on our custom Synesso MVP, textured with silky microfoam at 63°C.',
    image: LATTE_IMAGE,
    origin: 'Colombia Huila & Ethiopia Guji Blend',
    tastingNotes: ['Honeycomb', 'Dark Milk Chocolate', 'Orange Blossom'],
    dietary: ['nut-free'],
    featured: true,
    roastLevel: 'Medium-Light',
    calories: 140,
  },
  {
    id: 'single-origin-espresso',
    name: 'Single-Origin Gesha Espresso',
    category: 'espresso',
    price: 6.50,
    description: 'Extracted as a 1:2.2 ratio showcasing brilliant clarity, jasmine florals, and bergamot acidity.',
    image: LATTE_IMAGE,
    origin: 'Finca Deborah, Volcán, Panama',
    tastingNotes: ['Jasmine Floral', 'Bergamot', 'White Peach'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    featured: false,
    roastLevel: 'Light',
    calories: 5,
  },
  {
    id: 'cardamom-brown-sugar-latte',
    name: 'Smoked Cardamom & Demerara Latte',
    category: 'espresso',
    price: 6.75,
    description: 'House-ground green cardamom, organic demerara reduction, espresso, and steam-steeped milk.',
    image: LATTE_IMAGE,
    origin: 'House Roastery Winter Blend',
    tastingNotes: ['Warm Spices', 'Toasted Sugar', 'Vanilla Pod'],
    dietary: ['nut-free'],
    featured: true,
    calories: 195,
  },
  {
    id: 'cortado-traditional',
    name: 'Gibraltar Cortado',
    category: 'espresso',
    price: 5.00,
    description: 'Equal parts double espresso and warm steamed milk served in an authentic 4.5oz Gibraltar glass.',
    image: LATTE_IMAGE,
    origin: 'Guatemala Huehuetenango',
    tastingNotes: ['Roasted Hazelnut', 'Cocoa Nibs', 'Caramel'],
    dietary: ['nut-free', 'gluten-free'],
    calories: 90,
  },

  // Single-Origin Pour-Overs
  {
    id: 'pourover-ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe G1 Washed',
    category: 'pourover',
    price: 7.25,
    description: 'Brewed to order via Hario V60 with 93°C mineral-tuned water. Vibrant, clean, and tea-like elegance.',
    image: POUROVER_IMAGE,
    origin: 'Konga Station, 2,100m elevation',
    tastingNotes: ['Meyer Lemon', 'Earl Grey', 'Candied Apricot'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    featured: true,
    roastLevel: 'Light',
    calories: 5,
  },
  {
    id: 'pourover-kenya-nyeri',
    name: 'Kenya Nyeri Peaberry SL-28',
    category: 'pourover',
    price: 7.50,
    description: 'Crisp phosphoric acidity balanced by intense sweetness and sparkling black currant body.',
    image: POUROVER_IMAGE,
    origin: 'Gikirima Factory, Nyeri Hill',
    tastingNotes: ['Black Currant', 'Ruby Grapefruit', 'Brown Sugar'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    roastLevel: 'Light',
    calories: 5,
  },
  {
    id: 'pourover-costa-rica-anaerobic',
    name: 'Costa Rica Tarrazú Anaerobic Natural',
    category: 'pourover',
    price: 8.00,
    description: '72-hour temperature-controlled anaerobic fermentation yielding boozy fruit and cinnamon depth.',
    image: POUROVER_IMAGE,
    origin: 'Canet Highland Micro-mill',
    tastingNotes: ['Cinnamon Toast', 'Baked Apple', 'Rum Plum'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    featured: true,
    roastLevel: 'Light',
    calories: 5,
  },

  // Cold Drinks & Tonics
  {
    id: 'kyoto-cold-drip',
    name: 'Kyoto 16-Hour Slow Cold Drip',
    category: 'cold_drinks',
    price: 6.50,
    description: 'Single-drop ice water extraction through custom Japanese glass towers over 16 quiet hours.',
    image: POUROVER_IMAGE,
    origin: 'Sumatra Kerinci & Colombia Blend',
    tastingNotes: ['Dark Chocolate Liqueur', 'Molasses', 'Cedar'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    featured: true,
    calories: 10,
  },
  {
    id: 'espresso-tonic-citrus',
    name: 'Botanical Espresso Tonic',
    category: 'cold_drinks',
    price: 6.75,
    description: 'Chilled double espresso floated over Fever-Tree elderflower tonic with fresh grapefruit twist.',
    image: POUROVER_IMAGE,
    origin: 'Ethiopia Natural Process',
    tastingNotes: ['Elderflower', 'Crisp Citrus', 'Effervescent'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
    calories: 60,
  },
  {
    id: 'matcha-cloud-tonic',
    name: 'Ceremonial Uji Matcha Cloud',
    category: 'cold_drinks',
    price: 7.00,
    description: 'Stone-ground first-harvest green tea from Kyoto whisked over cold oat milk with sweet vanilla foam.',
    image: LATTE_IMAGE,
    origin: 'Uji, Kyoto Prefectural Single Field',
    tastingNotes: ['Sweet Umami', 'Pistachio Note', 'Fresh Pine'],
    dietary: ['vegan', 'nut-free'],
    calories: 130,
  },

  // Artisan Bakery
  {
    id: 'pastry-sourdough-croissant',
    name: 'Normandy Butter Sourdough Croissant',
    category: 'bakery',
    price: 5.25,
    description: 'Slow-fermented for 36 hours using French Échiré butter. 27 delicate, impossibly crisp golden layers.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Sweet Butter', 'Toasted Wheats', 'Delicate Flake'],
    dietary: ['nut-free'],
    featured: true,
    calories: 340,
  },
  {
    id: 'pastry-cardamom-bun',
    name: 'Swedish Kardemummabulle (Cardamom Knot)',
    category: 'bakery',
    price: 5.50,
    description: 'Braided sourdough pastry with freshly crushed cardamom seeds, brown sugar butter, and pearl crystals.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Green Cardamom', 'Caramelized Butter', 'Pearl Sugar'],
    dietary: ['nut-free'],
    featured: true,
    calories: 360,
  },
  {
    id: 'pastry-pistachio-pain-chocolat',
    name: 'Valrhona & Bronte Pistachio Pain',
    category: 'bakery',
    price: 6.25,
    description: 'Two batons of Valrhona Guanaja 70% dark chocolate and roasted Sicilian pistachio paste folded inside.',
    image: PASTRY_IMAGE,
    tastingNotes: ['70% Dark Chocolate', 'Sicilian Pistachio', 'Flaky Brioche'],
    dietary: [],
    calories: 420,
  },
  {
    id: 'pastry-gluten-free-financier',
    name: 'Brown Butter & Raspberry Financier',
    category: 'bakery',
    price: 4.75,
    description: 'French almond cake with hazelnut brown butter (beurre noisette) and wild tart Oregon raspberries.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Toasted Almond', 'Beurre Noisette', 'Tart Berry'],
    dietary: ['gluten-free'],
    calories: 280,
  },

  // All-Day Brunch
  {
    id: 'brunch-ricotta-fig-tartine',
    name: 'Whipped Ricotta & Mission Fig Tartine',
    category: 'brunch',
    price: 14.50,
    description: 'Thick toasted house sesame sourdough, lemon-whipped Bellwether ricotta, black mission figs, wildflower honey, and thyme.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Bright Lemon', 'Wild Honey', 'Nutty Sesame'],
    dietary: ['nut-free'],
    featured: true,
    calories: 480,
  },
  {
    id: 'brunch-avocado-yuzu',
    name: 'Smashed Avocado & Yuzu Kosho Tartine',
    category: 'brunch',
    price: 15.00,
    description: 'Hass avocado mash, fermented yuzu pepper emulsion, pickled watermelon radish, toasted furikake, poached organic pasture egg.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Creamy Avocado', 'Citrus Zing', 'Savory Furikake'],
    dietary: ['dairy-free', 'nut-free'],
    calories: 520,
  },
  {
    id: 'brunch-shokupan-french-toast',
    name: 'Caramelized Shokupan French Toast',
    category: 'brunch',
    price: 16.00,
    description: 'House-baked Japanese milk bread soaked in vanilla bean custard, pan-caramelized with maple mascarpone and roasted pecans.',
    image: PASTRY_IMAGE,
    tastingNotes: ['Custard Cloud', 'Madagascar Vanilla', 'Maple Mascarpone'],
    dietary: [],
    featured: true,
    calories: 610,
  }
];

export const RETAIL_BEANS: MenuItem[] = [
  {
    id: 'beans-yirgacheffe-250g',
    name: 'Ethiopia Yirgacheffe G1 (Whole Bean 250g)',
    category: 'pourover',
    price: 21.00,
    description: 'Washed heirloom varietals from Konga washing station. Roasted Tuesdays & Thursdays in micro 12kg batches.',
    image: BEANS_IMAGE,
    origin: 'Yirgacheffe, Gedeb District (2,100m)',
    tastingNotes: ['Bergamot', 'Jasmine', 'Honey Sweetness'],
    roastLevel: 'Light',
    isBeanBag: true,
    availableGrinds: ['Whole Bean (Recommended)', 'V60 / Pour-Over (Medium-Fine)', 'Espresso (Fine)', 'French Press / Cold Brew (Coarse)'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
  },
  {
    id: 'beans-huila-colombia-250g',
    name: 'Colombia Huila Pink Bourbon (Whole Bean 250g)',
    category: 'pourover',
    price: 24.00,
    description: 'Rare Pink Bourbon mutation from producer Rodrigo Sanchez. Double fermentation yielding remarkable tropical brightness.',
    image: BEANS_IMAGE,
    origin: 'Pitalito, Huila (1,750m)',
    tastingNotes: ['Papaya', 'Pink Grapefruit', 'Brown Sugar'],
    roastLevel: 'Light',
    isBeanBag: true,
    availableGrinds: ['Whole Bean (Recommended)', 'V60 / Pour-Over (Medium-Fine)', 'Espresso (Fine)', 'French Press / Cold Brew (Coarse)'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
  },
  {
    id: 'beans-komorebi-house-espresso-250g',
    name: 'Komorebi Seasonal Espresso Blend (Whole Bean 300g)',
    category: 'espresso',
    price: 19.50,
    description: 'Our flagship cafe espresso blend. 60% Colombia washed caturra, 40% Ethiopia Guji natural. Rich and velvety in milk.',
    image: BEANS_IMAGE,
    origin: 'Huila & Guji cooperative lots',
    tastingNotes: ['Dark Chocolate Truffle', 'Toffee', 'Dried Cherry'],
    roastLevel: 'Medium-Light',
    isBeanBag: true,
    availableGrinds: ['Whole Bean (Recommended)', 'Espresso (Fine)', 'Moka Pot', 'Drip Coffee Maker'],
    dietary: ['vegan', 'gluten-free', 'nut-free', 'dairy-free'],
  }
];

export const CAFE_REVIEWS: CoffeeReview[] = [
  {
    id: 'rev-1',
    author: 'Elena Vance',
    role: 'Editor',
    organization: 'Pacific Specialty Coffee Journal',
    comment: 'Komorebi sets an unmatched standard for dial-in accuracy and ceramic tactile warmth. The Yirgacheffe pour-over had clarity rarely experienced in commercial bars.',
    rating: 5,
    favoriteItem: 'Ethiopia Yirgacheffe V60',
    date: 'February 2026'
  },
  {
    id: 'rev-2',
    author: 'Marcus Thorne',
    role: 'Principal Architect',
    organization: 'Studio Thorne Design',
    comment: 'A sanctuary in the Arts District. Between the filtered skylight acoustics, the Japanese joinery tables, and the sourdough croissants, it is our daily studio ritual.',
    rating: 5,
    favoriteItem: 'Normandy Butter Sourdough Croissant',
    date: 'January 2026'
  },
  {
    id: 'rev-3',
    author: 'Dr. Sarah Lin',
    role: 'Biochemist & Sensory Judge',
    organization: 'Oregon Coffee Guild',
    comment: 'Their temperature profiling on the Costa Rica Anaerobic lot reveals pristine preservation of volatile esters. Impeccable attention to brew water mineral ratios.',
    rating: 5,
    favoriteItem: 'Gibraltar Cortado & Seasonal Beans',
    date: 'March 2026'
  }
];

export const OPENING_HOURS = [
  { day: 'Monday – Friday', hours: '7:00 AM – 7:00 PM', brewBar: '7:00 AM – 6:30 PM', kitchen: '7:30 AM – 3:30 PM' },
  { day: 'Saturday & Sunday', hours: '8:00 AM – 8:00 PM', brewBar: '8:00 AM – 7:30 PM', kitchen: '8:00 AM – 4:00 PM' }
];

export const SEATING_AREAS = [
  {
    id: 'solarium',
    name: 'The Solarium',
    subtitle: 'Sun-drenched botanical atrium',
    description: 'Surrounded by fiddle-leaf figs and skylights with filtered morning sunlight. Ideal for slow mornings and quiet book reading.',
    capacity: '24 seats · Intimate 2-top and 4-top oak tables',
    noiseLevel: 'Quiet & Calm'
  },
  {
    id: 'brew_bar',
    name: 'The Barista Brew Bar',
    subtitle: 'Interactive front-row pour-over seating',
    description: 'High ergonomic ash stools along our polished concrete bar. Interact directly with head baristas as they dial in single-origin lots.',
    capacity: '10 seats · Counter height with coat hooks',
    noiseLevel: 'Lively & Engaging'
  },
  {
    id: 'mezzanine',
    name: 'The Mezzanine Library',
    subtitle: 'Work & conversation nook',
    description: 'Overlooking the main roasting atrium. Equipped with built-in power outlets, curated design periodicals, and warm leather banquettes.',
    capacity: '18 seats · Communal slab tables',
    noiseLevel: 'Productive & Focused'
  },
  {
    id: 'courtyard',
    name: 'The Garden Courtyard',
    subtitle: 'Open-air Japanese maple terrace',
    description: 'Heated brick terrace surrounded by seasonal Japanese maples, moss stone basins, and breeze screens. Dog friendly with fresh water bowls.',
    capacity: '20 seats · Outdoor heated benches',
    noiseLevel: 'Breezy & Relaxed'
  }
] as const;
