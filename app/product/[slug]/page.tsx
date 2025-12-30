import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/catalog/ProductGallery';
import { WhatsAppButton } from '@/components/catalog/WhatsAppButton';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${slug}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    return data.product;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'מוצר לא נמצא | Hallel Diamonds',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const mainImage = product.product_media?.[0]?.url || '/demo/rings.jpg';
  const imageUrl = mainImage.startsWith('http') ? mainImage : `${baseUrl}${mainImage}`;
  const description = product.short_desc || product.long_desc || `תכשיט יוקרתי מ-Hallel Diamonds`;

  return {
    title: `${product.name} | Hallel Diamonds`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [imageUrl],
      type: 'website',
      locale: 'he_IL',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const media = product.product_media || [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const mainImage = media.find((m: any) => m.kind === 'image') || media[0];
  const imageUrl = mainImage?.url 
    ? (mainImage.url.startsWith('http') ? mainImage.url : `${baseUrl}${mainImage.url}`)
    : `${baseUrl}/demo/rings.jpg`;

  // Schema.org structured data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.long_desc || product.short_desc || '',
    image: media.filter((m: any) => m.kind === 'image').map((m: any) => 
      m.url.startsWith('http') ? m.url : `${baseUrl}${m.url}`
    ),
    brand: {
      '@type': 'Brand',
      name: 'Hallel Diamonds',
    },
    offers: {
      '@type': 'Offer',
      price: product.price_numeric || 0,
      priceCurrency: 'ILS',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/product/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    ...(product.metal && {
      material: product.metal,
    }),
    ...(product.stone && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Gemstone',
          value: product.stone,
        },
        ...(product.carat && product.carat !== '—' ? [{
          '@type': 'PropertyValue',
          name: 'Carat',
          value: product.carat,
        }] : []),
      ],
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };

  const returnPolicySchema = {
    '@context': 'https://schema.org',
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'IL',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 14,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(returnPolicySchema) }}
      />
      <div className="bg-background py-section-mobile md:py-section-desktop">
      <div className="max-w-container mx-auto px-section-mobile md:px-section-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Gallery */}
          <div>
            <ProductGallery 
              media={media} 
              productName={product.name}
              productPrice={product.price_display}
              productSlug={product.slug}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-h1 font-heading text-text-primary mb-4">
                {product.name}
              </h1>
              {product.price_display && (
                <div className="text-h2 font-heading font-semibold text-text-primary mb-6">
                  {product.price_display}
                </div>
              )}
            </div>

            {/* Specifications */}
            {(product.metal || product.stone || product.carat) && (
              <div className="space-y-2 border-t border-b border-border py-6">
                {product.metal && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">מתכת:</span>
                    <span className="text-text-primary font-semibold">{product.metal}</span>
                  </div>
                )}
                {product.stone && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">אבן:</span>
                    <span className="text-text-primary font-semibold">{product.stone}</span>
                  </div>
                )}
                {product.carat && product.carat !== '—' && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">קראט:</span>
                    <span className="text-text-primary font-semibold">{product.carat}</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {product.short_desc && (
              <div>
                <h3 className="font-heading text-h3 text-text-primary mb-3">תיאור קצר</h3>
                <p className="text-body text-text-secondary">{product.short_desc}</p>
              </div>
            )}

            {product.long_desc && (
              <div>
                <h3 className="font-heading text-h3 text-text-primary mb-3">תיאור מפורט</h3>
                <p className="text-body text-text-secondary whitespace-pre-line">{product.long_desc}</p>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-4 pt-6">
              <WhatsAppButton
                productName={product.name}
                productPrice={product.price_display}
                productSlug={product.slug}
                className="w-full"
              />
              <p className="text-small text-text-secondary text-center">
                ההודעה תיפתח עם שם המוצר והמחיר כדי לחסוך זמן.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Catalog */}
        <div className="text-center">
          <Button variant="secondary" asChild>
            <Link href="/catalog">← חזרה לקטלוג</Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

