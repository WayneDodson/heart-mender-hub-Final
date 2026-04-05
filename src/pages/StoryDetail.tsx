
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from 'lucide-react';
import { StoryRow } from '@/components/stories/types';
import CommentSection from '@/components/stories/CommentSection';

const MOCK_STORIES: StoryRow[] = [
  {
    id: '1',
    title: 'Finding Peace After the Storm',
    author_name: 'Sarah M.',
    author_age: '38',
    category: 'emotional-support',
    email: '',
    status: 'approved',
    content: 'Divorce felt like the end of everything I had worked for. After 12 years of marriage, I suddenly found myself alone, scared, and completely lost. The first few months were the hardest — I barely left the house, and simple tasks like grocery shopping felt overwhelming.\n\nBut slowly, with the help of a therapist, close friends, and communities like this one, I began to rediscover who I was before I became "us". I started painting again — something I had given up years ago. I joined a hiking group and made new friends who knew me only as myself, not as half of a couple.\n\nToday, two years later, I can honestly say I am happier than I have been in a very long time. The journey was painful, but it led me somewhere I never expected: back to myself.',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Co-Parenting with Grace',
    author_name: 'James T.',
    author_age: '44',
    category: 'co-parenting',
    email: '',
    status: 'approved',
    content: 'When my marriage ended, my biggest fear was how it would affect my children. My ex and I had very different parenting styles, and I worried that our conflict would spill over onto them.\n\nWe decided to try co-parenting counselling, and it was one of the best decisions we ever made. We learned to communicate as business partners — focused entirely on the children\'s wellbeing, not on our own grievances.\n\nWe created a shared calendar, established consistent rules across both households, and agreed never to speak negatively about each other in front of the kids. It has not always been easy, but watching my children thrive has made every difficult conversation worth it.',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Rebuilding My Identity',
    author_name: 'Maria L.',
    author_age: '51',
    category: 'moving-forward',
    email: '',
    status: 'approved',
    content: 'After 24 years of marriage, I had completely lost myself. My identity was entirely wrapped up in being a wife and mother. When the divorce came, I did not just lose a partner — I lost my sense of who I was.\n\nThe first thing I did was make a list of everything I had always wanted to do but never had the chance. Learn Italian. Travel solo. Write. I started working through that list, one item at a time.\n\nI took an Italian class at the local community college and met the most wonderful group of people. I booked a solo trip to Portugal — terrifying and exhilarating in equal measure. I started keeping a journal, and eventually began writing short essays about my experience.',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<StoryRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = MOCK_STORIES.find((s) => s.id === id) || null;
    setStory(found);
    setIsLoading(false);
    if (!found) navigate('/stories');
  }, [id, navigate]);

  const formattedCategory = story?.category
    ? story.category.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : '';

  const formattedDate = story?.created_at
    ? new Date(story.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <main className="flex-grow py-12 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6 text-healing-600 hover:text-healing-700 hover:bg-healing-50 -ml-2" onClick={() => navigate('/stories')}>
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
              <div className="text-sm font-medium text-healing-600 mb-2">{formattedCategory}</div>
              <h1 className="text-3xl font-bold text-healing-900 mb-3">{story.title}</h1>
              <div className="text-sm text-gray-500 mb-6">
                By {story.author_name}{story.author_age ? `, ${story.author_age}` : ''} • {formattedDate}
              </div>
              <div className="prose prose-healing max-w-none">
                {story.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                ))}
              </div>
            </div>
            {id && <CommentSection storyId={id} />}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Story not found.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default StoryDetail;
