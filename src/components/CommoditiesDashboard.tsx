
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
// 23:                     Track real-world resources. Gold, Silver, Oil, and strategic minerals driving the global supply chain.
// 24:                 </p>
// 25:             </div>
import { markets } from "@/data/markets";
import CommoditiesMarketCard from "./CommoditiesMarketCard";
import { Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CommoditiesDashboard = () => {
    const { t } = useLanguage();
    const commodityMarkets = markets.filter(m => m.category === "Commodities");

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
                <p className="text-slate-600 dark:text-slate-400 max-w-xl font-medium text-lg border-l-4 border-amber-500 pl-4 text-left mx-auto">
                    {t('dashboard.commodities_subtitle')}
                </p>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {commodityMarkets.map((market) => (
                        <CommoditiesMarketCard key={market.id} market={market} />
                    ))}
                </div>
            </div>

            <div className="h-20" /> {/* Spacer */}
        </div>
    );
};

export default CommoditiesDashboard;
