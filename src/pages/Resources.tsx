
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const Resources = () => {
  const location = useLocation();
  const tabsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      <HeroSection />
      <div id="resource-tabs" ref={tabsRef} className="scroll-mt-16">
        <ResourceTabs />
      </div>
      <SelfCareSection />
    </main>
  );
};

export default Resources;
