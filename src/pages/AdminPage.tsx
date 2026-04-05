import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryReviewAdmin from './StoryReviewAdmin';
import AdminLogin from '../components/admin/AdminLogin';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import { Button } from '@/components/ui/button';
import { LogOut, AlertTriangle, Loader2, BarChart2, BookOpen, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type AdminTab = 'analytics' | 'stories' | 'moderation';

const AdminPage = () => {
  const { isAdmin, isLoading, checkUserRole, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  useEffect(() => {
    document.title = 'Admin Dashboard - Heart Mender Hub';
    return () => { document.title = 'Heart Mender Hub - Healing & Support Community'; };
  }, []);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      try {
        const hasAdminAccess = await checkUserRole();
        if (!hasAdminAccess && !isLoading) {
          toast({
            title: 'Access Denied',
            description: 'You need administrator privileges to access this area.',
            variant: 'destructive',
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        toast({
          title: 'Authentication Error',
          description: 'Could not verify your admin privileges. Please try logging in again.',
          variant: 'destructive',
        });
      }
    };
    verifyAdminAccess();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({ title: 'Logged Out', description: 'You have been logged out of admin access.', duration: 3000 });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({ title: 'Error', description: 'There was a problem during logout. Please try again.', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#6A5ACD] mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin privileges...</p>
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
            You need administrator privileges to access this area. Please sign in with your admin account.
          </AlertDescription>
        </Alert>
        <AdminLogin onLoginSuccess={() => checkUserRole()} />
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'stories', label: 'Story Review', icon: BookOpen },
    { id: 'moderation', label: 'Moderation', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Heart Mender Hub — Site Management</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Tab navigation */}
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-[#6A5ACD] text-[#6A5ACD]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'analytics' && <AdminAnalytics />}
        {activeTab === 'stories' && <StoryReviewAdmin />}
        {activeTab === 'moderation' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Shield className="w-12 h-12 text-[#6A5ACD] mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Moderation Active</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              All community posts and comments are automatically screened by AI before going live.
              Flagged content is held for manual review. This panel will show flagged items as the community grows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
