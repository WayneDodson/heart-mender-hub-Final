
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Shield, ExternalLink } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (user) {
    navigate('/resources');
    return null;
  }

  // Resource links without images
  const resourceLinks = [
    {
      title: "Mindful Healing",
      description: "Meditation and mindfulness practices for emotional healing",
      url: "https://www.mindful.org/healing-through-mindfulness/"
    },
    {
      title: "Psychology Today",
      description: "Expert advice on recovery after divorce",
      url: "https://www.psychologytoday.com/us/basics/divorce"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-msblue-50 to-msblue-100">
      <div className="container mx-auto px-3 py-4 md:px-4 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-bold text-msblue-900 mb-3 md:mb-4">
            Your Journey to Healing Starts Here
          </h1>
          <p className="text-base md:text-xl text-msblue-700 mb-4 md:mb-8 px-2">
            Join our supportive community and access valuable resources to help you navigate life after divorce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto mb-6 md:mb-12">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="w-full h-full">
                <Card className="border-msblue-200 shadow-md hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                  <CardHeader className="p-3 md:p-6">
                    <Heart className="w-8 h-8 md:w-12 md:h-12 text-msblue-600 mb-1 md:mb-4" />
                    <CardTitle>Emotional Support</CardTitle>
                    <CardDescription>
                      Connect with others who understand your journey and find strength in shared experiences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pb-6 md:p-6">
                    <ul className="space-y-2 text-sm md:text-base">
                      {resourceLinks.slice(0, 1).map((resource, index) => (
                        <li key={index} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-healing-600" />
                          <a 
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-healing-600 hover:text-healing-800 hover:underline transition-colors"
                          >
                            {resource.title}
                          </a>
                          <span className="ml-2 text-gray-500">- {resource.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Emotional Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with others who understand your journey and find strength in shared experiences.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base">
                    {resourceLinks.slice(0, 1).map((resource, index) => (
                      <li key={index}>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="w-full h-full">
                <Card className="border-msblue-200 shadow-md hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                  <CardHeader className="p-3 md:p-6">
                    <Shield className="w-8 h-8 md:w-12 md:h-12 text-msblue-600 mb-1 md:mb-4" />
                    <CardTitle>Trusted Resources</CardTitle>
                    <CardDescription>
                      Access curated content, expert advice, and practical tools for moving forward.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pb-6 md:p-6">
                    <ul className="space-y-2 text-sm md:text-base">
                      {resourceLinks.slice(1).map((resource, index) => (
                        <li key={index} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-healing-600" />
                          <a 
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-healing-600 hover:text-healing-800 hover:underline transition-colors"
                          >
                            {resource.title}
                          </a>
                          <span className="ml-2 text-gray-500">- {resource.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Trusted Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access curated content, expert advice, and practical tools for moving forward.
                  </p>
                  <ul className="space-y-2 text-sm md:text-base">
                    {resourceLinks.slice(1).map((resource, index) => (
                      <li key={index}>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        </div>

        <Card className="max-w-md mx-auto border-msblue-200 shadow-md">
          <CardHeader className="px-3 py-3 md:p-6">
            <CardTitle className="text-center">Join Our Community</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to access all resources
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-3 md:p-6">
            <GradientButton 
              onClick={() => navigate('/auth')}
              className="w-full"
            >
              Get Started
            </GradientButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
