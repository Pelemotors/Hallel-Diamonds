import { NextRequest, NextResponse } from 'next/server';
import { deleteSessionToken } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin-session')?.value;

    // Delete session from database if token exists
    if (sessionToken) {
      await deleteSessionToken(sessionToken);
    }

    const response = NextResponse.json({ success: true });

    // Clear auth cookie
    response.cookies.delete('admin-session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json({ success: true }); // Still clear cookie even on error
    response.cookies.delete('admin-session');
    return response;
  }
}

