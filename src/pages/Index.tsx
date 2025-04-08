import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Heart className="h-10 w-10 text-msblue-500" />,
      title: "Emotional Support",
      description: "Tools and guidance to help you process your feelings and find inner peace after divorce.",
      link: "/resources?tab=exercises"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-msblue-500" />,
      title: "Healing Resources", 
      description: "Curated content, exercises, and insights to support your healing journey.",
      link: "/resources?tab=articles"
    },
    {
      icon: <Users className="h-10 w-10 text-msblue-500" />,
      title: "Community Stories",
      description: "Read real stories from others who have walked this path and found happiness again.",
      link: "/resources?tab=stories"
    },
    {
      icon: <Calendar className="h-10 w-10 text-msblue-500" />,
      title: "Future Events",
      description: "Weekly meetings and sessions with specialists to assist your recovery journey.",
      link: "/calendar"
    }
  ];

  const testimonials = [
    {
      content: "Heart Mender gave me the tools I needed to finally let go and start rebuilding my life. I'm forever grateful.",
      author: "Sarah, 34"
    },
    {
      content: "After my divorce, I felt completely lost. The resources here helped me find my way back to myself.",
      author: "Michael, 42"
    },
    {
      content: "Reading others' stories made me feel less alone. Now I know there's life after divorce, and it can be beautiful.",
      author: "Elena, 39"
    }
  ];

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-msblue-100 to-msblue-200 py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-2xl animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-msblue-900">
                Begin Your Healing Journey
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Find support, resources, and community to help you move forward after divorce and rediscover joy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/resources">
                  <Button className="bg-msblue-600 hover:bg-msblue-700 text-white font-medium px-6 py-3 rounded-full">
                    Explore Resources
                  </Button>
                </Link>
                <Link to="/stories">
                  <Button variant="outline" className="border-msblue-600 text-msblue-700 font-medium px-6 py-3 rounded-full">
                    Read Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-msblue-800">How We Support Your Healing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border border-msblue-100 shadow hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => handleCardClick(feature.link)}
                >
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4 bg-msblue-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-msblue-800">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-8">
                Heart Mender is dedicated to providing a supportive space for those navigating life after divorce. 
                We believe in the power of healing resources, shared stories, and community to help you transition 
                from pain to peace, and eventually to new possibilities.
              </p>
              <p className="text-lg text-gray-700">
                Our goal is to grow organically into a vibrant community with regular meetings and specialized guidance, 
                but always maintaining our core commitment: supporting you through every step of your healing journey.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-msblue-800">Stories of Healing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-msblue-50 p-6 rounded-lg border border-msblue-100">
                  <p className="text-gray-700 mb-4 italic">{testimonial.content}</p>
                  <p className="text-msblue-700 font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/stories">
                <Button className="bg-msblue-600 hover:bg-msblue-700 text-white font-medium px-6 py-3 rounded-full">
                  Read More Stories
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
