
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Exercise {
  title: string;
  description: string;
  category: string;
}

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection = ({ exercises }: ExercisesSectionProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="text-sm font-medium text-healing-600 mb-1">
                {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
              <CardTitle className="text-xl">{exercise.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{exercise.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-healing-500 hover:bg-healing-600">Start Exercise</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">New exercises are added regularly to support different aspects of your healing journey.</p>
      </div>
    </div>
  );
};

export default ExercisesSection;
