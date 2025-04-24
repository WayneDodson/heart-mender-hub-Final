
import React, { useEffect } from 'react';
import { Loader2, Bell, ShieldAlert } from 'lucide-react';
import StoryAdminCard from '../components/stories/StoryAdminCard';
import { useStoryAdmin } from '../hooks/useStoryAdmin';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StoryReviewAdmin = () => {
  const { stories, isLoading, updateStoryStatus, error } = useStoryAdmin();
  const { toast } = useToast();
  const { isAdmin, checkUserRole } = useAuth();
  const navigate = useNavigate();
  
  const pendingStories = stories.filter(story => story.status === 'pending');

  // Check admin status when component mounts
  useEffect(() => {
    const verifyAdminAccess = async () => {
      try {
        const hasAdminAccess = await checkUserRole();
        if (!hasAdminAccess) {
          toast({
            title: "Access Denied",
            description: "You need to login as admin to review stories.",
            variant: "destructive",
            duration: 5000,
          });
          navigate('/admin');
        }
      } catch (error) {
        console.error("Error verifying admin access:", error);
      }
    };
    
    verifyAdminAccess();
  }, []);
  
  const handleApprove = async (id: string) => {
    try {
      await updateStoryStatus(id, 'approved');
      toast({
        title: "Story Approved",
        description: "The story has been published successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Approval Failed",
        description: "Could not approve the story. Please try again.",
        variant: "destructive",
      });
      console.error("Error approving story:", error);
    }
  };
  
  const handleReject = async (id: string) => {
    try {
      await updateStoryStatus(id, 'rejected');
      toast({
        title: "Story Rejected",
        description: "The story has been rejected successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Rejection Failed",
        description: "Could not reject the story. Please try again.",
        variant: "destructive",
      });
      console.error("Error rejecting story:", error);
    }
  };
  
  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Alert variant="destructive" className="mb-8">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle>Admin Access Required</AlertTitle>
          <AlertDescription>
            You need administrator privileges to manage stories.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="flex-grow py-12 px-4 bg-healing-50">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-healing-900">Story Management</h1>
          <p className="text-gray-600 mt-2">Review and manage submitted stories.</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle>Error Loading Stories</AlertTitle>
            <AlertDescription>
              {error || "There was a problem loading stories. Please try refreshing the page."}
            </AlertDescription>
          </Alert>
        )}
        
        {pendingStories.length > 0 && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Bell className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">Action Required</AlertTitle>
            <AlertDescription className="text-amber-700">
              {`You have ${pendingStories.length} ${pendingStories.length === 1 ? 'story' : 'stories'} waiting for review.`}
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-healing-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {stories.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No stories have been submitted yet.</p>
              </div>
            ) : (
              stories.map(story => (
                <StoryAdminCard
                  key={story.id}
                  story={story}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReviewAdmin;
