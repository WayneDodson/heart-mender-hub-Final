
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Shield, Users, BookOpen, ArrowRight } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Use useEffect for navigation to avoid React warnings about state updates during rendering
    if (user) {
      navigate('/resources');
    }
  }, [user, navigate]);

  // Resource information without links
  const resourceInfo = [
    {
      title: "Mindful Healing",
      description: "Meditation and mindfulness practices for emotional healing"
    },
    {
      title: "Psychology Today",
      description: "Expert advice on recovery after divorce"
    }
  ];

  // If user is logged in, we'll redirect in the useEffect
  // This prevents the UI flashing before redirect
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-msblue-50 to-msblue-100 flex flex-col justify-between">
      <div className="container mx-auto px-3 py-4 md:px-4 md:py-16 flex-grow flex flex-col">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 mt-8 md:mt-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-msblue-900 mb-4 md:mb-6">
            Your Journey to Healing Starts Here
          </h1>
          <p className="text-lg md:text-xl text-msblue-700 mb-6 md:mb-10 px-4">
            Join our supportive community and access valuable resources to help you navigate life after divorce.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-16 animate-fade-up">
          <Card className="border-msblue-200 shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="p-3 md:p-6">
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-msblue-600 mb-2 md:mb-4" />
              <CardTitle>Emotional Support</CardTitle>
              <CardDescription>
                Connect with others who understand your journey and find strength in shared experiences.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pb-6 md:p-6">
              <ul className="space-y-2 text-sm md:text-base">
                {resourceInfo.slice(0, 1).map((resource, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-700 font-medium">{resource.title}</span>
                    <span className="ml-2 text-gray-500">- {resource.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-msblue-200 shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="p-3 md:p-6">
              <Shield className="w-8 h-8 md:w-12 md:h-12 text-msblue-600 mb-2 md:mb-4" />
              <CardTitle>Trusted Resources</CardTitle>
              <CardDescription>
                Access curated content, expert advice, and practical tools for moving forward.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pb-6 md:p-6">
              <ul className="space-y-2 text-sm md:text-base">
                {resourceInfo.slice(1).map((resource, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-700 font-medium">{resource.title}</span>
                    <span className="ml-2 text-gray-500">- {resource.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 md:mb-16 animate-fade-up" style={{animationDelay: '0.3s'}}>
          <Card className="border-msblue-200 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <Users className="w-6 h-6 text-msblue-600 mb-2" />
              <CardTitle className="text-lg">Community</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-gray-600">Join discussions with people who understand what you're going through.</p>
            </CardContent>
          </Card>
          
          <Card className="border-msblue-200 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <BookOpen className="w-6 h-6 text-msblue-600 mb-2" />
              <CardTitle className="text-lg">Stories</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-gray-600">Read personal stories of healing and recovery from others.</p>
            </CardContent>
          </Card>
          
          <Card className="border-msblue-200 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <Heart className="w-6 h-6 text-msblue-600 mb-2" />
              <CardTitle className="text-lg">Self-Care</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-gray-600">Discover practices to support your emotional well-being.</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-md mx-auto mt-auto animate-fade-up" style={{animationDelay: '0.5s'}}>
          <Card className="border-msblue-200 shadow-md">
            <CardHeader className="px-3 py-3 md:p-6">
              <CardTitle className="text-center">Join Our Community</CardTitle>
              <CardDescription className="text-center">
                Sign in or create an account to access all resources
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-3 md:p-6">
              <GradientButton 
                onClick={() => navigate('/auth')}
                className="w-full flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
            </CardContent>
            <CardFooter className="px-3 pb-4 pt-0 md:px-6 text-center">
              <p className="text-xs text-gray-500 w-full">
                Your journey to healing begins with a single step
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
