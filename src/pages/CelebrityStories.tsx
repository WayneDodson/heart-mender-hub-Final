
import React from 'react';
import CelebrityStories from '../components/stories/CelebrityStories';

const CelebrityStoriesPage = () => {
  return (
    <main className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-healing-900">Celebrity Healing Journeys</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Famous personalities who have navigated breakups and divorces, sharing their experiences, 
            insights, and paths to healing and personal growth.
          </p>
        </div>
        
        <CelebrityStories />
      </div>
    </main>
  );
};

export default CelebrityStoriesPage;
