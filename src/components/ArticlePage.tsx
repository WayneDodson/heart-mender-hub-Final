
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { articles } from '../data/articles';

// Define article content type
export type Article = {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
  authorName?: string;
  authorTitle?: string;
  publishDate?: string;
};

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  
  // Find the article that matches the ID
  const article = articles.find(a => a.id === articleId);
  
  // If article not found, show error message
  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/resources')} 
            className="mb-6 flex items-center gap-2 text-healing-600"
          >
            <ArrowLeft size={16} /> Back to Resources
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-healing-800 mb-4">Article Not Found</h1>
            <p className="text-gray-600">Sorry, the article you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Show the article content
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/resources')} 
            className="mb-6 flex items-center gap-2 text-healing-600"
          >
            <ArrowLeft size={16} /> Back to Resources
          </Button>
          
          <div className="mb-4">
            <span className="text-sm font-medium text-healing-600 mb-1 block">
              {article.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
            <h1 className="text-3xl font-bold text-healing-800 mb-2">{article.title}</h1>
            <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
              <span>{article.readTime}</span>
              {article.publishDate && <span>Published {article.publishDate}</span>}
            </div>
          </div>
          
          {article.authorName && (
            <div className="flex items-center mb-8 p-4 border-l-4 border-healing-200 bg-healing-50">
              <div>
                <p className="font-medium">{article.authorName}</p>
                {article.authorTitle && <p className="text-sm text-gray-600">{article.authorTitle}</p>}
              </div>
            </div>
          )}
          
          <article className="prose prose-lg max-w-none">
            {/* Display the article content as HTML */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
