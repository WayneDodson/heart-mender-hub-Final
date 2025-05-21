
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function useAdminAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user, isAdmin, checkUserRole } = useAuth();

  // Check admin status when component mounts
  useEffect(() => {
    const verifyAdminStatus = async () => {
      setIsLoading(true);
      try {
        await checkUserRole();
      } catch (error) {
        console.error("Error verifying admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAdminStatus();
  }, []);

  const loginAdmin = async (username: string, password: string) => {
    try {
      // First, log in the user with email/password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      
      if (error) throw error;
      
      // Then check if the user has admin role
      const isAdminUser = await checkUserRole();
      
      if (!isAdminUser) {
        throw new Error("You do not have administrator privileges.");
      }
      
      toast({
        title: "Admin Access Granted",
        description: "You now have administrator privileges.",
        duration: 3000,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Could not authenticate as admin. Please check your credentials.",
        variant: "destructive",
      });
      console.error("Admin login error:", error);
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Admin Logout",
        description: "You have been logged out of admin mode.",
        duration: 3000,
      });
      
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "There was a problem during logout. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { isAdmin, isLoading, loginAdmin, logoutAdmin, checkUserRole };
}
