import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
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
import URCLineups from "./pages/URCLineups";
import URCAdmin from "./pages/URCAdmin";

// Analytics Hub imports - lazy loaded so they don't affect the main app
const AnalyticsLive = lazy(() => import("./pages/AnalyticsLive"));
const AnalyticsHistory = lazy(() => import("./pages/AnalyticsHistory"));
const AnalyticsWeekly = lazy(() => import("./pages/AnalyticsWeekly"));
const AnalyticsUpload = lazy(() => import("./pages/AnalyticsUpload"));

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
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
          
          {/* URC Routes */}
          <Route path="/urc-lineups" element={<URCLineups />} />
          <Route path="/urc-admin" element={<URCAdmin />} />

          <Route path="/box-score/:matchId" element={<BoxScorePage />} />
          
          {/* Analytics Hub Routes - Lazy loaded and isolated from main app */}
          <Route path="/hub/live" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsLive /></Suspense>} />
          <Route path="/hub/history" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsHistory /></Suspense>} />
          <Route path="/hub/weekly" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsWeekly /></Suspense>} />
          <Route path="/hub/upload" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsUpload /></Suspense>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
