
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoryRow } from '@/components/stories/types';
import { useAuth } from '@/contexts/AuthContext';

export const useStoryAdmin = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchStories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check if user has admin privileges
      if (!isAdmin) {
        setError("Admin authentication required");
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStories((data as StoryRow[]) || []);
    } catch (error: any) {
      const errorMessage = error.message || "Please try again later.";
      setError(errorMessage);
      toast({
        title: "Error loading stories",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error fetching stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStoryStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      // Verify admin status first
      if (!isAdmin) {
        throw new Error("Admin permissions required for this operation");
      }
      
      const { error } = await supabase
        .from('stories')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setStories(prev => prev.map(story => {
        if (story.id === id) {
          return { ...story, status };
        }
        return story;
      }));
      
      toast({
        title: "Story updated",
        description: `The story has been ${status}.`,
      });
      
      await fetchStories();
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Please try again later.";
      toast({
        title: "Error updating story",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error updating story status:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchStories();
    } else {
      setError("Admin authentication required");
      setIsLoading(false);
    }
    
    const interval = setInterval(() => {
      if (isAdmin) {
        fetchStories();
      }
    }, 300000); // Refresh every 5 minutes
    
    return () => clearInterval(interval);
  }, [isAdmin]); // Re-fetch when admin status changes

  return { 
    stories, 
    isLoading, 
    error,
    updateStoryStatus, 
    refreshStories: fetchStories 
  };
};
