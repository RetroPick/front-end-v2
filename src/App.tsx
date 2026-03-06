import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import MarketDetail from "./pages/MarketDetail";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { Web3ModalProvider } from "@/context/Web3ModalProvider";

import { OnboardingProvider } from "@/context/OnboardingContext";

import { LanguageProvider } from "@/context/LanguageContext";
import { MarketProvider } from "@/context/MarketContext";
import Activity from "./pages/Activity";
import Leaderboard from "./pages/Leaderboard";
import Vault from "./pages/Vault";
import VaultDetail from "./pages/VaultDetail";
import VaultLiquidity from "./pages/VaultLiquidity";
import VaultSuccess from "./pages/VaultSuccess";
import Resolution from "./pages/Resolution";
import RiskSentinel from "./pages/RiskSentinel";

const App = () => (
  <Web3ModalProvider>
    <TooltipProvider>
      <LanguageProvider>
        <OnboardingProvider>
          <MarketProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary fallback={
                <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-background text-foreground">
                  <h1 className="text-2xl font-bold">Something went wrong</h1>
                  <p className="text-muted-foreground text-center max-w-md">An unexpected error occurred. Please refresh the page or try again later.</p>
                  <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Refresh page
                  </button>
                </div>
              }>
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
                <Route path="/app/resolution" element={<Resolution />} />
                <Route path="/app/risk-sentinel" element={<RiskSentinel />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </MarketProvider>
        </OnboardingProvider>
      </LanguageProvider>
    </TooltipProvider>
  </Web3ModalProvider>
);

export default App;
