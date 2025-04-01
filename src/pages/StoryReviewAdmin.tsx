
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

type Story = {
  id: string;
  title: string;
  author_name: string;
  author_age?: string;
  category: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  email: string;
};

const StoryReviewAdmin = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingStories();
  }, []);

  const fetchPendingStories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load stories for review',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStoryStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('stories')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setStories(stories.map(story => 
        story.id === id ? { ...story, status } : story
      ));
      
      toast({
        title: 'Success',
        description: `Story ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
    } catch (error) {
      console.error('Error updating story:', error);
      toast({
        title: 'Error',
        description: 'Failed to update story status',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Story Review Admin</h1>
            <div className="text-center py-12">Loading stories...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-8">Story Review Admin</h1>
          
          {stories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">No stories to review at this time.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {stories.map((story) => (
                <Card key={story.id} className="border-l-4 border-l-healing-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            story.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            story.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                          </span>
                          <CardDescription>Submitted on {formatDate(story.created_at)}</CardDescription>
                        </div>
                        <CardTitle className="text-2xl mt-2">{story.title}</CardTitle>
                        <CardDescription className="mt-1">
                          By {story.author_name}{story.author_age ? `, ${story.author_age}` : ''} • {story.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </CardDescription>
                        <CardDescription className="mt-1">
                          Contact: {story.email}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="whitespace-pre-line">{story.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    {story.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          className="border-red-300 text-red-700 hover:bg-red-50" 
                          onClick={() => updateStoryStatus(story.id, 'rejected')}
                        >
                          Reject
                        </Button>
                        <Button 
                          className="bg-healing-600 hover:bg-healing-700 text-white"
                          onClick={() => updateStoryStatus(story.id, 'approved')}
                        >
                          Approve
                        </Button>
                      </>
                    )}
                    {story.status === 'rejected' && (
                      <Button 
                        className="bg-healing-600 hover:bg-healing-700 text-white"
                        onClick={() => updateStoryStatus(story.id, 'approved')}
                      >
                        Approve
                      </Button>
                    )}
                    {story.status === 'approved' && (
                      <Button 
                        variant="outline" 
                        className="border-red-300 text-red-700 hover:bg-red-50" 
                        onClick={() => updateStoryStatus(story.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryReviewAdmin;
