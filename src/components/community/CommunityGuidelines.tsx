
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CommunityGuidelinesProps {
  onAgree: () => void;
}

const CommunityGuidelines: React.FC<CommunityGuidelinesProps> = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const guidelines = [
    "Be respectful and kind to other community members.",
    "Maintain confidentiality - what's shared here stays here.",
    "Avoid giving specific legal or medical advice.",
    "Focus on support rather than criticism.",
    "No hate speech, harassment, or bullying.",
    "Respect diverse perspectives and experiences.",
    "Report any concerning content to moderators.",
    "Share your own experience rather than telling others what to do.",
    "Be mindful that people are at different stages in their healing journey."
  ];

  return (
    <Card className="border border-msblue-100">
      <CardHeader className="bg-msblue-50 border-b border-msblue-100">
        <CardTitle className="text-xl text-msblue-800">Community Guidelines</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-gray-700">
          Welcome to our community discussion area. To ensure this remains a safe and supportive
          space for everyone, please read and agree to our community guidelines before participating:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          {guidelines.map((guideline, index) => (
            <li key={index} className="text-gray-700">{guideline}</li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-2 mt-6">
          <Checkbox 
            id="guidelines-agreement" 
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
          />
          <Label 
            htmlFor="guidelines-agreement" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to follow these community guidelines
          </Label>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <Button 
          className="bg-msblue-600 hover:bg-msblue-700" 
          onClick={onAgree}
          disabled={!isChecked}
        >
          Continue to Community
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityGuidelines;
