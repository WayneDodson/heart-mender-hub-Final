
import React, { useRef } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Lightbulb, BookOpen, Film, Link, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Functions to scroll the tabs list horizontally on mobile
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = 150;
      const currentScroll = tabsListRef.current.scrollLeft;
      tabsListRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  if (isMobile) {
    return (
      <div className="flex items-center justify-between mb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0" 
          onClick={() => scrollTabs('left')}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div 
          ref={tabsListRef}
          className="overflow-x-auto no-scrollbar flex-grow"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          <TabsList className="w-max flex bg-gray-100/80 rounded-lg">
            <TabsTrigger 
              value="articles" 
              className="flex items-center gap-1 py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm"
              onClick={() => onTabChange('articles')}
              aria-selected={activeTab === 'articles'}
            >
              <FileText className="h-3.5 w-3.5" /> 
              <span className="truncate">Articles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exercises"
              className="flex items-center gap-1 py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm"
              onClick={() => onTabChange('exercises')}
              aria-selected={activeTab === 'exercises'}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span className="truncate">Exercises</span>
            </TabsTrigger>
            <TabsTrigger 
              value="books"
              className="flex items-center gap-1 py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm"
              onClick={() => onTabChange('books')}
              aria-selected={activeTab === 'books'}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="truncate">Books</span>
            </TabsTrigger>
            <TabsTrigger 
              value="videos"
              className="flex items-center gap-1 py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm"
              onClick={() => onTabChange('videos')}
              aria-selected={activeTab === 'videos'}
            >
              <Film className="h-3.5 w-3.5" />
              <span className="truncate">Videos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="external"
              className="flex items-center gap-1 py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm"
              onClick={() => onTabChange('external')}
              aria-selected={activeTab === 'external'}
            >
              <Link className="h-3.5 w-3.5" />
              <span className="truncate">Resources</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0" 
          onClick={() => scrollTabs('right')}
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <TabsList className="w-full grid md:grid-cols-5 bg-gray-100/80 rounded-none">
      <TabsTrigger 
        value="articles" 
        className="w-full flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
        onClick={() => onTabChange('articles')}
        aria-selected={activeTab === 'articles'}
      >
        <FileText className="h-4 w-4" /> 
        <span className="truncate">Articles</span>
      </TabsTrigger>
      <TabsTrigger 
        value="exercises"
        className="w-full flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
        onClick={() => onTabChange('exercises')}
        aria-selected={activeTab === 'exercises'}
      >
        <Lightbulb className="h-4 w-4" />
        <span className="truncate">Exercises</span>
      </TabsTrigger>
      <TabsTrigger 
        value="books"
        className="w-full flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
        onClick={() => onTabChange('books')}
        aria-selected={activeTab === 'books'}
      >
        <BookOpen className="h-4 w-4" />
        <span className="truncate">Books</span>
      </TabsTrigger>
      <TabsTrigger 
        value="videos"
        className="w-full flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
        onClick={() => onTabChange('videos')}
        aria-selected={activeTab === 'videos'}
      >
        <Film className="h-4 w-4" />
        <span className="truncate">Videos</span>
      </TabsTrigger>
      <TabsTrigger 
        value="external"
        className="w-full flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
        onClick={() => onTabChange('external')}
        aria-selected={activeTab === 'external'}
      >
        <Link className="h-4 w-4" />
        <span className="truncate">Resources</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabHeader;
