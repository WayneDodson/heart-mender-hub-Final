import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';
import DisclaimerBanner from '../components/resources/DisclaimerBanner';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const Resources = () => {
  const location = useLocation();
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Define the data needed for HeroSection props
  const resourcesCategory = {
    id: "main",
    name: "Resources",
    description: "Explore our curated resources to help you in your healing journey.",
    url: "/resources"
  };
  
  const featuredResource = {
    title: "Healing Trauma Guide",
    description: "A comprehensive guide for understanding and healing from trauma.",
    url: "#healing-trauma-guide"
  };
  
  const resourceCategories = [
    {
      id: "articles",
      name: "Articles",
      description: "Informative articles on healing and recovery.",
      url: "/resources?tab=articles"
    },
    {
      id: "videos",
      name: "Videos",
      description: "Educational videos and workshops.",
      url: "/resources?tab=videos"
    },
    {
      id: "books",
      name: "Books",
      description: "Recommended readings for your journey.",
      url: "/resources?tab=books"
    }
  ];

  useEffect(() => {
    // If we have a tab query parameter, scroll to the tabs section
    if (location.search.includes('tab=')) {
      const tabsSection = document.getElementById('resource-tabs');
      if (tabsSection) {
        // Add a small delay to ensure the DOM is fully rendered
        setTimeout(() => {
          tabsSection.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Increased timeout for better compatibility
      }
    }
  }, [location.search]);

  // Show a welcome toast on first load for mobile users
  useEffect(() => {
    if (isMobile) {
      const hasSeenResourceToast = localStorage.getItem('seen-resource-toast');
      if (!hasSeenResourceToast) {
        toast({
          title: "Swipe through resources",
          description: "Swipe left and right to navigate between different resource categories",
          duration: 4000,
        });
        localStorage.setItem('seen-resource-toast', 'true');
      }
    }
  }, [isMobile]);

  return (
    <main className="flex-grow bg-white">
      <HeroSection 
        category={resourcesCategory}
        featuredResource={featuredResource}
        resourceCategories={resourceCategories}
      />
      <DisclaimerBanner className="mx-4 md:mx-8 my-6" />
      <div id="resource-tabs" ref={tabsRef} className="scroll-mt-16">
        <ResourceTabs />
      </div>
      <SelfCareSection />
    </main>
  );
};

export default Resources;
