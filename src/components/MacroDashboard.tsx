import { useState, useEffect } from "react";
import { useMarkets } from "@/context/MarketContext";
import MacroMarketCard from "./MacroMarketCard";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchTrendingEvents } from "@/lib/polymarket";

const MacroDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Loading live macroeconomic data..."]);

    const macroMarkets = markets.filter((m) => m.category === "Macro" || m.category === "Economics");
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'Macro');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Awaiting macroeconomic updates..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="min-h-screen bg-background text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Subtle Grid + World Map Hint */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-900/10" />
            </div>

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Globe className="w-3 h-3" />
                    {t('dashboard.global_markets')}
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                    {t('dashboard.macro_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-light text-lg">
                    {t('dashboard.macro_subtitle')}
                </p>
                {/* Scrolling News - Clean Text */}
                <div className="h-6 overflow-hidden relative mt-6 w-full max-w-2xl bg-white/50 dark:bg-black/20 rounded-lg py-1 backdrop-blur-sm border border-slate-200 dark:border-white/5 mx-auto">
                    <p key={activeNewsIndex} className="text-sm text-slate-600 dark:text-slate-300 font-mono animate-fade-in-up">
                        {">"} {newsItems[activeNewsIndex]}
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {macroMarkets.slice(0, visibleCount).map((market) => (
                        <MacroMarketCard key={market.id} market={market} />
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < macroMarkets.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 10)}
                            className="px-8 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        >
                            Load More ({macroMarkets.length - visibleCount} remaining)
                        </button>
                    </div>
                )}
            </div>

            {/* Footer / Disclaimer */}
            <div className="relative z-10 container mx-auto px-4 mt-16 text-center pb-8 border-t border-slate-200 dark:border-white/5 pt-8">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                    {t('dashboard.disclaimer')}
                </p>
            </div>
        </div>
    );
};

export default MacroDashboard;
