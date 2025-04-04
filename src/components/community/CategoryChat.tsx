
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CommunityMessage } from './types';

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
        const newMessage = payload.new as CommunityMessage;
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
      const { data, error } = await supabase
        .from('community_messages')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: true });
        
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
      
      const { error } = await supabase
        .from('community_messages')
        .insert({
          user_name: userName,
          message: newMessage,
          category_id: categoryId
        });
        
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

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-grow overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Be the first to start a conversation in this category!</p>
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
