import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
