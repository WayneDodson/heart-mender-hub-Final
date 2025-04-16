
import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Use both screen width and user agent (for better cross-browser support)
      const windowWidth = window.innerWidth || 
                          document.documentElement.clientWidth || 
                          document.body.clientWidth;
                          
      setIsMobile(windowWidth < 768);
    };

    // Check on initial load
    checkIsMobile();
    
    // Modern event listener approach - removed attachEvent/detachEvent which are no longer supported
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
