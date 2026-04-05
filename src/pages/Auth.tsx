
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Auth = () => {
  return (
    <div className="min-h-screen bg-healing-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Heart className="h-12 w-12 text-healing-600" />
        </div>
        <h1 className="text-3xl font-bold text-healing-900 mb-4">Welcome to Heart Mender</h1>
        <p className="text-gray-600 mb-8">
          You are already part of our community. Explore resources, stories, and connect with others on their healing journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-healing-600 hover:bg-healing-700">
            <Link to="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-healing-600 text-healing-600">
            <Link to="/stories">Read Stories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
