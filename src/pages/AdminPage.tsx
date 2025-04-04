
import React from 'react';
import StoryReviewAdmin from './StoryReviewAdmin';
import AdminLogin from '../components/admin/AdminLogin';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const { isAdmin, isLoading, loginAdmin, logoutAdmin } = useAdminAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutAdmin();
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin access.",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-healing-700">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={loginAdmin} />;
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
