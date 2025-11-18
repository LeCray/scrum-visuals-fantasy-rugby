import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from './supabase';

interface WeekData {
  weekNum: number;
  weekStart: string;
  weekEnd: string;
  instagram: {
    followers: number;
    views: number;
    engagement: number;
    change: string;
  };
  facebook: {
    followers: number;
    views: number;
    engagement: number;
    change: string;
  };
  tiktok: {
    followers: number;
    views: number;
    engagement: number;
    change: string;
  };
  threads: {
    followers: number;
    views: number;
    engagement: number;
    change: string;
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Safely formats a number, handling edge cases like NaN, Infinity, null
 */
const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return '0';
  }
  
  const absNum = Math.abs(num);
  if (absNum >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (absNum >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return Math.round(num).toString();
};

/**
 * Safely calculates percentage change, handling division by zero
 */
const calculateGrowth = (current: number, previous: number): string => {
  if (!previous || previous === 0 || !isFinite(previous)) return '-';
  if (!current || !isFinite(current)) return '-';
  
  const growth = ((current - previous) / previous) * 100;
  
  if (!isFinite(growth) || isNaN(growth)) return '-';
  
  const formatted = growth.toFixed(1);
  return growth > 0 ? `+${formatted}%` : `${formatted}%`;
};

/**
 * Safely sums an array of numbers
 */
const safeSum = (values: (number | null | undefined)[]): number => {
  return values.reduce((sum, val) => {
    if (val === null || val === undefined || isNaN(val) || !isFinite(val)) {
      return sum;
    }
    return sum + val;
  }, 0);
};

/**
 * Gets week dates for a given number of weeks ago
 */
const getWeekDates = (weeksAgo: number): { start: Date; end: Date } => {
  const today = new Date();
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() - (weeksAgo * 7));
  
  const weekStart = new Date(weekEnd);
  weekStart.setDate(weekEnd.getDate() - 6);
  
  return { start: weekStart, end: weekEnd };
};

/**
 * Formats a date to a readable string
 */
const formatDate = (date: Date): string => {
  try {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

// ==================== DATA FETCHING ====================

export const generateSimpleWeeklyComparison = async (): Promise<void> => {
  console.log('🚀 Starting weekly comparison report generation...');
  
  try {
    // Check if supabase is available
    if (!supabase) {
      throw new Error('Database connection not available');
    }
    
    // Fetch 60 days of data for all platforms
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const startDateStr = sixtyDaysAgo.toISOString().split('T')[0];

    console.log('📊 Fetching data from:', startDateStr);

    const [igResult, fbResult, threadsResult, tiktokFollowersResult, tiktokOverviewResult] = await Promise.all([
      supabase.from('instagram_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('facebook_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('threads_analytics').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('tiktok_followers').select('*').gte('snapshot_date', startDateStr).order('snapshot_date'),
      supabase.from('tiktok_overview').select('*').gte('snapshot_date', startDateStr).order('snapshot_date')
    ]);

    // Check for errors
    if (igResult.error) {
      console.error('Instagram fetch error:', igResult.error);
    }
    if (fbResult.error) {
      console.error('Facebook fetch error:', fbResult.error);
    }
    if (threadsResult.error) {
      console.error('Threads fetch error:', threadsResult.error);
    }
    if (tiktokFollowersResult.error) {
      console.error('TikTok followers fetch error:', tiktokFollowersResult.error);
    }
    if (tiktokOverviewResult.error) {
      console.error('TikTok overview fetch error:', tiktokOverviewResult.error);
    }

    const igData = igResult.data || [];
    const fbData = fbResult.data || [];
    const threadsData = threadsResult.data || [];
    const tiktokFollowers = tiktokFollowersResult.data || [];
    const tiktokOverview = tiktokOverviewResult.data || [];

    console.log('✅ Data fetched:', { 
      instagram: igData.length, 
      facebook: fbData.length, 
      threads: threadsData.length, 
      tiktok: tiktokFollowers.length 
    });

    // Check if we have any data
    if (igData.length === 0 && fbData.length === 0 && threadsData.length === 0 && tiktokFollowers.length === 0) {
      throw new Error('No data found in database. Please add some analytics data first.');
    }

    // ==================== PROCESS 8 WEEKS OF DATA ====================
    const weeklyData: WeekData[] = [];
    
    for (let weekNum = 7; weekNum >= 0; weekNum--) {
      const { start, end } = getWeekDates(weekNum);
      const startStr = start.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];

      // Filter data for this week
      const weekIg = igData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekFb = fbData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekThreads = threadsData.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekTikTokF = tiktokFollowers.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);
      const weekTikTokO = tiktokOverview.filter(d => d.snapshot_date >= startStr && d.snapshot_date <= endStr);

      // Get previous week for comparison
      const prevWeek = weeklyData.length > 0 ? weeklyData[weeklyData.length - 1] : null;

      // Instagram - with safe data handling
      const igLatest = weekIg.length > 0 ? weekIg[weekIg.length - 1] : null;
      const igFollowers = igLatest?.followers_count || 0;
      const igViews = safeSum(weekIg.map(d => d.total_views));
      const igEngagement = safeSum(weekIg.map(d => d.interactions_total));
      const igChange = prevWeek ? calculateGrowth(igFollowers, prevWeek.instagram.followers) : '-';

      // Facebook - with safe data handling
      const fbLatest = weekFb.length > 0 ? weekFb[weekFb.length - 1] : null;
      const fbFollowers = fbLatest?.total_followers || 0;
      const fbViews = safeSum(weekFb.map(d => d.total_views));
      const fbEngagement = safeSum(weekFb.map(d => d.total_interactions));
      const fbChange = prevWeek ? calculateGrowth(fbFollowers, prevWeek.facebook.followers) : '-';

      // TikTok - with safe data handling
      const ttLatest = weekTikTokF.length > 0 ? weekTikTokF[weekTikTokF.length - 1] : null;
      const ttFollowers = ttLatest?.total_followers || 0;
      const ttViews = safeSum(weekTikTokO.map(d => d.video_views));
      const ttEngagement = safeSum(weekTikTokO.map(d => 
        (d.likes || 0) + (d.comments || 0) + (d.shares || 0)
      ));
      const ttChange = prevWeek ? calculateGrowth(ttFollowers, prevWeek.tiktok.followers) : '-';

      // Threads - with safe data handling
      const thLatest = weekThreads.length > 0 ? weekThreads[weekThreads.length - 1] : null;
      const thFollowers = thLatest?.total_followers || 0;
      const thViews = safeSum(weekThreads.map(d => d.total_views));
      const thEngagement = safeSum(weekThreads.map(d => d.total_interactions));
      const thChange = prevWeek ? calculateGrowth(thFollowers, prevWeek.threads.followers) : '-';

      weeklyData.push({
        weekNum: 8 - weekNum,
        weekStart: formatDate(start),
        weekEnd: formatDate(end),
        instagram: { followers: igFollowers, views: igViews, engagement: igEngagement, change: igChange },
        facebook: { followers: fbFollowers, views: fbViews, engagement: fbEngagement, change: fbChange },
        tiktok: { followers: ttFollowers, views: ttViews, engagement: ttEngagement, change: ttChange },
        threads: { followers: thFollowers, views: thViews, engagement: thEngagement, change: thChange }
      });
    }

    console.log('📅 Processed', weeklyData.length, 'weeks of data');

    // ==================== GENERATE PDF ====================
    await generatePDFReport(weeklyData);
    
  } catch (error) {
    console.error('❌ Error generating report:', error);
    throw error;
  }
};

// ==================== PDF GENERATION ====================

const generatePDFReport = async (weeklyData: WeekData[]): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // Brand colors
  const primaryBlue: [number, number, number] = [45, 108, 255];
  const instagramPink: [number, number, number] = [228, 64, 95];
  const facebookBlue: [number, number, number] = [24, 119, 242];
  const tiktokBlack: [number, number, number] = [0, 0, 0];
  const threadsGray: [number, number, number] = [100, 100, 100];

  // ==================== PAGE 1: INSTAGRAM & FACEBOOK ====================
  
  // Header
  pdf.setFillColor(...primaryBlue);
  pdf.rect(0, 0, pageWidth, 25, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('8-Week Platform Comparison Report', pageWidth / 2, 12, { align: 'center' });
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const firstWeek = weeklyData[0];
  const lastWeek = weeklyData[weeklyData.length - 1];
  const reportDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  pdf.text(`${firstWeek.weekStart} - ${lastWeek.weekEnd} | Generated ${reportDate}`, pageWidth / 2, 19, { align: 'center' });

  let yPos = 35;

  // INSTAGRAM TABLE (Left side)
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('📸 INSTAGRAM', margin, yPos);
  yPos += 5;

  const igTableData = weeklyData.map(w => [
    { content: `Week ${w.weekNum}\n${w.weekStart} - ${w.weekEnd}`, styles: { cellWidth: 30 } },
    formatNumber(w.instagram.followers),
    w.instagram.change,
    formatNumber(w.instagram.views),
    formatNumber(w.instagram.engagement)
  ]);

  autoTable(pdf, {
    startY: yPos,
    head: [['Week', 'Followers', 'Change', 'Views', 'Engagement']],
    body: igTableData,
    theme: 'grid',
    headStyles: { 
      fillColor: instagramPink,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'left' },
      1: { cellWidth: 20, halign: 'right' },
      2: { cellWidth: 18, halign: 'right' },
      3: { cellWidth: 20, halign: 'right' },
      4: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: margin, right: pageWidth / 2 + 5 }
  });

  // FACEBOOK TABLE (Right side)
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('📘 FACEBOOK', pageWidth / 2 + 10, 35);

  const fbTableData = weeklyData.map(w => [
    { content: `Week ${w.weekNum}\n${w.weekStart} - ${w.weekEnd}`, styles: { cellWidth: 30 } },
    formatNumber(w.facebook.followers),
    w.facebook.change,
    formatNumber(w.facebook.views),
    formatNumber(w.facebook.engagement)
  ]);

  autoTable(pdf, {
    startY: 40,
    head: [['Week', 'Followers', 'Change', 'Views', 'Engagement']],
    body: fbTableData,
    theme: 'grid',
    headStyles: { 
      fillColor: facebookBlue,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'left' },
      1: { cellWidth: 20, halign: 'right' },
      2: { cellWidth: 18, halign: 'right' },
      3: { cellWidth: 20, halign: 'right' },
      4: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: pageWidth / 2 + 10, right: margin }
  });

  // ==================== PAGE 2: TIKTOK & THREADS ====================
  pdf.addPage();
  yPos = 15;

  // TIKTOK TABLE (Left side)
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🎵 TIKTOK', margin, yPos);
  yPos += 5;

  const ttTableData = weeklyData.map(w => [
    { content: `Week ${w.weekNum}\n${w.weekStart} - ${w.weekEnd}`, styles: { cellWidth: 30 } },
    formatNumber(w.tiktok.followers),
    w.tiktok.change,
    formatNumber(w.tiktok.views),
    formatNumber(w.tiktok.engagement)
  ]);

  autoTable(pdf, {
    startY: yPos,
    head: [['Week', 'Followers', 'Change', 'Views', 'Engagement']],
    body: ttTableData,
    theme: 'grid',
    headStyles: { 
      fillColor: tiktokBlack,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'left' },
      1: { cellWidth: 20, halign: 'right' },
      2: { cellWidth: 18, halign: 'right' },
      3: { cellWidth: 20, halign: 'right' },
      4: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: margin, right: pageWidth / 2 + 5 }
  });

  // THREADS TABLE (Right side)
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('@ THREADS', pageWidth / 2 + 10, 15);

  const thTableData = weeklyData.map(w => [
    { content: `Week ${w.weekNum}\n${w.weekStart} - ${w.weekEnd}`, styles: { cellWidth: 30 } },
    formatNumber(w.threads.followers),
    w.threads.change,
    formatNumber(w.threads.views),
    formatNumber(w.threads.engagement)
  ]);

  autoTable(pdf, {
    startY: 20,
    head: [['Week', 'Followers', 'Change', 'Views', 'Engagement']],
    body: thTableData,
    theme: 'grid',
    headStyles: { 
      fillColor: threadsGray,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'left' },
      1: { cellWidth: 20, halign: 'right' },
      2: { cellWidth: 18, halign: 'right' },
      3: { cellWidth: 20, halign: 'right' },
      4: { cellWidth: 22, halign: 'right' }
    },
    margin: { left: pageWidth / 2 + 10, right: margin }
  });

  // ==================== PAGE 3: SUMMARY ====================
  pdf.addPage();
  
  pdf.setFillColor(...primaryBlue);
  pdf.rect(0, 0, pageWidth, 25, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('8-Week Summary & Comparison', pageWidth / 2, 15, { align: 'center' });

  yPos = 35;

  // Calculate 8-week growth safely
  const calculateEightWeekGrowth = (latest: number, first: number): string => {
    return calculateGrowth(latest, first);
  };

  // Overall Comparison Table
  const summaryData = [
    [
      'Instagram',
      formatNumber(lastWeek.instagram.followers),
      formatNumber(lastWeek.instagram.views),
      formatNumber(lastWeek.instagram.engagement),
      calculateEightWeekGrowth(lastWeek.instagram.followers, firstWeek.instagram.followers)
    ],
    [
      'Facebook',
      formatNumber(lastWeek.facebook.followers),
      formatNumber(lastWeek.facebook.views),
      formatNumber(lastWeek.facebook.engagement),
      calculateEightWeekGrowth(lastWeek.facebook.followers, firstWeek.facebook.followers)
    ],
    [
      'TikTok',
      formatNumber(lastWeek.tiktok.followers),
      formatNumber(lastWeek.tiktok.views),
      formatNumber(lastWeek.tiktok.engagement),
      calculateEightWeekGrowth(lastWeek.tiktok.followers, firstWeek.tiktok.followers)
    ],
    [
      'Threads',
      formatNumber(lastWeek.threads.followers),
      formatNumber(lastWeek.threads.views),
      formatNumber(lastWeek.threads.engagement),
      calculateEightWeekGrowth(lastWeek.threads.followers, firstWeek.threads.followers)
    ]
  ];

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Current Status (Latest Week)', margin, yPos);
  yPos += 5;

  autoTable(pdf, {
    startY: yPos,
    head: [['Platform', 'Followers', 'Total Views', 'Total Engagement', '8-Week Growth']],
    body: summaryData,
    theme: 'striped',
    headStyles: { 
      fillColor: primaryBlue,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { 
      fontSize: 10,
      cellPadding: 3
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { halign: 'right', cellWidth: 35 },
      2: { halign: 'right', cellWidth: 35 },
      3: { halign: 'right', cellWidth: 40 },
      4: { halign: 'right', fontStyle: 'bold', cellWidth: 35 }
    },
    margin: { left: margin, right: margin }
  });

  // ==================== FOOTER ON ALL PAGES ====================
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Page ${i} of ${totalPages} | Generated by Scrummy Analytics`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // ==================== SAVE PDF ====================
  const fileName = `8-week-comparison-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  
  console.log('✅ Report generated successfully:', fileName);
};
