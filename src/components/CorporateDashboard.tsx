
// 2: import { useMarkets } from "@/context/MarketContext";
// 3: import CorporateMarketCard from "./CorporateMarketCard";
// 4: import { Building2 } from "lucide-react";
// 5: 
// 6: const CorporateDashboard = () => {
// 7:     const corporateMarkets = markets.filter(m => m.category === "Corporate");
// 8: 
// 9:     return (
// 10:         <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
// 11:             {/* Background: Geometric */}
// 12:             <div className="absolute inset-0 z-0 pointer-events-none">
// 13:                 <div className="absolute right-0 top-0 w-1/2 h-full bg-slate-100 dark:bg-slate-900 -skew-x-12 opacity-50" />
// 14:             </div>
// 15: 
// 16:             {/* Header Section */}
// 17:             <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 pt-12 flex flex-col items-start px-8">
// 18:                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-4">
// 19:                     <Building2 className="w-3 h-3" />
// 20:                     Market Intelligence
// 21:                 </div>
// 22:                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
// 23:                     CORPORATE <span className="text-blue-600">INSIGHTS</span>
// 24:                 </h1>
// 25:                 <p className="text-slate-600 dark:text-slate-400 max-w-xl font-normal text-lg">
import { useMarkets } from "@/context/MarketContext";
import CorporateMarketCard from "./CorporateMarketCard";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { fetchTrendingEvents } from "@/lib/polymarket";

const CorporateDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Analyzing quarterly earnings..."]);

    const corporateMarkets = markets.filter((m) => m.category === "Corporate" || m.category === "Business");

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'Corporate');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Analyzing quarterly earnings..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Geometric */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-slate-100 dark:bg-slate-900 -skew-x-12 opacity-50" />
            </div>

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 pt-12 flex flex-col items-start px-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-4">
                    <Building2 className="w-3 h-3" />
                    {t('dashboard.market_intelligence')}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    {t('dashboard.corporate_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl font-normal text-lg mb-6">
                    {t('dashboard.corporate_subtitle')}
                </p>

                {/* Scrolling News - Clean Text */}
                <div className="h-6 overflow-hidden relative w-full max-w-xl bg-slate-200 dark:bg-black/20 rounded-lg py-1 border border-slate-300 dark:border-white/5">
                    <p key={activeNewsIndex} className="text-sm text-slate-700 dark:text-slate-300 font-mono animate-fade-in-up">
                        {">"} {newsItems[activeNewsIndex]}
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {corporateMarkets.map((market) => (
                        <CorporateMarketCard key={market.id} market={market} />
                    ))}
                </div>
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default CorporateDashboard;
