
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePendingStoriesCount = () => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchPendingStoriesCount = async () => {
    try {
      const { count, error } = await supabase
        .from('stories')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (error) throw error;
      
      setPendingCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching pending stories count:', error);
      toast({
        title: "Error checking for stories",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingStoriesCount();

    // Set up real-time subscription to update count when stories change
    const channel = supabase
      .channel('pending_stories_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'stories' 
        }, 
        () => {
          fetchPendingStoriesCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { pendingCount, isLoading, refresh: fetchPendingStoriesCount };
};
