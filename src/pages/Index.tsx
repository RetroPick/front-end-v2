import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedMarket from "@/components/FeaturedMarket";
import MarketCard from "@/components/MarketCard";
import BetaTutorialBanner from "@/components/BetaTutorialBanner";
import SportsDashboard from "@/components/SportsDashboard";
import { useMarkets } from "@/context/MarketContext";
import Icon from "@/components/Icon";
import { useState, useCallback } from "react";
import CategoryBackground from "@/components/CategoryBackground";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [visibleCount, setVisibleCount] = useState(10);
  const { markets, isLoading } = useMarkets();

  const handleSetCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(10);
  }, []);

  const categoryAliases: Record<string, string[]> = {
    Politics: ["Politics", "Elections"],
    Sports: ["Sports", "Esports"],
    Crypto: ["Crypto", "Currency"],
  };

  const filteredMarkets =
    activeCategory === "Trending"
      ? markets
      : activeCategory === "New"
        ? [...markets].sort((a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime())
        : markets.filter((m) => {
            const aliases = categoryAliases[activeCategory];
            return aliases ? aliases.includes(m.category) : m.category === activeCategory;
          });

  // Featured market: highest volume in current category (for Trending through Corporate)
  const categoryFeaturedMarket =
    filteredMarkets.length > 0
      ? filteredMarkets.reduce((prev, current) => {
          const prevVol = parseFloat(prev.volume.replace(/[^0-9.-]+/g, "")) || 0;
          const currVol = parseFloat(current.volume.replace(/[^0-9.-]+/g, "")) || 0;
          return currVol > prevVol ? current : prev;
        })
      : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
      <CategoryBackground category={activeCategory} />
      <Header activeCategory={activeCategory} setActiveCategory={handleSetCategory} />

      <AnimatePresence mode="wait">
        {activeCategory === "Sports" ? (
          <PageTransition key="sports" className="pt-0 pb-12 w-full relative z-10">
            <SportsDashboard />
          </PageTransition>
        ) : (
          <PageTransition
            key={activeCategory}
            className="pt-48 pb-12 px-4 lg:px-8 max-w-[1440px] mx-auto relative z-10"
          >
            <BetaTutorialBanner className="mb-6" />
            {categoryFeaturedMarket && <FeaturedMarket market={categoryFeaturedMarket} />}
            {isLoading && (
              <div className="w-full h-48 flex items-center justify-center">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                  <Icon name="sync" className="animate-spin" />
                  Loading Polymarket Data...
                </span>
              </div>
            )}
            {!isLoading && filteredMarkets.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border-2 border-dashed border-border bg-card/30">
                <Icon name="inbox" className="text-6xl text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("dashboard.no_data")}</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  No markets found for {activeCategory}. Check back later or try another category.
                </p>
              </div>
            )}
            {!isLoading && filteredMarkets.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredMarkets.slice(0, visibleCount).map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>
                {visibleCount < filteredMarkets.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                      className="px-8 py-3 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-muted-foreground hover:text-foreground"
                    >
                      {t("home.load_more")} ({filteredMarkets.length - visibleCount} remaining)
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
