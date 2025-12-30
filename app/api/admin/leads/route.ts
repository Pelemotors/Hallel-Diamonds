import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

// GET - Fetch all leads (simple version, no pagination yet)
export async function GET(_request: NextRequest) {
  try {
    // TODO: Check authentication
    
    // Try Supabase first if available
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseServer
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error) {
          return NextResponse.json({
            leads: data || [],
            total: data?.length || 0,
          });
        }
      } catch (dbError) {
        // Fall through to empty response
        console.log('Using empty leads (Supabase not available)');
      }
    }

    // Return empty array if Supabase not available
    return NextResponse.json({
      leads: [],
      total: 0,
    });
  } catch (error) {
    console.error('API error (leads GET):', error);
    // Return empty array even on error
    return NextResponse.json({
      leads: [],
      total: 0,
    });
  }
}

