
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Loader2, PenLine } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StoryList from '../components/stories/StoryList';
import { useStories } from '../hooks/useStories';

const Stories = () => {
  const { approvedStories, isLoading } = useStories();
  const navigate = useNavigate();
  
  const handleReadMore = (id: string) => {
    navigate(`/story/${id}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-healing-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-healing-900">Community Stories</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Real stories from people who have walked the path of divorce and healing. 
              Find inspiration, understanding, and hope in these shared experiences.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-healing-600 hover:bg-healing-700">
                <Link to="/submit-story" className="flex items-center">
                  <PenLine className="mr-2 h-4 w-4" />
                  Share Your Story
                </Link>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-healing-600" />
            </div>
          ) : (
            <StoryList stories={approvedStories} onReadMore={handleReadMore} />
          )}
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
