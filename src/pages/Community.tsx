import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { moderateContent, checkRateLimit } from '@/utils/aiModeration';
import {
  MessageCircle, Heart, Eye, Plus, Scissors, Anchor, UserX,
  Activity, Briefcase, Users, Clock, Shield, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const CATEGORIES = [
  { id: 'divorce', name: 'Divorce & Separation', icon: Scissors, color: 'bg-blue-100 text-blue-700' },
  { id: 'bereavement', name: 'Bereavement & Loss', icon: Anchor, color: 'bg-purple-100 text-purple-700' },
  { id: 'estrangement', name: 'Family Estrangement', icon: UserX, color: 'bg-orange-100 text-orange-700' },
  { id: 'health', name: 'Health Diagnosis', icon: Activity, color: 'bg-red-100 text-red-700' },
  { id: 'identity', name: 'Loss of Identity', icon: Briefcase, color: 'bg-teal-100 text-teal-700' },
  { id: 'general', name: 'General Support', icon: MessageCircle, color: 'bg-healing-100 text-healing-700' },
];

interface Post {
  id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  status: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  category_id: string | null;
  author_id: string;
  profiles?: { username: string; display_name: string | null };
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general', isAnonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, categoryMap]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('grief_categories').select('id, slug');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((c: any) => { map[c.slug] = c.id; map[c.id] = c.slug; });
      setCategoryMap(map);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('community_posts')
      .select('*, profiles(username, display_name)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(20);

    if (selectedCategory !== 'all' && categoryMap[selectedCategory]) {
      query = query.eq('category_id', categoryMap[selectedCategory]);
    }

    const { data, error } = await query;
    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/auth'); return; }
    if (!newPost.title.trim() || !newPost.content.trim()) { toast.error('Please fill in all fields'); return; }
    if (!checkRateLimit('post', 3)) { toast.error('You are posting too quickly. Please wait a minute.'); return; }

    setSubmitting(true);
    try {
      const modResult = await moderateContent(newPost.content, newPost.title);
      const status = modResult.approved ? 'approved' : 'pending';
      const categoryId = categoryMap[newPost.category] || null;

      const { error } = await supabase.from('community_posts').insert({
        author_id: user.id,
        category_id: categoryId,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        is_anonymous: newPost.isAnonymous,
        status,
        ai_moderation_score: modResult.score,
        ai_moderation_result: modResult.reason,
      });

      if (error) throw error;

      if (status === 'approved') {
        toast.success('Post published successfully!');
        fetchPosts();
      } else {
        toast.info('Your post is under review and will appear shortly.');
      }
      setNewPost({ title: '', content: '', category: 'general', isAnonymous: false });
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit post');
    }
    setSubmitting(false);
  };

  const getCategoryInfo = (categoryId: string | null) => {
    if (!categoryId) return CATEGORIES[5];
    const slug = categoryMap[categoryId];
    return CATEGORIES.find(c => c.id === slug) || CATEGORIES[5];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-healing-900 to-healing-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Forum</h1>
              <p className="text-healing-200">A safe space for men to share, support, and heal together.</p>
            </div>
            {user ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-healing-900 hover:bg-healing-50 font-semibold">
                    <Plus className="w-4 h-4 mr-2" /> New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Share with the Community</DialogTitle></DialogHeader>
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={newPost.category} onValueChange={v => setNewPost(d => ({ ...d, category: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input placeholder="What is on your mind?" value={newPost.title} onChange={e => setNewPost(d => ({ ...d, title: e.target.value }))} maxLength={200} required />
                    </div>
                    <div>
                      <Label>Your message</Label>
                      <Textarea placeholder="Share your thoughts, feelings, or ask for support..." value={newPost.content} onChange={e => setNewPost(d => ({ ...d, content: e.target.value }))} rows={5} maxLength={5000} required />
                      <p className="text-xs text-gray-400 mt-1">{newPost.content.length}/5000</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="anonymous" checked={newPost.isAnonymous} onCheckedChange={v => setNewPost(d => ({ ...d, isAnonymous: v }))} />
                      <Label htmlFor="anonymous" className="cursor-pointer">Post anonymously</Label>
                    </div>
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700">All posts are reviewed by our AI moderation system to keep this a safe space.</p>
                    </div>
                    <Button type="submit" className="w-full bg-healing-600 hover:bg-healing-700 text-white" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Share Post'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Button className="bg-white text-healing-900 hover:bg-healing-50 font-semibold" onClick={() => navigate('/auth?tab=signup')}>Join to Post</Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <button onClick={() => setSelectedCategory('all')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === 'all' ? 'bg-healing-50 text-healing-700 font-medium' : 'text-gray-700'}`}>
                  <Users className="w-4 h-4" /> All Posts {selectedCategory === 'all' && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
                {CATEGORIES.map(({ id, name, icon: Icon }) => (
                  <button key={id} onClick={() => setSelectedCategory(id)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === id ? 'bg-healing-50 text-healing-700 font-medium' : 'text-gray-700'}`}>
                    <Icon className="w-4 h-4" /> {name} {selectedCategory === id && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to share in this community.</p>
                  {user ? (
                    <Button onClick={() => setDialogOpen(true)} className="bg-healing-600 hover:bg-healing-700 text-white"><Plus className="w-4 h-4 mr-2" /> Create First Post</Button>
                  ) : (
                    <Button onClick={() => navigate('/auth?tab=signup')} className="bg-healing-600 hover:bg-healing-700 text-white">Join to Post</Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              posts.map(post => {
                const catInfo = getCategoryInfo(post.category_id);
                const Icon = catInfo.icon;
                const authorName = post.is_anonymous ? 'Anonymous' : (post.profiles?.display_name || post.profiles?.username || 'Member');
                return (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/community/${post.id}`)}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback className="bg-healing-100 text-healing-700 text-sm">
                            {post.is_anonymous ? '?' : authorName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge className={`text-xs ${catInfo.color} border-0`}><Icon className="w-3 h-3 mr-1" />{catInfo.name}</Badge>
                            <span className="text-xs text-gray-400">{authorName}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{post.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.content}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes_count}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments_count}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views_count}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
