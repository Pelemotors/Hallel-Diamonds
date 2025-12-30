import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const name = searchParams.get('name');

    if (!phone || !name) {
      return NextResponse.json(
        { error: 'טלפון ושם נדרשים' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('custom_design_submissions')
      .select('*')
      .eq('phone', phone)
      .eq('name', name)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching submission:', error);
      return NextResponse.json(
        { submission: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ submission: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

