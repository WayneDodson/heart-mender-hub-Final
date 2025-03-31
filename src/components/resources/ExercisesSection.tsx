
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Lotus, Sun, Heart, Leaf, Circle } from 'lucide-react';

interface Exercise {
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
}

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection = ({ exercises }: ExercisesSectionProps) => {
  // Map category to icon
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'yoga':
        return <Lotus />;
      case 'tai-chi':
        return <Circle />;
      case 'meditation':
        return <Sun />;
      case 'emotional-healing':
        return <Heart />;
      case 'self-discovery':
        return <Leaf />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-healing-600">
                  {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-healing-500">
                  {getIconForCategory(exercise.category)}
                </div>
              </div>
              <CardTitle className="text-xl">{exercise.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="space-y-3">{exercise.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-healing-500 hover:bg-healing-600">Start Exercise</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600 leading-relaxed mb-4">New exercises are added regularly to support different aspects of your healing journey.</p>
      </div>
    </div>
  );
};

export default ExercisesSection;
