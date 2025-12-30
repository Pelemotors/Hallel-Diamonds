import { supabaseServer } from './supabaseServerClient';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

// Generate a secure session token
export async function createSessionToken(adminUserId: string): Promise<string> {
  const sessionToken = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  // Store session in database
  const { error } = await supabaseServer
    .from('admin_sessions')
    .insert({
      admin_user_id: adminUserId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    throw new Error('Failed to create session');
  }

  return sessionToken;
}

// Verify session token
export async function verifySessionToken(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    // Check session in database
    const { data: session, error: sessionError } = await supabaseServer
      .from('admin_sessions')
      .select('*, admin_users(*)')
      .eq('session_token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (sessionError || !session || !session.admin_users) {
      return null;
    }

    const adminUser = session.admin_users as any;

    // Check if user is active
    if (!adminUser.is_active) {
      return null;
    }

    return {
      userId: adminUser.id,
      email: adminUser.email,
    };
  } catch (error) {
    return null;
  }
}

// Verify credentials against database
export async function verifyCredentials(email: string, password: string): Promise<{ id: string; email: string; role: string } | null> {
  // Get admin user from database
  const { data: adminUser, error } = await supabaseServer
    .from('admin_users')
    .select('id, email, password_hash, role, is_active')
    .eq('email', email)
    .eq('is_active', true)
    .single();

  if (error || !adminUser) {
    return null;
  }

  // Verify password with bcrypt
  const isValid = await bcrypt.compare(password, adminUser.password_hash);

  if (!isValid) {
    return null;
  }

  return {
    id: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  };
}

// Delete session token
export async function deleteSessionToken(token: string): Promise<void> {
  await supabaseServer
    .from('admin_sessions')
    .delete()
    .eq('session_token', token);
}

// Clean expired sessions
export async function cleanExpiredSessions(): Promise<void> {
  await supabaseServer
    .from('admin_sessions')
    .delete()
    .lt('expires_at', new Date().toISOString());
}

