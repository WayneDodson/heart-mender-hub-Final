
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { storySchema, StoryFormValues, StoryInsert } from './types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import StoryFormFields from './StoryFormFields';
import { ArrowRight, Loader2 } from 'lucide-react';

const StorySubmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      authorName: '',
      authorAge: '',
      email: '',
      category: '',
      content: '',
    },
  });

  const onSubmit = async (data: StoryFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('stories')
        .insert({
          title: data.title,
          author_name: data.authorName,
          author_age: data.authorAge || null,
          email: data.email,
          category: data.category,
          content: data.content,
          status: 'pending'
        } as StoryInsert);

      if (error) throw error;

      toast({
        title: "Story submitted successfully!",
        description: "Your story has been sent for review and will be published once approved.",
        variant: "default",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error submitting story",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <StoryFormFields form={form} />
          
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting} className="bg-healing-600 hover:bg-healing-700">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Your Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StorySubmissionForm;
