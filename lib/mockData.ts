// Mock data for when Supabase is not available
// This allows the site to work without a database connection

export const mockProducts = [
  // טבעות (Rings)
  {
    id: '1',
    name: 'טבעת אירוסין יהלום בודד – זהב לבן 18K',
    slug: 'engagement-solitaire-ring-18k',
    short_desc: 'טבעת אירוסין קלאסית עם יהלום בודד מרהיב.',
    long_desc: 'טבעת אירוסין בזהב לבן 18K עם יהלום בודד במשקל 1 קראט. עיצוב נצחי ואלגנטי שמבטיח רגעים בלתי נשכחים.',
    price_numeric: 18500,
    price_display: '₪18,500',
    metal: 'זהב לבן 18K',
    stone: 'יהלום טבעי',
    carat: '1.0 קראט',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '1', url: '/demo/jewelry-1.jpg', alt: 'טבעת אירוסין יהלום בודד', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '2',
    name: 'טבעת שורה יהלומים – זהב 14K',
    slug: 'diamond-row-ring-14k',
    short_desc: 'קלאסיקה נצחית. שורה משובצת יהלומים טבעיים.',
    long_desc: 'טבעת שורה משובצת יהלומים טבעיים בזהב 14K. מושלמת כמתנה או כתוספת אלגנטית לשכבות טבעות.',
    price_numeric: 4900,
    price_display: '₪4,900',
    metal: 'זהב 14K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '2', url: '/demo/jewelry-2.jpg', alt: 'טבעות זהב על רקע בהיר', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '3',
    name: 'טבעת נצח – זהב 18K',
    slug: 'eternity-ring-18k',
    short_desc: 'טבעת נצח משובצת יהלומים סביב הטבעת.',
    long_desc: 'טבעת נצח בזהב 18K משובצת יהלומים סביב הטבעת. סמל לאהבה נצחית, מושלמת כמתנת נישואין או יום נישואין.',
    price_numeric: 12500,
    price_display: '₪12,500',
    metal: 'זהב 18K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '3', url: '/demo/jewelry-3.jpg', alt: 'טבעת נצח יהלומים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '4',
    name: 'טבעת עיצוב מיוחד – זהב צהוב 14K',
    slug: 'unique-design-ring-14k',
    short_desc: 'טבעת בעיצוב ייחודי עם אבנים צבעוניות.',
    long_desc: 'טבעת זהב צהוב 14K בעיצוב ייחודי עם אבנים צבעוניות. מושלמת למי שמחפש משהו מיוחד ושונה.',
    price_numeric: 6800,
    price_display: '₪6,800',
    metal: 'זהב צהוב 14K',
    stone: 'אבנים צבעוניות',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '4', url: '/demo/jewelry-4.jpg', alt: 'טבעת עיצוב מיוחד', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '5',
    name: 'טבעת זהב קלאסית – 14K',
    slug: 'classic-gold-ring-14k',
    short_desc: 'טבעת זהב קלאסית ונצחית.',
    long_desc: 'טבעת זהב 14K בעיצוב קלאסי ונצחי. מושלמת ללבישה יומיומית או כמתנה.',
    price_numeric: 2200,
    price_display: '₪2,200',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '5', url: '/demo/jewelry-5.jpg', alt: 'טבעת זהב קלאסית', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '6',
    name: 'טבעת יהלום מעבדה – זהב לבן 18K',
    slug: 'lab-diamond-ring-18k',
    short_desc: 'טבעת עם יהלום מעבדה איכותי.',
    long_desc: 'טבעת זהב לבן 18K עם יהלום מעבדה במשקל 0.75 קראט. איכות זהה ליהלום טבעי במחיר נגיש יותר.',
    price_numeric: 8500,
    price_display: '₪8,500',
    metal: 'זהב לבן 18K',
    stone: 'יהלום מעבדה',
    carat: '0.75 קראט',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '6', url: '/demo/jewelry-6.jpg', alt: 'טבעת יהלום מעבדה', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '7',
    name: 'טבעת שורה יהלומים – זהב לבן 14K',
    slug: 'diamond-row-ring-white-14k',
    short_desc: 'טבעת שורה משובצת יהלומים בזהב לבן.',
    long_desc: 'טבעת שורה משובצת יהלומים טבעיים בזהב לבן 14K. עיצוב אלגנטי שמתאים לכל סגנון.',
    price_numeric: 5200,
    price_display: '₪5,200',
    metal: 'זהב לבן 14K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '7', url: '/demo/jewelry-7.jpg', alt: 'טבעת שורה יהלומים זהב לבן', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '8',
    name: 'טבעת וינטג\' – זהב צהוב 14K',
    slug: 'vintage-ring-14k',
    short_desc: 'טבעת בעיצוב וינטג\' קלאסי.',
    long_desc: 'טבעת זהב צהוב 14K בעיצוב וינטג\' קלאסי עם פרטים מעוצבים. מושלמת למי שאוהב סגנון קלאסי ונצחי.',
    price_numeric: 3500,
    price_display: '₪3,500',
    metal: 'זהב צהוב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '1', name: 'טבעות', slug: 'rings' },
    product_media: [
      { id: '8', url: '/demo/jewelry-8.jpg', alt: 'טבעת וינטג\'', kind: 'image', sort_order: 1 }
    ]
  },
  // שרשראות (Necklaces)
  {
    id: '9',
    name: 'שרשרת יהלום בודד – זהב 18K',
    slug: 'solitaire-necklace-18k',
    short_desc: 'אלגנטיות קלאסית. יהלום בודד על שרשרת זהב.',
    long_desc: 'שרשרת יהלום בודד בזהב 18K. יהלום טבעי במשקל 0.5 קראט, מושלם לכל אירוע.',
    price_numeric: 8900,
    price_display: '₪8,900',
    metal: 'זהב 18K',
    stone: 'יהלום טבעי',
    carat: '0.5 קראט',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '9', url: '/demo/necklace-diamond-1.jpg', alt: 'שרשרת יהלום בודד', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '10',
    name: 'שרשרת יהלומים – זהב לבן 18K',
    slug: 'diamond-necklace-18k',
    short_desc: 'שרשרת אלגנטית משובצת יהלומים.',
    long_desc: 'שרשרת זהב לבן 18K משובצת יהלומים טבעיים. עיצוב קלאסי ונצחי שמתאים לכל אירוע.',
    price_numeric: 15200,
    price_display: '₪15,200',
    metal: 'זהב לבן 18K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '10', url: '/demo/necklace-diamond-1.jpg', alt: 'שרשרת יהלומים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '11',
    name: 'שרשרת זהב קלאסית – 14K',
    slug: 'classic-gold-necklace-14k',
    short_desc: 'שרשרת זהב קלאסית ונצחית.',
    long_desc: 'שרשרת זהב 14K בעיצוב קלאסי ונצחי. מושלמת ללבישה יומיומית או כמתנה.',
    price_numeric: 3200,
    price_display: '₪3,200',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '11', url: '/demo/necklace-gold-1.jpg', alt: 'שרשרת זהב קלאסית', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '12',
    name: 'שרשרת פנינים – זהב 14K',
    slug: 'pearl-necklace-14k',
    short_desc: 'שרשרת פנינים אלגנטית עם תליון זהב.',
    long_desc: 'שרשרת פנינים טבעיות עם תליון זהב 14K. עיצוב קלאסי ונצחי שמתאים לכל אירוע.',
    price_numeric: 6800,
    price_display: '₪6,800',
    metal: 'זהב 14K',
    stone: 'פנינים טבעיות',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '12', url: '/demo/necklace-pearl-1.jpg', alt: 'שרשרת פנינים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '13',
    name: 'שרשרת זהב עם תליון – 14K',
    slug: 'gold-necklace-pendant-14k',
    short_desc: 'שרשרת זהב עם תליון מעוצב.',
    long_desc: 'שרשרת זהב 14K עם תליון מעוצב. מושלמת כמתנה או ללבישה יומיומית.',
    price_numeric: 4200,
    price_display: '₪4,200',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '13', url: '/demo/necklace-gold-1.jpg', alt: 'שרשרת זהב עם תליון', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '14',
    name: 'שרשרת יהלום מעבדה – זהב לבן 18K',
    slug: 'lab-diamond-necklace-18k',
    short_desc: 'שרשרת עם יהלום מעבדה איכותי.',
    long_desc: 'שרשרת זהב לבן 18K עם יהלום מעבדה במשקל 0.75 קראט. איכות זהה ליהלום טבעי במחיר נגיש יותר.',
    price_numeric: 9800,
    price_display: '₪9,800',
    metal: 'זהב לבן 18K',
    stone: 'יהלום מעבדה',
    carat: '0.75 קראט',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '2', name: 'שרשראות', slug: 'necklaces' },
    product_media: [
      { id: '14', url: '/demo/necklace-diamond-1.jpg', alt: 'שרשרת יהלום מעבדה', kind: 'image', sort_order: 1 }
    ]
  },
  // עגילים (Earrings)
  {
    id: '15',
    name: 'עגילי יהלום בודד – זהב לבן 18K',
    slug: 'solitaire-earrings-18k',
    short_desc: 'עגילי יהלום בודד אלגנטיים.',
    long_desc: 'עגילי יהלום בודד בזהב לבן 18K. יהלום טבעי במשקל 0.25 קראט לכל עגיל, מושלמים לכל אירוע.',
    price_numeric: 7200,
    price_display: '₪7,200',
    metal: 'זהב לבן 18K',
    stone: 'יהלום טבעי',
    carat: '0.25 קראט',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '3', name: 'עגילים', slug: 'earrings' },
    product_media: [
      { id: '15', url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי יהלום בודד', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '16',
    name: 'עגילי יהלומים – זהב 14K',
    slug: 'diamond-earrings-14k',
    short_desc: 'עגילים אלגנטיים עם יהלומים משובצים.',
    long_desc: 'עגילי יהלומים משובצים בזהב 14K. עיצוב קלאסי ונצחי שמתאים לכל אירוע.',
    price_numeric: 3200,
    price_display: '₪3,200',
    metal: 'זהב 14K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '3', name: 'עגילים', slug: 'earrings' },
    product_media: [
      { id: '16', url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי יהלומים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '17',
    name: 'עגילי זהב קלאסיים – 14K',
    slug: 'classic-gold-earrings-14k',
    short_desc: 'עגילי זהב קלאסיים ונצחיים.',
    long_desc: 'עגילי זהב 14K בעיצוב קלאסי ונצחי. מושלמים ללבישה יומיומית או כמתנה.',
    price_numeric: 1800,
    price_display: '₪1,800',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '3', name: 'עגילים', slug: 'earrings' },
    product_media: [
      { id: '17', url: '/demo/earrings-gold-1.jpg', alt: 'עגילי זהב קלאסיים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '18',
    name: 'עגילי הופ זהב – 14K',
    slug: 'hoop-earrings-14k',
    short_desc: 'עגילי הופ זהב אלגנטיים.',
    long_desc: 'עגילי הופ זהב 14K בעיצוב אלגנטי. מושלמים ללבישה יומיומית או לאירועים מיוחדים.',
    price_numeric: 2500,
    price_display: '₪2,500',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '3', name: 'עגילים', slug: 'earrings' },
    product_media: [
      { id: '18', url: '/demo/earrings-gold-1.jpg', alt: 'עגילי הופ זהב', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '19',
    name: 'עגילי יהלום מעבדה – זהב לבן 18K',
    slug: 'lab-diamond-earrings-18k',
    short_desc: 'עגילי יהלום מעבדה איכותיים.',
    long_desc: 'עגילי יהלום מעבדה בזהב לבן 18K. איכות זהה ליהלום טבעי במחיר נגיש יותר.',
    price_numeric: 5500,
    price_display: '₪5,500',
    metal: 'זהב לבן 18K',
    stone: 'יהלום מעבדה',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '3', name: 'עגילים', slug: 'earrings' },
    product_media: [
      { id: '19', url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי יהלום מעבדה', kind: 'image', sort_order: 1 }
    ]
  },
  // צמידים (Bracelets)
  {
    id: '20',
    name: 'צמיד זהב קלוע – 14K',
    slug: 'braided-gold-bracelet-14k',
    short_desc: 'צמיד זהב קלוע בעיצוב קלאסי.',
    long_desc: 'צמיד זהב 14K בעיצוב קלוע אלגנטי. מושלם ללבישה יומיומית או לאירועים מיוחדים.',
    price_numeric: 2800,
    price_display: '₪2,800',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '4', name: 'צמידים', slug: 'bracelets' },
    product_media: [
      { id: '20', url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד זהב', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '21',
    name: 'צמיד יהלומים (Tennis) – זהב לבן 18K',
    slug: 'tennis-bracelet-18k',
    short_desc: 'צמיד יהלומים קלאסי (Tennis Bracelet).',
    long_desc: 'צמיד יהלומים קלאסי בזהב לבן 18K. עיצוב נצחי ואלגנטי שמתאים לכל אירוע.',
    price_numeric: 18500,
    price_display: '₪18,500',
    metal: 'זהב לבן 18K',
    stone: 'יהלומים טבעיים',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '4', name: 'צמידים', slug: 'bracelets' },
    product_media: [
      { id: '21', url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד יהלומים', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '22',
    name: 'צמיד זהב קלאסי – 14K',
    slug: 'classic-gold-bracelet-14k',
    short_desc: 'צמיד זהב קלאסי ונצחי.',
    long_desc: 'צמיד זהב 14K בעיצוב קלאסי ונצחי. מושלם ללבישה יומיומית או כמתנה.',
    price_numeric: 3200,
    price_display: '₪3,200',
    metal: 'זהב 14K',
    stone: '—',
    carat: '—',
    is_featured: false,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '4', name: 'צמידים', slug: 'bracelets' },
    product_media: [
      { id: '22', url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד זהב קלאסי', kind: 'image', sort_order: 1 }
    ]
  },
  {
    id: '23',
    name: 'צמיד יהלום מעבדה – זהב לבן 18K',
    slug: 'lab-diamond-bracelet-18k',
    short_desc: 'צמיד עם יהלום מעבדה איכותי.',
    long_desc: 'צמיד זהב לבן 18K עם יהלום מעבדה. איכות זהה ליהלום טבעי במחיר נגיש יותר.',
    price_numeric: 9800,
    price_display: '₪9,800',
    metal: 'זהב לבן 18K',
    stone: 'יהלום מעבדה',
    carat: '—',
    is_featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    categories: { id: '4', name: 'צמידים', slug: 'bracelets' },
    product_media: [
      { id: '23', url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד יהלום מעבדה', kind: 'image', sort_order: 1 }
    ]
  },
];

export const mockCategories = [
  { id: '1', name: 'טבעות', slug: 'rings', sort_order: 1 },
  { id: '2', name: 'שרשראות', slug: 'necklaces', sort_order: 2 },
  { id: '3', name: 'עגילים', slug: 'earrings', sort_order: 3 },
  { id: '4', name: 'צמידים', slug: 'bracelets', sort_order: 4 },
];

// Helper function to check if Supabase is available
// This is a simple check - the actual check is in supabaseServerClient
export function isSupabaseAvailable(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) return false;
  
  // Check if URL is a placeholder or invalid
  if (url.includes('<') || url.includes('placeholder') || url.includes('הכנס')) {
    return false;
  }
  
  // Check if key is a placeholder
  if (key.includes('<') || key.includes('placeholder') || key.includes('הכנס')) {
    return false;
  }
  
  try {
    // Try to create a URL object to validate
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
