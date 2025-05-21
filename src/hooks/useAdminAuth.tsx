
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Enhanced admin check with session validation
  const checkAdminStatus = async () => {
    try {
      // First check if we have a valid Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No session, definitely not admin
        setIsAdmin(false);
        localStorage.removeItem("isAdminAuthenticated");
        setIsLoading(false);
        return false;
      }
      
      // Get cached admin status
      const cachedAdminStatus = localStorage.getItem("isAdminAuthenticated") === "true";
      
      // In a real implementation, you'd verify against a database table
      // This is a placeholder for a proper implementation
      // const { data: adminData, error } = await supabase
      //   .from('admin_users')
      //   .select('is_admin')
      //   .eq('user_id', session.user.id)
      //   .single();
      
      // if (error || !adminData?.is_admin) {
      //   setIsAdmin(false);
      //   localStorage.removeItem("isAdminAuthenticated");
      // } else {
      //   setIsAdmin(true);
      //   localStorage.setItem("isAdminAuthenticated", "true");
      // }
      
      // Using cached value for now
      setIsAdmin(cachedAdminStatus);
      
      setIsLoading(false);
      return cachedAdminStatus;
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    // Check admin status on component mount
    checkAdminStatus();
    
    // Listen for auth changes (in case admin logs in/out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });
    
    // Also listen for storage events (in case admin logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isAdminAuthenticated") {
        checkAdminStatus();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loginAdmin = async () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAdmin(true);
    
    toast({
      title: "Admin Access Granted",
      description: "You now have administrator privileges.",
      duration: 3000,
    });
    
    return true;
  };

  const logoutAdmin = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAdmin(false);
    
    toast({
      title: "Admin Logout",
      description: "You have been logged out of admin mode.",
      duration: 3000,
    });
    
    return true;
  };

  return { isAdmin, isLoading, loginAdmin, logoutAdmin, checkAdminStatus };
}
