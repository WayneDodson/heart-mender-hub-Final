import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Shield } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (user) {
    navigate('/resources');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-healing-50 to-healing-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-healing-900 mb-4">
            Your Journey to Healing Starts Here
          </h1>
          <p className="text-xl text-healing-700 mb-8">
            Join our supportive community and access valuable resources to help you navigate life after divorce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="border-healing-200">
            <CardHeader>
              <Heart className="w-12 h-12 text-healing-600 mb-4" />
              <CardTitle>Emotional Support</CardTitle>
              <CardDescription>
                Connect with others who understand your journey and find strength in shared experiences.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-healing-200">
            <CardHeader>
              <Shield className="w-12 h-12 text-healing-600 mb-4" />
              <CardTitle>Trusted Resources</CardTitle>
              <CardDescription>
                Access curated content, expert advice, and practical tools for moving forward.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-md mx-auto border-healing-200">
          <CardHeader>
            <CardTitle className="text-center">Join Our Community</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to access all resources
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
