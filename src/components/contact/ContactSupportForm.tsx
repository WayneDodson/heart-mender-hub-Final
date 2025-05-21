
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactSupportFormProps {
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

const ContactSupportForm = ({ onSuccess }: ContactSupportFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
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
          subject: 'Support Request from Dialog',
          message: formData.message
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting form to database:', error);
        
        // More specific error handling
        if (error.code === '23505') {
          setErrors({ general: "You've already submitted a similar message recently." });
        } else if (error.code === '23503') {
          setErrors({ general: "There was a reference error in the submission." });
        } else if (error.code === '42501' || error.message.includes('permission denied')) {
          setErrors({ general: "Permission denied. This appears to be an issue with our database permissions." });
        } else {
          setErrors({ general: `Database error: ${error.message}` });
        }
        
        setIsSubmitting(false);
        return;
      }

      console.log("Dialog form submission successful, data:", data);

      // If submission was successful, try to trigger the email notification
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
        onSuccess();
      } catch (emailError) {
        console.error('Error invoking email function from dialog:', emailError);
        toast({
          title: "Message received",
          description: "Thank you for reaching out. However, there was an issue sending the notification. Our team will still review your message.",
          duration: 5000,
        });
        // Since the database entry was successful, we reset and close
        setFormData({ name: '', email: '', message: '' });
        onSuccess();
      }
    } catch (err) {
      console.error('Unexpected error during dialog form submission:', err);
      setErrors({ 
        general: `There was an error submitting your message: ${err instanceof Error ? err.message : "Please try again."}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Contact support form">
      {errors.general && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <div className="col-span-3">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="message" className="text-right">
            Message
          </Label>
          <div className="col-span-3">
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "border-red-500" : ""}
              rows={5}
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ContactSupportForm;
