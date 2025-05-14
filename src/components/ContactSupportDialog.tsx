import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactSupportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerButton?: boolean;
}

const ContactSupportDialog = ({ 
  open, 
  onOpenChange,
  triggerButton = false 
}: ContactSupportDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Use external open state if provided, otherwise use internal state
  const dialogOpen = open !== undefined ? open : internalOpen;
  const setDialogOpen = onOpenChange || setInternalOpen;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting contact dialog form:", formData);

    try {
      // Insert the form data into the contact_submissions table
      console.log("Sending dialog data to contact_submissions table");
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          first_name: formData.name, 
          last_name: '', // Adding empty last_name to satisfy the table requirements
          email: formData.email,
          subject: 'Support Request from Landing Page',
          message: formData.message
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting form to database:', error);
        toast({
          title: "Submission failed",
          description: `Database error: ${error.message}`,
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Dialog form submission successful, data:", data);

      // If submission was successful, trigger the email notification
      try {
        console.log("Invoking contact-notification function from dialog with data:", { record: data });
        const { data: invokeData, error: invokeError } = await supabase.functions.invoke('contact-notification', {
          body: { record: data }
        });
        
        if (invokeError) {
          console.error('Error sending email notification from dialog:', invokeError);
          toast({
            title: "Message received but notification failed",
            description: "Your message was saved but we couldn't send a notification. Our team will still review it.",
            duration: 5000,
          });
        } else {
          console.log('Email notification from dialog sent successfully:', invokeData);
          toast({
            title: "Message received",
            description: "Thank you for reaching out. Our support team will respond to you soon.",
            duration: 5000,
          });
        }
        
        // Reset form and close dialog
        setFormData({ name: '', email: '', message: '' });
        setDialogOpen(false);
      } catch (emailError) {
        console.error('Error invoking email function from dialog:', emailError);
        toast({
          title: "Message received",
          description: "Thank you for reaching out. However, there was an issue sending the notification. Our team will still review your message.",
          duration: 5000,
        });
        // Since the database entry was successful, we reset and close
        setFormData({ name: '', email: '', message: '' });
        setDialogOpen(false);
      }
    } catch (err) {
      console.error('Unexpected error during dialog form submission:', err);
      toast({
        title: "Submission failed",
        description: `There was an error submitting your message: ${err instanceof Error ? err.message : "Please try again."}`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {triggerButton && (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Fill out the form below to get in touch with our support team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="col-span-3"
                rows={5}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportDialog;
