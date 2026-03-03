
import { useMarkets } from "@/context/MarketContext";
import SpaceMarketCard from "./SpaceMarketCard";
import { Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { fetchTrendingEvents } from "@/lib/polymarket";

const SpaceDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Monitoring orbital deployments..."]);

    const spaceMarkets = markets.filter((m) => m.category === "Space" || m.category === "Science");
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'Space');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Monitoring orbital deployments..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Stars */}
            {/* Light Mode: Subtle pattern / Dark Mode: Deep Space Stars */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 dark:opacity-30 mix-blend-darken dark:mix-blend-normal" />
                {/* Orbs */}
                <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-indigo-200/40 dark:bg-indigo-900/40 rounded-full blur-[120px] transform-gpu" />
                <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/30 rounded-full blur-[100px] transform-gpu" />
            </div>

            {/* Spacer for Navbar */}
            <div className="h-40 w-full" />

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-600 mb-6 tracking-tight uppercase">
                    {t('dashboard.space_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-light text-lg mb-6">
                    {t('dashboard.space_subtitle')}
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
                    {spaceMarkets.slice(0, visibleCount).map((market) => (
                        <SpaceMarketCard key={market.id} market={market} />
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < spaceMarkets.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 10)}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-slate-400 hover:text-white"
                        >
                            Load More ({spaceMarkets.length - visibleCount} remaining)
                        </button>
                    </div>
                )}
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default SpaceDashboard;
