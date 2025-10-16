import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, RefreshCw, TrendingUp, Users, Heart, MessageCircle, Share, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLatestSocialStats, SocialStats } from "@/lib/supabase";
import AnalyticsAPI from "@/components/AnalyticsAPI";

const AnalyticsLive: React.FC = () => {
  const [socialStats, setSocialStats] = useState<SocialStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLatestSocialStats();
      setSocialStats(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching social stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'tiktok': return '🎵';
      case 'facebook': return '📘';
      case 'twitter': return '🐦';
      case 'youtube': return '🎥';
      default: return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-500';
      case 'tiktok': return 'from-teal-500 to-green-500';
      case 'facebook': return 'from-blue-600 to-indigo-600';
      case 'twitter': return 'from-gray-800 to-black';
      case 'youtube': return 'from-red-600 to-red-800';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatNumber = (num: number | undefined) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

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
          <div className="flex items-center gap-2">
            <Link to="/hub/upload">
              <Button
                variant="outline"
                size="sm"
                className="text-scrummy-navy border-scrummy-navy hover:bg-scrummy-navy hover:text-white"
              >
                Upload JSON
              </Button>
            </Link>
            <Button
              onClick={fetchData}
              disabled={loading}
              variant="outline"
              size="sm"
              className="text-scrummy-navy border-scrummy-navy hover:bg-scrummy-navy hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-4">
              Live <span className="text-scrummy-goldYellow">Social Media</span> Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Real-time performance metrics across all platforms
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <span>•</span>
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg max-w-md mx-auto">
              <div className="flex gap-2">
                <Link
                  to="/hub/live"
                  className="px-4 py-2 rounded-lg bg-scrummy-goldYellow text-scrummy-navy font-semibold shadow-md"
                >
                  Live
                </Link>
                <Link
                  to="/hub/history"
                  className="px-4 py-2 rounded-lg text-scrummy-navy hover:bg-scrummy-goldYellow/20 transition-colors"
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

          {/* Platform Cards */}
          {socialStats.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-8">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-bold text-scrummy-navy mb-4 font-orbitron">
                  No Data Yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Start tracking your social media performance by adding your first stats.
                </p>
                <p className="text-sm text-gray-500">
                  Use the API Testing section below to add sample data, or integrate with your social media platforms.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {socialStats.map((stat) => (
              <div key={stat.id}>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6">
                    {/* Platform Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getPlatformColor(stat.platform)} flex items-center justify-center text-white text-xl`}>
                          {getPlatformIcon(stat.platform)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg capitalize">{stat.platform}</h3>
                          <p className="text-sm text-gray-500">@{stat.platform.toLowerCase()}_scrummy</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Live</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Followers</span>
                        </div>
                        <div className="text-2xl font-bold text-scrummy-navy">
                          {formatNumber(stat.followers)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">Engagement</span>
                        </div>
                        <div className="text-2xl font-bold text-scrummy-navy">
                          {stat.engagement_rate.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm">Likes</span>
                        </div>
                        <span className="font-semibold">{formatNumber(stat.likes)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Comments</span>
                        </div>
                        <span className="font-semibold">{formatNumber(stat.comments)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Share className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Shares</span>
                        </div>
                        <span className="font-semibold">{formatNumber(stat.shares)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">Views</span>
                        </div>
                        <span className="font-semibold">{formatNumber(stat.views)}</span>
                      </div>
                    </div>

                    {/* Posts Today */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Posts today</span>
                        <span className="font-semibold">{stat.posts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            </div>
          )}

          {/* Summary Stats */}
          {socialStats.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                Total Reach Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-scrummy-navy mb-2">
                    {formatNumber(socialStats.reduce((sum, stat) => sum + stat.followers, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-scrummy-navy mb-2">
                    {formatNumber(socialStats.reduce((sum, stat) => sum + stat.likes, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-scrummy-navy mb-2">
                    {formatNumber(socialStats.reduce((sum, stat) => sum + stat.comments, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-scrummy-navy mb-2">
                    {formatNumber(socialStats.reduce((sum, stat) => sum + stat.posts, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Posts Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* API Testing Section */}
          <AnalyticsAPI />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsLive;
