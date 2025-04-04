
import React from 'react';
import { Navigate } from 'react-router-dom';
import StoryReviewAdmin from './StoryReviewAdmin';
import AdminLogin from '../components/admin/AdminLogin';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const { isAdmin, loginAdmin, logoutAdmin } = useAdminAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutAdmin();
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin access.",
      duration: 3000,
    });
  };

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={loginAdmin} />;
  }

  return (
    <div>
      <div className="container mx-auto max-w-4xl py-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2 ml-auto"
        >
          <LogOut className="h-4 w-4" />
          Logout from Admin
        </Button>
      </div>
      <StoryReviewAdmin />
    </div>
  );
};

export default AdminPage;
