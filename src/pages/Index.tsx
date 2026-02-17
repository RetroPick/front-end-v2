import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedMarket from "@/components/FeaturedMarket";
import MarketCard from "@/components/MarketCard";
import { featuredMarket, markets } from "@/data/markets";


import { useState } from "react";

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

  const filteredMarkets = activeCategory === "Trending"
    ? markets
    : markets.filter(market => market.category === activeCategory);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
      <CategoryBackground category={activeCategory} />
      <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

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
            {/* Featured Market */}
            <FeaturedMarket market={featuredMarket} />

            {/* Markets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 flex justify-center">
              <button className="px-8 py-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-muted-foreground hover:text-foreground">
                {t('home.load_more')}
              </button>
            </div>
          </PageTransition>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Index;
