import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown, Users, Eye, Heart, Calendar, Clock, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface InstagramAnalytics {
  id: string;
  snapshot_date: string;
  profile_visits?: number;
  external_link_taps?: number;
  followers_count?: number;
  most_active_day?: string;
  most_active_hour?: string;
  most_active_hour_count?: number;
  total_views?: number;
  accounts_reached?: number;
  posts_view_pct?: number;
  reels_view_pct?: number;
  stories_view_pct?: number;
  interactions_total?: number;
  posts_interaction_pct?: number;
  reels_interaction_pct?: number;
  stories_interaction_pct?: number;
  followers_view_pct?: number;
  non_followers_view_pct?: number;
  followers_interaction_pct?: number;
  non_followers_interaction_pct?: number;
}

const COLORS = ['#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

const InstagramDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<InstagramAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestData, setLatestData] = useState<InstagramAnalytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_analytics')
        .select('*')
        .order('snapshot_date', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setAnalytics(data);
        setLatestData(data[data.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching Instagram analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate growth
  const calculateGrowth = (field: keyof InstagramAnalytics) => {
    if (analytics.length < 2) return null;
    const latest = analytics[analytics.length - 1];
    const previous = analytics[analytics.length - 2];
    const latestVal = latest[field] as number;
    const prevVal = previous[field] as number;
    if (!latestVal || !prevVal) return null;
    return ((latestVal - prevVal) / prevVal * 100).toFixed(1);
  };

  // Prepare data for content type views
  const contentViewData = latestData && (latestData.posts_view_pct || latestData.reels_view_pct || latestData.stories_view_pct) ? [
    ...(latestData.posts_view_pct ? [{ name: 'Posts', value: latestData.posts_view_pct }] : []),
    ...(latestData.reels_view_pct ? [{ name: 'Reels', value: latestData.reels_view_pct }] : []),
    ...(latestData.stories_view_pct ? [{ name: 'Stories', value: latestData.stories_view_pct }] : [])
  ] : [];

  // Prepare data for content type interactions
  const contentInteractionData = latestData && (latestData.posts_interaction_pct || latestData.reels_interaction_pct || latestData.stories_interaction_pct) ? [
    ...(latestData.posts_interaction_pct ? [{ name: 'Posts', value: latestData.posts_interaction_pct }] : []),
    ...(latestData.reels_interaction_pct ? [{ name: 'Reels', value: latestData.reels_interaction_pct }] : []),
    ...(latestData.stories_interaction_pct ? [{ name: 'Stories', value: latestData.stories_interaction_pct }] : [])
  ] : [];

  // Prepare timeline data
  const timelineData = analytics.map(item => ({
    date: new Date(item.snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    followers: item.followers_count || 0,
    views: item.total_views || 0,
    interactions: item.interactions_total || 0,
    profile_visits: item.profile_visits || 0
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-pink-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!latestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/hub/live" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Hub</span>
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">No Data Yet</h3>
              <p className="text-gray-600 mb-6">Add your first Instagram analytics data to get started</p>
              <Link to="/hub/upload">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Add Instagram Data
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const followerGrowth = calculateGrowth('followers_count');
  const viewGrowth = calculateGrowth('total_views');
  const interactionGrowth = calculateGrowth('interactions_total');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/hub/live" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" alt="SCRUMMY" className="h-10" />
            <span className="font-orbitron font-bold text-scrummy-navy">Instagram Analytics</span>
          </div>
          <Link to="/hub/upload">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Add Data
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-2">
              📸 Instagram <span className="text-pink-600">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-600">
              Latest snapshot: {new Date(latestData.snapshot_date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-pink-600" />
                  {followerGrowth && (
                    <div className={`flex items-center gap-1 text-sm ${parseFloat(followerGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {parseFloat(followerGrowth) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(parseFloat(followerGrowth))}%
                    </div>
                  )}
                </div>
                <p className="text-3xl font-bold text-scrummy-navy">{latestData.followers_count?.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Total Followers</p>
              </CardContent>
            </Card>

            {latestData.total_views !== null && latestData.total_views !== undefined && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-8 h-8 text-purple-600" />
                    {viewGrowth && (
                      <div className={`flex items-center gap-1 text-sm ${parseFloat(viewGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(viewGrowth) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(parseFloat(viewGrowth))}%
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-scrummy-navy">{latestData.total_views?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Views</p>
                </CardContent>
              </Card>
            )}

            {latestData.interactions_total !== null && latestData.interactions_total !== undefined && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Heart className="w-8 h-8 text-red-600" />
                    {interactionGrowth && (
                      <div className={`flex items-center gap-1 text-sm ${parseFloat(interactionGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(interactionGrowth) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(parseFloat(interactionGrowth))}%
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-scrummy-navy">{latestData.interactions_total?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Interactions</p>
                </CardContent>
              </Card>
            )}

            {latestData.accounts_reached !== null && latestData.accounts_reached !== undefined && (
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-cyan-600" />
                  </div>
                  <p className="text-3xl font-bold text-scrummy-navy">{latestData.accounts_reached?.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Accounts Reached</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Audience Insights */}
          {(latestData.most_active_day || latestData.most_active_hour) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {latestData.most_active_day && (
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-pink-600" />
                      Most Active Day
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-5xl font-bold text-pink-600 mb-2">{latestData.most_active_day}</p>
                      <p className="text-gray-600">Peak follower activity</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {latestData.most_active_hour && (
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      Most Active Hour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-5xl font-bold text-purple-600 mb-2">{latestData.most_active_hour}</p>
                      {latestData.most_active_hour_count && (
                        <p className="text-gray-600">{latestData.most_active_hour_count} followers active</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Content Performance */}
          {(contentViewData.length > 0 || contentInteractionData.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {contentViewData.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle>Views by Content Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={contentViewData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {contentViewData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {contentInteractionData.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle>Interactions by Content Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={contentInteractionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {contentInteractionData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Timeline Charts */}
          {analytics.length > 1 && (
            <>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle>Follower Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="followers" stroke="#ec4899" strokeWidth={2} name="Followers" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle>Engagement Metrics Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {timelineData.some(d => d.views > 0) && (
                        <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} name="Views" />
                      )}
                      {timelineData.some(d => d.interactions > 0) && (
                        <Line type="monotone" dataKey="interactions" stroke="#ec4899" strokeWidth={2} name="Interactions" />
                      )}
                      {timelineData.some(d => d.profile_visits > 0) && (
                        <Line type="monotone" dataKey="profile_visits" stroke="#06b6d4" strokeWidth={2} name="Profile Visits" />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstagramDashboard;








