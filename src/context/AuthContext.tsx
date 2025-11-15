import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User, UserRole, SignUpMetadata } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: SignUpMetadata) => Promise<{ error: any }>;
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (authUserId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUserId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    return data as User;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setUser);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        (async () => {
          setSession(session);
          if (session?.user) {
            const profile = await fetchUserProfile(session.user.id);
            setUser(profile);
          } else {
            setUser(null);
          }
          setLoading(false);
        })();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata: SignUpMetadata) => {
    try {
      console.log('Starting signup process...', { email, metadata });

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        return { error: authError };
      }

      console.log('User created in auth:', authData.user?.id);

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: metadata.name,
            department: metadata.department,
            job_title: metadata.currentRole,
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
          return { error: profileError };
        }

        console.log('Profile updated successfully');
      }

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string, isAdmin: boolean = false) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);

        if (!profile) {
          await supabase.auth.signOut();
          return { error: { message: 'User profile not found' } };
        }

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

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return { error: { message: 'No user logged in' } };

    const { error } = await supabase
      .from('profiles')
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
