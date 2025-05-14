
import React from 'react';
import { StarBorder } from '@/components/ui/star-border';
import { Button } from '@/components/ui/button';

// Example usage variants of StarBorder component for documentation/demo purposes
export function StarBorderVariants() {
  return (
    <div className="flex flex-col space-y-8 items-center p-8">
      {/* Default */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default</h3>
        <StarBorder>
          <span>Default Button</span>
        </StarBorder>
      </div>
      
      {/* Blue variant */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Primary Color</h3>
        <StarBorder color="hsl(var(--primary))">
          <span>Primary Color</span>
        </StarBorder>
      </div>
      
      {/* Custom speed */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Fast Animation (3s)</h3>
        <StarBorder speed="3s" color="hsl(var(--primary))">
          <span>Fast Animation</span>
        </StarBorder>
      </div>
      
      {/* Used with a div instead of button */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">As Div Element</h3>
        <StarBorder as="div" className="cursor-default">
          <span>Content in a div</span>
        </StarBorder>
      </div>
      
      {/* With shadcn Button inside */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Internal Button</h3>
        <StarBorder as="div" color="hsl(var(--primary))">
          <Button variant="ghost">Click Me</Button>
        </StarBorder>
      </div>
    </div>
  );
}
