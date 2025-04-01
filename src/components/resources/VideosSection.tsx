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
    title: "How to Heal from Heartbreak - 6 Powerful Steps",
    speaker: "Marisa Peer",
    description: "World-renowned therapist Marisa Peer shares six powerful steps to help you heal from heartbreak and reclaim your emotional wellbeing after divorce.",
    youtubeId: "R1jgDZrJBN4",
    duration: "16:36",
    tags: ["healing", "emotional recovery"]
  },
  {
    title: "Life After Divorce: Finding Your Identity Again",
    speaker: "Alicia Scott",
    description: "Divorce coach Alicia Scott shares her personal journey and practical insights to help you rediscover your identity and build a fulfilling life after divorce.",
    youtubeId: "E7TxEzMF3s8",
    duration: "15:27",
    tags: ["identity", "personal growth"]
  },
  {
    title: "How To Get Over A Breakup (Tips For Moving On Quickly)",
    speaker: "Matthew Hussey",
    description: "Matthew Hussey provides practical strategies and mindset shifts to help you move forward after a relationship ends, focusing on personal growth and healing.",
    youtubeId: "hIKFEkO3Qss",
    duration: "11:28",
    tags: ["moving on", "personal growth"]
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
    title: "Healing After Divorce - Rebuild Your Life",
    speaker: "Amy Delamaide",
    description: "Therapist Amy Delamaide shares practical insights for rebuilding your life after divorce and finding strength in your new chapter.",
    youtubeId: "GcJVygChaxA",
    duration: "19:38",
    tags: ["rebuilding", "emotional healing"]
  },
  {
    title: "5 Rules If You Are Going Through A Divorce",
    speaker: "Mel Robbins",
    description: "Mel Robbins provides five practical rules to help you make better decisions and protect your wellbeing during the divorce process.",
    youtubeId: "hZVTyLmXZWY",
    duration: "10:04",
    tags: ["practical advice", "self-protection"]
  }
];

const VideosSection = () => {
  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Video Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divorceSupportVideos.map((video, index) => (
          <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow flex flex-col">
            <div 
              className="relative cursor-pointer" 
              onClick={() => openVideo(video.youtubeId)}
            >
              <img 
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} 
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                <Youtube className="h-12 w-12 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all" />
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
                onClick={() => openVideo(video.youtubeId)}
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
