import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PlatformSummary {
  platform: string;
  followers: number;
  followerGrowth: number;
  views: number;
  viewGrowth: number;
  engagement: number;
  engagementGrowth: number;
  engagementRate: number;
}

// Generate insights paragraph for a platform
const generatePlatformInsights = (platform: PlatformSummary): string => {
  const insights: string[] = [];
  
  // Safe number handling
  const followerGrowth = platform.followerGrowth || 0;
  const engagementRate = platform.engagementRate || 0;
  const viewGrowth = platform.viewGrowth || 0;
  
  // Follower trend
  if (followerGrowth > 5) {
    insights.push(`Strong follower growth of ${followerGrowth.toFixed(1)}% indicates increasing audience reach.`);
  } else if (followerGrowth > 0) {
    insights.push(`Steady follower growth of ${followerGrowth.toFixed(1)}% shows consistent audience building.`);
  } else if (followerGrowth < 0) {
    insights.push(`Follower count decreased by ${Math.abs(followerGrowth).toFixed(1)}%, suggesting need for audience retention focus.`);
  } else {
    insights.push(`Follower count remained stable with ${platform.followers.toLocaleString()} total followers.`);
  }
  
  // Engagement quality
  if (engagementRate > 3) {
    insights.push(`Exceptional engagement rate of ${engagementRate.toFixed(1)}% demonstrates highly active and responsive audience.`);
  } else if (engagementRate > 1.5) {
    insights.push(`Healthy engagement rate of ${engagementRate.toFixed(1)}% shows good audience interaction with content.`);
  } else if (engagementRate > 0) {
    insights.push(`Engagement rate of ${engagementRate.toFixed(1)}% suggests opportunity to boost audience interaction.`);
  }
  
  // View performance
  if (viewGrowth > 10) {
    insights.push(`Views surged ${viewGrowth.toFixed(1)}%, indicating strong content performance and reach expansion.`);
  } else if (viewGrowth > 0) {
    insights.push(`Views increased ${viewGrowth.toFixed(1)}%, reflecting positive content momentum.`);
  }
  
  // Overall assessment
  if (followerGrowth > 0 && engagementRate > 2) {
    insights.push(`${platform.platform} is performing well with both audience growth and strong engagement.`);
  } else if (followerGrowth > 0) {
    insights.push(`Focus on engagement strategies to match the audience growth on ${platform.platform}.`);
  } else if (engagementRate > 2) {
    insights.push(`High engagement on ${platform.platform} presents opportunity to convert interactions into follower growth.`);
  }
  
  return insights.join(' ');
};

export const generateAnalyticsPDF = async (
  summaries: PlatformSummary[],
  dateRange: string
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Simple text-only header - like a document title
  let yPos = 25;
  
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Social Media Analytics Report', margin, yPos, { align: 'left' });
  
  yPos += 8;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(`Generated: ${today}`, margin, yPos);
  
  yPos += 5;
  pdf.text(`Period: ${dateRange}`, margin, yPos);
  
  yPos += 10;
  
  // Horizontal line separator
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  // Platform Overview Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Platform Overview', margin, yPos);
  yPos += 8;
  
  // Platform Reports
  const activePlatforms = summaries.filter(p => p.followers > 0 || p.views > 0);
  
  if (activePlatforms.length === 0) {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('No platform data available.', margin, yPos);
    yPos += 10;
  } else {
    activePlatforms.forEach((platform, index) => {
      // Generate insights for this platform
      const insights = generatePlatformInsights(platform);
      
      // Platform name as subheading
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(platform.platform, margin, yPos);
      yPos += 6;
      
      // Metrics as simple text
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);
      
      // Build metrics text with safe number handling
      const followerGrowth = platform.followerGrowth || 0;
      const viewGrowth = platform.viewGrowth || 0;
      const engagementGrowth = platform.engagementGrowth || 0;
      const engagementRate = platform.engagementRate || 0;
      
      const followerText = `Followers: ${platform.followers.toLocaleString()}${followerGrowth !== 0 ? ` (${followerGrowth > 0 ? '+' : ''}${followerGrowth.toFixed(1)}%)` : ''}`;
      const viewText = `Views: ${platform.views.toLocaleString()}${viewGrowth !== 0 ? ` (${viewGrowth > 0 ? '+' : ''}${viewGrowth.toFixed(1)}%)` : ''}`;
      const engagementText = `Engagement: ${platform.engagement.toLocaleString()}${engagementGrowth !== 0 ? ` (${engagementGrowth > 0 ? '+' : ''}${engagementGrowth.toFixed(1)}%)` : ''}`;
      const rateText = `Engagement Rate: ${engagementRate.toFixed(1)}%`;
      
      pdf.text(followerText, margin, yPos);
      yPos += 5;
      pdf.text(viewText, margin, yPos);
      yPos += 5;
      pdf.text(engagementText, margin, yPos);
      yPos += 5;
      pdf.text(rateText, margin, yPos);
      yPos += 7;
      
      // Insights paragraph
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);
      const insightsLines = pdf.splitTextToSize(insights, contentWidth);
      pdf.text(insightsLines, margin, yPos);
      yPos += (insightsLines.length * 5) + 8;
      
      // Add page break if needed
      if (yPos > pageHeight - 40 && index < activePlatforms.length - 1) {
        pdf.addPage();
        yPos = 20;
      }
    });
  }
  
  // Platform Comparison Section (if we have multiple platforms)
  if (activePlatforms.length > 1) {
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = 25;
    } else {
      yPos += 5;
    }
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Platform Comparison', margin, yPos);
    yPos += 8;
    
    // Find best performing platform for each metric with safe number handling
    const bestFollowers = activePlatforms.reduce((max, p) => p.followers > max.followers ? p : max);
    const bestViews = activePlatforms.reduce((max, p) => p.views > max.views ? p : max);
    const bestEngagement = activePlatforms.reduce((max, p) => p.engagement > max.engagement ? p : max);
    const bestEngagementRate = activePlatforms.reduce((max, p) => {
      const pRate = p.engagementRate || 0;
      const maxRate = max.engagementRate || 0;
      return pRate > maxRate ? p : max;
    });
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    pdf.text(`Most Followers: ${bestFollowers.platform} (${bestFollowers.followers.toLocaleString()})`, margin, yPos);
    yPos += 5;
    pdf.text(`Most Views: ${bestViews.platform} (${bestViews.views.toLocaleString()})`, margin, yPos);
    yPos += 5;
    pdf.text(`Most Engagement: ${bestEngagement.platform} (${bestEngagement.engagement.toLocaleString()})`, margin, yPos);
    yPos += 5;
    const bestEngRate = bestEngagementRate.engagementRate || 0;
    pdf.text(`Best Engagement Rate: ${bestEngagementRate.platform} (${bestEngRate.toFixed(1)}%)`, margin, yPos);
    yPos += 10;
  }
  
  // Total Reach Section
  if (yPos > pageHeight - 50) {
    pdf.addPage();
    yPos = 25;
  } else {
    yPos += 5;
  }
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Total Reach', margin, yPos);
  yPos += 8;
  
  const totalFollowers = activePlatforms.reduce((sum, p) => sum + p.followers, 0);
  const totalViews = activePlatforms.reduce((sum, p) => sum + p.views, 0);
  const totalEngagement = activePlatforms.reduce((sum, p) => sum + p.engagement, 0);
  const avgEngagementRate = activePlatforms.length > 0 
    ? activePlatforms.reduce((sum, p) => sum + (p.engagementRate || 0), 0) / activePlatforms.length 
    : 0;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  pdf.text(`Combined Followers: ${totalFollowers.toLocaleString()}`, margin, yPos);
  yPos += 5;
  pdf.text(`Combined Views: ${totalViews.toLocaleString()}`, margin, yPos);
  yPos += 5;
  pdf.text(`Combined Engagement: ${totalEngagement.toLocaleString()}`, margin, yPos);
  yPos += 5;
  pdf.text(`Average Engagement Rate: ${(avgEngagementRate || 0).toFixed(1)}%`, margin, yPos);
  yPos += 10;
  
  // Performance Summary Section
  if (yPos > pageHeight - 60) {
    pdf.addPage();
    yPos = 25;
  } else {
    yPos += 5;
  }
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Performance Summary', margin, yPos);
  yPos += 8;
  
  // Generate overall summary
  let overallSummary = '';
  
  // Find best performers with safe number handling
  const bestEngagement = activePlatforms.reduce((max, p) => {
    const pRate = p.engagementRate || 0;
    const maxRate = max.engagementRate || 0;
    return pRate > maxRate ? p : max;
  });
  
  const bestGrowth = activePlatforms.reduce((max, p) => {
    const pGrowth = p.followerGrowth || 0;
    const maxGrowth = max.followerGrowth || 0;
    return pGrowth > maxGrowth ? p : max;
  });
  
  const avgFollowerGrowth = activePlatforms.reduce((sum, p) => sum + (p.followerGrowth || 0), 0) / activePlatforms.length;
  
  if (avgFollowerGrowth > 3) {
    overallSummary = `Your social media presence shows strong momentum across platforms with an average follower growth of ${avgFollowerGrowth.toFixed(1)}%. `;
  } else if (avgFollowerGrowth > 0) {
    overallSummary = `Your social media presence is steadily growing with an average follower growth of ${avgFollowerGrowth.toFixed(1)}%. `;
  } else {
    overallSummary = `Focus on audience retention strategies to reverse the current trend. `;
  }
  
  const bestEngRate = bestEngagement.engagementRate || 0;
  overallSummary += `${bestEngagement.platform} leads in engagement quality with a ${bestEngRate.toFixed(1)}% rate, indicating strong audience connection. `;
  
  const bestGrowthRate = bestGrowth.followerGrowth || 0;
  if (bestGrowthRate > 5) {
    overallSummary += `${bestGrowth.platform} shows exceptional growth momentum at ${bestGrowthRate.toFixed(1)}%, suggesting successful content strategy that could be replicated across other platforms. `;
  }
  
  // Recommendations
  if (avgEngagementRate < 2) {
    overallSummary += `Consider implementing more interactive content formats to boost engagement rates across platforms. `;
  }
  
  if (activePlatforms.length < 4) {
    overallSummary += `Expanding to additional platforms could increase overall reach and diversify your audience base.`;
  } else {
    overallSummary += `Continue maintaining consistent presence across your ${activePlatforms.length} active platforms.`;
  }
  
  // Render summary paragraph as plain text
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  const summaryLines = pdf.splitTextToSize(overallSummary, contentWidth);
  pdf.text(summaryLines, margin, yPos);
  
  // Footer - simple line at bottom
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  pdf.text('Generated by Scrummy Analytics', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Save the PDF
  const fileName = `social-analytics-${dateRange.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

