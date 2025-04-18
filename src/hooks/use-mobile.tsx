
import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Use screen width for mobile detection
      const windowWidth = window.innerWidth || 
                          document.documentElement.clientWidth || 
                          document.body.clientWidth;
                          
      setIsMobile(windowWidth < 768);
    };

    // Check on initial load
    checkIsMobile();
    
    // Modern event listener approach
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
