
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import CategoryChat from '@/components/community/CategoryChat';

const Community = () => {
  const [agreedToGuidelines, setAgreedToGuidelines] = useState<boolean>(
    localStorage.getItem('agreedToCommunityGuidelines') === 'true'
  );
  
  const categories = [
    { id: 'emotional-support', name: 'Emotional Support', description: 'Share feelings and get support during difficult emotional times' },
    { id: 'co-parenting', name: 'Co-Parenting', description: 'Discuss strategies for effective co-parenting after divorce' },
    { id: 'legal-advice', name: 'Legal Questions', description: 'Ask questions about legal aspects of divorce and separation' },
    { id: 'moving-forward', name: 'Moving Forward', description: 'Share experiences about rebuilding life after divorce' },
    { id: 'self-care', name: 'Self-Care', description: 'Discuss self-care practices that helped during your healing journey' }
  ];

  const onAgreeToGuidelines = () => {
    localStorage.setItem('agreedToCommunityGuidelines', 'true');
    setAgreedToGuidelines(true);
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
            
            <Tabs defaultValue={categories[0].id} className="w-full">
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
                      <CategoryChat categoryId={category.id} categoryName={category.name} />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </main>
  );
};

export default Community;
