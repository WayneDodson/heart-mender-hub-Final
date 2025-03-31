
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Flower, Sun, Heart, Leaf, CircleDot } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Exercise {
  title: string;
  description: string;
  category: string;
  icon?: React.ReactNode;
  steps?: string[];
  duration?: string;
  benefits?: string[];
  imageUrl?: string;
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
        return <Flower />; 
      case 'tai-chi':
        return <CircleDot />;
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

  // Exercise illustration images 
  const getImageForExercise = (exercise: Exercise) => {
    // If exercise has a specific image URL, use that
    if (exercise.imageUrl) {
      return exercise.imageUrl;
    }
    
    // Otherwise, assign default images based on exercise category
    switch (exercise.category) {
      case 'yoga':
        return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800'; // Different yoga pose
      case 'tai-chi':
        return 'https://images.unsplash.com/photo-1620962178295-1865d3d8d9cb?q=80&w=800'; // Different tai chi pose
      case 'meditation':
        return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800'; // Person meditating
      case 'emotional-healing':
        return 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=800'; // Journal and pen
      case 'self-discovery':
        return 'https://images.unsplash.com/photo-1464853886823-5271d9b0b80a?q=80&w=800'; // Person in nature
      default:
        return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800'; // Default image
    }
  };

  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDialogOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-msblue-800">Healing Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <Card key={index} className="border border-msblue-100 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-msblue-600">
                  {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-msblue-500">
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
                className="w-full bg-msblue-500 hover:bg-msblue-600"
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
        <DialogContent className="sm:max-w-md max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedExercise && (
                <>
                  <span className="text-msblue-500">{getIconForCategory(selectedExercise.category || '')}</span>
                  {selectedExercise.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedExercise?.category && (
                <span className="text-sm font-medium text-msblue-600 block mb-2">
                  {selectedExercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {/* Exercise Illustration */}
              {selectedExercise && (
                <div className="flex justify-center mb-2">
                  <div className="rounded-lg overflow-hidden border border-msblue-100 w-64 h-64 flex items-center justify-center bg-msblue-50">
                    <img 
                      src={getImageForExercise(selectedExercise)}
                      alt={`${selectedExercise.title} illustration`}
                      className="max-w-full max-h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800'; // Fallback image
                      }}
                    />
                  </div>
                </div>
              )}
            
              <div>
                <p className="text-gray-700">{selectedExercise?.description}</p>
              </div>
              
              {selectedExercise?.duration && (
                <div>
                  <h4 className="font-medium text-msblue-700 mb-1">Duration</h4>
                  <p className="text-gray-600">{selectedExercise.duration}</p>
                </div>
              )}
              
              {selectedExercise?.benefits && selectedExercise.benefits.length > 0 && (
                <div>
                  <h4 className="font-medium text-msblue-700 mb-1">Benefits</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedExercise.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedExercise?.steps && selectedExercise.steps.length > 0 && (
                <div>
                  <h4 className="font-medium text-msblue-700 mb-2">Steps</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedExercise.steps.map((step, index) => (
                      <li key={index} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <DialogFooter className="mt-4">
            <Button className="bg-msblue-500 hover:bg-msblue-600 w-full" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisesSection;
