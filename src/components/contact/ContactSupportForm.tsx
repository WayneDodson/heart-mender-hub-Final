
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "@/components/ui/dialog";

interface ContactSupportFormProps {
  onSuccess: () => void;
}

const ContactSupportForm: React.FC<ContactSupportFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({ title: 'Message sent', description: 'We will get back to you as soon as possible.' });
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={4} required />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} className="bg-healing-600 hover:bg-healing-700">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ContactSupportForm;
