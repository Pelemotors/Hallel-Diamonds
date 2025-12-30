import { cookies } from 'next/headers';
import { verifySessionToken } from './adminAuth';
import { redirect } from 'next/navigation';

/**
 * בדיקת session - מחזיר את פרטי המשתמש אם יש session תקין
 * אם אין session - מפנה ל-/admin/login
 */
export async function requireAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (!sessionToken) {
    redirect('/admin/login');
  }

  const session = await verifySessionToken(sessionToken);

  if (!session) {
    redirect('/admin/login');
  }

  return session;
}

/**
 * בדיקת session ללא redirect - מחזיר null אם אין session
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin-session')?.value;

  if (!sessionToken) {
    return null;
  }

  return await verifySessionToken(sessionToken);
}

