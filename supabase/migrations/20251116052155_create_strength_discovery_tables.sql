/*
  # Strength Discovery Database Schema

  ## Overview
  This migration creates tables to store user strength discovery data including technical skills,
  soft skills, career interests, work style preferences, and uploaded documents.

  ## New Tables

  ### 1. `strength_profiles`
  Main table storing the user's strength discovery session data
  - `id` (uuid, primary key) - Unique identifier for each strength profile
  - `user_id` (uuid, foreign key) - References auth.users (the user who owns this profile)
  - `work_style` (text) - User's preferred work style (autonomous, structured, collaborative, fast-paced)
  - `completed` (boolean) - Whether the strength discovery is complete
  - `created_at` (timestamptz) - When the profile was created
  - `updated_at` (timestamptz) - When the profile was last updated

  ### 2. `technical_skills`
  Stores user's technical skills (max 5)
  - `id` (uuid, primary key)
  - `strength_profile_id` (uuid, foreign key) - References strength_profiles
  - `skill_name` (text) - Name of the technical skill
  - `order_index` (integer) - Order/priority of the skill (1-5)
  - `created_at` (timestamptz)

  ### 3. `soft_skills`
  Stores user's soft skills (max 5)
  - `id` (uuid, primary key)
  - `strength_profile_id` (uuid, foreign key) - References strength_profiles
  - `skill_name` (text) - Name of the soft skill
  - `order_index` (integer) - Order/priority of the skill (1-5)
  - `created_at` (timestamptz)

  ### 4. `career_interests`
  Stores user's career interests (max 5)
  - `id` (uuid, primary key)
  - `strength_profile_id` (uuid, foreign key) - References strength_profiles
  - `interest_name` (text) - Name of the career interest
  - `order_index` (integer) - Order/priority of the interest (1-5)
  - `created_at` (timestamptz)

  ### 5. `uploaded_documents`
  Stores metadata for uploaded documents (resume, CV, portfolio, etc.)
  - `id` (uuid, primary key)
  - `strength_profile_id` (uuid, foreign key) - References strength_profiles
  - `file_name` (text) - Original file name
  - `file_path` (text) - Storage path in Supabase Storage
  - `file_size` (bigint) - File size in bytes
  - `file_type` (text) - MIME type of the file
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own strength discovery data
  - Policies for SELECT, INSERT, UPDATE, DELETE based on user ownership

  ## Storage
  - Creates a storage bucket for uploaded documents
  - Storage policies ensure users can only access their own files
*/

-- Create strength_profiles table
CREATE TABLE IF NOT EXISTS strength_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  work_style text,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create technical_skills table
CREATE TABLE IF NOT EXISTS technical_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strength_profile_id uuid NOT NULL REFERENCES strength_profiles(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  order_index integer NOT NULL CHECK (order_index >= 1 AND order_index <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create soft_skills table
CREATE TABLE IF NOT EXISTS soft_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strength_profile_id uuid NOT NULL REFERENCES strength_profiles(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  order_index integer NOT NULL CHECK (order_index >= 1 AND order_index <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create career_interests table
CREATE TABLE IF NOT EXISTS career_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strength_profile_id uuid NOT NULL REFERENCES strength_profiles(id) ON DELETE CASCADE,
  interest_name text NOT NULL,
  order_index integer NOT NULL CHECK (order_index >= 1 AND order_index <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create uploaded_documents table
CREATE TABLE IF NOT EXISTS uploaded_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strength_profile_id uuid NOT NULL REFERENCES strength_profiles(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  file_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_strength_profiles_user_id ON strength_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_technical_skills_profile_id ON technical_skills(strength_profile_id);
CREATE INDEX IF NOT EXISTS idx_soft_skills_profile_id ON soft_skills(strength_profile_id);
CREATE INDEX IF NOT EXISTS idx_career_interests_profile_id ON career_interests(strength_profile_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_documents_profile_id ON uploaded_documents(strength_profile_id);

-- Enable Row Level Security
ALTER TABLE strength_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE soft_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for strength_profiles
CREATE POLICY "Users can view own strength profiles"
  ON strength_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own strength profiles"
  ON strength_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own strength profiles"
  ON strength_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own strength profiles"
  ON strength_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for technical_skills
CREATE POLICY "Users can view own technical skills"
  ON technical_skills FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = technical_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own technical skills"
  ON technical_skills FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = technical_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own technical skills"
  ON technical_skills FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = technical_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = technical_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own technical skills"
  ON technical_skills FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = technical_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

-- RLS Policies for soft_skills
CREATE POLICY "Users can view own soft skills"
  ON soft_skills FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = soft_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own soft skills"
  ON soft_skills FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = soft_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own soft skills"
  ON soft_skills FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = soft_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = soft_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own soft skills"
  ON soft_skills FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = soft_skills.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

-- RLS Policies for career_interests
CREATE POLICY "Users can view own career interests"
  ON career_interests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = career_interests.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own career interests"
  ON career_interests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = career_interests.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own career interests"
  ON career_interests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = career_interests.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = career_interests.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own career interests"
  ON career_interests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = career_interests.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

-- RLS Policies for uploaded_documents
CREATE POLICY "Users can view own uploaded documents"
  ON uploaded_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = uploaded_documents.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own uploaded documents"
  ON uploaded_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = uploaded_documents.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own uploaded documents"
  ON uploaded_documents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = uploaded_documents.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = uploaded_documents.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own uploaded documents"
  ON uploaded_documents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strength_profiles
      WHERE strength_profiles.id = uploaded_documents.strength_profile_id
      AND strength_profiles.user_id = auth.uid()
    )
  );

-- Create storage bucket for uploaded documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('strength-documents', 'strength-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for strength-documents bucket
CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'strength-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'strength-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own documents"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'strength-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'strength-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'strength-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
