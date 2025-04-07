
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';

const Resources = () => {
  const location = useLocation();

  useEffect(() => {
    // If we have a tab query parameter, scroll to the tabs section
    if (location.search.includes('tab=')) {
      const tabsSection = document.getElementById('resource-tabs');
      if (tabsSection) {
        // Add a small delay to ensure the DOM is fully rendered
        setTimeout(() => {
          tabsSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.search]);

  return (
    <main className="flex-grow bg-white">
      <HeroSection />
      <ResourceTabs />
      <SelfCareSection />
    </main>
  );
};

export default Resources;
