
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HeartHandshake, Film, Lightbulb } from 'lucide-react';
import ArticlesSection from './ArticlesSection';
import ExercisesSection from './ExercisesSection';
import BooksSection from './BooksSection';
import VideosSection from './VideosSection';
import { articles, exercises, bookRecommendations } from '../../data/articles';

const ResourceTabs = () => {
  return (
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
          
          <TabsContent value="articles">
            <ArticlesSection articles={articles} />
          </TabsContent>
          
          <TabsContent value="exercises">
            <ExercisesSection exercises={exercises} />
          </TabsContent>
          
          <TabsContent value="books">
            <BooksSection books={bookRecommendations} />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideosSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourceTabs;
