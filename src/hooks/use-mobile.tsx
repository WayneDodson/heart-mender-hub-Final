
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
    
    // Use the most cross-browser compatible event listener pattern
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIsMobile);
    } else if (typeof window.attachEvent === 'function') {
      // For older IE
      window.attachEvent('onresize', checkIsMobile);
      
      // Cleanup
      return () => window.detachEvent('onresize', checkIsMobile);
    }
    
    return undefined;
  }, []);

  return isMobile;
}
