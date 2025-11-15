import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js';

// User interface matching your database
interface User {
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

// Metadata for signup
interface SignUpMetadata {
  full_name: string;
  department?: string;
  user_role?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: SignUpMetadata) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as User;
    } catch (error) {
      console.error('Exception fetching user profile:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(currentSession);

        if (currentSession?.user) {
          const profile = await fetchUserProfile(currentSession.user.id);
          setUser(profile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);
      setSession(currentSession);

      if (currentSession?.user) {
        const profile = await fetchUserProfile(currentSession.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    metadata: SignUpMetadata
  ): Promise<{ error: Error | null }> => {
    try {
      console.log('Starting signup process...', { email, metadata });

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.full_name,
          },
        },
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        return { error: signUpError };
      }

      if (!data.user) {
        return { error: new Error('No user returned from signup') };
      }

      console.log('User created in auth:', data.user.id);

      // Wait a bit for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update profile with additional metadata
      if (metadata.department || metadata.user_role) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            department: metadata.department,
            user_role: metadata.user_role,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('Error updating profile:', updateError);
        }
      }

      // Fetch the complete profile
      const profile = await fetchUserProfile(data.user.id);
      if (profile) {
        setUser(profile);
      }

      return { error: null };
    } catch (error) {
      console.error('Exception during signup:', error);
      return { error: error as Error };
    }
  };

  // Sign in function
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: Error | null }> => {
    try {
      console.log('Starting signin process...', { email });

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Signin error:', signInError);
        return { error: signInError };
      }

      if (!data.user) {
        return { error: new Error('No user returned from signin') };
      }

      console.log('User signed in:', data.user.id);

      const profile = await fetchUserProfile(data.user.id);
      if (profile) {
        setUser(profile);
        setSession(data.session);
      }

      return { error: null };
    } catch (error) {
      console.error('Exception during signin:', error);
      return { error: error as Error };
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Update profile function
  const updateProfile = async (
    updates: Partial<User>
  ): Promise<{ error: Error | null }> => {
    try {
      if (!user) {
        return { error: new Error('No user logged in') };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }

      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUser(profile);
      }

      return { error: null };
    } catch (error) {
      console.error('Exception updating profile:', error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};