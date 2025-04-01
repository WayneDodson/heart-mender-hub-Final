
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StoryRow } from './types';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface StoryAdminCardProps {
  story: StoryRow;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

const StoryAdminCard: React.FC<StoryAdminCardProps> = ({ story, onApprove, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
  
  const handleApprove = async () => {
    setIsProcessing(true);
    await onApprove(story.id);
    setIsProcessing(false);
  };
  
  const handleReject = async () => {
    setIsProcessing(true);
    await onReject(story.id);
    setIsProcessing(false);
  };
  
  const getStatusBadge = () => {
    switch (story.status) {
      case 'approved':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">Rejected</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Pending</span>;
    }
  };
  
  return (
    <Card className="mb-4 border border-healing-100">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{story.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <div className="text-sm text-gray-500">
          By {story.author_name} • {formattedDate}
        </div>
      </CardHeader>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent>
          <CardDescription className="text-gray-700">
            {story.content.substring(0, 150)}...
          </CardDescription>
          <CollapsibleContent>
            <div className="mt-4 text-gray-700 whitespace-pre-wrap">
              {story.content.substring(150)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-600">Category:</h4>
                <p>{story.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-600">Contact Email:</h4>
                <p>{story.email}</p>
              </div>
            </div>
          </CollapsibleContent>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-2 w-full flex justify-center items-center">
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Read More
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </CardContent>
      </Collapsible>
      
      {story.status === 'pending' && (
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={handleReject}
            disabled={isProcessing}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StoryAdminCard;
