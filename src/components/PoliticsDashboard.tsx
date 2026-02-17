import { useState } from "react";
import { markets } from "@/data/markets";
import PoliticsMarketCard from "./PoliticsMarketCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const PoliticsDashboard = () => {
    const { t } = useLanguage();
    const politicsMarkets = markets.filter(m => m.category === "Politics");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden font-sans selection:bg-red-100 dark:selection:bg-red-900/30 selection:text-red-900 dark:selection:text-red-100 transition-colors duration-500">
            {/* Background: Geometric/World Map Pattern - Subtle & Professional */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/87/World_map_blank_gmt.svg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            />
            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-slate-50 dark:from-slate-950/90 dark:via-slate-950/50 dark:to-slate-950 pointer-events-none" />

            <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 pt-32">
                {/* Hero / Header Section - "Front Page" Style */}
                <div className="mb-16 flex flex-col items-center text-center relative">
                    <div className="absolute top-0 w-24 h-1 bg-red-600 rounded-full mb-8" />

                    <span className="mt-8 inline-flex items-center gap-2 py-1 px-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        {t('dashboard.global_intelligence')}
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 leading-[0.9] font-serif">
                        {t('dashboard.politics_title')}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed font-serif italic">
                        "{t('dashboard.politics_subtitle')}"
                    </p>
                </div>

                {/* Categories / Filter Tabs (Visual Only for now) */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {["All News", "Elections", "Geopolitics", "Policy"].map((cat, i) => (
                        <button key={cat} className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${i === 0 ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-400 dark:hover:border-slate-600'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* News Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {politicsMarkets.map((market) => (
                        // Using the new explicit PoliticsMarketCard
                        <PoliticsMarketCard key={market.id} market={market} />
                    ))}

                    {/* Empty State */}
                    {politicsMarkets.length === 0 && (
                        <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                            <p className="text-slate-500 font-serif italic text-xl">"{t('dashboard.no_data')}"</p>
                        </div>
                    )}
                </div>

                {/* Footer Decoration */}
                <div className="mt-24 border-t-2 border-slate-900 dark:border-white pt-8 flex flex-col md:flex-row justify-between items-center text-slate-900 dark:text-white font-bold font-serif uppercase tracking-widest text-xs gap-4">
                    <span>Retropick Politics © 2026</span>
                    <span className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700 mx-4" />
                    <span>Veritas via Consensus</span>
                </div>
            </main>
        </div>
    );
};

export default PoliticsDashboard;
