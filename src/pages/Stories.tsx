
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type ApprovedStory = {
  id: string;
  title: string;
  author_name: string;
  author_age?: string;
  category: string;
  content: string;
  created_at: string;
  preview: string;
};

const Stories = () => {
  const { toast } = useToast();
  const [approvedStories, setApprovedStories] = useState<ApprovedStory[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchApprovedStories();
  }, []);

  const fetchApprovedStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const storiesWithPreviews = data?.map(story => ({
        ...story,
        preview: story.content.substring(0, 120) + '...',
      })) || [];
      
      setApprovedStories(storiesWithPreviews);
    } catch (error) {
      console.error('Error fetching approved stories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load community stories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Original hardcoded featured stories
  const featuredStories = [
    {
      title: "Finding Myself Again",
      author: "Jennifer, 38",
      preview: "After 12 years of marriage, I found myself alone and unsure of who I was outside of being a wife. My journey to rediscovery taught me...",
      content: "After 12 years of marriage, I found myself alone and unsure of who I was outside of being a wife. My journey to rediscovery taught me that I had been suppressing many of my own interests and passions. Through therapy and connecting with old friends, I slowly began painting again – something I had loved before marriage but had given up. Each brushstroke felt like reclaiming a piece of myself. Today, three years later, I have my own small gallery showing and have found joy in being alone but not lonely. The most important relationship you'll ever have is with yourself, and I'm so glad I took the time to rebuild it.",
      date: "June 15, 2023",
      likes: 47,
      comments: 12,
      category: "self-discovery"
    },
    {
      title: "Co-Parenting Success After a Bitter Divorce",
      author: "Michael, 42",
      preview: "When my ex-wife and I first separated, we could barely speak without arguing. With two young children caught in the middle...",
      content: "When my ex-wife and I first separated, we could barely speak without arguing. With two young children caught in the middle, we knew we had to do better, but the hurt was still too raw. We started using a co-parenting app to communicate, which helped remove the emotional triggers of direct contact. Over time, we established clear boundaries and focused solely on the kids during our interactions. It took almost two years, but we now have a respectful relationship and even attend our children's events together. The key was putting our egos aside and remembering that our children's wellbeing was more important than our past grievances. If we could do it after such bitterness, I believe anyone can.",
      date: "March 28, 2023",
      likes: 89,
      comments: 24,
      category: "parenting"
    },
    {
      title: "When the Heart Heals: Dating After Divorce",
      author: "Elena, 39",
      preview: "The first time I went on a date after my divorce, I had a panic attack in the restaurant bathroom. I wasn't ready, but I thought I should be...",
      content: "The first time I went on a date after my divorce, I had a panic attack in the restaurant bathroom. I wasn't ready, but I thought I should be because it had been a year. I took another six months just focusing on myself before trying again. The second time around, I approached dating with no expectations – just as a way to meet new people and have interesting conversations. This mindset shift made all the difference. I've now been with my new partner for two years, and our relationship is healthier than anything I've experienced before. My divorce taught me what I need in a relationship and, more importantly, what I won't tolerate. Trust your timeline – healing can't be rushed.",
      date: "September 10, 2022",
      likes: 103,
      comments: 31,
      category: "relationships"
    }
  ];

  const communityStories = [
    {
      title: "Learning to Trust Again",
      author: "David, 45",
      preview: "After discovering my ex's affair, I thought I would never trust anyone again...",
      date: "April 12, 2023",
      category: "relationships"
    },
    {
      title: "Solo Parenting: Finding Strength I Didn't Know I Had",
      author: "Tanya, 36",
      preview: "Becoming a single mom to three kids overnight was terrifying, but I've discovered...",
      date: "May 3, 2023",
      category: "parenting"
    },
    {
      title: "Financial Independence Post-Divorce",
      author: "Robert, 41",
      preview: "After 15 years of joint finances, managing money alone was a steep learning curve...",
      date: "February 19, 2023",
      category: "practical-advice"
    },
    {
      title: "The Unexpected Joy of Starting Over",
      author: "Grace, 52",
      preview: "Divorce at 50 felt like the end of everything, but it actually became the beginning...",
      date: "July 22, 2023",
      category: "self-discovery"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healing-100 py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-healing-900">Community Stories</h1>
            <p className="text-lg text-gray-700">
              Real experiences from people who have walked the path of healing after divorce and found their way forward.
            </p>
          </div>
        </section>
        
        {/* Featured Stories */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-healing-800">Featured Stories</h2>
            
            <Tabs defaultValue="story-1" className="mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story-1">Jennifer's Story</TabsTrigger>
                <TabsTrigger value="story-2">Michael's Story</TabsTrigger>
                <TabsTrigger value="story-3">Elena's Story</TabsTrigger>
              </TabsList>
              
              {featuredStories.map((story, index) => (
                <TabsContent key={index} value={`story-${index + 1}`} className="animate-fade-in">
                  <Card className="border-healing-100">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-healing-600 mb-1">
                            {story.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </div>
                          <CardTitle className="text-2xl">{story.title}</CardTitle>
                          <CardDescription className="mt-1">By {story.author} • {story.date}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none text-gray-700">
                        <p className="whitespace-pre-line">{story.content}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-1 text-healing-600">
                          <Heart className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <MessageCircle className="h-4 w-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Community Stories */}
        <section className="py-12 px-4 bg-healing-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-healing-800">More from Our Community</h2>
            
            {loading ? (
              <div className="text-center py-8">Loading community stories...</div>
            ) : approvedStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approvedStories.map((story) => (
                  <Card key={story.id} className="border border-healing-100 hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="text-sm font-medium text-healing-600 mb-1">
                        {story.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                      <CardTitle className="text-xl">{story.title}</CardTitle>
                      <CardDescription className="mt-1">By {story.author_name}{story.author_age ? `, ${story.author_age}` : ''} • {formatDate(story.created_at)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{story.preview}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="text-healing-600 hover:text-healing-700 hover:bg-healing-50">Read Full Story</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No community stories have been published yet.</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-healing-800">Your Story Matters</h3>
              <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                Sharing your experience can help others who are walking a similar path. 
                Your journey might be exactly what someone else needs to hear right now.
              </p>
              <Link to="/submit-story">
                <Button className="bg-healing-600 hover:bg-healing-700 text-white font-medium px-6 py-3 rounded-full">
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
