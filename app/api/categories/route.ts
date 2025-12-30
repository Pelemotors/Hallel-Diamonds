import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { mockCategories } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
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
          const { data, error } = await supabaseServer
            .from('categories')
            .select('*')
            .eq('brand_id', brand.id)
            .order('sort_order', { ascending: true })
            .order('name', { ascending: true });

          if (!error && data && data.length > 0) {
            return NextResponse.json({ categories: data || [] });
          }
        }
      } catch (dbError) {
        // Fall through to mock data
        console.log('Using mock categories (Supabase error)');
      }
    }

    // Fallback to mock data
    return NextResponse.json({ categories: mockCategories });
  } catch (error) {
    console.error('API error:', error);
    // Return mock data even on error
    return NextResponse.json({ categories: mockCategories });
  }
}

