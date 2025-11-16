/*
  # AI Analyses Table

  ## Overview
  This migration creates a table to store AI-generated career analyses based on user strength profiles.

  ## New Tables

  ### `ai_analyses`
  Stores AI-generated career analysis results
  - `id` (uuid, primary key) - Unique identifier for each analysis
  - `user_id` (uuid, foreign key) - References auth.users
  - `strength_profile_id` (uuid, foreign key) - References strength_profiles
  - `analysis_data` (jsonb) - The complete AI analysis including personality pattern, advantages, and recommended roles
  - `created_at` (timestamptz) - When the analysis was generated

  ## Security
  - RLS enabled on the table
  - Users can only access their own analyses
  - Policies for SELECT, INSERT based on user ownership

  ## Indexes
  - Index on user_id for efficient queries
  - Index on strength_profile_id for linking to profiles
*/

-- Create ai_analyses table
CREATE TABLE IF NOT EXISTS ai_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  strength_profile_id uuid NOT NULL REFERENCES strength_profiles(id) ON DELETE CASCADE,
  analysis_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_analyses_user_id ON ai_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_profile_id ON ai_analyses(strength_profile_id);

-- Enable Row Level Security
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own analyses"
  ON ai_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
  ON ai_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses"
  ON ai_analyses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON ai_analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
