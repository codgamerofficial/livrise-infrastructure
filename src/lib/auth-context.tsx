'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserRole, UserProfile } from '@/types';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  role: UserRole;
  isAdmin: boolean;
  isClient: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to extract or construct a valid UserProfile from Supabase auth user
  const extractProfile = async (u: User): Promise<UserProfile> => {
    try {
      // 1. Try querying real profiles table in DB
      const { data: dbProfile, error } = await supabase
        .from('profiles')
        .select('*, roles(name)')
        .eq('id', u.id)
        .maybeSingle();

      if (dbProfile && !error) {
        const roleName = (dbProfile.roles?.name || dbProfile.role || 'client') as UserRole;
        return {
          id: dbProfile.id,
          role: roleName,
          fullName: dbProfile.full_name || u.user_metadata?.full_name || u.email?.split('@')[0] || 'User',
          email: dbProfile.email || u.email || '',
          phone: dbProfile.phone || u.user_metadata?.phone,
          avatarUrl: dbProfile.avatar_url,
          companyName: dbProfile.company_name || u.user_metadata?.company_name,
          designation: dbProfile.designation,
          bio: dbProfile.bio,
          isActive: dbProfile.is_active ?? true,
        };
      }
    } catch {
      // DB profile table might not be initialized yet
    }

    // 2. Fall back to user_metadata
    const metaRole = (u.user_metadata?.role || (u.email?.includes('admin') ? 'super_admin' : 'client')) as UserRole;
    return {
      id: u.id,
      role: metaRole,
      fullName: u.user_metadata?.full_name || u.email?.split('@')[0] || 'User',
      email: u.email || '',
      phone: u.user_metadata?.phone,
      companyName: u.user_metadata?.company_name,
      isActive: true,
    };
  };

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(initialSession);
          if (initialSession?.user) {
            setSupabaseUser(initialSession.user);
            const prof = await extractProfile(initialSession.user);
            if (mounted) setUserProfile(prof);
          } else {
            setSupabaseUser(null);
            setUserProfile(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        if (newSession?.user) {
          setSupabaseUser(newSession.user);
          const prof = await extractProfile(newSession.user);
          if (mounted) setUserProfile(prof);
        } else {
          setSupabaseUser(null);
          setUserProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile = await extractProfile(data.user);
        setUserProfile(profile);
        setSupabaseUser(data.user);
        setSession(data.session);
        setIsLoading(false);
        return { success: true, role: profile.role };
      }

      setIsLoading(false);
      return { success: false, error: 'User record not found.' };
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      return { success: false, error: msg };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setSupabaseUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send reset link.';
      return { success: false, error: msg };
    }
  };

  const currentRole: UserRole = userProfile?.role || 'visitor';
  const isAdmin = ['super_admin', 'admin', 'project_manager', 'engineer', 'designer', 'finance', 'support'].includes(currentRole);
  const isClient = currentRole === 'client';

  return (
    <AuthContext.Provider
      value={{
        user: userProfile,
        supabaseUser,
        session,
        role: currentRole,
        isAdmin,
        isClient,
        isLoading,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
