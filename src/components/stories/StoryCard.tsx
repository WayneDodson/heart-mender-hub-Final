
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApprovedStory } from './types';

interface StoryCardProps {
  story: ApprovedStory;
  onReadMore: (id: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onReadMore }) => {
  const formattedCategory = story.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col border border-healing-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="text-sm font-medium text-healing-600 mb-1">
          {formattedCategory}
        </div>
        <CardTitle className="text-xl">{story.title}</CardTitle>
        <div className="text-sm text-gray-500 mt-1">
          By {story.author_name}{story.author_age ? `, ${story.author_age}` : ''}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-700">{story.preview}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{formattedDate}</div>
        <Button 
          variant="ghost" 
          className="text-healing-600 hover:text-healing-700 hover:bg-healing-50"
          onClick={() => onReadMore(story.id)}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
