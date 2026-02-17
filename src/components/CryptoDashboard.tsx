
import { markets } from "@/data/markets";
import CryptoMarketCard from "./CryptoMarketCard";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CryptoDashboard = () => {
    const { t } = useLanguage();
    const [activeNewsIndex, setActiveNewsIndex] = useState(0);

    // Filter for Crypto markets
    const cryptoMarkets = markets.filter(m => m.category === "Crypto" || m.category === "Currency");

    // Mock News Ticker Data
    const newsItems = [
        "BTC Dominance hits 58% as altcoins season delayed.",
        "Layer 2 scaling solutions reduce gas fees by 99%.",
        "Global hash rate reaches new all-time high.",
        "DeFi TVL surpasses $100B milestone."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNewsIndex((prev) => (prev + 1) % newsItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#02040a] text-slate-900 dark:text-white relative overflow-hidden font-sans selection:bg-cyan-100 dark:selection:bg-cyan-500 selection:text-cyan-900 dark:selection:text-white pb-20 perspective-1000 transition-colors duration-500">

            {/* Background: Modern Cyber Grid & Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Base Deep Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-[#050b1d] dark:to-[#02040a] transition-colors duration-500" />

                {/* Perspective Grid Floor */}
                <div
                    className="absolute bottom-0 left-[-50%] right-[-50%] h-[100vh] origin-bottom transform-gpu rotate-x-60 opacity-20"
                    style={{
                        backgroundImage: `
                    linear-gradient(transparent 95%, rgba(6, 182, 212, 0.3) 95%),
                    linear-gradient(90deg, transparent 95%, rgba(6, 182, 212, 0.3) 95%)
                `,
                        backgroundSize: '60px 60px',
                        maskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
                    }}
                />

                {/* Horizon Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl opacity-50" />

                {/* Top Spotlight */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col items-center pt-24">

                {/* Modern Header / Ticker */}
                <div className="w-full max-w-4xl border-b border-slate-200 dark:border-white/5 pb-8 mb-12 text-center transition-colors duration-500">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/20 mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-widest">
                            {t('dashboard.live')} Market Data
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-white dark:via-blue-100 dark:to-cyan-200">
                            {t('categories.crypto').toUpperCase()} INTELLIGENCE
                        </span>
                    </h1>

                    {/* Scrolling News - Clean Text */}
                    <div className="h-6 overflow-hidden relative mt-2">
                        <p key={activeNewsIndex} className="text-sm text-slate-500 dark:text-slate-400 font-mono animate-fade-in-up">
                            {">"} {newsItems[activeNewsIndex]}
                        </p>
                    </div>
                </div>

                {/* Crypto Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-items-center">
                    {cryptoMarkets.map((market) => (
                        <CryptoMarketCard key={market.id} market={market} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CryptoDashboard;
