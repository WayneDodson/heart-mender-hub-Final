import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, MessageSquare, BookOpen, TrendingUp, Heart, Clock, Shield } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalStories: number;
  pendingStories: number;
  newUsersThisWeek: number;
  newPostsThisWeek: number;
  recentActivity: { type: string; content: string; time: string }[];
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const AdminAnalytics: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    totalStories: 0,
    pendingStories: 0,
    newUsersThisWeek: 0,
    newPostsThisWeek: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weekAgoISO = oneWeekAgo.toISOString();

        const [
          usersRes,
          postsRes,
          commentsRes,
          storiesRes,
          pendingRes,
          newUsersRes,
          newPostsRes,
        ] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('community_posts').select('id', { count: 'exact', head: true }),
          supabase.from('comments').select('id', { count: 'exact', head: true }),
          supabase.from('stories').select('id', { count: 'exact', head: true }),
          supabase.from('stories').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', weekAgoISO),
          supabase.from('community_posts').select('id', { count: 'exact', head: true }).gte('created_at', weekAgoISO),
        ]);

        // Recent activity — last 5 posts
        const { data: recentPosts } = await supabase
          .from('community_posts')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        const recentActivity = (recentPosts || []).map((p: any) => ({
          type: 'post',
          content: p.title || 'Untitled post',
          time: new Date(p.created_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
          }),
        }));

        setStats({
          totalUsers: usersRes.count ?? 0,
          totalPosts: postsRes.count ?? 0,
          totalComments: commentsRes.count ?? 0,
          totalStories: storiesRes.count ?? 0,
          pendingStories: pendingRes.count ?? 0,
          newUsersThisWeek: newUsersRes.count ?? 0,
          newPostsThisWeek: newPostsRes.count ?? 0,
          recentActivity,
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#6A5ACD] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Community Overview</h2>
        <p className="text-sm text-gray-500">Real-time stats from your Heart Mender Hub community</p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Members"
          value={stats.totalUsers}
          sub={`+${stats.newUsersThisWeek} this week`}
          color="bg-[#6A5ACD]"
        />
        <StatCard
          icon={MessageSquare}
          label="Community Posts"
          value={stats.totalPosts}
          sub={`+${stats.newPostsThisWeek} this week`}
          color="bg-[#008080]"
        />
        <StatCard
          icon={FileText}
          label="Comments"
          value={stats.totalComments}
          color="bg-blue-500"
        />
        <StatCard
          icon={BookOpen}
          label="Stories Submitted"
          value={stats.totalStories}
          sub={stats.pendingStories > 0 ? `${stats.pendingStories} awaiting review` : 'All reviewed'}
          color="bg-rose-500"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={TrendingUp}
          label="New Members This Week"
          value={stats.newUsersThisWeek}
          color="bg-emerald-500"
        />
        <StatCard
          icon={Shield}
          label="Pending Story Reviews"
          value={stats.pendingStories}
          sub="Awaiting AI moderation"
          color="bg-amber-500"
        />
        <StatCard
          icon={Heart}
          label="Total Engagement"
          value={stats.totalPosts + stats.totalComments}
          sub="Posts + comments combined"
          color="bg-pink-500"
        />
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#6A5ACD]" />
          <h3 className="font-semibold text-gray-800">Recent Community Activity</h3>
        </div>
        {stats.recentActivity.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No activity yet — be the first to post!</p>
        ) : (
          <div className="space-y-3">
            {stats.recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-[#6A5ACD] mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{item.content}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <span className="text-xs bg-[#6A5ACD]/10 text-[#6A5ACD] px-2 py-0.5 rounded-full capitalize flex-shrink-0">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Google Analytics link */}
      <div className="bg-gradient-to-r from-[#6A5ACD]/10 to-[#008080]/10 rounded-xl p-5 border border-[#6A5ACD]/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[#6A5ACD] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Full Traffic Analytics</h3>
            <p className="text-sm text-gray-600 mb-3">
              Google Analytics 4 is active on your site. View detailed traffic, visitor demographics, page performance, and conversion data.
            </p>
            <a
              href="https://analytics.google.com/analytics/web/#/p{your-property-id}/reports/reportinghub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#6A5ACD] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#5949ab] transition-colors"
              onClick={() => window.open('https://analytics.google.com', '_blank')}
            >
              Open Google Analytics →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
