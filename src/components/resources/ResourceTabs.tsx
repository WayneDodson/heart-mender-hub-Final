
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ArticlesSection from './ArticlesSection';
import ExercisesSection from './ExercisesSection';
import BooksSection from './BooksSection';
import VideosSection from './VideosSection';
import ExternalResources from './ExternalResources';
import { articles, bookRecommendations } from '../../data/articles';
import TabHeader from './TabHeader';

// Exercise data moved to a separate file to reduce component size
import { enhancedExercises } from '../../data/exercises';

const ResourceTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam && ['articles', 'exercises', 'books', 'videos', 'external'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', value);
    
    navigate(`/resources?${searchParams.toString()}`, { replace: true });
  };
  
  return (
    <section 
      id="resource-tabs" 
      className="min-h-screen w-full bg-[#FAF3E0] py-6 md:py-12" 
      aria-label="Resource Categories"
    >
      <div className="w-full px-3 md:px-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabHeader activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="w-full bg-[#FAF3E0]">
            <TabsContent value="articles" className="mt-2 md:mt-4 px-2 md:px-4 w-full">
              <ArticlesSection articles={articles} />
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-2 md:mt-4 px-2 md:px-4 w-full">
              <ExercisesSection exercises={enhancedExercises} />
            </TabsContent>
            
            <TabsContent value="books" className="mt-2 md:mt-4 px-2 md:px-4 w-full">
              <BooksSection books={bookRecommendations} />
            </TabsContent>
            
            <TabsContent value="videos" className="mt-2 md:mt-4 px-2 md:px-4 w-full">
              <VideosSection />
            </TabsContent>

            <TabsContent value="external" className="mt-2 md:mt-4 px-2 md:px-4 w-full">
              <ExternalResources />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourceTabs;
