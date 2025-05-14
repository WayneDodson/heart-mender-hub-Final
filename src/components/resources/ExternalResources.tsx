
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'lucide-react';

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'book' | 'podcast' | 'website' | 'support-group';
};

const resources: Resource[] = [
  {
    id: "1",
    title: "Psychology Today - Breakup & Divorce",
    description: "Articles, advice, and resources from mental health professionals on coping with breakups and divorce.",
    url: "https://www.psychologytoday.com/us/basics/divorce",
    category: "website"
  },
  {
    id: "3",
    title: "Rebuilding: When Your Relationship Ends",
    description: "A comprehensive guide to recovery after a relationship ends, focusing on the emotional healing process.",
    url: "https://www.amazon.com/Rebuilding-Relationships-Rebuilding-Extended-Anniversary/dp/1732980225/",
    category: "book"
  },
  {
    id: "4",
    title: "DivorceCare",
    description: "A network of support groups meeting worldwide to help people face the challenges of separation and divorce.",
    url: "https://www.divorcecare.org/",
    category: "support-group"
  },
  {
    id: "5",
    title: "How to Get Past Your Breakup",
    description: "A step-by-step program for moving on from heartbreak and creating a life you love.",
    url: "https://www.amazon.com/How-Get-Past-Your-Breakup/dp/0738213284/",
    category: "book"
  },
  {
    id: "6",
    title: "MeetUp Divorce & Breakup Groups",
    description: "Find local meetups for people going through similar relationship challenges.",
    url: "https://www.meetup.com/topics/divorce/",
    category: "support-group"
  },
];

const ExternalResources: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-healing-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-4 text-healing-900">External Resources</h2>
        <p className="text-lg text-gray-700 mb-10">
          Discover helpful resources for healing after a breakup or divorce. From books and podcasts to support groups and 
          online communities, these resources can provide guidance, comfort, and practical advice.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>
                  {resource.category === 'book' && 'Book'}
                  {resource.category === 'podcast' && 'Podcast'}
                  {resource.category === 'website' && 'Website'}
                  {resource.category === 'support-group' && 'Support Group'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">{resource.description}</p>
              </CardContent>
              <CardFooter>
                <div className="w-full shimmer-border rounded-md">
                  <Button asChild className="w-full bg-healing-600 hover:bg-healing-700">
                    <a href={resource.url} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                      <Link className="mr-2 h-4 w-4" />
                      Visit Resource
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExternalResources;
