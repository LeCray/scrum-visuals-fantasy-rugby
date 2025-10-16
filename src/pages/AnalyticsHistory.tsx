import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistoricalSocialStats, SocialStats } from "@/lib/supabase";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AnalyticsHistory: React.FC = () => {
  const [socialStats, setSocialStats] = useState<SocialStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const data = await getHistoricalSocialStats(days);
      setSocialStats(data);
    } catch (error) {
      console.error('Error fetching historical stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process data for charts
  const processFollowerData = () => {
    const platformData: { [key: string]: any[] } = {};
    
    socialStats.forEach(stat => {
      if (!platformData[stat.platform]) {
        platformData[stat.platform] = [];
      }
      platformData[stat.platform].push({
        date: stat.date,
        followers: stat.followers || 0,
        engagement: stat.engagement_rate || 0
      });
    });

    return platformData;
  };

  const processEngagementData = () => {
    const engagementByPlatform: { [key: string]: number } = {};
    
    socialStats.forEach(stat => {
      const platform = stat.platform;
      const engagement = stat.engagement_rate || 0;
      
      if (!engagementByPlatform[platform]) {
        engagementByPlatform[platform] = 0;
      }
      engagementByPlatform[platform] += engagement;
    });

    // Calculate average engagement per platform
    Object.keys(engagementByPlatform).forEach(platform => {
      const platformStats = socialStats.filter(s => s.platform === platform);
      engagementByPlatform[platform] = engagementByPlatform[platform] / platformStats.length;
    });

    return Object.entries(engagementByPlatform).map(([platform, engagement]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      engagement: Number(engagement.toFixed(1))
    }));
  };

  const processWeeklyData = () => {
    const weeklyStats: { [key: string]: { followers: number; engagement: number; posts: number } } = {};
    
    socialStats.forEach(stat => {
      const week = getWeekNumber(new Date(stat.date));
      if (!weeklyStats[week]) {
        weeklyStats[week] = { followers: 0, engagement: 0, posts: 0 };
      }
      weeklyStats[week].followers += stat.followers || 0;
      weeklyStats[week].engagement += stat.engagement_rate || 0;
      weeklyStats[week].posts += stat.posts || 0;
    });

    return Object.entries(weeklyStats).map(([week, data]) => ({
      week: `Week ${week}`,
      followers: data.followers,
      engagement: Number((data.engagement / socialStats.filter(s => getWeekNumber(new Date(s.date)) === week).length).toFixed(1)),
      posts: data.posts
    }));
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '#E4405F';
      case 'tiktok': return '#000000';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#1DA1F2';
      case 'youtube': return '#FF0000';
      default: return '#6B7280';
    }
  };

  const COLORS = ['#E4405F', '#000000', '#1877F2', '#1DA1F2', '#FF0000', '#6B7280'];

  const followerData = processFollowerData();
  const engagementData = processEngagementData();
  const weeklyData = processWeeklyData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" alt="SCRUMMY" className="h-10" />
            <span className="font-orbitron font-bold text-scrummy-navy">Analytics Hub</span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-4">
              Historical <span className="text-scrummy-goldYellow">Analytics</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Track performance trends and growth patterns
            </p>
            
            {/* Time Range Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                <div className="flex gap-2">
                  {(['7d', '30d', '90d'] as const).map((range) => (
                    <Button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      variant={timeRange === range ? "default" : "ghost"}
                      className={timeRange === range 
                        ? "bg-scrummy-goldYellow text-scrummy-navy font-semibold shadow-md" 
                        : "text-scrummy-navy hover:bg-scrummy-goldYellow/20"
                      }
                    >
                      {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg max-w-md mx-auto">
              <div className="flex gap-2">
                <Link
                  to="/hub/live"
                  className="px-4 py-2 rounded-lg text-scrummy-navy hover:bg-scrummy-goldYellow/20 transition-colors"
                >
                  Live
                </Link>
                <Link
                  to="/hub/history"
                  className="px-4 py-2 rounded-lg bg-scrummy-goldYellow text-scrummy-navy font-semibold shadow-md"
                >
                  History
                </Link>
                <Link
                  to="/hub/weekly"
                  className="px-4 py-2 rounded-lg text-scrummy-navy hover:bg-scrummy-goldYellow/20 transition-colors"
                >
                  Weekly
                </Link>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scrummy-navy mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading historical data...</p>
            </div>
          ) : socialStats.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📈</div>
                <h2 className="text-2xl font-bold text-scrummy-navy mb-4 font-orbitron">
                  No Historical Data
                </h2>
                <p className="text-gray-600 mb-6">
                  Add social media stats to see trends and analytics over time.
                </p>
                <p className="text-sm text-gray-500">
                  Go to the Live Dashboard to add your first data points.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Follower Growth Chart */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                    Follower Growth Over Time
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={Object.values(followerData).flat()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px'
                          }} 
                        />
                        {Object.keys(followerData).map((platform, index) => (
                          <Line
                            key={platform}
                            type="monotone"
                            dataKey="followers"
                            stroke={getPlatformColor(platform)}
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            data={followerData[platform]}
                            name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Rate Chart */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                    Average Engagement Rate by Platform
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={engagementData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="platform" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px'
                            }} 
                          />
                          <Bar dataKey="engagement" fill="#FFC700" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={engagementData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ platform, engagement }) => `${platform}: ${engagement}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="engagement"
                          >
                            {engagementData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px'
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Performance */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                    Weekly Performance Summary
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="week" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area
                          type="monotone"
                          dataKey="followers"
                          stackId="1"
                          stroke="#FFC700"
                          fill="#FFC700"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="posts"
                          stackId="2"
                          stroke="#1E3A70"
                          fill="#1E3A70"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                    Performance Insights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(followerData).map(([platform, data]) => {
                      const firstData = data[0];
                      const lastData = data[data.length - 1];
                      const growth = lastData && firstData ? 
                        ((lastData.followers - firstData.followers) / firstData.followers * 100) : 0;
                      
                      return (
                        <div key={platform} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-lg capitalize">{platform}</h3>
                            <div className={`flex items-center gap-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              <span className="text-sm font-medium">{Math.abs(growth).toFixed(1)}%</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Followers:</span>
                              <span className="font-semibold">{lastData?.followers?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Growth:</span>
                              <span className={`font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsHistory;
