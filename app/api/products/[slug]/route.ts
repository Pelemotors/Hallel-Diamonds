import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { mockProducts } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const brandSlug = request.nextUrl.searchParams.get('brand') || 'hallel-diamonds';

    // Try Supabase first if available
    if (isSupabaseConfigured()) {
      try {
        const { data: brand } = await supabaseServer
          .from('brands')
          .select('id')
          .eq('slug', brandSlug)
          .eq('is_active', true)
          .single();

        if (brand) {
          const { data: product, error } = await supabaseServer
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
              updated_at,
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
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

          if (!error && product) {
            return NextResponse.json({ product });
          }
        }
      } catch (dbError) {
        // Fall through to mock data
        console.log('Using mock data (Supabase error)');
      }
    }

    // Fallback to mock data
    const product = mockProducts.find(p => p.slug === slug);
    
    if (!product) {
      return NextResponse.json(
        { error: 'מוצר לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}
