
import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  browserName: string;
  osName: string;
}

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

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    deviceType: 'desktop',
    orientation: 'landscape',
    browserName: 'unknown',
    osName: 'unknown',
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Detect device type based on width
      const isMobile = windowWidth < 768;
      const isTablet = windowWidth >= 768 && windowWidth < 1024;
      const isDesktop = windowWidth >= 1024;
      
      // Detect if touch device
      const isTouchDevice = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 ||
                           (navigator as any).msMaxTouchPoints > 0;
      
      // Determine device type
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) deviceType = 'mobile';
      else if (isTablet) deviceType = 'tablet';
      
      // Determine orientation
      const orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
      
      // Detect browser
      let browserName = 'unknown';
      const userAgent = navigator.userAgent;
      
      if (userAgent.indexOf("Firefox") > -1) browserName = "firefox";
      else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) browserName = "opera";
      else if (userAgent.indexOf("Trident") > -1) browserName = "ie";
      else if (userAgent.indexOf("Edge") > -1) browserName = "edge";
      else if (userAgent.indexOf("Chrome") > -1) browserName = "chrome";
      else if (userAgent.indexOf("Safari") > -1) browserName = "safari";
      
      // Detect OS
      let osName = "unknown";
      if (userAgent.indexOf("Windows") > -1) osName = "windows";
      else if (userAgent.indexOf("Mac") > -1) osName = "mac";
      else if (userAgent.indexOf("Linux") > -1) osName = "linux";
      else if (userAgent.indexOf("Android") > -1) osName = "android";
      else if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) osName = "ios";
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        deviceType,
        orientation,
        browserName,
        osName,
      });
    };
    
    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, []);
  
  return deviceInfo;
}
