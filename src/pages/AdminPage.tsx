
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryReviewAdmin from './StoryReviewAdmin';
import AdminLogin from '../components/admin/AdminLogin';
import { Button } from '@/components/ui/button';
import { LogOut, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AdminPage = () => {
  const { isAdmin, isLoading, checkUserRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Set document title for better SEO
  useEffect(() => {
    document.title = "Admin Dashboard - Heart Mender";
    return () => {
      document.title = "Heart Mender - Healing After Divorce";
    };
  }, []);

  // Check admin status when component mounts
  useEffect(() => {
    const verifyAdminAccess = async () => {
      try {
        const hasAdminAccess = await checkUserRole();
        if (!hasAdminAccess && !isLoading) {
          toast({
            title: "Access Denied",
            description: "You need to login as admin to access this page.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Error verifying admin access:", error);
        toast({
          title: "Authentication Error",
          description: "Could not verify your admin privileges. Please try logging in again.",
          variant: "destructive",
        });
      }
    };
    
    verifyAdminAccess();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAdminAuthenticated");
      checkUserRole();
      
      toast({
        title: "Logged Out",
        description: "You have been logged out of admin access.",
        duration: 3000,
      });
      
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "There was a problem during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-healing-700 mx-auto mb-4" />
          <p className="text-healing-700">Verifying admin privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Admin Access Required</AlertTitle>
          <AlertDescription>
            You need administrator privileges to access this area.
          </AlertDescription>
        </Alert>
        <AdminLogin onLoginSuccess={() => checkUserRole()} />
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-healing-800">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout from Admin
          </Button>
        </div>
      </div>
      <StoryReviewAdmin />
    </div>
  );
};

export default AdminPage;
