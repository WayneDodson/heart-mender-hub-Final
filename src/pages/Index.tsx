
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Shield, Users, BookOpen, ArrowRight } from 'lucide-react';
import { StarBorder } from '@/components/ui/star-border';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
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

  // We'll keep the content visible regardless of user state
  // to ensure the preview always works

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF3E0] to-[#F7F0DD] flex flex-col justify-between">
      <div className="container mx-auto px-3 py-4 md:px-4 md:py-16 flex-grow flex flex-col">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 mt-8 md:mt-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-[#6A5ACD] mb-4 md:mb-6">
            Your Journey to Healing Starts Here
          </h1>
          <p className="text-lg md:text-xl text-[#333333] mb-6 md:mb-10 px-4">
            Join our supportive community and access valuable resources to help you navigate life after divorce.
          </p>
          <StarBorder 
            as="div" 
            color="#6A5ACD" 
            className="inline-block hover:scale-105 transition-transform duration-300"
          >
            <Button 
              onClick={() => navigate('/auth')}
              variant="ghost"
              className="w-full font-medium text-lg flex items-center justify-center gap-2 text-[#333333]"
            >
              Begin Your Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </StarBorder>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-16 animate-fade-up">
          <Card className="border-[#6A5ACD]/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="p-3 md:p-6">
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-[#FF6F61] mb-2 md:mb-4" />
              <CardTitle>Emotional Support</CardTitle>
              <CardDescription>
                Connect with others who understand your journey and find strength in shared experiences.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pb-6 md:p-6">
              <ul className="space-y-2 text-sm md:text-base">
                {resourceInfo.slice(0, 1).map((resource, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#333333] font-medium">{resource.title}</span>
                    <span className="ml-2 text-gray-500">- {resource.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#6A5ACD]/20 shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="p-3 md:p-6">
              <Shield className="w-8 h-8 md:w-12 md:h-12 text-[#8FBC8F] mb-2 md:mb-4" />
              <CardTitle>Trusted Resources</CardTitle>
              <CardDescription>
                Access curated content, expert advice, and practical tools for moving forward.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pb-6 md:p-6">
              <ul className="space-y-2 text-sm md:text-base">
                {resourceInfo.slice(1).map((resource, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#333333] font-medium">{resource.title}</span>
                    <span className="ml-2 text-gray-500">- {resource.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 md:mb-16 animate-fade-up" style={{animationDelay: '0.3s'}}>
          <Card className="border-[#6A5ACD]/20 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <Users className="w-6 h-6 text-[#008080] mb-2" />
              <CardTitle className="text-lg">Community</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-[#333333]">Join discussions with people who understand what you're going through.</p>
            </CardContent>
          </Card>
          
          <Card className="border-[#6A5ACD]/20 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <BookOpen className="w-6 h-6 text-[#008080] mb-2" />
              <CardTitle className="text-lg">Stories</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-[#333333]">Read personal stories of healing and recovery from others.</p>
            </CardContent>
          </Card>
          
          <Card className="border-[#6A5ACD]/20 shadow-md">
            <CardHeader className="p-3 md:p-6">
              <Heart className="w-6 h-6 text-[#FF6F61] mb-2" />
              <CardTitle className="text-lg">Self-Care</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <p className="text-sm text-[#333333]">Discover practices to support your emotional well-being.</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-md mx-auto mt-auto animate-fade-up" style={{animationDelay: '0.5s'}}>
          <Card className="border-[#6A5ACD]/20 shadow-md">
            <CardHeader className="px-3 py-3 md:p-6">
              <CardTitle className="text-center">Join Our Community</CardTitle>
              <CardDescription className="text-center">
                Sign in or create an account to access all resources
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-3 md:p-6">
              <StarBorder 
                as="div" 
                color="#6A5ACD" 
                speed="5s"
                className="w-full"
              >
                <Button
                  onClick={() => navigate('/auth?tab=signup')}
                  variant="ghost"
                  className="w-full flex items-center justify-center text-[#333333]"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </StarBorder>
              <Button
                onClick={() => navigate('/auth?tab=signin')}
                variant="outline"
                className="w-full border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
              >
                Sign In
              </Button>
            </CardContent>
            <CardFooter className="px-3 pb-4 pt-0 md:px-6 text-center">
              <p className="text-xs text-[#333333] w-full">
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
