
// 1: 
// 2: import { markets } from "@/data/markets";
// 3: import CommoditiesMarketCard from "./CommoditiesMarketCard";
// 4: import { Hammer } from "lucide-react";
// 5: 
// 6: const CommoditiesDashboard = () => {
// 7:     const commodityMarkets = markets.filter(m => m.category === "Commodities");
// 8: 
// 9:     return (
// 10:         <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#121212] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
// 11:             {/* Background: Industrial Noise */}
// 12:             <div className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
// 13: 
// 14:             {/* Spacer for Navbar */}
// 15:             <div className="h-32 w-full" />
// 16: 
// 17:             {/* Header Section */}
// 18:             <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
// 19:                 <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-[#d4af37] mb-6 tracking-tight uppercase">
// 20:                     Hard Assets
// 21:                 </h1>
// 22:                 <p className="text-slate-600 dark:text-slate-400 max-w-xl font-medium text-lg border-l-4 border-amber-500 pl-4 text-left mx-auto">
import { useState } from "react";
import CommoditiesMarketCard from "./CommoditiesMarketCard";
import { Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMarkets } from "@/context/MarketContext";
import { fetchTrendingEvents } from "@/lib/polymarket";
import { useEffect } from "react";

const CommoditiesDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Tracking global supply chains..."]);

    const commoditiesMarkets = markets.filter((m) => m.category === "Commodities" || m.category === "Metals");

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'Commodities');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Tracking global supply chains..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#121212] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Industrial Noise */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />

            {/* Spacer for Navbar */}
            <div className="h-32 w-full" />

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-[#d4af37] mb-6 tracking-tight uppercase">
                    {t('dashboard.commodities_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl font-medium text-lg border-l-4 border-amber-500 pl-4 text-left mx-auto mb-6">
                    {t('dashboard.commodities_subtitle')}
                </p>

                {/* Scrolling News - Clean Text */}
                <div className="h-6 overflow-hidden relative w-full max-w-2xl bg-white/50 dark:bg-black/20 rounded-lg py-1 backdrop-blur-sm border border-slate-200 dark:border-white/5 mx-auto">
                    <p key={activeNewsIndex} className="text-sm text-slate-600 dark:text-slate-300 font-mono animate-fade-in-up">
                        {">"} {newsItems[activeNewsIndex]}
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {commoditiesMarkets.map((market) => (
                        <CommoditiesMarketCard key={market.id} market={market} />
                    ))}
                </div>
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default CommoditiesDashboard;
