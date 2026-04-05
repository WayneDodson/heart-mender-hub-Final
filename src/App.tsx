import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Stories from "./pages/Stories";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import ArticlePage from "./components/ArticlePage";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminPage from "./pages/AdminPage";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <AuthProvider>
      <div className="light min-h-screen w-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/article/:articleId" element={<ArticlePage />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />

            {/* Protected routes (require login) */}
            <Route path="/submit-story" element={
              <ProtectedRoute><SubmitStory /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
