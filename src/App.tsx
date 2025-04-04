
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

// Public pages
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Stories from "./pages/Stories";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";
import CelebrityStories from "./pages/CelebrityStories";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import ArticlePage from "./components/ArticlePage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminPage from "./pages/AdminPage";
import NewsletterAdmin from "./pages/NewsletterAdmin";

function App() {
  // Browser compatibility check
  useEffect(() => {
    // More comprehensive browser feature detection
    const isModernBrowser = (
      'fetch' in window && 
      'assign' in Object && 
      'forEach' in Array.prototype &&
      'querySelector' in document
    );
    
    if (!isModernBrowser) {
      console.warn('You are using an outdated browser. Some features may not work correctly.');
      // Add a small delay to ensure the message is visible
      setTimeout(() => {
        try {
          // Try to show a more visible warning for older browsers
          const appRoot = document.getElementById('root');
          if (appRoot) {
            const warningDiv = document.createElement('div');
            warningDiv.style.padding = '10px';
            warningDiv.style.backgroundColor = '#fff3cd';
            warningDiv.style.color = '#856404';
            warningDiv.style.border = '1px solid #ffeeba';
            warningDiv.style.borderRadius = '4px';
            warningDiv.style.margin = '10px 0';
            warningDiv.style.textAlign = 'center';
            warningDiv.textContent = 'You are using an outdated browser. Some features may not work correctly.';
            appRoot.prepend(warningDiv);
          }
        } catch (e) {
          // If DOM manipulation fails, just continue silently
          console.error('Failed to add browser warning:', e);
        }
      }, 1000);
    }
    
    // Always set light theme
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <div className="light">
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/article/:articleId" element={<ArticlePage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/submit-story" element={<SubmitStory />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/celebrity-stories" element={<CelebrityStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/stories" element={<AdminPage />} />
          <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
