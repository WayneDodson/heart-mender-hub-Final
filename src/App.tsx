
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

// Pages
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
import CalendarPage from "./pages/Calendar";
import Auth from "./pages/Auth";
import AdminPage from "./pages/AdminPage";
import NewsletterAdmin from "./pages/NewsletterAdmin";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  // Enhanced browser compatibility check
  useEffect(() => {
    const checkBrowserCompatibility = () => {
      const requiredFeatures = [
        'fetch' in window,
        'Promise' in window,
        'assign' in Object,
        'forEach' in Array.prototype,
        'querySelector' in document,
        'addEventListener' in window,
        'localStorage' in window,
        'JSON' in window,
        'map' in Array.prototype,
        'filter' in Array.prototype
      ];

      const isModernBrowser = requiredFeatures.every(feature => feature);
      
      setIsBrowserSupported(isModernBrowser);

      if (!isModernBrowser) {
        console.warn('Your browser is outdated. Some features may not work correctly.');
        
        // Create a more informative browser warning
        const createBrowserWarning = () => {
          const warningDiv = document.createElement('div');
          warningDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #ffcc00;
            color: black;
            text-align: center;
            padding: 15px;
            z-index: 1000;
            font-size: 16px;
          `;
          warningDiv.innerHTML = `
            You are using an outdated browser. 
            <a href="https://browsehappy.com/" style="color: blue; text-decoration: underline;">
              Please upgrade for a better experience.
            </a>
          `;
          document.body.prepend(warningDiv);
        };

        createBrowserWarning();
      }
    };

    checkBrowserCompatibility();
    
    // Always set light theme
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  // Use feature detection before rendering router
  const isRouterSupported = 'history' in window && 'pushState' in window.history;

  return (
    <AuthProvider>
      <div className="light min-h-screen w-full">
        <Navbar />
        {isBrowserSupported ? (
          isRouterSupported ? (
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              <Route path="/resources/article/:articleId" element={
                <ProtectedRoute>
                  <ArticlePage />
                </ProtectedRoute>
              } />
              <Route path="/stories" element={
                <ProtectedRoute>
                  <Stories />
                </ProtectedRoute>
              } />
              <Route path="/submit-story" element={
                <ProtectedRoute>
                  <SubmitStory />
                </ProtectedRoute>
              } />
              <Route path="/stories/:id" element={
                <ProtectedRoute>
                  <StoryDetail />
                </ProtectedRoute>
              } />
              <Route path="/celebrity-stories" element={
                <ProtectedRoute>
                  <CelebrityStories />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/stories" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/newsletter-admin" element={
                <ProtectedRoute>
                  <NewsletterAdmin />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">Browser Not Supported</h2>
              <p>Your browser doesn't support modern navigation features. Please update to a newer browser.</p>
              <div className="mt-4">
                <Index />
              </div>
            </div>
          )
        ) : (
          <div className="p-4 text-center w-full">
            <h2 className="text-2xl font-bold mb-4">Browser Not Supported</h2>
            <p className="mb-4">
              Your browser is too old to run this application. 
              Please update to a modern browser like Chrome, Firefox, Safari, or Edge.
            </p>
            <a 
              href="https://browsehappy.com/" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Upgrade Browser
            </a>
          </div>
        )}
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
