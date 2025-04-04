
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface CreateCategoryFormProps {
  onCategoryCreated: (newCategory: {id: string, name: string, description: string}) => void;
  onCancel: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onCategoryCreated, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and description for the new discussion area.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Generate a slugified ID from the name
      const id = name.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // In a real app with proper DB type definitions, we would use a proper table
      // For now, we'll simulate storing this and just pass it back to the parent
      const newCategory = {
        id,
        name,
        description
      };
      
      onCategoryCreated(newCategory);
      
      toast({
        title: "Success!",
        description: `The "${name}" discussion area has been created.`,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: "Error",
        description: "There was a problem creating the discussion area. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Discussion Area Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Healing Practices"
          maxLength={50}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe what this discussion area will focus on..."
          rows={3}
          maxLength={200}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-msblue-600 hover:bg-msblue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Discussion Area"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
