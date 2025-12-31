import { Metadata } from 'next';
import { ProductCard } from '@/components/catalog/ProductCard';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { mockProducts, mockCategories } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'הקטלוג שלנו | Hallel Diamonds',
  description: 'בחרו קטגוריה, התרשמו מהמחירים — ובקליק עוברים לוואטסאפ עם כל הפרטים.',
  keywords: 'קטלוג תכשיטים, טבעות, שרשראות, עגילים, צמידים, תכשיטי יוקרה',
  openGraph: {
    title: 'הקטלוג שלנו | Hallel Diamonds',
    description: 'בחרו קטגוריה, התרשמו מהמחירים — ובקליק עוברים לוואטסאפ עם כל הפרטים.',
    type: 'website',
    locale: 'he_IL',
  },
};

export const dynamic = 'force-dynamic';

async function getProducts(category?: string) {
  try {
    // Try Supabase first if available
    if (isSupabaseConfigured()) {
      try {
        const brandSlug = 'hallel-diamonds';
        const { data: brand } = await supabaseServer
          .from('brands')
          .select('id')
          .eq('slug', brandSlug)
          .eq('is_active', true)
          .single();

        if (brand) {
          let query = supabaseServer
            .from('products')
            .select(`
              id,
              name,
              slug,
              short_desc,
              long_desc,
              price_numeric,
              price_display,
              metal,
              stone,
              carat,
              is_featured,
              status,
              created_at,
              category_id,
              categories (
                id,
                name,
                slug
              ),
              product_media (
                id,
                url,
                alt,
                kind,
                sort_order
              )
            `)
            .eq('brand_id', brand.id)
            .eq('status', 'published')
            .order('is_featured', { ascending: false })
            .order('created_at', { ascending: false });

          if (category) {
            const { data: categoryData } = await supabaseServer
              .from('categories')
              .select('id')
              .eq('brand_id', brand.id)
              .eq('slug', category)
              .single();

            if (categoryData) {
              query = query.eq('category_id', categoryData.id);
            }
          }

          const { data, error } = await query;

          if (!error && data && data.length > 0) {
            return data;
          }
        }
      } catch (dbError) {
        // Fall through to mock data
        console.log('Using mock data (Supabase error)');
      }
    }

    // Fallback to mock data
    let products = [...mockProducts];

    if (category) {
      products = products.filter(p => p.categories?.slug === category);
    }

    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    // Try Supabase first if available
    if (isSupabaseConfigured()) {
      try {
        const brandSlug = 'hallel-diamonds';
        const { data: brand } = await supabaseServer
          .from('brands')
          .select('id')
          .eq('slug', brandSlug)
          .eq('is_active', true)
          .single();

        if (brand) {
          const { data, error } = await supabaseServer
            .from('categories')
            .select('id, name, slug, sort_order')
            .eq('brand_id', brand.id)
            .order('sort_order', { ascending: true });

          if (!error && data && data.length > 0) {
            return data;
          }
        }
      } catch (dbError) {
        // Fall through to mock data
        console.log('Using mock categories (Supabase error)');
      }
    }

    // Fallback to mock data
    return mockCategories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return mockCategories;
  }
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts(searchParams.category);
  const categories = await getCategories();

  return (
    <div className="bg-background py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="mb-12">
          <h1 className="text-h1 font-heading text-text-primary mb-4">
            הקטלוג שלנו
          </h1>
          <p className="text-body text-text-secondary">
            בחרו קטגוריה, התרשמו מהמחירים — ובקליק עוברים לוואטסאפ עם כל הפרטים.
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="/catalog"
              className={`px-4 py-2 rounded-lg border transition-colors ${
                !searchParams.category
                  ? 'bg-gold text-text-primary border-gold'
                  : 'bg-background text-text-secondary border-border hover:border-gold'
              }`}
            >
              הכל
            </a>
            {categories.map((category: any) => (
              <a
                key={category.id}
                href={`/catalog?category=${category.slug}`}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  searchParams.category === category.slug
                    ? 'bg-gold text-text-primary border-gold'
                    : 'bg-background text-text-secondary border-border hover:border-gold'
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-text-secondary">
              לא נמצאו מוצרים בקטגוריה זו.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

