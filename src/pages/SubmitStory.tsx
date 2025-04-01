
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StorySubmissionForm from '../components/stories/StorySubmissionForm';

const SubmitStory = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-healing-50">
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
      </main>

      <Footer />
    </div>
  );
};

export default SubmitStory;
