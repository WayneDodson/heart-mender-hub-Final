
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoryRow } from '@/components/stories/types';

export const useStoryAdmin = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStories((data as StoryRow[]) || []);
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

  const updateStoryStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('stories')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Story updated",
        description: `The story has been ${status}.`,
      });
      
      await fetchStories();
    } catch (error: any) {
      toast({
        title: "Error updating story",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { stories, isLoading, updateStoryStatus, refreshStories: fetchStories };
};
