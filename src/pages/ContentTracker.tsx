import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Save, Trash2, ExternalLink, TrendingUp, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ContentPerformance {
  id: string;
  platform: string;
  content_id: string;
  post_url?: string;
  post_date: string;
  content_type: string;
  title?: string;
  description?: string;
  snapshot_date: string;
  views?: number;
  likes?: number;
  comments?: number;
  saves?: number;
  shares?: number;
  total_interactions?: number;
}

interface ContentWithHistory {
  platform: string;
  content_id: string;
  post_url?: string;
  post_date: string;
  content_type: string;
  title?: string;
  snapshots: ContentPerformance[];
}

const ContentTracker: React.FC = () => {
  const [contents, setContents] = useState<ContentWithHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  
  // Form state
  const [formData, setFormData] = useState({
    platform: 'instagram',
    content_id: '',
    post_url: '',
    post_date: new Date().toISOString().split('T')[0],
    content_type: 'post',
    title: '',
    description: '',
    snapshot_date: new Date().toISOString().split('T')[0],
    views: '',
    likes: '',
    comments: '',
    saves: '',
    shares: ''
  });

  useEffect(() => {
    fetchContent();
  }, [selectedPlatform]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_performance')
        .select('*')
        .eq('platform', selectedPlatform)
        .order('post_date', { ascending: false })
        .order('snapshot_date', { ascending: true });

      if (error) throw error;

      // Group by content_id
      const grouped: Record<string, ContentWithHistory> = {};
      
      data?.forEach((item) => {
        if (!grouped[item.content_id]) {
          grouped[item.content_id] = {
            platform: item.platform,
            content_id: item.content_id,
            post_url: item.post_url,
            post_date: item.post_date,
            content_type: item.content_type,
            title: item.title,
            snapshots: []
          };
        }
        grouped[item.content_id].snapshots.push(item);
      });

      setContents(Object.values(grouped));
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        platform: formData.platform,
        content_id: formData.content_id,
        post_url: formData.post_url || null,
        post_date: formData.post_date,
        content_type: formData.content_type,
        title: formData.title || null,
        description: formData.description || null,
        snapshot_date: formData.snapshot_date,
        views: formData.views ? parseInt(formData.views) : null,
        likes: formData.likes ? parseInt(formData.likes) : null,
        comments: formData.comments ? parseInt(formData.comments) : null,
        saves: formData.saves ? parseInt(formData.saves) : null,
        shares: formData.shares ? parseInt(formData.shares) : null
      };

      const { error } = await supabase
        .from('content_performance')
        .upsert(payload, {
          onConflict: 'platform,content_id,snapshot_date'
        });

      if (error) throw error;

      // Reset form
      setFormData({
        platform: selectedPlatform,
        content_id: '',
        post_url: '',
        post_date: new Date().toISOString().split('T')[0],
        content_type: 'post',
        title: '',
        description: '',
        snapshot_date: new Date().toISOString().split('T')[0],
        views: '',
        likes: '',
        comments: '',
        saves: '',
        shares: ''
      });
      setShowAddForm(false);
      fetchContent();
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    }
  };

  const deleteContent = async (contentId: string) => {
    if (!confirm("Delete all snapshots for this content?")) return;

    try {
      const { error } = await supabase
        .from('content_performance')
        .delete()
        .eq('platform', selectedPlatform)
        .eq('content_id', contentId);

      if (error) throw error;
      fetchContent();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-pink-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/hub" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" alt="SCRUMMY" className="h-10" />
            <span className="font-orbitron font-bold text-scrummy-navy">Content Tracker</span>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Track Content
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-2">
              📊 Content <span className="text-pink-600">Performance</span>
            </h1>
            <p className="text-lg text-gray-600">
              Track individual posts, reels, and videos over time
            </p>
          </div>

          {/* Platform Tabs */}
          <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-1">
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </TabsTrigger>
              {/* Add more platforms here as needed */}
            </TabsList>
          </Tabs>

          {/* Add Content Form */}
          {showAddForm && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-8">
              <CardHeader>
                <CardTitle>Track New Content</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="content_id">Content ID *</Label>
                      <Input
                        id="content_id"
                        value={formData.content_id}
                        onChange={(e) => setFormData({ ...formData, content_id: e.target.value })}
                        placeholder="e.g., post-001 or Instagram post ID"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Unique identifier for this content</p>
                    </div>
                    <div>
                      <Label htmlFor="content_type">Content Type *</Label>
                      <Select
                        value={formData.content_type}
                        onValueChange={(value) => setFormData({ ...formData, content_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">Post</SelectItem>
                          <SelectItem value="reel">Reel</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="carousel">Carousel</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="post_date">Post Date *</Label>
                      <Input
                        id="post_date"
                        type="date"
                        value={formData.post_date}
                        onChange={(e) => setFormData({ ...formData, post_date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="snapshot_date">Snapshot Date *</Label>
                      <Input
                        id="snapshot_date"
                        type="date"
                        value={formData.snapshot_date}
                        onChange={(e) => setFormData({ ...formData, snapshot_date: e.target.value })}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">When you measured these metrics</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Short title for this content"
                    />
                  </div>

                  <div>
                    <Label htmlFor="post_url">Post URL</Label>
                    <Input
                      id="post_url"
                      value={formData.post_url}
                      onChange={(e) => setFormData({ ...formData, post_url: e.target.value })}
                      placeholder="https://instagram.com/p/..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Content description or notes"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="views">Views</Label>
                      <Input
                        id="views"
                        type="number"
                        value={formData.views}
                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="likes">Likes</Label>
                      <Input
                        id="likes"
                        type="number"
                        value={formData.likes}
                        onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="comments">Comments</Label>
                      <Input
                        id="comments"
                        type="number"
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="saves">Saves</Label>
                      <Input
                        id="saves"
                        type="number"
                        value={formData.saves}
                        onChange={(e) => setFormData({ ...formData, saves: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shares">Shares</Label>
                      <Input
                        id="shares"
                        type="number"
                        value={formData.shares}
                        onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-scrummy-navy hover:bg-scrummy-blue text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Save Snapshot
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Content List */}
          {contents.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 mb-4">No content tracked yet for {selectedPlatform}</p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Track Your First Content
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {contents.map((content) => {
                const latestSnapshot = content.snapshots[content.snapshots.length - 1];
                const firstSnapshot = content.snapshots[0];
                const growth = content.snapshots.length > 1
                  ? ((latestSnapshot.views || 0) - (firstSnapshot.views || 0))
                  : 0;

                return (
                  <Card key={content.content_id} className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">
                              {content.title || content.content_id}
                            </CardTitle>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-700">
                              {content.content_type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Posted: {new Date(content.post_date).toLocaleDateString()} • 
                            {content.snapshots.length} snapshot{content.snapshots.length !== 1 ? 's' : ''}
                          </p>
                          {content.post_url && (
                            <a
                              href={content.post_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1 mt-1"
                            >
                              View Post <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <Button
                          onClick={() => deleteContent(content.content_id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Latest Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{latestSnapshot.views?.toLocaleString() || 0}</p>
                          <p className="text-xs text-gray-600">Views</p>
                          {growth !== 0 && (
                            <p className={`text-xs flex items-center justify-center gap-1 ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <TrendingUp className="w-3 h-3" />
                              {growth > 0 ? '+' : ''}{growth}
                            </p>
                          )}
                        </div>
                        <div className="text-center p-3 bg-pink-50 rounded-lg">
                          <p className="text-2xl font-bold text-pink-600">{latestSnapshot.likes?.toLocaleString() || 0}</p>
                          <p className="text-xs text-gray-600">Likes</p>
                        </div>
                        <div className="text-center p-3 bg-cyan-50 rounded-lg">
                          <p className="text-2xl font-bold text-cyan-600">{latestSnapshot.comments?.toLocaleString() || 0}</p>
                          <p className="text-xs text-gray-600">Comments</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{latestSnapshot.saves?.toLocaleString() || 0}</p>
                          <p className="text-xs text-gray-600">Saves</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">{latestSnapshot.shares?.toLocaleString() || 0}</p>
                          <p className="text-xs text-gray-600">Shares</p>
                        </div>
                      </div>

                      {/* Performance Chart */}
                      {content.snapshots.length > 1 && (
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={content.snapshots.map(s => ({
                            date: new Date(s.snapshot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                            views: s.views || 0,
                            interactions: s.total_interactions || 0
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} name="Views" />
                            <Line type="monotone" dataKey="interactions" stroke="#ec4899" strokeWidth={2} name="Interactions" />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContentTracker;

