
import React from 'react';
import { Youtube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Video {
  title: string;
  speaker: string;
  description: string;
  youtubeId: string;
  duration: string;
  tags: string[];
}

const divorceSupportVideos: Video[] = [
  {
    title: "How to Get Over The End of a Relationship",
    speaker: "Mel Robbins",
    description: "Mel Robbins offers practical strategies to process the pain of a breakup and move forward with confidence and self-compassion.",
    youtubeId: "k0GQSJrpVhM",
    duration: "12:53",
    tags: ["emotional healing", "self-care"]
  },
  {
    title: "Getting Over a Breakup - Letting Go and Moving On",
    speaker: "Tony Robbins",
    description: "Tony Robbins shares powerful insights on transforming the pain of divorce into an opportunity for personal growth and renewal.",
    youtubeId: "bW-jSa9_k3M",
    duration: "15:21",
    tags: ["personal growth", "healing"]
  },
  {
    title: "Healing After Divorce - 4 Things To Remember",
    speaker: "Lisa Nichols",
    description: "Lisa Nichols provides four essential principles to help you rebuild your life and regain your sense of self after divorce.",
    youtubeId: "rWZlol0H4rQ", 
    duration: "9:46",
    tags: ["self-worth", "rebuilding"]
  },
  {
    title: "Divorce Doesn't Mean You're a Failure",
    speaker: "Esther Perel",
    description: "Renowned relationship therapist Esther Perel discusses how to reframe divorce as a chapter of growth rather than a sign of failure.",
    youtubeId: "koPQ2YjfQmk",
    duration: "7:15",
    tags: ["relationship advice", "acceptance"]
  },
  {
    title: "How To Deal With Divorce and Move Forward",
    speaker: "Jay Shetty",
    description: "Former monk Jay Shetty shares wisdom on processing grief, finding forgiveness, and creating a new vision for your life after divorce.",
    youtubeId: "iNZB6HWPdpI",
    duration: "18:32",
    tags: ["mindfulness", "future planning"]
  },
  {
    title: "5 Rules If You Are Going Through A Divorce",
    speaker: "Mel Robbins",
    description: "Mel Robbins provides five practical rules to help you make better decisions and protect your wellbeing during the divorce process.",
    youtubeId: "xrGNzeQA5RE",
    duration: "10:04",
    tags: ["practical advice", "self-protection"]
  }
];

const VideosSection = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Video Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divorceSupportVideos.map((video, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow flex flex-col">
            <div className="relative">
              <img 
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} 
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <Youtube className="h-12 w-12 text-white opacity-80" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <div className="text-sm font-medium text-healing-600">by {video.speaker}</div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <CardDescription className="text-sm">{video.description}</CardDescription>
              <div className="mt-3 flex flex-wrap gap-2">
                {video.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-healing-50 text-healing-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
              >
                <Youtube className="h-4 w-4" /> Watch Video
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 leading-relaxed">
          These videos offer expert guidance to help you process emotions, rebuild confidence, and move forward after divorce.
        </p>
      </div>
    </div>
  );
};

export default VideosSection;
