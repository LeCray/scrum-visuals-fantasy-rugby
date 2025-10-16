import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target,
  Download,
  Share2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLatestSocialStats, SocialStats } from "@/lib/supabase";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AnalyticsWeekly: React.FC = () => {
  const [socialStats, setSocialStats] = useState<SocialStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLatestSocialStats();
      setSocialStats(data);
    } catch (error) {
      console.error('Error fetching weekly stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!contentRef.current || socialStats.length === 0) return;
    
    setExporting(true);
    
    try {
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Capture the content
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 10;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
      }
      
      // Save the PDF
      const date = new Date().toISOString().split('T')[0];
      pdf.save(`SCRUMMY-Weekly-Report-${date}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

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
      case 'instagram': return '#E4405F';
      case 'tiktok': return '#000000';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#1DA1F2';
      case 'youtube': return '#FF0000';
      default: return '#6B7280';
    }
  };

  const formatNumber = (num: number | undefined) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Calculate weekly metrics
  const totalFollowers = socialStats.reduce((sum, stat) => sum + stat.followers, 0);
  const totalEngagement = socialStats.length > 0 
    ? socialStats.reduce((sum, stat) => sum + stat.engagement_rate, 0) / socialStats.length 
    : 0;
  const totalPosts = socialStats.reduce((sum, stat) => sum + stat.posts, 0);
  const totalLikes = socialStats.reduce((sum, stat) => sum + stat.likes, 0);
  const totalComments = socialStats.reduce((sum, stat) => sum + stat.comments, 0);

  // Find top performing platform
  const topPlatform = socialStats.reduce((top, stat) => {
    const currentEngagement = stat.engagement_rate || 0;
    const topEngagement = top.engagement_rate || 0;
    return currentEngagement > topEngagement ? stat : top;
  }, socialStats[0] || {} as SocialStats);

  // Prepare data for charts
  const platformData = socialStats.map(stat => ({
    platform: stat.platform.charAt(0).toUpperCase() + stat.platform.slice(1),
    followers: stat.followers,
    engagement: stat.engagement_rate,
    posts: stat.posts,
    likes: stat.likes,
    color: getPlatformColor(stat.platform)
  }));

  const COLORS = ['#E4405F', '#000000', '#1877F2', '#1DA1F2', '#FF0000', '#6B7280'];

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
            <Button 
              variant="outline" 
              size="sm" 
              className="text-scrummy-navy border-scrummy-navy hover:bg-scrummy-navy hover:text-white"
              onClick={handleExportPDF}
              disabled={exporting || loading || socialStats.length === 0}
            >
              <Download className={`w-4 h-4 mr-2 ${exporting ? 'animate-bounce' : ''}`} />
              {exporting ? 'Exporting...' : 'Export'}
            </Button>
            <Button variant="outline" size="sm" className="text-scrummy-navy border-scrummy-navy hover:bg-scrummy-navy hover:text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto" ref={contentRef}>
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-4">
              Weekly <span className="text-scrummy-goldYellow">Performance</span> Report
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Comprehensive analysis of social media performance
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Week of {new Date().toLocaleDateString()}</span>
              </div>
              <span>•</span>
              <span>Generated automatically</span>
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
                  className="px-4 py-2 rounded-lg text-scrummy-navy hover:bg-scrummy-goldYellow/20 transition-colors"
                >
                  History
                </Link>
                <Link
                  to="/hub/weekly"
                  className="px-4 py-2 rounded-lg bg-scrummy-goldYellow text-scrummy-navy font-semibold shadow-md"
                >
                  Weekly
                </Link>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scrummy-navy mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading weekly report...</p>
            </div>
          ) : socialStats.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-scrummy-navy mb-4 font-orbitron">
                  No Weekly Data
                </h2>
                <p className="text-gray-600 mb-6">
                  Add social media stats to generate your weekly performance report.
                </p>
                <p className="text-sm text-gray-500">
                  Go to the Live Dashboard to add your first data points.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Executive Summary */}
              <Card className="bg-gradient-to-r from-scrummy-navy to-scrummy-blue text-white shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold font-orbitron mb-6 text-center">
                    Executive Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{formatNumber(totalFollowers)}</div>
                      <div className="text-scrummy-lightblue">Total Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{totalEngagement.toFixed(1)}%</div>
                      <div className="text-scrummy-lightblue">Avg. Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{totalPosts}</div>
                      <div className="text-scrummy-lightblue">Posts This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{formatNumber(totalLikes + totalComments)}</div>
                      <div className="text-scrummy-lightblue">Total Interactions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performer */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Award className="w-8 h-8 text-scrummy-goldYellow" />
                    <h2 className="text-2xl font-bold text-scrummy-navy font-orbitron">
                      Top Performing Platform
                    </h2>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">
                      {getPlatformIcon(topPlatform.platform || '')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold capitalize text-scrummy-navy mb-2">
                        {topPlatform.platform}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Highest engagement rate this week with {topPlatform.engagement_rate?.toFixed(1)}% average engagement
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-scrummy-navy">
                            {formatNumber(topPlatform.followers)}
                          </div>
                          <div className="text-sm text-gray-600">Followers</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-scrummy-navy">
                            {topPlatform.posts || 0}
                          </div>
                          <div className="text-sm text-gray-600">Posts Today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Comparison Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                      Followers by Platform
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={platformData}>
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
                          <Bar dataKey="followers" fill="#FFC700" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                      Engagement Distribution
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ platform, engagement }) => `${platform}: ${engagement}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="engagement"
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
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
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Goals & Achievements */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Target className="w-8 h-8 text-scrummy-goldYellow" />
                    <h2 className="text-2xl font-bold text-scrummy-navy font-orbitron">
                      Weekly Goals & Achievements
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-scrummy-navy mb-4">Goals vs Achievements</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm">Post 12+ times across platforms</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-semibold">{totalPosts}/12</span>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm">Maintain 4%+ average engagement</span>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-semibold">{totalEngagement.toFixed(1)}%</span>
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="text-sm">Grow total followers by 5%</span>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-600 font-semibold">+2.3%</span>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-scrummy-navy mb-4">Key Insights</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Instagram</strong> continues to be your strongest platform with the highest engagement rate.
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>TikTok</strong> shows great potential with high engagement but lower follower count.
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Consistent posting</strong> across all platforms has improved overall engagement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Performance Details */}
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-scrummy-navy mb-6 font-orbitron text-center">
                    Platform Performance Details
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-scrummy-navy text-white">
                          <th className="p-3 text-left rounded-l-lg">Platform</th>
                          <th className="p-3 text-center">Followers</th>
                          <th className="p-3 text-center">Engagement</th>
                          <th className="p-3 text-center">Posts</th>
                          <th className="p-3 text-center">Likes</th>
                          <th className="p-3 text-center">Comments</th>
                          <th className="p-3 text-center rounded-r-lg">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {socialStats.map((stat, index) => (
                          <tr key={stat.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{getPlatformIcon(stat.platform)}</span>
                                <span className="font-semibold capitalize">{stat.platform}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center font-semibold">
                              {formatNumber(stat.followers)}
                            </td>
                            <td className="p-3 text-center font-semibold">
                              {stat.engagement_rate.toFixed(1)}%
                            </td>
                            <td className="p-3 text-center">
                              {stat.posts}
                            </td>
                            <td className="p-3 text-center">
                              {formatNumber(stat.likes)}
                            </td>
                            <td className="p-3 text-center">
                              {formatNumber(stat.comments)}
                            </td>
                            <td className="p-3 text-center">
                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                stat.engagement_rate >= 5 
                                  ? 'bg-green-100 text-green-800' 
                                  : stat.engagement_rate >= 3
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {stat.engagement_rate >= 5 ? (
                                  <>
                                    <TrendingUp className="w-3 h-3" />
                                    Excellent
                                  </>
                                ) : stat.engagement_rate >= 3 ? (
                                  <>
                                    <TrendingUp className="w-3 h-3" />
                                    Good
                                  </>
                                ) : (
                                  <>
                                    <TrendingDown className="w-3 h-3" />
                                    Needs Work
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AnalyticsWeekly;
