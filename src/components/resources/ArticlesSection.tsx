
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Article } from '../ArticlePage';
import { useIsMobile } from '@/hooks/use-mobile';
import { StarBorder } from "../ui/star-border";

interface ArticlesSectionProps {
  articles: Article[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-healing-800">Helpful Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow h-full">
            <CardHeader className={isMobile ? "px-4 py-3" : undefined}>
              <div className="text-xs md:text-sm font-medium text-healing-600 mb-1">
                {article.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{article.title}</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "px-4 py-2" : undefined}>
              <CardDescription className={`${isMobile ? 'text-sm' : ''} space-y-2`}>{article.description}</CardDescription>
            </CardContent>
            <CardFooter className={`flex justify-between items-center ${isMobile ? "px-4 py-3" : ""}`}>
              <div className="text-xs md:text-sm text-gray-500">{article.readTime}</div>
              <Link to={`/resources/article/${article.id}`} className="shimmer-border rounded-md">
                <Button 
                  variant="ghost" 
                  className="text-healing-600 hover:text-healing-700 hover:bg-healing-50 border border-transparent hover:border-healing-200"
                >
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesSection;
