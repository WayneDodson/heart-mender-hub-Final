import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HeartHandshake, Film, Lightbulb, Link } from 'lucide-react';
import ArticlesSection from './ArticlesSection';
import ExercisesSection from './ExercisesSection';
import BooksSection from './BooksSection';
import VideosSection from './VideosSection';
import ExternalResources from './ExternalResources';
import { articles, bookRecommendations } from '../../data/articles';
import CelebrityStories from '../stories/CelebrityStories';
import { useIsMobile } from '@/hooks/use-mobile';

const enhancedExercises = [
  {
    title: "Mindful Sun Salutation",
    description: "A gentle sequence of yoga poses that flow with your breath, designed to energize your body and calm your mind.",
    category: "yoga",
    duration: "15-20 minutes",
    benefits: [
      "Improves flexibility and strength",
      "Reduces anxiety and stress",
      "Enhances mind-body connection"
    ],
    steps: [
      "Start standing at the top of your mat, feet hip-width apart, hands in prayer position.",
      "Inhale, raise your arms up and arch backward slightly.",
      "Exhale, fold forward from the hips, bringing hands to the floor.",
      "Inhale, lift your chest halfway up, straightening your back.",
      "Exhale, step or jump back into plank position.",
      "Lower your body to the floor, keeping elbows close to sides.",
      "Inhale, press up into cobra pose, opening your chest.",
      "Exhale, lift hips into downward-facing dog position.",
      "Hold for five breaths, then step or jump feet to hands.",
      "Inhale, lift chest halfway up.",
      "Exhale, fold forward.",
      "Inhale, rise to standing and reach arms overhead.",
      "Exhale, return to prayer position at heart center."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800"
  },
  {
    title: "Tai Chi Walking Meditation",
    description: "A moving meditation practice focusing on slow, deliberate steps combined with mindful breathing to promote relaxation and balance.",
    category: "tai-chi",
    duration: "10-15 minutes",
    benefits: [
      "Improves balance and stability",
      "Reduces stress and anxiety",
      "Promotes mindfulness and presence",
      "Enhances circulation"
    ],
    steps: [
      "Stand with feet shoulder-width apart, knees slightly bent.",
      "Take a moment to ground yourself, feeling your weight distributed evenly through both feet.",
      "Begin to shift your weight to your right leg, keeping it slightly bent.",
      "Slowly lift your left foot, moving it forward with heel touching first.",
      "Gradually transfer weight to your left foot as it rolls from heel to toe.",
      "Shift your weight fully to the left foot.",
      "Repeat with the right foot, maintaining a slow, controlled pace.",
      "Coordinate your breathing with your steps - inhale as you lift, exhale as you place.",
      "Keep your posture upright, shoulders relaxed, and focus on the sensation of each movement.",
      "Continue this walking pattern for 5-10 minutes, maintaining awareness of each step."
    ],
    imageUrl: "/lovable-uploads/4abf69bf-3c0a-4d6b-ac1e-f50f3c842c94.png"
  },
  {
    title: "Heart-Centered Breathing",
    description: "A simple yet powerful meditation technique that focuses on breathing into the heart space to cultivate feelings of compassion and inner peace.",
    category: "meditation",
    duration: "5-10 minutes",
    benefits: [
      "Reduces stress and anxiety",
      "Promotes emotional healing",
      "Increases self-compassion",
      "Enhances mind-body connection"
    ],
    steps: [
      "Find a comfortable seated position with your spine straight but relaxed.",
      "Place your hands over your heart center, one on top of the other.",
      "Close your eyes and take a few normal breaths to settle in.",
      "Begin to deepen your breath, imagining that you're breathing directly into and out of your heart space.",
      "As you inhale, visualize healing light entering your heart.",
      "As you exhale, imagine releasing any tension or difficult emotions.",
      "With each breath, allow your heart to soften and open.",
      "Stay with this practice for 5-10 minutes, returning to heart-centered awareness whenever your mind wanders."
    ],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"
  },
  {
    title: "Emotional Release Journaling",
    description: "A structured writing exercise that helps identify, process, and release difficult emotions through reflective journaling.",
    category: "emotional-healing",
    duration: "15-20 minutes",
    benefits: [
      "Provides emotional clarity",
      "Reduces stress and anxiety",
      "Promotes self-awareness",
      "Supports emotional healing"
    ],
    steps: [
      "Find a quiet space where you won't be interrupted.",
      "Take a few deep breaths to center yourself.",
      "On a blank page, write about what you're feeling without censoring or judging yourself.",
      "Identify the emotion specifically (anger, sadness, fear, etc.) and where you feel it in your body.",
      "Explore what triggered this emotion and any patterns you notice.",
      "Write a dialogue with the emotion, asking what it needs or what it's trying to tell you.",
      "Conclude by writing about one small step you can take toward healing or addressing what you've uncovered.",
      "Close your journal and take a few moments to ground yourself before returning to your day."
    ],
    imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=800"
  },
  {
    title: "Nature Connection Practice",
    description: "A guided sensory experience that helps you reconnect with the natural world and your authentic self through mindful awareness.",
    category: "self-discovery",
    duration: "20-30 minutes",
    benefits: [
      "Reduces stress and anxiety",
      "Increases present-moment awareness",
      "Enhances connection to self and nature",
      "Promotes mental clarity"
    ],
    steps: [
      "Find a spot in nature - a park, garden, forest, or even by a single tree or plant.",
      "Sit or stand comfortably and begin by taking three deep breaths.",
      "Cycle through your senses, spending about 2 minutes focusing on each one:",
      "Notice 5 things you can see in detail (colors, shapes, movements).",
      "Listen for 4 distinct sounds (near and far, loud and subtle).",
      "Feel 3 sensations (the breeze, temperature, texture of what you're touching).",
      "Identify 2 scents in the air.",
      "Notice 1 taste (even if just the taste of the air).",
      "Reflect on how this connection to nature mirrors aspects of your inner self.",
      "Before leaving, express gratitude for this moment of connection."
    ],
    imageUrl: "/lovable-uploads/ca23902e-8155-4263-990e-2a1fc2b46e04.png"
  }
];

const ResourceTabs = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam && ['articles', 'exercises', 'books', 'videos', 'external', 'stories'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', value);
    
    navigate(`/resources?${searchParams.toString()}`, { replace: true });
  };
  
  return (
    <section className="py-4 md:py-16 px-2 md:px-4 bg-white" id="resource-tabs">
      <div className="container mx-auto max-w-5xl">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-2' : 'md:grid-cols-6'} mb-6 p-1 bg-gray-100/80`}>
            <TabsTrigger 
              value="articles" 
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <FileText className="h-4 w-4" /> 
              <span className="truncate">Articles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exercises"
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="truncate">Exercises</span>
            </TabsTrigger>
            <TabsTrigger 
              value="books"
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <BookOpen className="h-4 w-4" />
              <span className="truncate">Books</span>
            </TabsTrigger>
            <TabsTrigger 
              value="videos"
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <Film className="h-4 w-4" />
              <span className="truncate">Videos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="external"
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <Link className="h-4 w-4" />
              <span className="truncate">Resources</span>
            </TabsTrigger>
            <TabsTrigger 
              value="stories"
              className="flex items-center gap-1.5 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-sm md:text-base"
            >
              <HeartHandshake className="h-4 w-4" />
              <span className="truncate">Stories</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="px-2 md:px-0">
            <TabsContent value="articles" className="mt-4 md:mt-6">
              <ArticlesSection articles={articles} />
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-4 md:mt-6">
              <ExercisesSection exercises={enhancedExercises} />
            </TabsContent>
            
            <TabsContent value="books" className="mt-4 md:mt-6">
              <BooksSection books={bookRecommendations} />
            </TabsContent>
            
            <TabsContent value="videos" className="mt-4 md:mt-6">
              <VideosSection />
            </TabsContent>

            <TabsContent value="external" className="mt-4 md:mt-6">
              <ExternalResources />
            </TabsContent>
            
            <TabsContent value="stories" className="mt-4 md:mt-6">
              <div className="py-4">
                <CelebrityStories />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourceTabs;
