
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const storySchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  author_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  author_age: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email' }),
  category: z.enum(['self-discovery', 'parenting', 'relationships', 'practical-advice', 'other']),
  content: z.string().min(100, { message: 'Story must be at least 100 characters' }),
});

type StoryFormValues = z.infer<typeof storySchema>;

const StorySubmissionForm = () => {
  const { toast } = useToast();
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      author_name: '',
      author_age: '',
      email: '',
      category: 'self-discovery',
      content: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (_data: StoryFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({
      title: 'Story submitted successfully',
      description: 'Thank you for sharing your story. It will be reviewed before publication.',
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-healing-800">Share Your Story</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Story Title</FormLabel>
              <FormControl><Input placeholder="Give your story a meaningful title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="author_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl><Input placeholder="First name or pseudonym" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="author_age" render={({ field }) => (
              <FormItem>
                <FormLabel>Age (optional)</FormLabel>
                <FormControl><Input placeholder="e.g. 35" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="Your email (not displayed publicly)" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" {...field}>
                  <option value="self-discovery">Self Discovery</option>
                  <option value="parenting">Parenting</option>
                  <option value="relationships">Relationships</option>
                  <option value="practical-advice">Practical Advice</option>
                  <option value="other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Your Story</FormLabel>
              <FormControl><Textarea placeholder="Share your experience..." className="min-h-[200px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="bg-healing-600 hover:bg-healing-700 text-white font-medium w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StorySubmissionForm;
