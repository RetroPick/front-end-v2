import { useState, useEffect } from "react";
import { useMarkets } from "@/context/MarketContext";
import AIMarketCard from "./AIMarketCard";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { fetchTrendingEvents } from "@/lib/polymarket";

const AIDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Syncing neural networks..."]);

    const aiMarkets = markets.filter((m) => m.category === "AI" || m.category === "Technology");
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'AI');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Awaiting AI developments..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Cyber Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f710_1px,transparent_1px),linear-gradient(to_bottom,#a855f710_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 dark:opacity-30" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[150px] rounded-full transform-gpu" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[150px] rounded-full transform-gpu" />
            </div>

            {/* Spacer for Navbar */}
            <div className="h-40 w-full" />

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 mb-6 tracking-tighter">
                    {t('dashboard.ai_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-light text-lg mb-6">
                    {t('dashboard.ai_subtitle')}
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
                    {aiMarkets.slice(0, visibleCount).map((market) => (
                        <AIMarketCard key={market.id} market={market} />
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < aiMarkets.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + 10)}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-slate-400 hover:text-white"
                        >
                            Load More ({aiMarkets.length - visibleCount} remaining)
                        </button>
                    </div>
                )}
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default AIDashboard;
