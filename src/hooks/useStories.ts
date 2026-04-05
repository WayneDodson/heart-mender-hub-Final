
import { useState } from 'react';
import { ApprovedStory } from '@/components/stories/types';

const MOCK_STORIES: ApprovedStory[] = [
  {
    id: '1',
    title: 'Finding Peace After the Storm',
    author_name: 'Sarah M.',
    author_age: '38',
    category: 'emotional-support',
    content: `Divorce felt like the end of everything I had worked for. After 12 years of marriage, I suddenly found myself alone, scared, and completely lost. The first few months were the hardest — I barely left the house, and simple tasks like grocery shopping felt overwhelming.\n\nBut slowly, with the help of a therapist, close friends, and communities like this one, I began to rediscover who I was before I became "us". I started painting again — something I had given up years ago. I joined a hiking group and made new friends who knew me only as myself, not as half of a couple.\n\nToday, two years later, I can honestly say I am happier than I have been in a very long time. The journey was painful, but it led me somewhere I never expected: back to myself.`,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    preview: 'Divorce felt like the end of everything I had worked for. After 12 years of marriage, I suddenly found myself alone...',
  },
  {
    id: '2',
    title: 'Co-Parenting with Grace',
    author_name: 'James T.',
    author_age: '44',
    category: 'co-parenting',
    content: `When my marriage ended, my biggest fear was how it would affect my children. My ex and I had very different parenting styles, and I worried that our conflict would spill over onto them.\n\nWe decided to try co-parenting counselling, and it was one of the best decisions we ever made. We learned to communicate as business partners — focused entirely on the children's wellbeing, not on our own grievances.\n\nWe created a shared calendar, established consistent rules across both households, and agreed never to speak negatively about each other in front of the kids. It has not always been easy, but watching my children thrive has made every difficult conversation worth it.\n\nIf you are struggling with co-parenting, please know that it does get easier. Put the children first, and everything else will follow.`,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    preview: 'When my marriage ended, my biggest fear was how it would affect my children. My ex and I had very different parenting styles...',
  },
  {
    id: '3',
    title: 'Rebuilding My Identity',
    author_name: 'Maria L.',
    author_age: '51',
    category: 'moving-forward',
    content: `After 24 years of marriage, I had completely lost myself. My identity was entirely wrapped up in being a wife and mother. When the divorce came, I did not just lose a partner — I lost my sense of who I was.\n\nThe first thing I did was make a list of everything I had always wanted to do but never had the chance. Learn Italian. Travel solo. Write. I started working through that list, one item at a time.\n\nI took an Italian class at the local community college and met the most wonderful group of people. I booked a solo trip to Portugal — terrifying and exhilarating in equal measure. I started keeping a journal, and eventually began writing short essays about my experience.\n\nReinventing yourself at 51 is not easy, but it is absolutely possible. You are not starting over — you are starting fresh, with decades of wisdom behind you.`,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    preview: 'After 24 years of marriage, I had completely lost myself. My identity was entirely wrapped up in being a wife and mother...',
  },
];

export const useStories = () => {
  const [approvedStories] = useState<ApprovedStory[]>(MOCK_STORIES);
  return { approvedStories, isLoading: false, refreshStories: () => {} };
};
