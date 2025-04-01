
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

type CelebrityStory = {
  id: string;
  name: string;
  title: string;
  summary: string;
  image?: string;
};

const celebrityStories: CelebrityStory[] = [
  {
    id: "maria-shriver",
    name: "Maria Shriver",
    title: "Finding Strength Through Creative Expression",
    summary: "Maria Shriver navigated her divorce from Arnold Schwarzenegger by focusing on personal growth, healing, and self-discovery. She channeled her emotions into writing and released her first poetry book, 'I Am Maria', which explores themes of self-worth, resilience, and reinvention. Shriver prioritized forgiveness, allowing her to maintain a positive and supportive relationship with Schwarzenegger for the sake of their family. She embraced this chapter of her life as an opportunity for transformation, finding peace and fulfillment in her independence. Her journey highlights the importance of self-reflection, creativity, and emotional healing in overcoming life's challenges.",
    image: "https://ca-times.brightspotcdn.com/dims4/default/191539e/2147483647/strip/true/crop/2400x3000+0+0/resize/1200x1500!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F0e%2F23%2F9bc1c93e4985952df1614d2ce807%2Fla-tr-shriver-portrait-3.JPG"
  },
  {
    id: "michelle-obama",
    name: "Michelle Obama",
    title: "Marriage Counseling and Open Communication",
    summary: "While not divorced, Michelle Obama has been open about the challenges in her marriage with Barack Obama. In her memoir 'Becoming', she revealed they sought marriage counseling during tough times. She emphasized how therapy helped them communicate better and understand each other's perspectives. Michelle advocates that seeking professional help isn't a sign of failure but a tool for growth. Her transparency about working through marital difficulties has helped normalize therapy and counseling for couples.",
    image: "public/lovable-uploads/41fea336-d7ae-4f85-aa61-0e4c2bc6a055.png"
  },
  {
    id: "halle-berry",
    name: "Halle Berry",
    title: "Resilience Through Multiple Relationships",
    summary: "Halle Berry has been through several divorces and publicly difficult breakups. She has spoken about how each relationship taught her something valuable about herself. Berry focused on her daughter and her career after her divorces, finding purpose in motherhood and creative expression. She has been open about working through her relationship patterns through therapy and self-reflection. Her journey emphasizes resilience and the willingness to learn and grow from past relationships.",
    image: "public/lovable-uploads/ae94175c-1b09-4d62-81c8-e2b6e33c5da3.png"
  }
];

const CelebrityStories: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-healing-900">Celebrity Healing Journeys</h2>
        <p className="text-lg text-gray-700 mb-10">
          Even celebrities face the challenges of breakups and divorces. These public figures have shared their stories of healing and growth, 
          offering insights that might help in your own journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {celebrityStories.map((story) => (
            <Card key={story.id} className="overflow-hidden h-full flex flex-col">
              {story.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{story.name}</CardTitle>
                <CardDescription>{story.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">{story.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebrityStories;
