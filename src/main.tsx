
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.tsx";
import "./index.css";

// Detect platform for debugging
const detectPlatform = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const deviceInfo = {
    platform,
    userAgent,
    viewport: { width, height },
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    browser: (() => {
      if (userAgent.indexOf("Firefox") > -1) return "Firefox";
      else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
      else if (userAgent.indexOf("Trident") > -1) return "IE";
      else if (userAgent.indexOf("Edge") > -1) return "Edge";
      else if (userAgent.indexOf("Chrome") > -1) return "Chrome";
      else if (userAgent.indexOf("Safari") > -1) return "Safari";
      else return "Unknown";
    })()
  };

  return deviceInfo;
};

// Add version timestamp and platform info to help with cache-busting and debugging
const platformInfo = detectPlatform();
console.log("App version:", new Date().toISOString());
console.log("Platform info:", platformInfo);

// Create a client with better configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Detect if createRoot is available
const rootElement = document.getElementById("root");

if (rootElement) {
  // Prefer createRoot for React 18+
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
