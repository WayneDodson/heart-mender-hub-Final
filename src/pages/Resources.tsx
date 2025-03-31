
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HeartHandshake, Film, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const articles = [
    {
      title: "The 5 Stages of Grief After Divorce",
      description: "Understanding the emotional journey and how to move through each stage.",
      category: "emotional-healing",
      readTime: "8 min read"
    },
    {
      title: "Rediscovering Your Identity After Divorce",
      description: "Practical steps to reconnect with yourself and build a new life.",
      category: "self-discovery",
      readTime: "10 min read"
    },
    {
      title: "Co-Parenting After Separation: A Guide",
      description: "How to maintain healthy relationships for your children's wellbeing.",
      category: "relationships",
      readTime: "12 min read"
    },
    {
      title: "Financial Recovery Post-Divorce",
      description: "Rebuilding your financial foundation and planning for your future.",
      category: "practical-advice",
      readTime: "9 min read"
    },
    {
      title: "Healing Rituals for Moving On",
      description: "Symbolic practices that can help you process grief and find closure.",
      category: "emotional-healing",
      readTime: "7 min read"
    },
    {
      title: "When to Start Dating Again",
      description: "Signs you're ready to open your heart and what to expect.",
      category: "relationships",
      readTime: "11 min read"
    }
  ];
  
  const exercises = [
    {
      title: "Gratitude Journal",
      description: "Daily prompts to help you focus on the positive aspects of your new life.",
      category: "emotional-healing"
    },
    {
      title: "Letter to Your Former Self",
      description: "A writing exercise to acknowledge your growth and provide self-compassion.",
      category: "self-discovery"
    },
    {
      title: "Boundary Setting Workshop",
      description: "Interactive guide to establishing healthy boundaries in your relationships.",
      category: "relationships"
    },
    {
      title: "Future Visualization",
      description: "Guided meditation to help you envision and create your desired future.",
      category: "emotional-healing"
    },
    {
      title: "Values Reassessment",
      description: "Exercise to identify what truly matters to you now and align your life accordingly.",
      category: "self-discovery"
    }
  ];

  const bookRecommendations = [
    {
      title: "Conscious Uncoupling",
      author: "Katherine Woodward Thomas",
      description: "5 steps to living happily even after divorce."
    },
    {
      title: "Rebuilding When Your Relationship Ends",
      author: "Bruce Fisher & Robert Alberti",
      description: "A comprehensive guide to the emotional aspects of divorce recovery."
    },
    {
      title: "The Journey from Abandonment to Healing",
      author: "Susan Anderson",
      description: "Turn the end of a relationship into the beginning of your journey to self-discovery."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healing-100 py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-healing-900">Healing Resources</h1>
            <p className="text-lg text-gray-700">
              Discover tools, articles, exercises, and recommendations to support your healing journey after divorce.
            </p>
          </div>
        </section>
        
        {/* Resources Tabs */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Articles
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Exercises
                </TabsTrigger>
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Books
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Film className="h-4 w-4" /> Videos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Helpful Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow h-full">
                      <CardHeader>
                        <div className="text-sm font-medium text-healing-600 mb-1">
                          {article.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{article.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">{article.readTime}</div>
                        <Button variant="ghost" className="text-healing-600 hover:text-healing-700 hover:bg-healing-50">Read More</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="exercises" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Exercises</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises.map((exercise, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="text-sm font-medium text-healing-600 mb-1">
                          {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <CardTitle className="text-xl">{exercise.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-healing-500 hover:bg-healing-600">Start Exercise</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">New exercises are added regularly to support different aspects of your healing journey.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="books" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Recommended Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bookRecommendations.map((book, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{book.title}</CardTitle>
                        <div className="text-sm font-medium text-healing-600">by {book.author}</div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{book.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Find Book</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600">These books have helped many people navigate the emotional challenges of divorce and find healing.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="animate-fade-in">
                <div className="text-center py-12">
                  <HeartHandshake className="h-16 w-16 text-healing-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-healing-800">Coming Soon</h2>
                  <p className="text-gray-600 max-w-lg mx-auto">
                    We're currently curating a collection of helpful videos to support your healing journey. 
                    Check back soon for guided meditations, expert interviews, and inspirational stories.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Self-Care Section */}
        <section className="py-12 px-4 bg-healing-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-healing-800">Daily Self-Care Reminder</h2>
              <p className="text-lg text-gray-700 mb-8">
                Remember that healing is not linear. Some days will be harder than others, 
                and that's okay. Be patient and gentle with yourself as you move through this process.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-healing-100">
                <h3 className="text-xl font-semibold mb-4 text-healing-700">Today's Affirmation</h3>
                <p className="text-xl italic text-gray-700">
                  "I am healing more each day. My worth is not defined by my past relationship, 
                  but by the love and care I give myself now."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
