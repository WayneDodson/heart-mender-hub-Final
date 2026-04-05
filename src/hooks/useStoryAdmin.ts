
import { useState } from 'react';
import { StoryRow } from '@/components/stories/types';

export const useStoryAdmin = () => {
  const [stories] = useState<StoryRow[]>([]);

  const updateStoryStatus = async (_id: string, _status: 'approved' | 'rejected') => {
    return true;
  };

  return {
    stories,
    isLoading: false,
    error: null,
    updateStoryStatus,
    refreshStories: () => {},
  };
};
