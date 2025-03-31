
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Flower, Sun, Heart, Leaf, CircleDot } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Exercise {
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
  steps?: string[];
  duration?: string;
  benefits?: string[];
}

interface ExercisesSectionProps {
  exercises: Exercise[];
}

const ExercisesSection = ({ exercises }: ExercisesSectionProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Map category to icon
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'yoga':
        return <Flower />; // Using Flower instead of Lotus
      case 'tai-chi':
        return <CircleDot />; // Using CircleDot instead of Circle
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

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDialogOpen(true);
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
              <Button 
                className="w-full bg-healing-500 hover:bg-healing-600"
                onClick={() => handleStartExercise(exercise)}
              >
                Start Exercise
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600 leading-relaxed mb-4">New exercises are added regularly to support different aspects of your healing journey.</p>
      </div>

      {/* Exercise Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedExercise && (
                <>
                  <span className="text-healing-500">{getIconForCategory(selectedExercise.category || '')}</span>
                  {selectedExercise.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedExercise?.category && (
                <span className="text-sm font-medium text-healing-600 block mb-2">
                  {selectedExercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-700">{selectedExercise?.description}</p>
            </div>
            
            {selectedExercise?.duration && (
              <div>
                <h4 className="font-medium text-healing-700 mb-1">Duration</h4>
                <p className="text-gray-600">{selectedExercise.duration}</p>
              </div>
            )}
            
            {selectedExercise?.benefits && selectedExercise.benefits.length > 0 && (
              <div>
                <h4 className="font-medium text-healing-700 mb-1">Benefits</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedExercise.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedExercise?.steps && selectedExercise.steps.length > 0 && (
              <div>
                <h4 className="font-medium text-healing-700 mb-2">Steps</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {selectedExercise.steps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button className="bg-healing-500 hover:bg-healing-600 w-full" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisesSection;
