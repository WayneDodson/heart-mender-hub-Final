
import 'core-js/stable'; // Add core-js for broader polyfill support
import 'regenerator-runtime/runtime'; // For async/await support
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

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

// Fallback for older browsers
const render = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Failed to find the root element");
    return;
  }
  
  // Check if createRoot is available (React 18+)
  if (typeof ReactDOM.createRoot === 'function') {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } else {
    // Fallback for older browsers or React versions
    ReactDOM.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>,
      rootElement
    );
  }
};

// Error handling for script loading issues
try {
  render();
} catch (error) {
  console.error("Failed to render application:", error);
  
  // Attempt to display a fallback message
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Application Error</h2>
        <p>We're sorry, but your browser may not be compatible with this application.</p>
        <p>Please try using a modern browser like Chrome, Firefox, Safari, or Edge.</p>
      </div>
    `;
  }
}
