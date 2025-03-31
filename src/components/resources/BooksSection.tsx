
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Book {
  title: string;
  author: string;
  description: string;
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
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{book.title}</CardTitle>
              <div className="text-sm font-medium text-healing-600">by {book.author}</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="space-y-3">{book.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Find Book</Button>
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
