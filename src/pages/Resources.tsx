
import React from 'react';
import HeroSection from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';

const Resources = () => {
  return (
    <main className="flex-grow bg-white">
      <HeroSection />
      <ResourceTabs />
      <SelfCareSection />
    </main>
  );
};

export default Resources;
