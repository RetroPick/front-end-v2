
import { markets } from "@/data/markets";
import AIMarketCard from "./AIMarketCard";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AIDashboard = () => {
    const { t } = useLanguage();
    const aiMarkets = markets.filter(m => m.category === "AI");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">
            {/* Background: Cyber Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f710_1px,transparent_1px),linear-gradient(to_bottom,#a855f710_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 dark:opacity-30" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[150px] rounded-full" />
            </div>

            {/* Spacer for Navbar */}
            <div className="h-40 w-full" />

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 mb-12 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 mb-6 tracking-tighter">
                    {t('dashboard.ai_title')}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl font-light text-lg">
                    {t('dashboard.ai_subtitle')}
                </p>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {aiMarkets.map((market) => (
                        <AIMarketCard key={market.id} market={market} />
                    ))}
                </div>
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default AIDashboard;
