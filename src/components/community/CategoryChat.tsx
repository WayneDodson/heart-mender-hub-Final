
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { CommunityMessage } from './types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface CategoryChatProps {
  categoryId: string;
  categoryName: string;
}

const STORAGE_KEY = (id: string) => `community_chat_${id}`;

const loadMessages = (categoryId: string): CommunityMessage[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(categoryId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveMessages = (categoryId: string, messages: CommunityMessage[]) => {
  localStorage.setItem(STORAGE_KEY(categoryId), JSON.stringify(messages));
};

const CategoryChat: React.FC<CategoryChatProps> = ({ categoryId, categoryName }) => {
  const [messages, setMessages] = useState<CommunityMessage[]>(() => loadMessages(categoryId));
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('communityUserName') || '';
    setUserName(storedName);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !userName.trim()) {
      toast({ title: 'Cannot send message', description: 'Please enter your name and a message.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    localStorage.setItem('communityUserName', userName);
    const msg: CommunityMessage = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      user_name: userName,
      message: newMessage,
      category_id: categoryId,
    };
    const updated = [...messages, msg];
    setMessages(updated);
    saveMessages(categoryId, updated);
    setNewMessage('');
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString();

  const getExpertContent = () => {
    if (messages.length > 0) return null;
    const expertContent: Record<string, { question: string; answer: string }> = {
      'emotional-support': {
        question: 'How do I manage overwhelming emotions during a divorce?',
        answer: 'Mayo Clinic experts recommend acknowledging your feelings without judgment and establishing healthy coping mechanisms. Regular exercise, adequate sleep, and mindfulness practices have been shown to reduce emotional distress. Consider joining a support group specifically for people going through divorce — shared experiences can provide validation and practical advice.',
      },
      'co-parenting': {
        question: "What's the best way to communicate with my ex-spouse about co-parenting issues?",
        answer: 'According to the American Academy of Pediatrics, successful co-parenting communication should be business-like, focused solely on children\'s needs. Use written communication when emotions are high. Create a shared calendar for children\'s activities and appointments.',
      },
      'legal-advice': {
        question: 'What should I prioritize when selecting a divorce attorney?',
        answer: 'The American Bar Association suggests focusing on attorneys specializing in family law with experience specific to your situation. Schedule consultations with multiple attorneys to compare styles and strategies.',
      },
      'moving-forward': {
        question: "How long does it typically take to feel 'normal' again after divorce?",
        answer: 'Psychology Today notes that while divorce recovery varies greatly between individuals, research suggests most people begin feeling significantly better between one and two years post-divorce.',
      },
      'self-care': {
        question: 'What are effective self-care practices during divorce?',
        answer: 'Harvard Health Publishing emphasizes that effective self-care during divorce involves both physical and emotional components. Maintain consistent sleep patterns, eat nutritious meals, exercise regularly, and limit alcohol.',
      },
    };
    return expertContent[categoryId] || null;
  };

  const expertContent = getExpertContent();

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-grow overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            {expertContent ? (
              <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-4 space-y-4">
                <Alert className="bg-msblue-50 border-msblue-200">
                  <Info className="h-4 w-4 text-msblue-500" />
                  <AlertDescription className="text-msblue-700">
                    We have provided an expert response to help start the conversation in this category.
                  </AlertDescription>
                </Alert>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-msblue-700">Community Member</span>
                    <span className="text-xs text-gray-500">Question</span>
                  </div>
                  <p className="text-gray-700">{expertContent.question}</p>
                </div>
                <div className="bg-msblue-50 p-3 rounded-lg border-l-4 border-msblue-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-msblue-800">Expert Response</span>
                    <span className="text-xs text-msblue-600">Verified Information</span>
                  </div>
                  <p className="text-gray-700">{expertContent.answer}</p>
                </div>
                <p className="text-center text-gray-500 text-sm mt-4">Be the first to continue this conversation.</p>
              </div>
            ) : (
              <p className="text-gray-500">Be the first to start a conversation in this category!</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-msblue-700">{msg.user_name}</span>
                  <span className="text-xs text-gray-500">{formatTimestamp(msg.created_at)}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="border rounded-lg p-3 bg-white">
        <div className="mb-3">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-msblue-500"
            placeholder="Enter your name"
          />
        </div>
        <Textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message here..." className="mb-3 min-h-[100px]" />
        <div className="flex justify-end">
          <Button onClick={handleSendMessage} disabled={isLoading || !newMessage.trim() || !userName.trim()} className="bg-msblue-600 hover:bg-msblue-700">
            {isLoading ? <span>Sending...</span> : <span className="flex items-center">Send <Send className="ml-2 h-4 w-4" /></span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryChat;
