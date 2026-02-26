
import { useState } from "react";
import { useMarkets } from "@/context/MarketContext";
import NeonMarketCard from "./NeonMarketCard";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import { fetchTrendingEvents } from "@/lib/polymarket";

const SportsDashboard = () => {
    const { t } = useLanguage();
    const { markets } = useMarkets();
    const [activeSport, setActiveSport] = useState("All");
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);
    const [newsItems, setNewsItems] = useState<string[]>(["Loading live sports events..."]);

    const sportsCategories = [
        { name: "All", icon: "sports" },
        { name: "Basketball", icon: "sports_basketball" },
        { name: "Esports", icon: "sports_esports" },
        { name: "Soccer", icon: "sports_soccer" },
        { name: "MMA", icon: "sports_mma" },
        { name: "Tennis", icon: "sports_tennis" },
        { name: "American Football", icon: "sports_football" },
    ];

    // Filter for Sports markets
    const sportsMarkets = markets.filter(m => m.category === "Sports" || m.category === "Esports").filter(m => {
        if (activeSport === "All") return true;
        if (activeSport === "Basketball") return m.title.includes("NBA") || m.title.includes("Basketball");
        if (activeSport === "Esports") return m.title.includes("LoL") || m.title.includes("Gaming") || m.title.includes("Esports") || m.title.includes("CS2") || m.title.includes("Dota");
        if (activeSport === "Soccer") return m.title.includes("Premier League") || m.title.includes("Soccer") || m.title.includes("Champions League");
        if (activeSport === "MMA") return m.title.includes("UFC") || m.title.includes("MMA");
        if (activeSport === "Tennis") return m.title.includes("Tennis");
        if (activeSport === "American Football") return m.title.includes("NFL");
        return true;
    });

    useEffect(() => {
        const loadLiveNews = async () => {
            const events = await fetchTrendingEvents(10, 'Sports');
            if (events.length > 0) {
                setNewsItems(events.map(e => e.title));
            } else {
                setNewsItems(["Live sports data unavailable..."]);
            }
        };

        loadLiveNews();

        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % (newsItems.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen gap-6 p-6 bg-slate-50 dark:bg-[#050b14] relative overflow-hidden transition-colors duration-500">
            {/* Cyberpunk Grid Background - Blue Tint */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100"
                style={{
                    backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}>
            </div>

            {/* Glow Effects - Deep Blue / Indigo */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/20 blur-[150px] rounded-full pointer-events-none transform-gpu" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none transform-gpu" />

            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex flex-col gap-2 z-10 shrink-0 mt-20 lg:mt-32">
                <div className="p-4 mb-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none backdrop-blur-md transition-colors duration-500">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        {t('categories.sports').toUpperCase()}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-blue-200/50 mt-1">{t('dashboard.live')} Markets</p>

                    {/* Scrolling News - Embedded in sidebar for sports */}
                    <div className="h-4 overflow-hidden relative mt-4">
                        <p key={activeNewsIndex} className="text-[10px] text-blue-600 dark:text-blue-400 font-mono animate-fade-in-up whitespace-nowrap text-ellipsis">
                            {newsItems[activeNewsIndex]}
                        </p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    {sportsCategories.map((sport) => (
                        <button
                            key={sport.name}
                            onClick={() => setActiveSport(sport.name)}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                activeSport === sport.name
                                    ? "bg-gradient-to-r from-blue-100/80 to-transparent dark:from-blue-900/40 dark:to-transparent border-l-4 border-blue-500 text-blue-700 dark:text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                    : "hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent hover:border-slate-300 dark:hover:border-white/20"
                            )}
                        >
                            <Icon name={sport.icon} className={cn("text-xl transition-colors", activeSport === sport.name ? "text-blue-600 dark:text-blue-400" : "group-hover:text-slate-800 dark:group-hover:text-white")} />
                            <span className="font-medium tracking-wide">{sport.name}</span>

                            {/* Active Glow Overlay */}
                            {activeSport === sport.name && (
                                <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 pointer-events-none animate-pulse-slow" />
                            )}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 z-10 content-start pb-20 mt-20 lg:mt-32">
                {sportsMarkets.map((market) => (
                    <NeonMarketCard key={market.id} market={market} />
                ))}

                {/* Visual filler if needed */}
                {sportsMarkets.length < 4 && (
                    <>
                    </>
                )}
            </main>
        </div>
    );
};

export default SportsDashboard;
