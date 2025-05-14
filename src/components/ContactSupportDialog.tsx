
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactSupportForm from "./contact/ContactSupportForm";
import { ContactSupportDialogProps } from "./contact/types";

const ContactSupportDialog = ({ 
  open, 
  onOpenChange,
  triggerButton = false 
}: ContactSupportDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use external open state if provided, otherwise use internal state
  const dialogOpen = open !== undefined ? open : internalOpen;
  const setDialogOpen = onOpenChange || setInternalOpen;

  const handleSuccess = () => {
    setDialogOpen(false);
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
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Fill out the form below to get in touch with our support team.
          </DialogDescription>
        </DialogHeader>
        <ContactSupportForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportDialog;
