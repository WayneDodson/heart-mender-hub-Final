
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterAdmin = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch subscriber count on component mount
  React.useEffect(() => {
    async function getSubscriberCount() {
      try {
        const { count, error } = await supabase
          .from('newsletter_subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('active', true);
          
        if (error) {
          console.error('Error fetching subscriber count:', error);
          return;
        }
        
        setSubscriberCount(count);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
    
    getSubscriberCount();
  }, []);

  const sendTestEmail = async () => {
    if (!subject || !content || !testEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in subject, content and test email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject,
          content,
          testEmail,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Test email sent",
        description: `Newsletter test was sent to ${testEmail}`,
      });
      
    } catch (err) {
      console.error('Error sending test newsletter:', err);
      toast({
        title: "Failed to send test",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const sendNewsletter = async () => {
    if (!subject || !content) {
      toast({
        title: "Missing information",
        description: "Please fill in both subject and content.",
        variant: "destructive",
      });
      return;
    }
    
    if (!window.confirm(`Are you sure you want to send this newsletter to ${subscriberCount} subscribers?`)) {
      return;
    }
    
    setIsSending(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject,
          content,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Newsletter sent",
        description: `Newsletter was sent to ${subscriberCount} subscribers`,
      });
      
    } catch (err) {
      console.error('Error sending newsletter:', err);
      toast({
        title: "Failed to send newsletter",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-healing-800">Newsletter Admin</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compose Newsletter</CardTitle>
          <CardDescription>
            Create and send newsletters to {subscriberCount !== null ? subscriberCount : '...'} active subscribers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              placeholder="Newsletter subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea 
              id="content" 
              placeholder="<h1>Newsletter content</h1><p>Write your newsletter content here...</p>" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono"
            />
          </div>
          
          <div>
            <Label htmlFor="testEmail">Test Email Address</Label>
            <Input 
              id="testEmail" 
              type="email"
              placeholder="your@email.com" 
              value={testEmail} 
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Send a test newsletter to this email before sending to all subscribers
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={sendTestEmail}
            disabled={isSending || !testEmail}
          >
            {isSending ? 'Sending...' : 'Send Test'}
          </Button>
          <Button
            onClick={sendNewsletter}
            disabled={isSending || !subscriberCount}
            className="bg-healing-600 hover:bg-healing-700"
          >
            {isSending ? 'Sending...' : `Send to All (${subscriberCount || 0} subscribers)`}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tips for Creating Effective Newsletters</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use clear, engaging subject lines (keep under 50 characters)</li>
            <li>Include a compelling opening that hooks the reader</li>
            <li>Structure content with headings and short paragraphs</li>
            <li>Add value with helpful resources, tips, or exclusive content</li>
            <li>Include images or visuals to break up text</li>
            <li>End with a clear call to action</li>
            <li>Proofread carefully before sending</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterAdmin;
