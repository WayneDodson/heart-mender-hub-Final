
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, PenLine, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StoryList from '../components/stories/StoryList';
import { useStories } from '../hooks/useStories';

const Stories = () => {
  const { approvedStories, isLoading } = useStories();
  const navigate = useNavigate();
  
  const handleReadMore = (id: string) => {
    navigate(`/stories/${id}`);
  };
  
  return (
    <main className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-healing-900">Community Stories</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Real stories from people who have walked the path of divorce and healing. 
            Find inspiration, understanding, and hope in these shared experiences.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-healing-600 hover:bg-healing-700">
              <Link to="/submit-story" className="flex items-center">
                <PenLine className="mr-2 h-4 w-4" />
                Share Your Story
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-healing-600 text-healing-600 hover:bg-healing-50">
              <Link to="/celebrity-stories" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Celebrity Journeys
              </Link>
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-healing-600" />
          </div>
        ) : (
          <StoryList stories={approvedStories} onReadMore={handleReadMore} />
        )}
      </div>
    </main>
  );
};

export default Stories;
