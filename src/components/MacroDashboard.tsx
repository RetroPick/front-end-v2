import { useState } from "react";
import { markets } from "@/data/markets";
import MacroMarketCard from "./MacroMarketCard";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MacroDashboard = () => {
    const { t } = useLanguage();
    const macroMarkets = markets.filter(m => m.category === "Macro");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#05080f] text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
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
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {macroMarkets.map((market) => (
                        <MacroMarketCard key={market.id} market={market} />
                    ))}
                </div>
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
