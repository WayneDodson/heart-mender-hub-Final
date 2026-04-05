import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Users, BookOpen, Shield, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SEO from '@/components/SEO';

const FEATURED_RESOURCES = [
  {
    source: 'Psychology Today',
    title: 'The Five Stages of Grief: What They Really Mean',
    excerpt: "Understanding Kübler-Ross's model and how it applies to modern grief experiences.",
    url: 'https://www.psychologytoday.com/us/basics/grief',
    category: 'Grief',
  },
  {
    source: 'Psychology Today',
    title: 'How to Rebuild Your Identity After Divorce',
    excerpt: 'Practical strategies for rediscovering who you are when a major relationship ends.',
    url: 'https://www.psychologytoday.com/us/basics/divorce',
    category: 'Divorce',
  },
  {
    source: 'Mind.org.uk',
    title: 'Coping With Bereavement',
    excerpt: 'Guidance on processing loss and finding support when someone you love dies.',
    url: 'https://www.mind.org.uk/information-support/guides-to-support-and-services/bereavement/',
    category: 'Bereavement',
  },
  {
    source: 'Verywell Mind',
    title: 'Understanding Complicated Grief',
    excerpt: 'When grief becomes prolonged — signs to watch for and how to seek help.',
    url: 'https://www.verywellmind.com/complicated-grief-4688671',
    category: 'Mental Health',
  },
];

const GRIEF_CATEGORIES = [
  {
    icon: 'heart',
    color: 'text-[#FF6F61]',
    title: 'Emotional Support',
    description: 'Connect with others who understand your journey and find strength in shared experiences.',
    sources: [
      { name: 'Mindful Healing', desc: 'Meditation and mindfulness practices for emotional healing' },
      { name: 'Psychology Today', desc: 'Expert advice on recovery after divorce' },
    ],
    href: '/community',
  },
  {
    icon: 'shield',
    color: 'text-[#8FBC8F]',
    title: 'Trusted Resources',
    description: 'Access curated content, expert advice, and practical tools for moving forward.',
    sources: [
      { name: 'Mind.org.uk', desc: 'Mental health support and guidance' },
      { name: 'Verywell Mind', desc: 'Evidence-based mental health information' },
    ],
    href: '/resources',
  },
  {
    icon: 'users',
    color: 'text-[#6A5ACD]',
    title: 'Community',
    description: 'A safe, moderated space to share, listen, and grow alongside others on similar journeys.',
    sources: [
      { name: 'Peer Support', desc: 'Connect with community members who understand' },
      { name: 'Group Discussions', desc: 'Topic-focused conversations and shared experiences' },
    ],
    href: '/community',
  },
  {
    icon: 'book',
    color: 'text-[#008080]',
    title: 'Stories',
    description: 'Real stories of healing and hope — submitted by community members and vetted for safety.',
    sources: [
      { name: 'Member Stories', desc: 'Authentic journeys of grief and recovery' },
      { name: 'Expert Columns', desc: 'Guidance from therapists and counsellors' },
    ],
    href: '/stories',
  },
  {
    icon: 'heart',
    color: 'text-[#FF6F61]',
    title: 'Self-Care',
    description: 'Practical tools, exercises, and routines to support your wellbeing during difficult times.',
    sources: [
      { name: 'Headspace', desc: 'Guided meditation and sleep support' },
      { name: 'NHS Every Mind Matters', desc: 'Free mental health tools and resources' },
    ],
    href: '/resources',
  },
  {
    icon: 'star',
    color: 'text-[#6A5ACD]',
    title: 'General Support',
    description: "A space for anything that doesn't fit neatly into a category. All grief is valid here.",
    sources: [
      { name: 'Cruse Bereavement', desc: "UK's leading bereavement charity" },
      { name: 'Samaritans', desc: '24/7 emotional support — call 116 123' },
    ],
    href: '/community',
  },
];

const IconMap: Record<string, React.FC<{ className?: string }>> = {
  heart: ({ className }) => <Heart className={className} />,
  shield: ({ className }) => <Shield className={className} />,
  users: ({ className }) => <Users className={className} />,
  book: ({ className }) => <BookOpen className={className} />,
  star: ({ className }) => <Star className={className} />,
};

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    GRIEF_CATEGORIES.forEach((_, i) => {
      setTimeout(() => setVisibleCards(prev => [...prev, i]), i * 120);
    });
  }, []);

  return (
    <>
      <SEO
        title="Heart Mender Hub — Healing After Grief, Divorce & Loss"
        description="A safe, supportive community for anyone navigating grief, divorce, bereavement, estrangement, or life's hardest moments. Real support. Real stories. Real healing."
        url="https://heartmenderhub.com"
      />

      {/* Hero */}
      <section className="w-full bg-background py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6A5ACD] mb-5 leading-tight animate-fade-up">
            Your Journey to Healing Starts Here
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-up">
            Join our supportive community and access valuable resources to help you navigate grief, divorce, loss, and life's most challenging moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up">
            <Button
              className="healing-button text-base px-8 py-3 shimmer-border"
              onClick={() => navigate(user ? '/community' : '/auth?tab=signup')}
            >
              Begin Your Journey →
            </Button>
            {!user && (
              <Button
                variant="outline"
                className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD]/5 text-base px-8 py-3"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="w-full bg-background px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRIEF_CATEGORIES.map((cat, i) => {
              const IconComp = IconMap[cat.icon];
              return (
                <Link
                  key={cat.title}
                  to={cat.href}
                  className={`animated-card p-6 block transition-all duration-500 ${
                    visibleCards.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="mb-4">
                    <IconComp className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#6A5ACD] mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cat.description}</p>
                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    {cat.sources.map(s => (
                      <div key={s.name} className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-gray-800 whitespace-nowrap">{s.name}</span>
                        <span className="text-gray-500">- {s.desc}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted Sources */}
      <section className="w-full bg-white/60 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#008080] bg-[#008080]/10 px-3 py-1 rounded-full">
              Trusted Sources
            </span>
            <h2 className="text-3xl font-bold text-[#6A5ACD] mt-4 mb-2">
              Insights from Leading Experts
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Curated content from Psychology Today, Mind.org.uk, Verywell Mind, and other trusted mental health authorities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_RESOURCES.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="animated-card p-6 flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6A5ACD]">{res.source}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{res.category}</span>
                </div>
                <h4 className="font-semibold text-gray-800 group-hover:text-[#6A5ACD] transition-colors leading-snug">
                  {res.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{res.excerpt}</p>
                <div className="flex items-center gap-1 text-[#008080] text-xs font-medium mt-auto">
                  Read article <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/resources">
              <Button variant="outline" className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD]/5">
                Browse All Resources <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Heart Mender */}
      <section className="w-full bg-background py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6A5ACD] bg-[#6A5ACD]/10 px-3 py-1 rounded-full">
              Why Heart Mender
            </span>
            <h2 className="text-3xl font-bold text-[#6A5ACD] mt-4 mb-2">Built from personal experience.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Heart Mender Hub was born from going through divorce without adequate support. We believe no one should face grief alone — whatever form it takes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'shield', color: 'text-[#8FBC8F]', title: 'Safe & Moderated', desc: 'Every post is reviewed by AI and our team to keep this a genuine safe space.' },
              { icon: 'users', color: 'text-[#6A5ACD]', title: 'Real Community', desc: 'Connect with others who have walked similar paths and come out the other side.' },
              { icon: 'book', color: 'text-[#008080]', title: 'Expert Resources', desc: 'Curated articles, books, exercises, and professional guidance.' },
              { icon: 'heart', color: 'text-[#FF6F61]', title: 'No Judgement', desc: "Whether you're in crisis or just need to talk — all emotions are welcome here." },
            ].map((item, i) => {
              const IC = IconMap[item.icon];
              return (
                <div key={i} className="animated-card p-5 text-center">
                  <div className="flex justify-center mb-3"><IC className={`w-6 h-6 ${item.color}`} /></div>
                  <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-gradient-to-r from-[#6A5ACD]/10 via-[#008080]/10 to-[#8FBC8F]/10 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#6A5ACD] mb-4">Ready to take the first step?</h2>
          <p className="text-gray-600 mb-8">
            Joining is free. Your privacy is protected. And you'll never have to explain yourself — because the community here already understands.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="healing-button text-base px-8 py-3 shimmer-border"
              onClick={() => navigate(user ? '/community' : '/auth?tab=signup')}
            >
              {user ? 'Go to Community' : 'Join Heart Mender Free'}
            </Button>
            <Button
              variant="outline"
              className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD]/5 text-base px-8 py-3"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
