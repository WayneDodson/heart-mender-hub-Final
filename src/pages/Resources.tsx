
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ResourceTabs />
        <SelfCareSection />
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
