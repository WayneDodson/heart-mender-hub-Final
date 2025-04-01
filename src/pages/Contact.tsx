
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
      // Insert the form data into the contact_submissions table
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email,
            subject,
            message,
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission failed",
          description: "There was an error submitting your message. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        toast({
          title: "Message received",
          description: "Thank you for reaching out. We'll respond to you soon.",
          duration: 5000,
        });
        
        // Reset form
        e.currentTarget.reset();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "How long does it typically take to heal from divorce?",
      answer: "The healing journey is different for everyone. Some people start to feel better within months, while for others it can take years. Factors affecting healing time include the length of the relationship, circumstances of the divorce, support systems available, and personal resilience. Remember that healing isn't linear – you'll have good and bad days throughout the process."
    },
    {
      question: "Will you offer professional therapy services?",
      answer: "Currently, Heart Mender is focused on providing resources, community support, and self-help tools. While we plan to collaborate with licensed therapists for group sessions in the future, we don't offer therapy services directly. We strongly encourage seeking professional support as part of your healing journey."
    },
    {
      question: "How can I contribute my story to the community?",
      answer: "We welcome stories from community members. You can share your experience by using the contact form on this page. Our team reviews submissions and works with contributors to prepare them for publication. You can choose to remain anonymous if you prefer."
    },
    {
      question: "Are there in-person meetings or events?",
      answer: "We're planning to introduce weekly meetings and specialist sessions in the near future. Currently, all our resources and support are available online. Sign up for our newsletter to be notified when in-person events become available."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healing-100 py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-healing-900">Get in Touch</h1>
            <p className="text-lg text-gray-700">
              Have questions, suggestions, or want to share your story? We'd love to hear from you.
            </p>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Send Us a Message</h2>
                <Card className="border border-healing-100">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input 
                            id="first-name" 
                            name="first-name" 
                            placeholder="Jane" 
                            className="healing-input" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input 
                            id="last-name" 
                            name="last-name" 
                            placeholder="Doe" 
                            className="healing-input" 
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="jane@example.com" 
                          className="healing-input" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          placeholder="How can we help?" 
                          className="healing-input" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="Tell us how we can help you..." 
                          className="healing-input min-h-[120px]" 
                          required 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-healing-500 hover:bg-healing-600"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Connect With Us</h2>
                <div className="bg-healing-50 p-6 rounded-lg mb-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <Mail className="h-6 w-6 text-healing-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-healing-800 mb-1">Email Us</h3>
                      <p className="text-gray-600">contact@heartmender.com</p>
                      <p className="text-sm text-gray-500 mt-1">We aim to respond within 48 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-healing-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-healing-800 mb-1">Share Your Story</h3>
                      <p className="text-gray-600">stories@heartmender.com</p>
                      <p className="text-sm text-gray-500 mt-1">Your experience could help others heal.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 border border-healing-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="h-6 w-6 text-healing-500" />
                    <h3 className="font-semibold text-xl text-healing-800">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Heart Mender is committed to providing resources and community for those healing from divorce. 
                    We believe that with the right support, everyone can find their path to healing and create a 
                    fulfilling new chapter in life.
                  </p>
                  <p className="text-gray-700">
                    We're building this platform to grow organically with our community's needs. 
                    Your feedback helps shape our future offerings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 px-4 bg-healing-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-healing-800 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-healing-100">
                  <h3 className="font-semibold text-lg mb-2 text-healing-700">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">Don't see your question answered here?</p>
              <Button className="bg-healing-500 hover:bg-healing-600">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-3 text-healing-800">Stay Connected</h2>
            <p className="text-lg text-gray-700 mb-6">
              Sign up for our newsletter to receive healing insights, resource updates, and community news.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="healing-input flex-grow"
              />
              <Button className="bg-healing-600 hover:bg-healing-700 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
