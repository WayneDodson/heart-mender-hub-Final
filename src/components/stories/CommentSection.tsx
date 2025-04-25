
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageCircle, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const commentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  comment: z.string().min(3, { message: 'Comment must be at least 3 characters' }).max(500, { message: 'Comment must be less than 500 characters' }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

// Define a proper type for comments that matches the database schema
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

const CommentSection: React.FC<CommentSectionProps> = ({ storyId }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      comment: '',
    },
  });

  // Fetch comments for this story using Supabase client instead of direct API calls
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', storyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('story_comments')
        .select('*')
        .eq('story_id', storyId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Error fetching comments');
      }
      
      return (data as Comment[]) || [];
    }
  });

  // Mutation for adding a new comment using Supabase client
  const { mutate: addComment, isPending: isSubmitting } = useMutation({
    mutationFn: async (values: CommentFormValues) => {
      const { data, error } = await supabase
        .from('story_comments')
        .insert({
          story_id: storyId,
          name: values.name,
          comment: values.comment,
        })
        .select();
      
      if (error) {
        console.error('Error posting comment:', error);
        throw new Error('Error posting comment');
      }
      
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['comments', storyId] });
    },
    onError: (error) => {
      toast({
        title: "Error posting comment",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: CommentFormValues) => {
    addComment(values);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-12 space-y-8 bg-white">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-healing-900 mb-6 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
        
        {/* Comment submission form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts..." 
                      className="min-h-[100px] bg-white"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="bg-healing-600 hover:bg-healing-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </form>
        </Form>

        {/* Comments list */}
        <div className="space-y-6">
          {commentsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-healing-600" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-healing-900">{comment.name}</h3>
                  <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
