import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export User type for reuse across the app
export interface User {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  user_role?: string;
  role: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at?: string;
}

// Export SignUpMetadata type
export interface SignUpMetadata {
  full_name: string;
  department?: string;
  user_role?: string;
}