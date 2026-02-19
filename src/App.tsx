import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import MarketDetail from "./pages/MarketDetail";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

import { Web3ModalProvider } from "@/context/Web3ModalProvider";

import { OnboardingProvider } from "@/context/OnboardingContext";

import { LanguageProvider } from "@/context/LanguageContext";
import Activity from "./pages/Activity";
import Leaderboard from "./pages/Leaderboard";
import Vault from "./pages/Vault";
import VaultDetail from "./pages/VaultDetail";
import VaultLiquidity from "./pages/VaultLiquidity";
import VaultSuccess from "./pages/VaultSuccess";

const App = () => (
  <Web3ModalProvider>
    <TooltipProvider>
      <LanguageProvider>
        <OnboardingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Main App Routes */}
              <Route path="/app" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app/market/:id" element={<MarketDetail />} />
              <Route path="/app/portfolio" element={<Portfolio />} />
              <Route path="/app/activity" element={<Activity />} />
              <Route path="/app/leaderboard" element={<Leaderboard />} />
              <Route path="/app/vault" element={<Vault />} />
              <Route path="/app/liquidity" element={<VaultLiquidity />} />
              <Route path="/app/vault/success" element={<VaultSuccess />} />
              <Route path="/app/vault/:id" element={<VaultDetail />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OnboardingProvider>
      </LanguageProvider>
    </TooltipProvider>
  </Web3ModalProvider>
);

export default App;
