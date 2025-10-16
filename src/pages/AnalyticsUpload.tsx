import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Upload, Check, X, FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateSocialStats, createSocialStatsData } from "@/lib/supabase";

interface UploadResult {
  platform: string;
  success: boolean;
  error?: string;
}

const AnalyticsUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [jsonPreview, setJsonPreview] = useState<string>("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResults([]);

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      setJsonPreview(JSON.stringify(data, null, 2));

      // Handle array or single object
      const dataArray = Array.isArray(data) ? data : [data];
      const uploadResults: UploadResult[] = [];

      for (const item of dataArray) {
        try {
          // Validate required fields
          if (!item.platform || !item.followers || item.engagement_rate === undefined) {
            uploadResults.push({
              platform: item.platform || 'Unknown',
              success: false,
              error: 'Missing required fields (platform, followers, engagement_rate)'
            });
            continue;
          }

          // Create properly formatted data
          const statsData = createSocialStatsData({
            platform: item.platform,
            followers: item.followers,
            posts: item.posts || 0,
            likes: item.likes || 0,
            comments: item.comments || 0,
            shares: item.shares || 0,
            views: item.views || 0,
            engagement_rate: item.engagement_rate,
            top_post_url: item.top_post_url,
            date: item.date // If not provided, will use today
          });

          const success = await updateSocialStats(statsData);
          
          uploadResults.push({
            platform: item.platform,
            success,
            error: success ? undefined : 'Failed to insert into database'
          });
        } catch (error) {
          uploadResults.push({
            platform: item.platform || 'Unknown',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      setResults(uploadResults);
    } catch (error) {
      setResults([{
        platform: 'File',
        success: false,
        error: error instanceof Error ? error.message : 'Invalid JSON file'
      }]);
    } finally {
      setUploading(false);
    }
  };

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/hub/live" className="flex items-center gap-2 text-scrummy-navy hover:text-scrummy-blue transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/assets/logo.png" alt="SCRUMMY" className="h-10" />
            <span className="font-orbitron font-bold text-scrummy-navy">Upload Data</span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-scrummy-navy leading-tight mb-4">
              Upload <span className="text-scrummy-goldYellow">JSON Data</span>
            </h1>
            <p className="text-lg text-gray-600">
              Upload a JSON file with social media stats to automatically add to Supabase
            </p>
          </div>

          {/* Upload Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-scrummy-goldYellow transition-colors">
                <FileJson className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-scrummy-navy mb-2">
                  Drop JSON file or click to upload
                </h3>
                <p className="text-gray-600 mb-4">
                  Supports single object or array of social media stats
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label htmlFor="file-upload" className="inline-block">
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-scrummy-goldYellow hover:bg-scrummy-gold text-scrummy-navy font-bold cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Choose File'}
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* JSON Format Example */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-scrummy-navy mb-4">
                📋 Expected JSON Format
              </h3>
              <p className="text-gray-600 mb-4">Single object:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`{
  "platform": "instagram",
  "followers": 5000,
  "posts": 3,
  "likes": 250,
  "comments": 30,
  "shares": 10,
  "views": 5500,
  "engagement_rate": 4.5,
  "top_post_url": "https://instagram.com/p/...",
  "date": "2025-10-15"
}`}
              </pre>
              <p className="text-gray-600 mb-4">Or array of objects:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "platform": "instagram",
    "followers": 5000,
    ...
  },
  {
    "platform": "tiktok",
    "followers": 2000,
    ...
  }
]`}
              </pre>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Only <code>platform</code>, <code>followers</code>, and <code>engagement_rate</code> are required. 
                  If <code>date</code> is omitted, today's date will be used.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-scrummy-navy">
                    Upload Results
                  </h3>
                  <div className="flex gap-4">
                    {successCount > 0 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">{successCount} successful</span>
                      </div>
                    )}
                    {failCount > 0 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <X className="w-5 h-5" />
                        <span className="font-semibold">{failCount} failed</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        result.success ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {result.success ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-semibold capitalize">{result.platform}</span>
                      </div>
                      {result.error && (
                        <span className="text-sm text-red-600">{result.error}</span>
                      )}
                    </div>
                  ))}
                </div>

                {successCount > 0 && (
                  <div className="mt-6 text-center">
                    <Link to="/hub/live">
                      <Button className="bg-scrummy-navy hover:bg-scrummy-blue text-white">
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* JSON Preview */}
          {jsonPreview && (
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-white/30 shadow-lg mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-scrummy-navy mb-4">
                  📄 Uploaded JSON Preview
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  {jsonPreview}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsUpload;
