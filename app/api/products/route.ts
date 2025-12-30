import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { mockProducts } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const brandSlug = searchParams.get('brand') || 'hallel-diamonds';

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
          // Build query
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

          if (featured === 'true') {
            query = query.eq('is_featured', true);
          }

          const { data, error } = await query;

          if (!error && data && data.length > 0) {
            return NextResponse.json({ products: data || [] });
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

    if (featured === 'true') {
      products = products.filter(p => p.is_featured);
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error('API error:', error);
    // Return mock data even on error
    return NextResponse.json({ products: mockProducts });
  }
}
