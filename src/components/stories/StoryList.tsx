
import React from 'react';
import StoryCard from './StoryCard';
import { ApprovedStory } from './types';

interface StoryListProps {
  stories: ApprovedStory[];
  onReadMore: (id: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onReadMore }) => {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No stories available yet. Be the first to share your journey!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} onReadMore={onReadMore} />
      ))}
    </div>
  );
};

export default StoryList;
