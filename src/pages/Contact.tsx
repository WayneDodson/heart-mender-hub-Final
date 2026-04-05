
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ContactSupportDialog from '@/components/ContactSupportDialog';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({
      title: "Message sent",
      description: "Thank you for reaching out. We will get back to you soon.",
      duration: 5000,
    });
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-healing-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-healing-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We are here to support you on your healing journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <Mail className="h-10 w-10 text-healing-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">contact@heartmender.com</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <MessageCircle className="h-10 w-10 text-healing-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Join our supportive community forums.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <Heart className="h-10 w-10 text-healing-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Support</h3>
              <p className="text-gray-600 text-sm">We respond within 24 hours.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold text-healing-900 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" name="first-name" placeholder="Your first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" name="last-name" placeholder="Your last name" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="How can we help?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell us how we can support you..." rows={6} required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-healing-600 hover:bg-healing-700">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setShowSupportDialog(true)} className="border-healing-600 text-healing-600 hover:bg-healing-50">
            Need immediate support?
          </Button>
        </div>
      </div>
      <ContactSupportDialog open={showSupportDialog} onOpenChange={setShowSupportDialog} />
    </div>
  );
};

export default Contact;
