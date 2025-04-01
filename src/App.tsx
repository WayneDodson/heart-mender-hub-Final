
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import SubmitStory from "./pages/SubmitStory";
import StoryReviewAdmin from "./pages/StoryReviewAdmin";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ArticlePage from "./components/ArticlePage";
import CelebrityStoriesPage from "./pages/CelebrityStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/article/:articleId" element={<ArticlePage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/submit-story" element={<SubmitStory />} />
          <Route path="/admin/stories" element={<StoryReviewAdmin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/celebrity-stories" element={<CelebrityStoriesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
