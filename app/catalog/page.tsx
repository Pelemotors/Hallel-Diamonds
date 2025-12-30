import { Metadata } from 'next';
import { ProductCard } from '@/components/catalog/ProductCard';
import { supabaseServer } from '@/lib/supabaseServerClient';

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
    const url = category
      ? `/api/products?category=${category}`
      : '/api/products';
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${url}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    return [];
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

