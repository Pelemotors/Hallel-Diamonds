/**
 * Seed script for Jewelry Catalog
 * Creates initial brand, categories, products, and admin user
 * 
 * Usage: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seed() {
  console.log('🌱 Starting seed...');

  try {
    // 1. Create brand
    console.log('📦 Creating brand...');
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .insert({
        name: 'Hallel Diamonds',
        slug: 'hallel-diamonds',
        instagram_handle: 'halleldiamonds',
        whatsapp_phone: '972501234567',
        is_active: true,
      })
      .select()
      .single();

    let brandId: string;
    
    if (brandError) {
      // Brand might already exist
      const { data: existingBrand } = await supabase
        .from('brands')
        .select()
        .eq('slug', 'hallel-diamonds')
        .single();

      if (existingBrand) {
        console.log('✅ Brand already exists');
        brandId = existingBrand.id;
      } else {
        throw brandError;
      }
    } else {
      console.log('✅ Brand created');
      brandId = brand.id;
    }

    // 2. Create categories
    console.log('📁 Creating categories...');
    const categories = [
      { name: 'טבעות', slug: 'rings', sort_order: 1 },
      { name: 'שרשראות', slug: 'necklaces', sort_order: 2 },
      { name: 'עגילים', slug: 'earrings', sort_order: 3 },
      { name: 'צמידים', slug: 'bracelets', sort_order: 4 },
    ];

    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
      const { data: existingCat } = await supabase
        .from('categories')
        .select()
        .eq('brand_id', brandId)
        .eq('slug', cat.slug)
        .single();

      if (existingCat) {
        console.log(`✅ Category ${cat.name} already exists`);
        categoryMap[cat.slug] = existingCat.id;
      } else {
        const { data: newCat, error: catError } = await supabase
          .from('categories')
          .insert({
            brand_id: brandId,
            ...cat,
          })
          .select()
          .single();

        if (catError) throw catError;
        console.log(`✅ Category ${cat.name} created`);
        categoryMap[cat.slug] = newCat.id;
      }
    }

    // 3. Create products
    console.log('💎 Creating products...');
    const products = [
      // טבעות (Rings) - 10 מוצרים
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/jewelry-1.jpg', alt: 'טבעת אירוסין יהלום בודד', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/jewelry-2.jpg', alt: 'טבעות זהב על רקע בהיר', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/jewelry-3.jpg', alt: 'טבעת נצח יהלומים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/ring-gold-1.jpg', alt: 'טבעת עיצוב מיוחד', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/ring-gold-1.jpg', alt: 'טבעת זהב קלאסית', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/ring-solitaire-1.jpg', alt: 'טבעת יהלום מעבדה', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/ring-diamond-row-1.jpg', alt: 'טבעת שורה יהלומים זהב לבן', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'rings',
        media: [
          { url: '/demo/ring-gold-1.jpg', alt: 'טבעת וינטג\'', sort_order: 1 },
        ],
      },
      // שרשראות (Necklaces) - 8 מוצרים
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace.avif', alt: 'שרשרת זהב על סלע שחור', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace-diamond-1.jpg', alt: 'שרשרת יהלומים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace-gold-1.jpg', alt: 'שרשרת זהב קלאסית', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace-pearl-1.jpg', alt: 'שרשרת פנינים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace-gold-1.jpg', alt: 'שרשרת זהב עם תליון', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'necklaces',
        media: [
          { url: '/demo/necklace-diamond-1.jpg', alt: 'שרשרת יהלום מעבדה', sort_order: 1 },
        ],
      },
      // עגילים (Earrings) - 8 מוצרים
      {
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
        category_slug: 'earrings',
        media: [
          { url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי יהלום בודד', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'earrings',
        media: [
          { url: '/demo/rings.jpg', alt: 'עגילי יהלומים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'earrings',
        media: [
          { url: '/demo/earrings-gold-1.jpg', alt: 'עגילי זהב קלאסיים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'earrings',
        media: [
          { url: '/demo/earrings-gold-1.jpg', alt: 'עגילי הופ זהב', sort_order: 1 },
        ],
      },
      {
        name: 'עגילי פנינים – זהב 14K',
        slug: 'pearl-earrings-14k',
        short_desc: 'עגילי פנינים אלגנטיים עם תליון זהב.',
        long_desc: 'עגילי פנינים טבעיות עם תליון זהב 14K. עיצוב קלאסי ונצחי שמתאים לכל אירוע.',
        price_numeric: 3800,
        price_display: '₪3,800',
        metal: 'זהב 14K',
        stone: 'פנינים טבעיות',
        carat: '—',
        is_featured: false,
        status: 'published',
        category_slug: 'earrings',
        media: [
          { url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי פנינים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'earrings',
        media: [
          { url: '/demo/earrings-diamond-1.jpg', alt: 'עגילי יהלום מעבדה', sort_order: 1 },
        ],
      },
      // צמידים (Bracelets) - 6 מוצרים
      {
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
        category_slug: 'bracelets',
        media: [
          { url: '/demo/rings.jpg', alt: 'צמיד זהב', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'bracelets',
        media: [
          { url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד יהלומים', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'bracelets',
        media: [
          { url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד זהב קלאסי', sort_order: 1 },
        ],
      },
      {
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
        category_slug: 'bracelets',
        media: [
          { url: '/demo/bracelet-gold-1.jpg', alt: 'צמיד יהלום מעבדה', sort_order: 1 },
        ],
      },
    ];

    for (const product of products) {
      const { data: existingProduct } = await supabase
        .from('products')
        .select()
        .eq('brand_id', brandId)
        .eq('slug', product.slug)
        .single();

      if (existingProduct) {
        console.log(`✅ Product ${product.name} already exists`);
        continue;
      }

      const { data: newProduct, error: productError } = await supabase
        .from('products')
        .insert({
          brand_id: brandId,
          category_id: categoryMap[product.category_slug],
          name: product.name,
          slug: product.slug,
          short_desc: product.short_desc,
          long_desc: product.long_desc,
          price_numeric: product.price_numeric,
          price_display: product.price_display,
          metal: product.metal,
          stone: product.stone,
          carat: product.carat,
          is_featured: product.is_featured,
          status: product.status,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Add media
      for (const media of product.media) {
        await supabase.from('product_media').insert({
          product_id: newProduct.id,
          kind: 'image',
          url: media.url,
          alt: media.alt,
          sort_order: media.sort_order,
        });
      }

      console.log(`✅ Product ${product.name} created`);
    }

    // 4. Create admin user
    console.log('👤 Creating admin user...');
    const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'Admin123!';

    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select()
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      const passwordHash = await bcrypt.hash(adminPassword, 10);

      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          email: adminEmail,
          password_hash: passwordHash,
          role: 'admin',
          is_active: true,
        });

      if (adminError) throw adminError;
      console.log(`✅ Admin user created: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    }

    // 5. Create content blocks
    console.log('📝 Creating content blocks...');
    const contentBlocks = [
      {
        page: 'home',
        block_key: 'hero_title',
        value: { text: 'תכשיטים שמרגישים כמו "אחד מתוך מיליון"' },
      },
      {
        page: 'home',
        block_key: 'hero_subtitle',
        value: { text: 'יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה' },
      },
      {
        page: 'home',
        block_key: 'why_choose_title',
        value: { text: 'כשזה יהלומים – אין מקום לפשרות' },
      },
      {
        page: 'home',
        block_key: 'why_choose_bullets',
        value: {
          items: [
            'תעודה גמולוגית בין-לאומית',
            'שקיפות מלאה על סוג היהלום והמתכת',
            'ליווי אישי עד התאמה מושלמת',
            'אפשרות לעיצוב אישי לפי חלום ותקציב',
          ],
        },
      },
      {
        page: 'home',
        block_key: 'custom_design_title',
        value: { text: 'רוצה משהו שאין לאף אחד?' },
      },
      {
        page: 'home',
        block_key: 'custom_design_text',
        value: { text: 'ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.' },
      },
    ];

    for (const block of contentBlocks) {
      const { data: existingBlock } = await supabase
        .from('content_blocks')
        .select()
        .eq('brand_id', brandId)
        .eq('page', block.page)
        .eq('block_key', block.block_key)
        .single();

      if (!existingBlock) {
        await supabase.from('content_blocks').insert({
          brand_id: brandId,
          ...block,
        });
      }
    }

    console.log('✅ Content blocks created');

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();

