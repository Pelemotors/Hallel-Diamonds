import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'אימייל וסיסמה נדרשים' },
        { status: 400 }
      );
    }

    // Verify credentials against database
    const adminUser = await verifyCredentials(email, password);

    if (!adminUser) {
      return NextResponse.json(
        { error: 'אימייל או סיסמה שגויים' },
        { status: 401 }
      );
    }

    // Create session token and store in database
    const sessionToken = await createSessionToken(adminUser.id);

    // Create response
    const response = NextResponse.json(
      { success: true, user: { id: adminUser.id, email: adminUser.email, role: adminUser.role } },
      { status: 200 }
    );

    // Set session cookie
    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'שגיאה בהתחברות', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

