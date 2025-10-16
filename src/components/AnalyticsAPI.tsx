import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSocialStats, createSocialStatsData } from "@/lib/supabase";
import { AlertCircle, CheckCircle2, Code2 } from "lucide-react";

const AnalyticsAPI: React.FC = () => {
  const [platform, setPlatform] = useState("instagram");
  const [followers, setFollowers] = useState("1000");
  const [likes, setLikes] = useState("500");
  const [comments, setComments] = useState("50");
  const [shares, setShares] = useState("25");
  const [views, setViews] = useState("5000");
  const [posts, setPosts] = useState("5");
  const [engagementRate, setEngagementRate] = useState("5.75");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const statsData = createSocialStatsData({
        platform,
        followers: parseInt(followers),
        likes: parseInt(likes),
        comments: parseInt(comments),
        shares: parseInt(shares),
        views: parseInt(views),
        posts: parseInt(posts),
        engagement_rate: parseFloat(engagementRate),
      });
      
      const success = await updateSocialStats(statsData);
      
      if (success) {
        setMessage({ type: 'success', text: 'Social stats added successfully!' });
        
        // Refresh the page after 1 second to show new data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to add social stats. Please check Supabase connection.' });
      }
    } catch (error) {
      console.error('Error adding social stats:', error);
      setMessage({ type: 'error', text: 'Failed to add social stats. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-6 h-6 text-scrummy-navy" />
          <h2 className="text-2xl font-bold text-scrummy-navy font-orbitron">
            API Testing
          </h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Use this form to manually add social media statistics for testing purposes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scrummy-blue"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            <div>
              <Label htmlFor="followers">Followers</Label>
              <Input
                id="followers"
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="likes">Likes</Label>
              <Input
                id="likes"
                type="number"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="comments">Comments</Label>
              <Input
                id="comments"
                type="number"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="shares">Shares</Label>
              <Input
                id="shares"
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="views">Views</Label>
              <Input
                id="views"
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="posts">Posts</Label>
              <Input
                id="posts"
                type="number"
                value={posts}
                onChange={(e) => setPosts(e.target.value)}
                required
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="engagementRate">Engagement Rate (%)</Label>
              <Input
                id="engagementRate"
                type="number"
                step="0.01"
                value={engagementRate}
                onChange={(e) => setEngagementRate(e.target.value)}
                required
                min="0"
                max="100"
              />
            </div>
          </div>

          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-scrummy-navy hover:bg-scrummy-blue text-white"
          >
            {loading ? 'Adding Stats...' : 'Add Stats'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnalyticsAPI;

