
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Users } from 'lucide-react';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import CategoryChat from '@/components/community/CategoryChat';
import CreateCategoryForm from '@/components/community/CreateCategoryForm';
import CelebrityStories from '@/components/stories/CelebrityStories';

interface Category {
  id: string;
  name: string;
  description: string;
}

const Community = () => {
  const [agreedToGuidelines, setAgreedToGuidelines] = useState<boolean>(
    localStorage.getItem('agreedToCommunityGuidelines') === 'true'
  );
  
  // Using local storage to persist custom categories
  const savedCategories = localStorage.getItem('customCommunityCategories');
  const initialCustomCategories = savedCategories ? JSON.parse(savedCategories) : [];

  const defaultCategories: Category[] = [
    { id: 'emotional-support', name: 'Emotional Support', description: 'Share feelings and get support during difficult emotional times' },
    { id: 'co-parenting', name: 'Co-Parenting', description: 'Discuss strategies for effective co-parenting after divorce' },
    { id: 'legal-advice', name: 'Legal Questions', description: 'Ask questions about legal aspects of divorce and separation' },
    { id: 'moving-forward', name: 'Moving Forward', description: 'Share experiences about rebuilding life after divorce' },
    { id: 'self-care', name: 'Self-Care', description: 'Discuss self-care practices that helped during your healing journey' },
    { id: 'celebrity-journeys', name: 'Celebrity Journeys', description: 'Read about famous people who have navigated divorce and healing' }
  ];
  
  const [categories, setCategories] = useState<Category[]>([
    ...defaultCategories,
    ...initialCustomCategories
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  const onAgreeToGuidelines = () => {
    localStorage.setItem('agreedToCommunityGuidelines', 'true');
    setAgreedToGuidelines(true);
  };

  const handleAddCategory = (newCategory: Category) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    
    // Save custom categories to localStorage
    const customCategories = updatedCategories.filter(
      cat => !defaultCategories.some(defaultCat => defaultCat.id === cat.id)
    );
    localStorage.setItem('customCommunityCategories', JSON.stringify(customCategories));
    
    // Close dialog and set active category to the new one
    setIsCreateDialogOpen(false);
    setActiveCategory(newCategory.id);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-msblue-800 mb-6">Community Discussion</h1>
        
        {!agreedToGuidelines ? (
          <CommunityGuidelines onAgree={onAgreeToGuidelines} />
        ) : (
          <div className="space-y-8">
            <p className="text-gray-700 mb-6">
              Welcome to our supportive community. Choose a category below to join the conversation 
              and connect with others on similar healing journeys.
            </p>
            
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-msblue-700">Discussion Areas</h2>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)} 
                className="bg-msblue-600 hover:bg-msblue-700"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> New Area
              </Button>
            </div>
            
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-4">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="whitespace-nowrap px-4"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      
                      {category.id === 'celebrity-journeys' ? (
                        <CelebrityStories />
                      ) : (
                        <CategoryChat categoryId={category.id} categoryName={category.name} />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Discussion Area</DialogTitle>
                </DialogHeader>
                <CreateCategoryForm 
                  onCategoryCreated={handleAddCategory}
                  onCancel={() => setIsCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </main>
  );
};

export default Community;
