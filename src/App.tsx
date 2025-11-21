import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Fixtures from "./pages/Fixtures";
import BoxScorePage from "./pages/BoxScorePage";
import About from "./pages/About";
import AfricaCupHub from "./pages/AfricaCupHub";
import AfricaCupTeams from "./pages/AfricaCupTeams";
import AfricaCupFixtures from "./pages/AfricaCupFixtures";
import AfricaCupBoxScore from "./pages/AfricaCupBoxScore";
import Download from "./pages/Download";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ZimbabweSBRGraphic from "./pages/ZimbabweSBRGraphic";

// Analytics Hub imports - lazy loaded so they don't affect the main app
const UnifiedAnalyticsDashboard = lazy(() => import("./pages/UnifiedAnalyticsDashboard"));
const AnalyticsUpload = lazy(() => import("./pages/AnalyticsUpload"));
const ContentTracker = lazy(() => import("./pages/ContentTracker"));
const AnalyticsWeekly = lazy(() => import("./pages/AnalyticsWeekly"));
const AnalyticsHistory = lazy(() => import("./pages/AnalyticsHistory"));

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/about" element={<About />} />
          <Route path="/africa-cup" element={<AfricaCupHub />} />
          <Route path="/africa-cup/teams" element={<AfricaCupTeams />} />
          <Route path="/africa-cup/fixtures" element={<AfricaCupFixtures />} />
          <Route path="/africa-cup/box-score/:matchId" element={<AfricaCupBoxScore />} />
          <Route path="/download" element={<Download />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/zimbabwe-sbr-graphic" element={<ZimbabweSBRGraphic />} />
          <Route path="/box-score/:matchId" element={<BoxScorePage />} />
          
          {/* Analytics Hub Routes - Unified dashboard system */}
          <Route path="/hub" element={<Suspense fallback={<div>Loading...</div>}><UnifiedAnalyticsDashboard /></Suspense>} />
          <Route path="/hub/dashboard" element={<Suspense fallback={<div>Loading...</div>}><UnifiedAnalyticsDashboard /></Suspense>} />
          <Route path="/hub/upload" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsUpload /></Suspense>} />
          <Route path="/hub/content" element={<Suspense fallback={<div>Loading...</div>}><ContentTracker /></Suspense>} />
          <Route path="/hub/weekly" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsWeekly /></Suspense>} />
          <Route path="/hub/history" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsHistory /></Suspense>} />
          
          {/* Legacy redirects */}
          <Route path="/hub/live" element={<Suspense fallback={<div>Loading...</div>}><UnifiedAnalyticsDashboard /></Suspense>} />
          <Route path="/hub/instagram" element={<Suspense fallback={<div>Loading...</div>}><UnifiedAnalyticsDashboard /></Suspense>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
