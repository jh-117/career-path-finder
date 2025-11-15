import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Updated User interface to match database schema
export interface User {
  id: string; // Primary key, matches auth.users.id
  email: string;
  full_name?: string;
  department?: string;
  user_role?: string; // Changed from current_role to avoid reserved keyword
  role: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at?: string;
}

// Metadata type for signup
export interface SignUpMetadata {
  full_name: string;
  department?: string;
  user_role?: string; // Changed from current_role
}