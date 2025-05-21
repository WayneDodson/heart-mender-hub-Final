
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarBorder } from '@/components/ui/star-border';
import { Link } from 'react-router-dom';

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface FeaturedResource {
  title: string;
  description: string;
  url: string;
}

interface HeroSectionProps {
  category: ResourceCategory | null;
  featuredResource: FeaturedResource | null;
  resourceCategories: ResourceCategory[];
}

export function HeroSection({ category, featuredResource, resourceCategories }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-[#FAF3E0] to-[#F7F0DD] p-4 md:p-8 rounded-lg shadow-sm mb-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-4">{category?.name || 'Resources'}</h1>
        <p className="text-[#333333] mb-6">{category?.description || 'Explore our curated resources to help you in your healing journey.'}</p>
        
        {featuredResource && (
          <div className="bg-white dark:bg-[#FAF3E0]/50 p-4 md:p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-[#6A5ACD] mb-2">Featured Resource</h3>
            <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-3">{featuredResource.title}</h2>
            <p className="text-[#333333] mb-4">{featuredResource.description}</p>
            <div className="flex justify-center">
              <StarBorder 
                as="div" 
                color="#6A5ACD" 
                className="inline-block hover:scale-105 transition-transform duration-300"
              >
                <Button 
                  onClick={() => window.open(featuredResource.url, '_blank')}
                  variant="ghost"
                  className="flex items-center justify-center gap-2 text-[#333333]"
                >
                  Explore Resource
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </StarBorder>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resourceCategories.map((cat) => (
            <Link to={cat.url} key={cat.id} className="block p-4 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-[#6A5ACD]">{cat.name}</h3>
              <p className="text-[#333333]">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
