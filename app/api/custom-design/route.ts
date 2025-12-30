import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabaseServerClient';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, name, phone, email } = body;

    if (!answers || !name || !phone) {
      return NextResponse.json(
        { error: 'תשובות, שם וטלפון נדרשים' },
        { status: 400 }
      );
    }

    // Try Supabase if available
    let submission = null;
    if (isSupabaseConfigured()) {
      try {
        // Get active brand
        const { data: brand } = await supabaseServer
          .from('brands')
          .select('id')
          .eq('is_active', true)
          .limit(1)
          .single();

        if (brand) {
          // Create custom design submission
          const { data: newSubmission, error } = await supabaseServer
            .from('custom_design_submissions')
            .insert({
              brand_id: brand.id,
              answers,
              name,
              phone,
              email,
              page_path: '/custom-design',
            })
            .select()
            .single();

          if (!error && newSubmission) {
            submission = newSubmission;
          }
        }
      } catch (dbError) {
        console.log('Supabase not available, sending email only');
      }
    }

    // Send email notification
    try {
      const emailBody = `
        <h2>אבחון עיצוב אישי חדש</h2>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>טלפון:</strong> ${phone}</p>
        ${email ? `<p><strong>אימייל:</strong> ${email}</p>` : ''}
        <h3>תשובות:</h3>
        <pre>${JSON.stringify(answers, null, 2)}</pre>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'easydevil227@gmail.com',
        subject: `אבחון עיצוב אישי חדש - ${name}`,
        html: emailBody,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, submission },
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

