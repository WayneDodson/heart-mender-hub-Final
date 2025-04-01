
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ApprovedStory, StoryRow } from '@/components/stories/types';

export const useStories = () => {
  const { toast } = useToast();
  const [approvedStories, setApprovedStories] = useState<ApprovedStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const storiesWithPreviews = (data as StoryRow[])?.map(story => ({
        id: story.id,
        title: story.title,
        author_name: story.author_name,
        author_age: story.author_age,
        category: story.category,
        content: story.content,
        created_at: story.created_at,
        preview: story.content.substring(0, 120) + '...',
      })) || [];
      
      setApprovedStories(storiesWithPreviews);
    } catch (error: any) {
      toast({
        title: "Error loading stories",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { approvedStories, isLoading, refreshStories: fetchStories };
};
