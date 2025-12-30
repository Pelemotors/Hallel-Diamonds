import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, source = 'contact', page_path } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'שם וטלפון נדרשים' },
        { status: 400 }
      );
    }

    // Try Supabase if available
    let lead = null;
    if (isSupabaseConfigured()) {
      try {
        // Get active brand (default to first active brand)
        const { data: brand } = await supabaseServer
          .from('brands')
          .select('id, whatsapp_phone')
          .eq('is_active', true)
          .limit(1)
          .single();

        if (brand) {
          // Create lead
          const { data: newLead, error } = await supabaseServer
            .from('leads')
            .insert({
              brand_id: brand.id,
              name,
              phone,
              email,
              message,
              source,
              page_path: page_path || '/contact',
              status: 'new',
            })
            .select()
            .single();

          if (!error && newLead) {
            lead = newLead;
          }
        }
      } catch (dbError) {
        console.log('Supabase not available, sending email only');
      }
    }

    // Send email notification
    try {
      const emailBody = `
        <h2>פנייה חדשה מאתר</h2>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>טלפון:</strong> ${phone}</p>
        ${email ? `<p><strong>אימייל:</strong> ${email}</p>` : ''}
        ${message ? `<p><strong>הודעה:</strong> ${message}</p>` : ''}
        <p><strong>מקור:</strong> ${source}</p>
        <p><strong>דף:</strong> ${page_path || '/contact'}</p>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'easydevil227@gmail.com',
        subject: `פנייה חדשה מאתר - ${name}`,
        html: emailBody,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}
