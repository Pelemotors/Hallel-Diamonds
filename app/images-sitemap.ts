import { supabaseServer } from '@/lib/supabaseServerClient';

export default async function imagesSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    // Get active brand
    const { data: brand } = await supabaseServer
      .from('brands')
      .select('id')
      .eq('slug', 'hallel-diamonds')
      .eq('is_active', true)
      .single();

    if (!brand) {
      return new Response('', { status: 200 });
    }

    // Get published products with media
    const { data: products } = await supabaseServer
      .from('products')
      .select(`
        slug,
        name,
        product_media (
          url,
          alt,
          kind
        )
      `)
      .eq('brand_id', brand.id)
      .eq('status', 'published');

    const images: Array<{
      loc: string;
      caption?: string;
      title?: string;
      productSlug: string;
    }> = [];

    (products || []).forEach((product: any) => {
      (product.product_media || []).forEach((media: any) => {
        if (media.kind === 'image') {
          const imageUrl = media.url.startsWith('http') 
            ? media.url 
            : `${baseUrl}${media.url}`;
          
          images.push({
            loc: imageUrl,
            caption: media.alt || product.name,
            title: media.alt || product.name,
            productSlug: product.slug,
          });
        }
      });
    });

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(img => `  <url>
    <loc>${baseUrl}/product/${img.productSlug}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
      ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ''}
    </image:image>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating images sitemap:', error);
    return new Response('', { status: 200 });
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

