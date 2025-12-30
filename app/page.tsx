import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/catalog/WhatsAppButton';
import { ProductCard } from '@/components/catalog/ProductCard';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'Hallel Diamonds - תכשיטים שמרגישים כמו "אחד מתוך מיליון"',
  description: 'יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה',
  keywords: 'תכשיטים, יהלומים, זהב, טבעות, שרשראות, עגילים, צמידים, תכשיטי יוקרה, יהלומי מעבדה',
  openGraph: {
    title: 'Hallel Diamonds - תכשיטים שמרגישים כמו "אחד מתוך מיליון"',
    description: 'יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה',
    type: 'website',
    locale: 'he_IL',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/demo/hero.avif`,
        width: 1200,
        height: 630,
        alt: 'Hallel Diamonds - תכשיטי יוקרה',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

async function getContentBlocks() {
  try {
    // Try Supabase first
    const { data: brand } = await supabaseServer
      .from('brands')
      .select('id')
      .eq('slug', 'hallel-diamonds')
      .eq('is_active', true)
      .single();

    if (brand) {
      const { data: blocks } = await supabaseServer
        .from('content_blocks')
        .select('*')
        .eq('brand_id', brand.id)
        .eq('page', 'home');

      if (blocks && blocks.length > 0) {
        const content: Record<string, any> = {};
        blocks.forEach((block) => {
          content[block.block_key] = block.value;
        });
        return content;
      }
    }
  } catch (error) {
    // Fall through to default content
  }
  
  // Return default content if Supabase not available
  return {};
}

async function getFeaturedProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?featured=true`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

async function getAllProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const content = await getContentBlocks();
  const featuredProducts = await getFeaturedProducts();
  const allProducts = await getAllProducts();
  
  // Get best sellers (top 4 by price - simulating popularity)
  const bestSellers = [...allProducts]
    .sort((a: any, b: any) => (b.price_numeric || 0) - (a.price_numeric || 0))
    .slice(0, 4);
  
  // Get new arrivals (latest 4 products)
  const newArrivals = [...allProducts]
    .slice(0, 4);

  const heroTitle = content.hero_title?.text || 'תכשיטים שמרגישים כמו "אחד מתוך מיליון"';
  const heroSubtitle = content.hero_subtitle?.text || 'יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה';
  const whyChooseTitle = content.why_choose_title?.text || 'כשזה יהלומים – אין מקום לפשרות';
  const whyChooseBullets = content.why_choose_bullets?.items || [];
  const customDesignTitle = content.custom_design_title?.text || 'רוצה משהו שאין לאף אחד?';
  const customDesignText = content.custom_design_text?.text || 'ממלאים 2 דקות שאלון קצר, ואנחנו חוזרים עם הצעה מדויקת.';

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/demo/hero.avif"
            alt="תכשיטי יוקרה"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-container mx-auto px-section-mobile md:px-section-desktop text-center py-20">
          <h1 className="text-h1 font-heading text-text-primary mb-6">
            {heroTitle}
          </h1>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton className="text-sm px-6 py-3">
              לייעוץ בוואטסאפ
            </WhatsAppButton>
            <Button variant="secondary" asChild>
              <Link href="/catalog">לצפייה בקטלוג</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section-mobile md:py-section-desktop bg-surface">
        <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
          <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
            {whyChooseTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseBullets.map((bullet: string, index: number) => (
              <div key={index} className="bg-background p-6 rounded-lg border border-border">
                <p className="text-body text-text-primary">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-section-mobile md:py-section-desktop">
          <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
            <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
              קולקציות נבחרות
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="secondary" asChild>
                <Link href="/catalog">לצפייה בכל הקטלוג</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-section-mobile md:py-section-desktop bg-surface">
          <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
            <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
              המוצרים הנמכרים ביותר
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-section-mobile md:py-section-desktop">
          <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
            <h2 className="text-h2 font-heading text-text-primary text-center mb-12">
              חדש בקטלוג
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Custom Design CTA */}
      <section className="py-section-mobile md:py-section-desktop bg-gold/10">
        <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop text-center">
          <h2 className="text-h2 font-heading text-text-primary mb-4">
            {customDesignTitle}
          </h2>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            {customDesignText}
          </p>
          <Button variant="primary" asChild>
            <Link href="/custom-design">מתחילים אבחון עיצוב אישי</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
