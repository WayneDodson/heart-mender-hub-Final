
import React, { useEffect } from 'react';
import { Loader2, Bell } from 'lucide-react';
import StoryAdminCard from '../components/stories/StoryAdminCard';
import { useStoryAdmin } from '../hooks/useStoryAdmin';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

const StoryReviewAdmin = () => {
  const { stories, isLoading, updateStoryStatus } = useStoryAdmin();
  const { toast } = useToast();
  const pendingStories = stories.filter(story => story.status === 'pending');
  
  useEffect(() => {
    // Show a toast notification when the component mounts if there are pending stories
    if (pendingStories.length > 0) {
      toast({
        title: "Stories need review",
        description: `You have ${pendingStories.length} ${pendingStories.length === 1 ? 'story' : 'stories'} waiting for review.`,
        duration: 5000,
      });
    }
  }, []);
  
  const handleApprove = async (id: string) => {
    await updateStoryStatus(id, 'approved');
  };
  
  const handleReject = async (id: string) => {
    await updateStoryStatus(id, 'rejected');
  };
  
  return (
    <div className="flex-grow py-12 px-4 bg-healing-50">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-healing-900">Story Review Dashboard</h1>
          <p className="text-gray-600 mt-2">Review and manage submitted stories.</p>
        </div>
        
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
