// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User, UserRole } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchUserProfile = async (authUserId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', authUserId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    return data as User;
  };

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setUser);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign up new user
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) return { error: authError };

      // Create user profile in database
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            auth_user_id: authData.user.id,
            email: email,
            full_name: fullName,
            role: 'user',
            onboarding_completed: false,
          });

        if (profileError) return { error: profileError };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Sign in existing user
  const signIn = async (email: string, password: string, isAdmin: boolean = false) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      // Fetch user profile to check role
      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        
        if (!profile) {
          await supabase.auth.signOut();
          return { error: { message: 'User profile not found' } };
        }

        // Check if admin login matches user role
        if (isAdmin && profile.role !== 'admin') {
          await supabase.auth.signOut();
          return { error: { message: 'Access denied. Admin credentials required.' } };
        }

        if (!isAdmin && profile.role === 'admin') {
          await supabase.auth.signOut();
          return { error: { message: 'Please use admin login portal.' } };
        }

        setUser(profile);
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return { error: { message: 'No user logged in' } };

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (!error && user) {
      setUser({ ...user, ...updates });
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};