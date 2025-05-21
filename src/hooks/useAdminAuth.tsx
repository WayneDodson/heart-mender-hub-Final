
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is admin on component mount
    const checkAdminStatus = async () => {
      try {
        // First check local storage for cached admin status
        const cachedAdminStatus = localStorage.getItem("isAdminAuthenticated") === "true";
        
        // If we have a Supabase session, verify admin status
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // In a real implementation, you'd check against your admin users table
          // or implement a proper role-based system with Supabase RLS policies
          // For now, we'll just use the cached value
          setIsAdmin(cachedAdminStatus);
        } else {
          // No session, definitely not admin
          setIsAdmin(false);
          if (cachedAdminStatus) {
            localStorage.removeItem("isAdminAuthenticated");
          }
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
    
    // Listen for auth changes (in case admin logs in/out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });
    
    // Also listen for storage events (in case admin logs in/out in another tab)
    window.addEventListener("storage", checkAdminStatus);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("storage", checkAdminStatus);
    };
  }, []);

  const loginAdmin = () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAdmin(false);
  };

  return { isAdmin, isLoading, loginAdmin, logoutAdmin };
}
