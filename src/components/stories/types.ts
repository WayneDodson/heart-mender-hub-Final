
import { z } from 'zod';

export const storySchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  authorName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  authorAge: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  category: z.string(),
  content: z.string().min(100, { message: 'Story must be at least 100 characters' }),
});

export type StoryFormValues = z.infer<typeof storySchema>;

export type StoryInsert = {
  title: string;
  author_name: string;
  author_age?: string;
  email: string;
  category: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type StoryRow = {
  id: string;
  title: string;
  author_name: string;
  author_age?: string | null;
  category: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  email: string;
};

export type ApprovedStory = {
  id: string;
  title: string;
  author_name: string;
  author_age?: string | null;
  category: string;
  content: string;
  created_at: string;
  preview: string;
};
