
import React from 'react';
import { HeartHandshake } from 'lucide-react';

const VideosSection = () => {
  return (
    <div className="animate-fade-in py-4">
      <div className="text-center py-16">
        <HeartHandshake className="h-16 w-16 text-healing-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold mb-4 text-healing-800">Coming Soon</h2>
        <p className="text-lg leading-relaxed text-gray-600 max-w-lg mx-auto">
          We're currently curating a collection of helpful videos to support your healing journey. 
          Check back soon for guided meditations, expert interviews, and inspirational stories.
        </p>
      </div>
    </div>
  );
};

export default VideosSection;
