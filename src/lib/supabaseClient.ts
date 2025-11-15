import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  department: string | null;
  job_title: string | null;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
}

export interface SignUpMetadata {
  name: string;
  department: string;
  currentRole: string;
}

export interface UserStrength {
  id: string;
  user_id: string;
  strengths_data: any;
  completed_at: string;
  created_at: string;
}

export interface AIAnalysis {
  id: string;
  user_id: string;
  strength_id: string;
  analysis_result: any;
  recommended_roles: any;
  created_at: string;
}

export interface Role {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary_range: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  posted_by: string;
  status: 'active' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  role_id: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  cover_letter: string;
  applied_at: string;
  updated_at: string;
}