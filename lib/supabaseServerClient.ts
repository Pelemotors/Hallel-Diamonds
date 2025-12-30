import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors when env vars are missing
let supabaseServerInstance: SupabaseClient | null = null;
let supabaseAvailable = false;

function getSupabaseServer(): SupabaseClient | null {
  if (supabaseServerInstance) {
    return supabaseAvailable ? supabaseServerInstance : null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Check if URL and key are valid (not placeholders)
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    supabaseAvailable = false;
    return null;
  }

  // Check if URL is a placeholder or invalid
  if (
    supabaseUrl.includes('<') ||
    supabaseUrl.includes('placeholder') ||
    supabaseUrl.includes('הכנס') ||
    supabaseServiceRoleKey.includes('<') ||
    supabaseServiceRoleKey.includes('placeholder') ||
    supabaseServiceRoleKey.includes('הכנס')
  ) {
    supabaseAvailable = false;
    return null;
  }

  try {
    // Validate URL format
    new URL(supabaseUrl);
    
    // Server-side client with service role key (bypasses RLS)
    supabaseServerInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    
    supabaseAvailable = true;
    return supabaseServerInstance;
  } catch (error) {
    // Invalid URL or other error
    console.warn('Supabase not available:', error instanceof Error ? error.message : 'Invalid configuration');
    supabaseAvailable = false;
    return null;
  }
}

// Create a mock query builder that returns empty results
function createMockQueryBuilder() {
  const mockResult = { data: null, error: null };
  const mockArrayResult = { data: [], error: null };
  const mockPromise = Promise.resolve(mockArrayResult);
  
  const createChainable = (isSelect = false): any => {
    const chainable: any = {
      eq: () => chainable,
      neq: () => chainable,
      gt: () => chainable,
      gte: () => chainable,
      lt: () => chainable,
      lte: () => chainable,
      like: () => chainable,
      ilike: () => chainable,
      is: () => chainable,
      in: () => chainable,
      contains: () => chainable,
      containedBy: () => chainable,
      rangeGt: () => chainable,
      rangeGte: () => chainable,
      rangeLt: () => chainable,
      rangeLte: () => chainable,
      rangeAdjacent: () => chainable,
      overlaps: () => chainable,
      textSearch: () => chainable,
      match: () => chainable,
      not: () => chainable,
      or: () => chainable,
      filter: () => chainable,
      order: () => chainable,
      limit: () => chainable,
      range: () => chainable,
      abortSignal: () => chainable,
      single: () => Promise.resolve(mockResult),
      maybeSingle: () => Promise.resolve(mockResult),
      select: () => createChainable(true),
      insert: () => Promise.resolve(mockResult),
      update: () => Promise.resolve(mockResult),
      upsert: () => Promise.resolve(mockResult),
      delete: () => Promise.resolve(mockResult),
    };
    
    // If this is a select query, make it thenable (Promise-like)
    if (isSelect) {
      chainable.then = mockPromise.then.bind(mockPromise);
      chainable.catch = mockPromise.catch.bind(mockPromise);
      chainable.finally = mockPromise.finally.bind(mockPromise);
    }
    
    return chainable;
  };
  
  return createChainable();
}

// Proxy to lazy-load the client only when accessed
// Returns a mock client that returns empty results if Supabase is not available
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseServer();
    if (!client) {
      // Return a mock object that returns empty results
      if (prop === 'from') {
        return () => createMockQueryBuilder();
      }
      // Return a function that returns a promise with empty result
      return () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } });
    }
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// Export helper to check if Supabase is available
export function isSupabaseConfigured(): boolean {
  // Force check by calling getSupabaseServer
  getSupabaseServer();
  return supabaseAvailable;
}
