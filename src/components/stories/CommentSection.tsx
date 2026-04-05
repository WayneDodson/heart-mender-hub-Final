
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageCircle } from 'lucide-react';
import { useDeviceDetection } from '@/hooks/use-mobile';

const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  comment: z.string().min(3, { message: 'Comment must be at least 3 characters' }).max(500, { message: 'Comment must be less than 500 characters' }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

type Comment = {
  id: string;
  story_id: string;
  name: string;
  comment: string;
  created_at: string;
};

interface CommentSectionProps {
  storyId: string;
}

const STORAGE_KEY = (storyId: string) => `comments_${storyId}`;

const loadComments = (storyId: string): Comment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(storyId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveComments = (storyId: string, comments: Comment[]) => {
  localStorage.setItem(STORAGE_KEY(storyId), JSON.stringify(comments));
};

const CommentSection: React.FC<CommentSectionProps> = ({ storyId }) => {
  const { toast } = useToast();
  const { isMobile } = useDeviceDetection();
  const [comments, setComments] = React.useState<Comment[]>(() => loadComments(storyId));

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { name: '', comment: '' },
  });

  const onSubmit = (values: CommentFormValues) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      story_id: storyId,
      name: values.name,
      comment: values.comment,
      created_at: new Date().toISOString(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(storyId, updated);
    toast({ title: 'Comment added', description: 'Your comment has been posted.' });
    form.reset();
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const containerClasses = isMobile ? 'mt-6 space-y-4 bg-white px-2' : 'mt-12 space-y-8 bg-white';
  const commentItemClasses = isMobile ? 'bg-gray-50 p-3 rounded-lg text-sm' : 'bg-gray-50 p-4 rounded-lg';

  return (
    <div className={containerClasses}>
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-healing-900 mb-6 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input placeholder="Your name" className="bg-white" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="comment" render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="Share your thoughts..." className={isMobile ? 'min-h-[80px] bg-white' : 'min-h-[100px] bg-white'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="bg-healing-600 hover:bg-healing-700 w-full sm:w-auto">
              Post Comment
            </Button>
          </form>
        </Form>
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={commentItemClasses}>
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="font-medium text-healing-900">{comment.name}</h3>
                  <span className="text-xs sm:text-sm text-gray-500">{formatDate(comment.created_at)}</span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line break-words">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
