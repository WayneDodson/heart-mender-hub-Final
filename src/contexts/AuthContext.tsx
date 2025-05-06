
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  checkUserRole: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  checkUserRole: async () => false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if the current user is an admin
  const checkUserRole = async (): Promise<boolean> => {
    try {
      // First check local storage for admin status
      const adminStatus = localStorage.getItem("isAdminAuthenticated") === "true";
      
      // Update state if admin authenticated
      if (adminStatus) {
        setIsAdmin(true);
        return true;
      }
      
      // Reset admin status if not authenticated
      setIsAdmin(false);
      return false;
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      return false;
    }
  };

  // Function to sign out
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isAdminAuthenticated");
      setIsAdmin(false);
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
        
        // Re-check admin role when auth state changes
        if (!session) {
          setIsAdmin(false);
          localStorage.removeItem("isAdminAuthenticated");
        } else {
          // Use setTimeout to prevent supabase auth deadlocks
          setTimeout(() => {
            checkUserRole();
          }, 0);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // Check admin role on initial load
      if (session) {
        // Use setTimeout to prevent supabase auth deadlocks
        setTimeout(() => {
          checkUserRole();
        }, 0);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAdmin, checkUserRole, signOut }}>
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
