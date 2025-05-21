
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  mfaEnabled: boolean;
  checkUserRole: () => Promise<boolean>;
  checkMFAStatus: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  mfaEnabled: false,
  checkUserRole: async () => false,
  checkMFAStatus: async () => false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // Function to check if the current user is an admin using the database role system
  const checkUserRole = async (): Promise<boolean> => {
    try {
      // First check if we have a valid session
      if (!session?.user) {
        setIsAdmin(false);
        return false;
      }
      
      // Query the database to check if user has admin role
      const { data, error } = await supabase
        .rpc('has_role', { _role: 'admin' });
      
      if (error) {
        console.error("Error checking role:", error);
        setIsAdmin(false);
        return false;
      }
      
      // Update admin status based on database result
      setIsAdmin(!!data);
      return !!data;
    } catch (error) {
      console.error("Error checking admin role:", error);
      setIsAdmin(false);
      return false;
    }
  };

  // Function to check if MFA is enabled for the current user
  const checkMFAStatus = async (): Promise<boolean> => {
    try {
      if (!session?.user) {
        setMfaEnabled(false);
        return false;
      }

      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (error) {
        console.error("Error checking MFA status:", error);
        setMfaEnabled(false);
        return false;
      }
      
      // Set MFA status based on the current level
      const isMfaEnabled = data.currentLevel === 'aal2';
      setMfaEnabled(isMfaEnabled);
      return isMfaEnabled;
    } catch (error) {
      console.error("Error checking MFA status:", error);
      setMfaEnabled(false);
      return false;
    }
  };

  // Function to sign out
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      setMfaEnabled(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Re-check admin role and MFA status when auth state changes
        if (!session) {
          setIsAdmin(false);
          setMfaEnabled(false);
        } else {
          // Use setTimeout to prevent supabase auth deadlocks
          setTimeout(() => {
            checkUserRole();
            checkMFAStatus();
          }, 0);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // Check admin role and MFA status on initial load
      if (session) {
        // Use setTimeout to prevent supabase auth deadlocks
        setTimeout(() => {
          checkUserRole();
          checkMFAStatus();
        }, 0);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      isAdmin, 
      mfaEnabled,
      checkUserRole, 
      checkMFAStatus,
      signOut 
    }}>
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
