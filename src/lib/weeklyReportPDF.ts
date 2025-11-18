import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface WeeklyData {
  weekNumber: number;
  weekStart: string;
  weekEnd: string;
  instagram?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
    engagementRate: number;
    topContent: string[];
    reelsVsPosts: { reels: number; posts: number; stories: number };
  };
  facebook?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
    engagementRate: number;
    demographics: { age: string; percentage: number }[];
  };
  tiktok?: {
    followers: number;
    followerGrowth: number;
    views: number;
    likes: number;
    engagement: number;
    topVideos: string[];
  };
  threads?: {
    followers: number;
    followerGrowth: number;
    views: number;
    engagement: number;
  };
}

interface ReportData {
  reportPeriod: string;
  generatedDate: string;
  weeklyData: WeeklyData[];
  summary: {
    totalFollowers: number;
    totalFollowerGrowth: number;
    totalViews: number;
    totalEngagement: number;
    avgEngagementRate: number;
    bestWeek: number;
    bestPlatform: string;
  };
  insights: {
    keyWins: string[];
    opportunities: string[];
    recommendations: string[];
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Safely formats a number for display
 */
const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return '0';
  }
  
  const absNum = Math.abs(num);
  if (absNum >= 1000000) return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
  if (absNum >= 10000) return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
};

/**
 * Safely formats a percentage
 */
const formatPercentage = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return '0%';
  }
  return `${num.toFixed(1)}%`;
};

/**
 * Safely formats growth with + or - sign
 */
const formatGrowth = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return '0%';
  }
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
};

/**
 * Safely splits text and handles undefined/null
 */
const safeText = (text: string | null | undefined): string => {
  if (!text) return '';
  return String(text).trim();
};

// ==================== PDF GENERATION ====================

export const generateWeeklyAnalyticsReport = (data: ReportData): void => {
  try {
    console.log('📄 Starting PDF generation...');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let yPos = margin;

    // Brand Colors
    const primaryColor: [number, number, number] = [45, 108, 255];
    const goldColor: [number, number, number] = [249, 201, 78];
    const textColor: [number, number, number] = [51, 51, 51];
    const lightGray: [number, number, number] = [240, 240, 240];
    const greenColor: [number, number, number] = [34, 197, 94];

    // ==================== COVER PAGE ====================
    
    // Header with brand color
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Social Media Analytics', pageWidth / 2, 25, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('8-Week Performance Report', pageWidth / 2, 35, { align: 'center' });

    yPos = 70;
    
    // Report Details Box
    pdf.setFillColor(...lightGray);
    pdf.roundedRect(margin, yPos, pageWidth - (margin * 2), 40, 3, 3, 'F');
    
    pdf.setTextColor(...textColor);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    pdf.text(`Report Period: ${safeText(data.reportPeriod)}`, margin + 10, yPos + 12);
    pdf.text(`Generated: ${safeText(data.generatedDate)}`, margin + 10, yPos + 22);
    pdf.text(`Platforms Analyzed: Instagram, Facebook, TikTok, Threads`, margin + 10, yPos + 32);

    yPos = 130;

    // Executive Summary Section
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPos);
    
    yPos += 15;

    // Key Metrics Grid with safe data
    const metrics = [
      { 
        label: 'Total Followers', 
        value: formatNumber(data.summary.totalFollowers),
        growth: formatGrowth(data.summary.totalFollowerGrowth)
      },
      { 
        label: 'Total Views', 
        value: formatNumber(data.summary.totalViews),
        growth: ''
      },
      { 
        label: 'Avg. Engagement Rate', 
        value: formatPercentage(data.summary.avgEngagementRate),
        growth: ''
      },
      { 
        label: 'Best Performing Week', 
        value: `Week ${data.summary.bestWeek || 1}`,
        growth: ''
      },
    ];

    const boxWidth = (pageWidth - (margin * 2) - 10) / 2;
    const boxHeight = 25;
    let xPos = margin;
    let boxYPos = yPos;

    metrics.forEach((metric, index) => {
      if (index === 2) {
        xPos = margin;
        boxYPos += boxHeight + 5;
      }

      // Box background
      pdf.setFillColor(...lightGray);
      pdf.roundedRect(xPos, boxYPos, boxWidth, boxHeight, 2, 2, 'F');
      
      // Label
      pdf.setTextColor(...textColor);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text(metric.label, xPos + 5, boxYPos + 8);
      
      // Value
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      const valueText = pdf.splitTextToSize(metric.value, boxWidth - 60);
      pdf.text(valueText, xPos + 5, boxYPos + 18);
      
      // Growth
      if (metric.growth) {
        pdf.setFontSize(10);
        pdf.setTextColor(...greenColor);
        pdf.text(metric.growth, xPos + boxWidth - 5, boxYPos + 18, { align: 'right' });
      }

      xPos += boxWidth + 5;
    });

    yPos = boxYPos + boxHeight + 20;

    // Key Wins
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🏆 Key Wins', margin, yPos);
    
    yPos += 10;
    pdf.setTextColor(...textColor);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const keyWins = data.insights.keyWins || [];
    if (keyWins.length > 0) {
      keyWins.forEach((win) => {
        const lines = pdf.splitTextToSize(`• ${safeText(win)}`, pageWidth - (margin * 2));
        pdf.text(lines, margin + 5, yPos);
        yPos += lines.length * 5 + 2;
      });
    } else {
      pdf.text('• No key wins identified for this period', margin + 5, yPos);
      yPos += 7;
    }

    // ==================== PAGE 2: WEEKLY BREAKDOWN ====================
    pdf.addPage();
    yPos = margin;

    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('8-Week Performance Breakdown', pageWidth / 2, 10, { align: 'center' });

    yPos = 25;

    // Weekly Performance Table
    pdf.setTextColor(...textColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Weekly Performance', margin, yPos);
    
    yPos += 8;

    const weeklyTableData = data.weeklyData.map(week => {
      const totalFollowers = (week.instagram?.followers || 0) + 
                            (week.facebook?.followers || 0) + 
                            (week.tiktok?.followers || 0) + 
                            (week.threads?.followers || 0);
      const totalEngagement = (week.instagram?.engagement || 0) + 
                             (week.facebook?.engagement || 0) + 
                             (week.tiktok?.engagement || 0) + 
                             (week.threads?.engagement || 0);
      const avgEngagement = ((week.instagram?.engagementRate || 0) + 
                            (week.facebook?.engagementRate || 0)) / 2;
      
      return [
        `Week ${week.weekNumber}`,
        `${safeText(week.weekStart)} - ${safeText(week.weekEnd)}`,
        formatNumber(totalFollowers),
        formatNumber(totalEngagement),
        formatPercentage(avgEngagement)
      ];
    });

    autoTable(pdf, {
      startY: yPos,
      head: [['Week', 'Date Range', 'Followers', 'Engagement', 'Avg. Rate']],
      body: weeklyTableData,
      theme: 'grid',
      headStyles: { 
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: textColor,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 50, halign: 'left' },
        2: { cellWidth: 35, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      margin: { left: margin, right: margin }
    });

    yPos = (pdf as any).lastAutoTable?.finalY + 15 || yPos + 80;

    // Platform Breakdown
    if (yPos > pageHeight - 60) {
      pdf.addPage();
      yPos = 25;
    }

    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Platform Performance Trends', margin, yPos);
    
    yPos += 10;

    // Individual platform tables
    const platforms = [
      { name: 'Instagram', data: data.weeklyData.map(w => w.instagram), emoji: '📸' },
      { name: 'Facebook', data: data.weeklyData.map(w => w.facebook), emoji: '📘' },
      { name: 'TikTok', data: data.weeklyData.map(w => w.tiktok), emoji: '🎵' },
      { name: 'Threads', data: data.weeklyData.map(w => w.threads), emoji: '@' }
    ];

    platforms.forEach((platform, index) => {
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 25;
      }

      pdf.setTextColor(...textColor);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${platform.emoji} ${platform.name}`, margin, yPos);
      yPos += 7;

      const platformTableData = data.weeklyData.map((week, idx) => {
        const plat = platform.data[idx];
        if (!plat) return ['N/A', '0', '0%', '0'];
        
        return [
          `Week ${week.weekNumber}`,
          formatNumber(plat.followers),
          formatGrowth(plat.followerGrowth),
          formatNumber(plat.engagement)
        ];
      });

      autoTable(pdf, {
        startY: yPos,
        head: [['Week', 'Followers', 'Growth', 'Engagement']],
        body: platformTableData,
        theme: 'plain',
        headStyles: { 
          fillColor: [240, 240, 240],
          textColor: textColor,
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 8,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { halign: 'right', cellWidth: 35 },
          2: { halign: 'right', cellWidth: 25 },
          3: { halign: 'right', cellWidth: 35 }
        },
        margin: { left: margin, right: margin }
      });

      yPos = (pdf as any).lastAutoTable?.finalY + 12 || yPos + 60;
    });

    // ==================== PAGE 3: DETAILED INSIGHTS ====================
    pdf.addPage();
    yPos = margin;

    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Insights & Recommendations', pageWidth / 2, 10, { align: 'center' });

    yPos = 25;

    // Opportunities Section
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('💡 Opportunities Identified', margin, yPos);
    
    yPos += 10;
    pdf.setTextColor(...textColor);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const opportunities = data.insights.opportunities || [];
    if (opportunities.length > 0) {
      opportunities.forEach((opportunity, index) => {
        const lines = pdf.splitTextToSize(
          `${index + 1}. ${safeText(opportunity)}`,
          pageWidth - (margin * 2) - 10
        );
        pdf.text(lines, margin + 5, yPos);
        yPos += lines.length * 5 + 3;
      });
    } else {
      pdf.text('No specific opportunities identified for this period.', margin + 5, yPos);
      yPos += 7;
    }

    yPos += 10;

    // Recommendations Section
    if (yPos > pageHeight - 80) {
      pdf.addPage();
      yPos = 25;
    }

    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('📋 Action Recommendations', margin, yPos);
    
    yPos += 10;
    
    const recommendations = data.insights.recommendations || [];
    if (recommendations.length > 0) {
      recommendations.forEach((rec, index) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 25;
        }

        // Recommendation box
        const boxY = yPos;
        const recLines = pdf.splitTextToSize(safeText(rec), pageWidth - (margin * 2) - 20);
        const boxHeight = Math.max(15, recLines.length * 5 + 10);
        
        pdf.setFillColor(255, 251, 235); // Light yellow
        pdf.roundedRect(margin, boxY, pageWidth - (margin * 2), boxHeight, 2, 2, 'F');
        
        pdf.setTextColor(...textColor);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`ACTION ${index + 1}:`, margin + 5, boxY + 6);
        
        pdf.setFont('helvetica', 'normal');
        pdf.text(recLines, margin + 5, boxY + 11);
        
        yPos += boxHeight + 5;
      });
    } else {
      pdf.setTextColor(...textColor);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('No specific recommendations at this time.', margin + 5, yPos);
    }

    // ==================== FOOTER ON ALL PAGES ====================
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      // Footer line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      // Footer text
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Generated by Scrummy Analytics', margin, pageHeight - 10);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // ==================== SAVE PDF ====================
    const fileName = `social-media-weekly-report-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    console.log('✅ Comprehensive report generated successfully:', fileName);
    
  } catch (error) {
    console.error('❌ Error generating comprehensive PDF:', error);
    throw error;
  }
};
