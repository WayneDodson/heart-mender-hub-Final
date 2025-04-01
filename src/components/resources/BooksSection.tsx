
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Book {
  title: string;
  author: string;
  description: string;
  amazonLink?: string;
  extract?: string;
}

interface BooksSectionProps {
  books: Book[];
}

const BooksSection = ({ books }: BooksSectionProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-healing-800">Recommended Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{book.title}</CardTitle>
              <div className="text-sm font-medium text-healing-600">by {book.author}</div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="space-y-3 mb-4">{book.description}</CardDescription>
              {book.extract && (
                <div className="mt-3 text-sm italic text-gray-700 border-l-2 border-healing-200 pl-3 py-1">
                  "{book.extract}"
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => book.amazonLink ? window.open(book.amazonLink, '_blank') : null}
              >
                Find on Amazon
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600 leading-relaxed">These books have helped many people navigate the emotional challenges of divorce and find healing.</p>
      </div>
    </div>
  );
};

export default BooksSection;
