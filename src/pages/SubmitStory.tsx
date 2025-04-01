
import React from 'react';
import StorySubmissionForm from '../components/stories/StorySubmissionForm';

const SubmitStory = () => {
  return (
    <div className="py-12 px-4 bg-healing-50 flex-grow">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-healing-900">Share Your Journey</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your story has the power to inspire, comfort, and guide others who are facing similar challenges. 
            We invite you to share your experience with our community.
          </p>
        </div>
        
        <StorySubmissionForm />
      </div>
    </div>
  );
};

export default SubmitStory;
