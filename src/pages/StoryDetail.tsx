
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { StoryRow } from '@/components/stories/types';
import CommentSection from '@/components/stories/CommentSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [story, setStory] = useState<StoryRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('id', id)
          .eq('status', 'approved')
          .single();
        
        if (error) throw error;
        setStory(data as StoryRow);
      } catch (error: any) {
        toast({
          title: "Error loading story",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
        navigate('/stories'); // Redirect back to stories page on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStory();
  }, [id, navigate, toast]);

  const formattedCategory = story?.category
    ? story.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  const formattedDate = story?.created_at
    ? new Date(story.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6 text-healing-600 hover:text-healing-700 hover:bg-healing-50 -ml-2"
            onClick={() => navigate('/stories')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Button>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-healing-600" />
            </div>
          ) : story ? (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-sm font-medium text-healing-600 mb-2">
                  {formattedCategory}
                </div>
                <h1 className="text-3xl font-bold text-healing-900 mb-3">{story.title}</h1>
                <div className="text-sm text-gray-500 mb-6">
                  By {story.author_name}{story.author_age ? `, ${story.author_age}` : ''} • {formattedDate}
                </div>
                <div className="prose prose-healing max-w-none">
                  {story.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Add comment section below the story */}
              {id && <CommentSection storyId={id} />}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Story not found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoryDetail;
