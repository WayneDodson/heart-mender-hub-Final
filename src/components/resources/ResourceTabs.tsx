
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HeartHandshake, Film, Lightbulb } from 'lucide-react';
import ArticlesSection from './ArticlesSection';
import ExercisesSection from './ExercisesSection';
import BooksSection from './BooksSection';
import VideosSection from './VideosSection';
import { articles, bookRecommendations } from '../../data/articles';

// Enhanced exercise data
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

const ResourceTabs = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-10">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Articles
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Exercises
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Books
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Film className="h-4 w-4" /> Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="mt-6">
            <ArticlesSection articles={articles} />
          </TabsContent>
          
          <TabsContent value="exercises" className="mt-6">
            <ExercisesSection exercises={enhancedExercises} />
          </TabsContent>
          
          <TabsContent value="books" className="mt-6">
            <BooksSection books={bookRecommendations} />
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <VideosSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourceTabs;
