
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CommunityMessage } from './types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface CategoryChatProps {
  categoryId: string;
  categoryName: string;
}

const CategoryChat: React.FC<CategoryChatProps> = ({ categoryId, categoryName }) => {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('communityUserName') || '';
    setUserName(storedName);
    
    fetchMessages();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('public:community_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'community_messages',
        filter: `category_id=eq.${categoryId}`
      }, (payload) => {
        const newMessage = payload.new as any as CommunityMessage;
        setMessages(current => [...current, newMessage]);
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [categoryId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      // Use the raw query to avoid type issues
      const { data, error } = await supabase
        .from('community_messages')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: true }) as any;
        
      if (error) throw error;
      setMessages(data as CommunityMessage[]);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
      toast({
        title: "Error loading messages",
        description: "Could not load chat messages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userName.trim()) {
      toast({
        title: "Cannot send message",
        description: "Please enter your name and a message.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      localStorage.setItem('communityUserName', userName);
      
      // Use the raw query to avoid type issues
      const { error } = await supabase
        .from('community_messages')
        .insert({
          user_name: userName,
          message: newMessage,
          category_id: categoryId
        }) as any;
        
      if (error) throw error;
      
      setNewMessage("");
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      toast({
        title: "Error sending message",
        description: "Your message could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get expert question and answer content based on category ID
  const getExpertContent = () => {
    if (messages.length > 0) return null;
    
    const expertContent = {
      'emotional-support': {
        question: "How do I manage overwhelming emotions during a divorce?",
        answer: "Mayo Clinic experts recommend acknowledging your feelings without judgment and establishing healthy coping mechanisms. Regular exercise, adequate sleep, and mindfulness practices have been shown to reduce emotional distress. Consider joining a support group specifically for people going through divorce - shared experiences can provide validation and practical advice. If emotions feel unmanageable, don't hesitate to seek professional help through therapy."
      },
      'co-parenting': {
        question: "What's the best way to communicate with my ex-spouse about co-parenting issues?",
        answer: "According to the American Academy of Pediatrics, successful co-parenting communication should be business-like, focused solely on children's needs. Use written communication (emails, texts, apps) when emotions are high. Create a shared calendar for children's activities and appointments. Establish consistent rules across households when possible, but understand some differences are normal. Most importantly, never use children as messengers or discuss adult issues with them."
      },
      'legal-advice': {
        question: "What should I prioritize when selecting a divorce attorney?",
        answer: "The American Bar Association suggests focusing on attorneys specializing in family law with experience specific to your situation (high-asset divorce, child custody disputes, etc.). Schedule consultations with multiple attorneys to compare styles and strategies. Ask about their fee structure, communication approach, and typical timeline. Verify credentials and check reviews. Remember that the most expensive attorney isn't necessarily the best - look for someone who balances expertise with reasonable costs."
      },
      'moving-forward': {
        question: "How long does it typically take to feel 'normal' again after divorce?",
        answer: "Psychology Today notes that while divorce recovery varies greatly between individuals, research suggests most people begin feeling significantly better between one and two years post-divorce. This healing isn't linear - expect good and bad days throughout. Focus on rebuilding your identity separate from your former relationship, rediscovering personal interests, and gradually establishing new routines. Some find divorce brings unexpected positive changes, as it creates opportunity for personal growth and authenticity."
      },
      'self-care': {
        question: "What are effective self-care practices during divorce?",
        answer: "Harvard Health Publishing emphasizes that effective self-care during divorce involves both physical and emotional components. Physically: maintain consistent sleep patterns, eat nutritious meals, exercise regularly, and limit alcohol. Emotionally: establish boundaries with your ex-spouse, practice daily mindfulness or meditation, journal your thoughts, and connect with supportive friends. Professional support through therapy can be invaluable. Remember that self-care isn't selfish - it's necessary for healing and being present for those who depend on you."
      }
    };
    
    return expertContent[categoryId as keyof typeof expertContent];
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
                    We've provided an expert response to help start the conversation in this category.
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
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  Be the first to continue this conversation.
                </p>
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
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-msblue-500"
            placeholder="Enter your name"
          />
        </div>
        
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="mb-3 min-h-[100px]"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !newMessage.trim() || !userName.trim()}
            className="bg-msblue-600 hover:bg-msblue-700"
          >
            {isLoading ? (
              <span className="flex items-center">Sending...</span>
            ) : (
              <span className="flex items-center">
                Send <Send className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryChat;
