
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';
import StoryAdminCard from '../components/stories/StoryAdminCard';
import { useStoryAdmin } from '../hooks/useStoryAdmin';

const StoryReviewAdmin = () => {
  const { stories, isLoading, updateStoryStatus } = useStoryAdmin();
  
  const handleApprove = async (id: string) => {
    await updateStoryStatus(id, 'approved');
  };
  
  const handleReject = async (id: string) => {
    await updateStoryStatus(id, 'rejected');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-healing-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-healing-900">Story Review Dashboard</h1>
            <p className="text-gray-600 mt-2">Review and manage submitted stories.</p>
          </div>
          
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
      </main>

      <Footer />
    </div>
  );
};

export default StoryReviewAdmin;
