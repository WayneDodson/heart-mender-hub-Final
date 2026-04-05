import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart, Users, BookOpen, Shield, ArrowRight, Star,
  Anchor, Scissors, UserX, Activity, Briefcase, MessageCircle
} from 'lucide-react';
import SEO from '@/components/SEO';

const griefCategories = [
  {
    icon: Scissors,
    title: 'Divorce & Separation',
    description: 'Navigating the end of a marriage, co-parenting challenges, and rebuilding your identity.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    count: '2.4k members',
    path: '/community',
  },
  {
    icon: Anchor,
    title: 'Bereavement & Loss',
    description: 'Processing the loss of a loved one, finding meaning, and moving forward with grief.',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
    count: '1.8k members',
    path: '/community',
  },
  {
    icon: UserX,
    title: 'Family Estrangement',
    description: 'Dealing with estrangement from parents, siblings, or children and the unique pain it brings.',
    color: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-50',
    count: '1.2k members',
    path: '/community',
  },
  {
    icon: Activity,
    title: 'Health Diagnosis',
    description: 'Facing a serious health diagnosis, chronic illness, and the emotional weight that comes with it.',
    color: 'from-red-500 to-red-700',
    bg: 'bg-red-50',
    count: '980 members',
    path: '/community',
  },
  {
    icon: Briefcase,
    title: 'Loss of Identity',
    description: 'Redundancy, retirement, or career loss — when your sense of purpose feels stripped away.',
    color: 'from-teal-500 to-teal-700',
    bg: 'bg-teal-50',
    count: '750 members',
    path: '/community',
  },
  {
    icon: MessageCircle,
    title: 'General Support',
    description: 'A space for anything that doesn\'t fit neatly into a category. All grief is valid here.',
    color: 'from-healing-500 to-healing-700',
    bg: 'bg-healing-50',
    count: '3.1k members',
    path: '/community',
  },
];

const stats = [
  { value: '10,000+', label: 'Men Supported' },
  { value: '50,000+', label: 'Stories Shared' },
  { value: '24/7', label: 'Community Access' },
  { value: '100%', label: 'Safe & Moderated' },
];

const testimonials = [
  {
    quote: "I thought I had to deal with my divorce alone. Finding this community changed everything. These men actually get it.",
    name: "James, 42",
    category: "Divorce",
  },
  {
    quote: "After losing my dad, I didn't know how to grieve as a man. The resources here helped me understand it's okay to feel.",
    name: "Marcus, 38",
    category: "Bereavement",
  },
  {
    quote: "My health diagnosis left me feeling isolated. This community reminded me I'm not defined by my illness.",
    name: "David, 55",
    category: "Health",
  },
];

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Heart Mender Hub — Men's Grief & Healing Community"
        description="A safe, supportive community for men navigating divorce, bereavement, estrangement, health challenges and more. Real stories, expert resources, and men who understand."
      />
      <div className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-healing-900 via-healing-800 to-healing-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-healing-600/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-healing-400/10 rounded-full blur-2xl" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1">
                Men's Grief & Healing Community
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                You don't have to carry this
                <span className="text-healing-300"> alone.</span>
              </h1>
              <p className="text-xl md:text-2xl text-healing-100 mb-8 leading-relaxed max-w-2xl">
                A safe space built for men navigating divorce, loss, estrangement, and life's hardest moments. Real support. Real stories. Real healing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Button
                      size="lg"
                      className="bg-white text-healing-900 hover:bg-healing-50 font-bold text-lg px-8"
                      onClick={() => navigate('/community')}
                    >
                      Join the Community <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/50 text-white hover:bg-white/10 font-semibold text-lg px-8"
                      onClick={() => navigate('/stories')}
                    >
                      Read Stories
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-white text-healing-900 hover:bg-healing-50 font-bold text-lg px-8"
                      onClick={() => navigate('/auth?tab=signup')}
                    >
                      Join Free Today <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/50 text-white hover:bg-white/10 font-semibold text-lg px-8"
                      onClick={() => navigate('/auth?tab=signin')}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-healing-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-healing-200">{value}</div>
                  <div className="text-sm text-healing-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grief Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-healing-100 text-healing-700 border-healing-200 mb-4">Community Areas</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Find Your Community
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every man's grief is different. Find the space that speaks to your experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {griefCategories.map(({ icon: Icon, title, description, color, bg, count, path }) => (
                <Link key={title} to={path}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden group cursor-pointer">
                    <CardContent className="p-0">
                      <div className={`h-2 bg-gradient-to-r ${color}`} />
                      <div className="p-6">
                        <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 bg-gradient-to-r ${color} bg-clip-text`} style={{ color: color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#a855f7' : color.includes('orange') ? '#f97316' : color.includes('red') ? '#ef4444' : color.includes('teal') ? '#14b8a6' : '#6A5ACD' }} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {count}
                          </span>
                          <span className="text-sm text-healing-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Join <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Heart Mender */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-healing-100 text-healing-700 border-healing-200 mb-4">Why Heart Mender</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Built for men, by someone who understands.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Heart Mender Hub was born from a personal experience of going through divorce without adequate support. Men are often expected to "just get on with it" — but grief doesn't work that way. This is a space where vulnerability is strength.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Shield, title: 'Safe & Moderated', desc: 'Every post is reviewed by AI and our moderation team to keep this a genuine safe space.' },
                    { icon: Users, title: 'Men Who Understand', desc: 'Connect with others who have walked similar paths and come out the other side.' },
                    { icon: BookOpen, title: 'Expert Resources', desc: 'Curated articles, books, exercises, and professional guidance tailored for men.' },
                    { icon: Heart, title: 'No Judgement', desc: 'Whether you\'re in crisis or just need to talk — all emotions are welcome here.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-healing-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-healing-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{title}</h4>
                        <p className="text-gray-600 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-healing-50 to-healing-100 rounded-3xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-healing-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" fill="white" />
                  </div>
                  <h3 className="text-2xl font-bold text-healing-900">Start Your Journey</h3>
                  <p className="text-healing-700 mt-2">Join thousands of men who have found their footing again.</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-healing-600 hover:bg-healing-700 text-white font-semibold py-3" onClick={() => navigate(user ? '/community' : '/auth?tab=signup')}>
                    {user ? 'Go to Community' : 'Create Free Account'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full border-healing-300 text-healing-700 hover:bg-healing-50" onClick={() => navigate('/stories')}>
                    Read Healing Stories
                  </Button>
                  <Button variant="ghost" className="w-full text-healing-600 hover:bg-healing-50" onClick={() => navigate('/resources')}>
                    Browse Resources
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-healing-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">Real Stories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Men Who Found Their Way</h2>
              <p className="text-healing-200 text-xl max-w-2xl mx-auto">
                Healing is possible. These men are proof.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(({ quote, name, category }) => (
                <div key={name} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-healing-100 leading-relaxed mb-6 italic">"{quote}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{name}</span>
                    <Badge className="bg-healing-600/50 text-healing-200 border-healing-500/50 text-xs">{category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to take the first step?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Joining is free. Your privacy is protected. And you'll never have to explain yourself — because the men here already understand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-healing-600 hover:bg-healing-700 text-white font-bold text-lg px-10"
                  onClick={() => navigate(user ? '/community' : '/auth?tab=signup')}
                >
                  {user ? 'Go to Community' : 'Join Heart Mender Free'} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-healing-300 text-healing-700 hover:bg-healing-50 font-semibold text-lg px-10"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Index;
