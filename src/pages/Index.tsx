import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedMarket from "@/components/FeaturedMarket";
import MarketCard from "@/components/MarketCard";
import { useMarkets } from "@/context/MarketContext";
import Icon from "@/components/Icon";


import { useState, useCallback } from "react";

import CategoryBackground from "@/components/CategoryBackground";

import SportsDashboard from "@/components/SportsDashboard";
import PoliticsDashboard from "@/components/PoliticsDashboard";
import CryptoDashboard from "@/components/CryptoDashboard";
import MacroDashboard from "@/components/MacroDashboard";
import AIDashboard from "@/components/AIDashboard";
import CommoditiesDashboard from "@/components/CommoditiesDashboard";
import SpaceDashboard from "@/components/SpaceDashboard";
import CorporateDashboard from "@/components/CorporateDashboard";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [visibleCount, setVisibleCount] = useState(10);
  const { markets, isLoading } = useMarkets();

  // Reset visible count when category changes
  const handleSetCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(10);
  }, []);

  // Find dynamic featured market (highest volume or arbitrarily the first)
  const dynamicFeaturedMarket = markets.length > 0 ? markets.reduce((prev, current) => {
    const prevVol = parseFloat(prev.volume.replace(/[^0-9.-]+/g, "")) || 0;
    const currVol = parseFloat(current.volume.replace(/[^0-9.-]+/g, "")) || 0;
    return (currVol > prevVol) ? current : prev;
  }) : null;

  const filteredMarkets = activeCategory === "Trending"
    ? markets
    : activeCategory === "New"
      ? [...markets].sort((a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime()) // Sort by latest (approx "New")
      : markets.filter(market => market.category === activeCategory);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
      <CategoryBackground category={activeCategory} />
      <Header activeCategory={activeCategory} setActiveCategory={handleSetCategory} />

      <AnimatePresence mode="wait">
        {activeCategory === "Sports" ? (
          <PageTransition key="sports" className="pt-0 pb-12 w-full relative z-10">
            <SportsDashboard />
          </PageTransition>
        ) : activeCategory === "Politics" ? (
          <PageTransition key="politics" className="pt-32 pb-12 w-full relative z-10">
            <PoliticsDashboard />
          </PageTransition>
        ) : activeCategory === "Crypto" ? (
          <PageTransition key="crypto" className="pt-20 pb-12 w-full relative z-10">
            <CryptoDashboard />
          </PageTransition>
        ) : activeCategory === "Macro" ? (
          <PageTransition key="macro" className="pt-32 pb-12 w-full relative z-10">
            <MacroDashboard />
          </PageTransition>
        ) : activeCategory === "AI" ? (
          <PageTransition key="ai" className="pt-0 pb-12 w-full relative z-10">
            <AIDashboard />
          </PageTransition>
        ) : activeCategory === "Commodities" ? (
          <PageTransition key="commodities" className="pt-32 pb-12 w-full relative z-10">
            <CommoditiesDashboard />
          </PageTransition>
        ) : activeCategory === "Space" ? (
          <PageTransition key="space" className="pt-0 pb-12 w-full relative z-10">
            <SpaceDashboard />
          </PageTransition>
        ) : activeCategory === "Corporate" ? (
          <PageTransition key="corporate" className="pt-24 pb-12 w-full relative z-10">
            <CorporateDashboard />
          </PageTransition>
        ) : (
          <PageTransition key="trending" className="pt-48 pb-12 px-4 lg:px-8 max-w-[1440px] mx-auto relative z-10">
            {/* Dynamic Featured Market */}
            {dynamicFeaturedMarket && <FeaturedMarket market={dynamicFeaturedMarket} />}

            {isLoading ? (
              <div className="w-full h-48 flex items-center justify-center">
                <span className="text-white/50 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                  <Icon name="sync" className="animate-spin" />
                  Loading Polymarket Data...
                </span>
              </div>
            ) : (
              <>
                {/* Markets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredMarkets.slice(0, visibleCount).map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredMarkets.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                      className="px-8 py-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-muted-foreground hover:text-foreground"
                    >
                      {t('home.load_more')} ({filteredMarkets.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </PageTransition>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Index;
