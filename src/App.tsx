
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Stories from "./pages/Stories";
import SubmitStory from "./pages/SubmitStory";
import StoryDetail from "./pages/StoryDetail";
import CelebrityStories from "./pages/CelebrityStories";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import StoryReviewAdmin from "./pages/StoryReviewAdmin";
import { Toaster } from "./components/ui/toaster";
import NewsletterAdmin from "./pages/NewsletterAdmin";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On page load set the theme based on local storage or default to dark
    const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
      setDarkMode(storedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/submit-story" element={<SubmitStory />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/celebrity-stories" element={<CelebrityStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
          <Route path="/admin/stories" element={<StoryReviewAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
