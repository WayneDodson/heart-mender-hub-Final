
import React from 'react';
import HeroSection from '../components/resources/HeroSection';
import ResourceTabs from '../components/resources/ResourceTabs';
import SelfCareSection from '../components/resources/SelfCareSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white">
        <HeroSection />
        <ResourceTabs />
        <SelfCareSection />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
